/* Exercise the real app handlers with in-memory storage and explicit dialog answers.
   These checks cover application wiring; they are not a browser UI test. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto').webcrypto;
const path = require('node:path');
const root = path.join(__dirname, '..');
const Projects = require('../projects-core.js');
function fixture() {
  return {dataVersion:2,categoryLifecycleRepairVersion:1,currentMonth:'2026-06',language:'en',projects:[],months:{
    '2026-05':{funds:[{id:'may',name:'Travel',start:500,allocation:100}],incomes:[{id:'i',name:'Income',date:'2026-05-01',amount:100}],expenses:[]},
    '2026-06':{funds:[{id:'june',name:'Travel',start:600,allocation:0}],incomes:[],expenses:[]}
  }};
}
function app(data=fixture()) {
  const storage = new Map([['monthly-money-manager-v2',JSON.stringify(data)]]), nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) nodes.set(selector,{innerHTML:'',value:'',hidden:false,dataset:{},style:{},
      addEventListener(){},querySelector:s=>node(selector+' '+s),querySelectorAll:()=>[],
      classList:{contains:()=>false,add(){},remove(){},toggle(){}},setAttribute(){},focus(){},close(){this.open=false;},showModal(){this.open=true;}});
    return nodes.get(selector);
  }
  const alerts=[], confirms=[];
  const context=vm.createContext({console,crypto,structuredClone,URL,URLSearchParams,Date,
    ProjectLedger:Projects,MoneySync:require('../sync-core.js'),
    localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)},
    document:{addEventListener(){},querySelector:node,querySelectorAll:()=>[],body:node('body'),documentElement:node('html')},
    location:{hostname:'127.0.0.1',search:'?preview=local',hash:''},navigator:{onLine:true},
    alert:message=>alerts.push(message),requestAnimationFrame(){},setTimeout(){},clearTimeout(){},clearInterval(){},
    window:{location:{hostname:'127.0.0.1'},addEventListener(){},scrollTo(){},clearTimeout(){},setTimeout(){},confirm:message=>{confirms.push(message);return context.answer!==false;}},
    FileReader:class {readAsText(file){this.result=file.text;this.onload();}}
  });
  for(const name of ['project-ui.js','sync-runtime.js','app.js']) {
    let source=fs.readFileSync(path.join(root,name),'utf8');
    if(name==='app.js') source=source.replace(/\nrender\(\);\nregisterServiceWorker\(\);\ninitCloudSync\(\);\s*$/,'');
    vm.runInContext(source,context,{filename:name});
  }
  const run=source=>vm.runInContext(source,context);
  run('render=()=>{}; showToast=()=>{}; closeEntryDialog=()=>{}; scheduleCloudSync=()=>{};');
  const state=()=>JSON.parse(run('JSON.stringify(state)'));
  return {run,state,alerts,confirms,context,storage};
}
const finance = data => Object.fromEntries(Object.entries(data.months).map(([key,m])=>[key,{
  funds:m.funds.map(({updatedAt,...f})=>f),incomes:m.incomes,
  expenses:m.expenses.map(({projectId,updatedAt,...e})=>e)
}]));
test('app creates projects without migration prompts and posts/edits payments in the dated month',()=>{
  const a=app();
  a.run(`saveProject({name:'Trip',defaultFundId:'june',startDate:'2026-08-01',endDate:'2026-08-05'});
    saveRealExpense({date:'2026-06-02',category:'Travel',note:'Flight',amount:'30',projectId:selectedProjectId});`);
  let data=a.state(),p=data.projects[0],e=data.months['2026-06'].expenses[0];
  assert.equal(Projects.pendingEntries(p).length,0);assert.equal(Projects.total(data,p.id),30);
  a.run(`editingId=${JSON.stringify(e.id)};editingMonthId='2026-06';
    saveRealExpense({date:'2026-05-10',category:'Travel',note:'Flight',amount:'40',projectId:selectedProjectId});`);
  data=a.state();assert.equal(data.months['2026-06'].expenses.length,0);
  assert.equal(data.months['2026-05'].expenses[0].id,e.id);assert.equal(data.months['2026-06'].funds[0].start,560);
  assert.equal(a.run(`isProjectVisibleInMonth(selectedProject(),'2026-05')`),true);
  assert.ok(a.confirms.some(message=>message.includes('earlier month')));assert.deepEqual(a.alerts,[]);
});
test('app linking, unlinking, completion and project deletion keep financial values',()=>{
  const a=app();a.run(`saveProject({name:'Trip',defaultFundId:'june',startDate:'2026-06-01',endDate:'2026-06-05'});
    saveRealExpense({date:'2026-06-02',category:'Travel',note:'Hotel',amount:'30',projectId:selectedProjectId});`);
  const data=a.state(),id=data.months['2026-06'].expenses[0].id,before=finance(data);
  a.run(`editingMonthId='2026-06';unlinkProjectExpense(${JSON.stringify(id)});`);
  assert.equal(Projects.total(a.state(),data.projects[0].id),0);
  a.run(`editingId=null;saveProjectExpenseLinks({'expense:${id}':JSON.stringify({id:${JSON.stringify(id)},monthId:'2026-06'})});
    completeOrReopenProject();completeOrReopenProject();completeOrReopenProject();`);
  assert.equal(a.state().projects[0].status,'settled');assert.deepEqual(finance(a.state()),before);
  a.run('deleteSelectedProject()');assert.equal(a.state().projects.length,0);
  assert.deepEqual(finance(a.state()),before);assert.deepEqual(a.alerts,[]);
});
test('cancelled history confirmations leave the entire state unchanged',()=>{
  const a=app(),before=a.state();a.context.answer=false;
  a.run(`saveRealExpense({date:'2026-05-01',category:'Travel',note:'Cancelled',amount:'20'});`);
  assert.deepEqual(a.state(),before);assert.equal(a.confirms.length,1);
});
test('app validates imports before replacement and stores a recovery copy',()=>{
  const a=app(),before=a.state();
  a.context.importText=JSON.stringify({...fixture(),dataVersion:99});
  a.run(`importData({target:{files:[{text:importText}],value:'file'}})`);
  assert.deepEqual(a.state(),before);assert.equal(a.alerts.length,1);
  a.context.importText=JSON.stringify(fixture());a.run(`importData({target:{files:[{text:importText}],value:'file'}})`);
  const recovery=JSON.parse(a.storage.get('money-sync-v2:null:recovery'));
  assert.equal(recovery.at(-1).reason,'before-backup-import');assert.deepEqual(recovery.at(-1).data,before);
});
if(process.env.MONEY_BACKUP_TEST_PATH) test('real backup app migration and legacy handlers preserve settlement payments and resolve only reviewed records',()=>{
  const original=JSON.parse(fs.readFileSync(process.env.MONEY_BACKUP_TEST_PATH,'utf8')),a=app(original);
  assert.deepEqual(a.state().months,original.months);
  const pending=a.state().projects.find(p=>Projects.pendingEntries(p).length>=2),entry=pending.entries[0];
  a.run(`selectedProjectId=${JSON.stringify(pending.id)};editingId=${JSON.stringify(entry.id)};
    completeOrReopenProject();`);
  assert.equal(a.alerts.length,1);assert.equal(a.state().projects.find(p=>p.id===pending.id).status,'active');
  a.context.draft={date:entry.date,category:entry.category,note:entry.note,amount:String(entry.amount)};
  const count=Projects.allExpenses(a.state()).length;
  a.run('saveRealExpense(draft,editingId);saveRealExpense(draft,editingId);');
  let data=a.state(),project=data.projects.find(p=>p.id===pending.id);
  assert.equal(Projects.allExpenses(data).length,count+1);
  assert.equal(Projects.pendingEntries(project).length,Projects.pendingEntries(pending).length-1);
  const posted=Projects.projectExpenses(data,pending.id)[0];
  const linkedEntry=Projects.pendingEntries(project)[0],beforeLink=finance(data);
  a.context.existingRef=JSON.stringify({id:posted.expense.id,monthId:posted.monthId});
  a.run(`editingId=${JSON.stringify(linkedEntry.id)};saveProjectExpenseLinks({expenseRef:existingRef});`);
  assert.deepEqual(finance(a.state()),beforeLink);assert.equal(Projects.total(a.state(),pending.id),entry.amount);
  a.run('state=normalizeStateLanguage(JSON.parse(JSON.stringify(state)));');
  assert.equal(Projects.allExpenses(a.state()).length,count+1);
  for(const old of original.projects.filter(p=>p.status==='settled')) {
    for(const id of old.settlementExpenseIds) assert.deepEqual(Projects.findExpense(a.state(),id).expense,Projects.findExpense(original,id).expense);
  }
});
