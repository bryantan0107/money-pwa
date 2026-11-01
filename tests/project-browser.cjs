/* Local-only UI checks. Supply MONEY_BACKUP_TEST_PATH to exercise a private backup in memory. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const baseURL = process.env.MONEY_TEST_BASE_URL || 'http://127.0.0.1:4174/?preview=local';
const backupPath = process.env.MONEY_BACKUP_TEST_PATH;
if (!backupPath) throw new Error('Set MONEY_BACKUP_TEST_PATH to a local backup; it is never sent to Supabase.');
const backupText = fs.readFileSync(backupPath, 'utf8');
const backup = JSON.parse(backupText);
const financial = data => Object.fromEntries(Object.entries(data.months).map(([key, month]) => [key, {
  funds:month.funds.map(({updatedAt,...fund})=>fund), incomes:month.incomes,
  expenses:month.expenses.map(({projectId,updatedAt,...expense})=>expense)
}]));
(async()=>{
  const browser=await chromium.launch({headless:true});
  const errors=[],outside=[];
  async function open() {
    const context=await browser.newContext({viewport:{width:390,height:844}});
    await context.route('**/*',route=>{
      if(new URL(route.request().url()).origin!==new URL(baseURL).origin){outside.push(route.request().url());return route.abort();}
      return route.continue();
    });
    await context.addInitScript(data=>localStorage.setItem('monthly-money-manager-v2',JSON.stringify(data)),backup);
    const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
    page.on('dialog',dialog=>dialog.accept());
    await page.goto(baseURL);await page.waitForSelector('#projectsList',{state:'attached'});
    assert.equal(await page.evaluate('isLocalProjectPreview()'),true);
    return {context,page};
  }
  const snapshot=page=>page.evaluate('JSON.parse(JSON.stringify(state))');
  let {context,page}=await open();
  assert.deepEqual((await snapshot(page)).months,backup.months);
  assert.equal(await page.evaluate('state.projects.reduce((n,p)=>n+pendingProjectEntries(p).length,0)'),7);
  await page.locator('[data-tab="projects"]').click();
  const completed=await page.evaluate('state.projects.find(p=>p.legacySettled).id');
  await page.locator(`.project-card[data-id="${completed}"]`).click();
  const financeBefore=financial(await snapshot(page));
  const oldTotal=await page.locator('#projectDetailTotal').innerText();
  await page.locator('#settleProjectBtn').click();await page.locator('#settleProjectBtn').click();
  assert.equal(await page.locator('#projectDetailTotal').innerText(),oldTotal);
  assert.deepEqual(financial(await snapshot(page)),financeBefore);
  assert.equal(await page.locator('#projectOriginalDetails').isVisible(),true);
  console.log('PASS: real backup import, original details, completion and reopening preserve all payments.');

  await page.locator('#backToProjectsBtn').click();await page.locator('#addProjectBtn').click();
  await page.locator('#entryForm input[name="name"]').fill('Local project check');
  await page.locator('#entryForm input[name="startDate"]').fill('2026-11-04');
  await page.locator('#entryForm input[name="endDate"]').fill('2026-11-08');
  const category=await page.evaluate('state.projects.find(p=>p.status==="active").defaultCategory');
  const fundId=await page.evaluate(name=>currentMonth().funds.find(f=>f.name===name).id,category);
  await page.locator('#entryForm select[name="defaultFundId"]').selectOption(fundId);
  await page.locator('#entryForm button[type="submit"]').click();
  const projectId=await page.evaluate('selectedProjectId');
  assert.equal(await page.locator('#projectLegacyPanel').isVisible(),false);
  await page.locator('#addProjectEntryBtn').click();
  await page.locator('#entryForm input[name="date"]').fill('2026-11-01');
  await page.locator('#entryForm input[name="note"]').fill('Local project payment check');
  await page.locator('#entryForm input[name="amount"]').fill('1.23');
  await page.locator('#entryForm button[type="submit"]').click();
  await page.waitForFunction('!els.dialog.open');
  let after=await snapshot(page);
  const added=Object.values(after.months).flatMap(m=>m.expenses).find(e=>e.note==='Local project payment check');
  assert.equal(added.projectId,projectId);assert.equal(added.amount,1.23);
  assert.equal(await page.evaluate(id=>ProjectLedger.total(state,id),projectId),1.23);
  await page.locator('#projectEntriesList tr.clickable-row').click();
  await page.locator('#entryForm input[name="date"]').fill('2026-10-03');
  await page.locator('#entryForm input[name="note"]').click();
  await page.locator('#entryForm input[name="amount"]').fill('2.34');
  await page.locator('#entryForm button[type="submit"]').click();await page.waitForFunction('!els.dialog.open');
  after=await snapshot(page);
  assert.equal(after.months['2026-11'].expenses.some(e=>e.id===added.id),false);
  assert.equal(after.months['2026-10'].expenses.find(e=>e.id===added.id).amount,2.34);
  const expected=structuredClone(backup);expected.months['2026-10'].expenses.push({...added,date:'2026-10-03',amount:2.34});
  const Projects=require('../projects-core.js');Projects.cascade(expected,'2026-10');
  after.months['2026-11'].funds.forEach(f=>assert.equal(f.start,expected.months['2026-11'].funds.find(x=>x.name===f.name).start));
  console.log('PASS: project creation, immediate posting, cross-month expense editing and balance rollovers.');

  await page.locator('#projectEntriesList tr.clickable-row').click();
  const beforeUnlink=financial(await snapshot(page));
  await page.locator('[data-action="unlink-project-expense"]').click();
  await page.waitForFunction('!els.dialog.open');
  assert.deepEqual(financial(await snapshot(page)),beforeUnlink);
  assert.equal(await page.evaluate(id=>ProjectLedger.total(state,id),projectId),0);
  await page.locator('#linkProjectExpenseBtn').click();
  await page.locator('[data-project-link-search]').fill('Local project payment check');
  await page.locator(`input[name="expense:${added.id}"]`).check();
  await page.locator('#entryForm button[type="submit"]').click();await page.waitForFunction('!els.dialog.open');
  assert.deepEqual(financial(await snapshot(page)),beforeUnlink);
  assert.equal(await page.evaluate(id=>ProjectLedger.total(state,id),projectId),2.34);
  await page.locator('#settleProjectBtn').click();await page.locator('#deleteProjectBtn').click();
  assert.deepEqual(financial(await snapshot(page)),beforeUnlink);
  assert.equal((await snapshot(page)).projects.some(p=>p.id===projectId),false);
  const kept=(await snapshot(page)).months['2026-10'].expenses.find(e=>e.id===added.id);
  assert.ok(kept);assert.equal(kept.projectId,undefined);
  console.log('PASS: linking and unlinking do not deduct again; deleting a completed project keeps expenses.');
  await context.close();

  ({context,page}=await open());await page.locator('[data-tab="projects"]').click();
  const oldProject=await page.evaluate('state.projects.find(p=>pendingProjectEntries(p).length>=2).id');
  await page.locator(`.project-card[data-id="${oldProject}"]`).click();
  const originalPending=await page.evaluate('pendingProjectEntries(selectedProject()).length');
  await page.locator('.legacy-entry-review').first().click();
  assert.equal(await page.locator('#entryDialog').getAttribute('data-mode'),'legacyProjectEntry');
  const postingAmount=Number(await page.locator('#entryForm input[name="amount"]').inputValue());
  const oldCount=await page.evaluate('ProjectLedger.allExpenses(state).length');
  await page.locator('#entryForm button[type="submit"]').click();await page.waitForFunction('!els.dialog.open');
  assert.equal(await page.evaluate('ProjectLedger.allExpenses(state).length'),oldCount+1);
  assert.equal(await page.evaluate('pendingProjectEntries(selectedProject()).length'),originalPending-1);
  assert.equal(await page.evaluate('projectTotal(selectedProject())'),postingAmount);
  const posted=await page.evaluate('projectExpenseRows(selectedProject())[0]');
  await page.reload();await page.locator('[data-tab="projects"]').click();
  await page.locator(`.project-card[data-id="${oldProject}"]`).click();
  assert.equal(await page.evaluate('ProjectLedger.allExpenses(state).length'),oldCount+1);
  assert.equal(await page.evaluate('pendingProjectEntries(selectedProject()).length'),originalPending-1);
  await page.locator('.legacy-entry-review').first().click();await page.locator('[data-action="link-legacy-expense"]').click();
  await page.locator(`input[name="expenseRef"][value*="${posted.expense.id}"]`).check();
  await page.locator('#entryForm button[type="submit"]').click();await page.waitForFunction('!els.dialog.open');
  assert.equal(await page.evaluate('ProjectLedger.allExpenses(state).length'),oldCount+1);
  assert.equal(await page.evaluate('projectTotal(selectedProject())'),postingAmount);
  console.log('PASS: explicit old-record posting, persistence after reload, and linking to an existing payment without duplication.');
  await page.locator('#backToProjectsBtn').click();
  for(const width of [320,390,768,1280]){
    await page.setViewportSize({width,height:844});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(outside,[]);assert.equal(fs.readFileSync(backupPath,'utf8'),backupText);
  console.log('PASS: responsive layout, no page errors, no external network traffic, and original backup unchanged.');
  await context.close();await browser.close();
})().catch(error=>{console.error(error);process.exitCode=1;});
