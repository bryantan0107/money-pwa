const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Projects = require('../projects-core.js');
const Sync = require('../sync-core.js');
const stamp = '2026-11-01T12:00:00Z';
function ledger() {
  return { dataVersion:3, currentMonth:'2026-06', projects:[], months:{
    '2026-05': {funds:[{id:'f1',name:'Travel',start:500,allocation:100}],incomes:[{id:'income',amount:100}],expenses:[]},
    '2026-06': {funds:[{id:'f2',name:'Travel',start:600,allocation:0}],incomes:[],expenses:[]}
  }};
}
const expense = (id, amount=20, date='2026-05-10') => ({id,category:'Travel',amount,date,note:id});
const addProject = (data,id='trip',entries=[]) => {const p={id,name:id,status:'active',accountingVersion:1,entries};data.projects.push(p);return p;};
const finance = data => Object.fromEntries(Object.entries(data.months).map(([id,m])=>[id,{
  funds:structuredClone(m.funds),incomes:structuredClone(m.incomes),expenses:m.expenses.map(({projectId,updatedAt,...e})=>e)
}]));
test('old settled projects retain aggregate payments and original details without double counting',()=>{
  const data=ledger();data.months['2026-05'].expenses=[{...expense('settlement',50),projectId:'trip'}];
  data.projects=[{id:'trip',status:'settled',entries:[expense('old1',20),expense('old2',30)],settlementExpenseIds:['settlement']}];
  const before=structuredClone(data.months);
  Projects.migrate(data);Projects.migrate(data);
  assert.deepEqual(data.months,before);assert.equal(Projects.total(data,'trip'),50);
  assert.equal(data.projects[0].entries.length,2);assert.equal(Projects.pendingEntries(data.projects[0]).length,0);
});
test('migration leaves active payments pending and repairs only explicit settlement links',()=>{
  const data=ledger();data.months['2026-05'].expenses=[expense('settlement',50),expense('similar',50)];
  data.projects=[{id:'done',status:'settled',entries:[],settlementExpenseIds:['settlement']},{id:'active',status:'active',entries:[expense('old')]}];
  const before=finance(data);Projects.migrate(data);
  assert.deepEqual(finance(data),before);assert.equal(data.months['2026-05'].expenses[0].projectId,'done');
  assert.equal(data.months['2026-05'].expenses[1].projectId,undefined);assert.equal(Projects.pendingEntries(data.projects[1]).length,1);
});
test('missing settlement records are never regenerated',()=>{
  const data=ledger();data.projects=[{id:'done',status:'settled',entries:[expense('old')],settlementExpenseIds:['missing']}];
  Projects.migrate(data);assert.equal(Projects.allExpenses(data).length,0);assert.equal(Projects.total(data,'done'),0);
});
test('posting a project expense uses its payment month and cascades balances',()=>{
  const data=ledger();addProject(data);
  Projects.putExpense(data,{id:'flight',payload:{...expense('ignored',80),projectId:'trip'},stamp});
  assert.equal(data.months['2026-05'].expenses.length,1);assert.equal(data.months['2026-06'].funds[0].start,520);
  assert.equal(Projects.total(data,'trip'),80);assert.deepEqual(Sync.ledgerIssues(data),[]);
});
test('linking, moving between projects and unlinking keep all financial values unchanged',()=>{
  const data=ledger();addProject(data,'a');addProject(data,'b');
  data.months['2026-05'].expenses=[expense('hotel',50)];Projects.cascade(data,'2026-05');
  const before=finance(data),refs=[{id:'hotel',monthId:'2026-05'}];
  Projects.linkExpenses(data,refs,'a',stamp);assert.equal(Projects.total(data,'a'),50);
  assert.throws(()=>Projects.linkExpenses(data,refs,'b',stamp),/already-linked/);
  Projects.linkExpenses(data,refs,'b',stamp,true);assert.equal(Projects.total(data,'a'),0);assert.equal(Projects.total(data,'b'),50);
  Projects.linkExpenses(data,refs,null,stamp,true);assert.deepEqual(finance(data),before);assert.equal(Projects.total(data,'b'),0);
});
test('old entry posting is idempotent and resolved entries never become pending after expense deletion',()=>{
  const data=ledger(),p=addProject(data,'trip',[expense('old')]);
  const args={projectId:'trip',entryId:'old',id:'posted',payload:expense('ignored'),stamp};
  Projects.postLegacyExpense(data,args);assert.equal(Projects.allExpenses(data).length,1);
  assert.equal(Projects.postLegacyExpense(data,{...args,id:'another'}),null);
  assert.equal(Projects.pendingEntries(p).length,0);
  Projects.deleteExpense(data,{id:'posted',monthId:'2026-05'},stamp);
  assert.equal(Projects.pendingEntries(p).length,0);assert.equal(data.months['2026-06'].funds[0].start,600);
});
test('linking an old entry to an existing payment creates no extra expense',()=>{
  const data=ledger(),p=addProject(data,'trip',[expense('old')]);
  data.months['2026-05'].expenses=[expense('existing')];Projects.cascade(data,'2026-05');const before=finance(data);
  Projects.resolveEntry(data,'trip','old',{id:'existing',monthId:'2026-05'},'linked',stamp);
  assert.deepEqual(finance(data),before);assert.equal(Projects.pendingEntries(p).length,0);assert.equal(Projects.total(data,'trip'),20);
});
test('cross-month edits and deletes update the same expense and category rollovers',()=>{
  const data=ledger();addProject(data);Projects.putExpense(data,{id:'x',payload:{...expense('x',50),projectId:'trip'},stamp});
  Projects.putExpense(data,{originalId:'x',originalMonthId:'2026-05',payload:{...expense('x',30,'2026-06-10'),projectId:'trip'},stamp});
  assert.equal(data.months['2026-05'].expenses.length,0);assert.equal(data.months['2026-06'].expenses.length,1);
  assert.equal(data.months['2026-06'].funds[0].start,600);assert.equal(Projects.total(data,'trip'),30);
  Projects.deleteExpense(data,{id:'x',monthId:'2026-06'},stamp);assert.equal(Projects.total(data,'trip'),0);
});
test('deleting a completed project keeps its payments and balances',()=>{
  const data=ledger(),p=addProject(data);p.status='settled';
  Projects.putExpense(data,{id:'x',payload:{...expense('x',50),projectId:'trip'},stamp});const before=finance(data);
  Projects.deleteProject(data,'trip',stamp);assert.equal(data.projects.length,0);assert.equal(Projects.allExpenses(data).length,1);
  assert.deepEqual(finance(data),before);assert.equal(data.months['2026-05'].expenses[0].projectId,undefined);
});
test('unresolved legacy records prevent project deletion, and skipped records persist',()=>{
  const data=ledger(),p=addProject(data,'trip',[expense('old')]);assert.throws(()=>Projects.deleteProject(data,'trip',stamp),/pending-legacy/);
  Projects.resolveEntry(data,'trip','old',null,'dismissed',stamp);Projects.migrate(data);
  assert.equal(p.entries.length,1);assert.equal(Projects.pendingEntries(p).length,0);assert.equal(Projects.allExpenses(data).length,0);
});
test('invalid dates and missing categories fail before mutating the ledger',()=>{
  const data=ledger();addProject(data);const before=structuredClone(data);
  assert.throws(()=>Projects.putExpense(data,{id:'x',payload:expense('x',20,'2026-02-30'),stamp}),/invalid-date/);
  assert.throws(()=>Projects.putExpense(data,{id:'x',payload:{...expense('x'),category:'Missing'},stamp}),/missing-category/);
  assert.deepEqual(data,before);
});
test('concurrent migration and project deletion cannot silently produce duplicate or orphaned payments',()=>{
  const base=ledger();addProject(base,'trip',[expense('old')]);const l=structuredClone(base),r=structuredClone(base);
  Projects.postLegacyExpense(l,{projectId:'trip',entryId:'old',id:'left',payload:expense('x'),stamp});
  Projects.postLegacyExpense(r,{projectId:'trip',entryId:'old',id:'right',payload:expense('x'),stamp});
  assert.ok(Sync.merge(base,l,r).conflicts.length);
  const clean=ledger();addProject(clean);const a=structuredClone(clean),b=structuredClone(clean);
  Projects.deleteProject(a,'trip',stamp);Projects.putExpense(b,{id:'new',payload:{...expense('new'),projectId:'trip'},stamp});
  assert.ok(Sync.merge(clean,a,b).conflicts.length);
});
test('version 3 is accepted by the new client and rejected by version 2 readers',()=>{
  assert.equal(Sync.validLedger(ledger()),true);assert.equal(Sync.validLedger(ledger(),2),false);
});
if(process.env.MONEY_BACKUP_TEST_PATH) test('provided backup migrates repeatedly with no changes to balances or recorded payments',()=>{
  const data=JSON.parse(fs.readFileSync(process.env.MONEY_BACKUP_TEST_PATH,'utf8'));
  const before=structuredClone(data.months),originals=data.projects.map(p=>structuredClone(p.entries));
  Projects.migrate(data);const once=structuredClone(data);Projects.migrate(data);
  assert.deepEqual(data,once);assert.deepEqual(data.months,before);
  data.projects.forEach((p,i)=>assert.deepEqual(p.entries,originals[i]));
  const active=data.projects.filter(p=>!p.legacySettled);
  assert.equal(active.length,3);assert.equal(data.projects.filter(p=>p.legacySettled).length,5);
  assert.equal(active.reduce((n,p)=>n+Projects.pendingEntries(p).length,0),7);
  console.log('Backup verified: 7 months, 8 projects, 5 historical settlements preserved, 7 old entries awaiting explicit review.');
});
