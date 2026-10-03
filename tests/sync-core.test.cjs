const { test } = require('node:test');
const assert = require('node:assert/strict');
const Sync = require('../sync-core.js');
function ledger() {
  return { dataVersion:2, months:{'2026-05':{
    funds:[{id:'food',name:'Groceries',start:0,allocation:100,updatedAt:'2026-05-01'}],
    incomes:[{id:'salary',name:'Salary',amount:100}], expenses:[]
  }},projects:[],restockItems:[] };
}
function expense(id, amount=10){return {id,category:'Groceries',amount,date:'2026-05-01',note:id};}
test('independent additions survive a three-way merge',()=>{
  const base=ledger(), local=structuredClone(base), remote=structuredClone(base);
  local.months['2026-05'].expenses.push(expense('computer'));
  remote.months['2026-05'].expenses.push(expense('phone'));
  const merged=Sync.merge(base,local,remote);
  assert.deepEqual(merged.conflicts,[]);
  assert.deepEqual(merged.value.months['2026-05'].expenses.map(e=>e.id),['computer','phone']);
  assert.deepEqual(base.months['2026-05'].expenses,[]);
});
test('different timestamps on otherwise unchanged funds do not block independent expenses',()=>{
  const base=ledger(), l=structuredClone(base), r=structuredClone(base);
  l.months['2026-05'].funds[0].updatedAt='2026-05-02';
  r.months['2026-05'].funds[0].updatedAt='2026-05-03';
  l.months['2026-05'].expenses.push(expense('local'));r.months['2026-05'].expenses.push(expense('remote'));
  assert.deepEqual(Sync.merge(base,l,r).conflicts,[]);
});
test('the same record changed on both devices conflicts, even on different fields',()=>{
  const base=ledger();base.months['2026-05'].expenses.push(expense('same'));
  const l=structuredClone(base),r=structuredClone(base);
  l.months['2026-05'].expenses[0].amount=15;r.months['2026-05'].expenses[0].note='other note';
  assert.ok(Sync.merge(base,l,r).conflicts.length);
});
test('deletion versus editing conflicts; independent deletion is retained',()=>{
  const base=ledger();base.months['2026-05'].expenses.push(expense('same'));
  const l=structuredClone(base),r=structuredClone(base);l.months['2026-05'].expenses=[];
  r.months['2026-05'].expenses[0].amount=99;
  assert.ok(Sync.merge(base,l,r).conflicts.length);
  assert.equal(Sync.merge(base,l,base).value.months['2026-05'].expenses.length,0);
});
test('a category rename versus a new expense in the old category conflicts',()=>{
  const base=ledger(),l=structuredClone(base),r=structuredClone(base);
  l.months['2026-05'].funds[0].name='Food';r.months['2026-05'].expenses.push(expense('remote'));
  assert.ok(Sync.merge(base,l,r).conflicts.some(p=>p.startsWith('missing-category/')));
});
test('independent changes may not break later-month starting balances',()=>{
  const base=ledger();base.months['2026-06']={funds:[{id:'food2',name:'Groceries',start:100,allocation:0}],incomes:[],expenses:[]};
  const l=structuredClone(base),r=structuredClone(base);
  l.months['2026-05'].expenses.push(expense('local'));l.months['2026-06'].funds[0].start=90;
  r.months['2026-05'].expenses.push(expense('remote'));r.months['2026-06'].funds[0].start=90;
  assert.ok(Sync.merge(base,l,r).conflicts.length);
});
test('equal incremental allocations on both devices still require review',()=>{
  const base=ledger(),l=structuredClone(base),r=structuredClone(base);
  l.months['2026-05'].funds[0].allocation+=10;r.months['2026-05'].funds[0].allocation+=10;
  assert.ok(Sync.merge(base,l,r).conflicts.length);
});
test('combining distinct allocations must not overspend the shared income pool',()=>{
  const base=ledger();base.months['2026-05'].funds[0].allocation=10;
  base.months['2026-05'].funds.push({id:'travel',name:'Travel',start:0,allocation:10});
  const l=structuredClone(base),r=structuredClone(base);
  l.months['2026-05'].funds[0].allocation=60;r.months['2026-05'].funds[1].allocation=60;
  assert.ok(Sync.merge(base,l,r).conflicts.some(p=>p.startsWith('overallocated/')));
});
test('privacy, language, backup state and month selection stay local',()=>{
  const first={...ledger(),language:'zh',currentMonth:'2026-05',privacyMode:true,cloudSync:{lastAction:'download'}};
  const second={...ledger(),language:'en',currentMonth:'2026-06',privacyMode:false};
  assert.ok(Sync.equal(Sync.content(first),Sync.content(second)));
  const result=Sync.withContent(first,Sync.content(second));
  assert.equal(result.language,'zh');assert.equal(result.privacyMode,true);assert.equal(result.currentMonth,'2026-05');
});
test('unsupported data versions and duplicate record ids are rejected',()=>{
  const data=ledger();data.dataVersion=3;assert.equal(Sync.validLedger(data),false);
  data.dataVersion=2;data.months['2026-05'].expenses=[expense('same'),expense('same')];assert.equal(Sync.validLedger(data),false);
});
test('project settlement versus editing its entries conflicts',()=>{
  const base=ledger();base.projects=[{id:'trip',status:'open',entries:[]}];
  const l=structuredClone(base),r=structuredClone(base);
  l.projects[0].status='settled';r.projects[0].entries.push(expense('trip-entry'));
  assert.ok(Sync.merge(base,l,r).conflicts.length);
});
