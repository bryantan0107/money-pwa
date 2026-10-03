"""Exercise the real PWA + vendored SDK in two isolated browser contexts.

Serve the checkout on port 8000, then run: python3 tests/sync-browser.py
All Supabase requests are intercepted by an in-memory fixture. No real account
credentials or production data are used. Chromium and Python Playwright needed.
"""
import asyncio
import base64
import copy
import json
from urllib.parse import urlparse, parse_qs
from playwright.async_api import async_playwright

A = '00000000-0000-4000-8000-000000000001'
B = '00000000-0000-4000-8000-000000000002'
AUTH_KEY = 'sb-sihurbihvsznvzdalced-auth-token'


def session(user_id=A):
    def encoded(data):
        return base64.urlsafe_b64encode(json.dumps(data).encode()).decode().rstrip('=')
    token = '.'.join([encoded({'alg': 'HS256', 'typ': 'JWT'}),
                      encoded({'sub': user_id, 'aud': 'authenticated', 'role': 'authenticated', 'iat': 1700000000, 'exp': 4102444800}),
                      base64.urlsafe_b64encode(b'fixture-signature-not-a-real-key!').decode().rstrip('=')])
    return {'access_token': token, 'refresh_token': 'fixture-refresh', 'token_type': 'bearer',
            'expires_at': 4102444800, 'expires_in': 3600,
            'user': {'id': user_id, 'email': f'{user_id[-1]}@example.invalid', 'aud': 'authenticated'}}


class Cloud:
    def __init__(self):
        self.rows = {}
        self.writes = 0
        self.rpc_calls = 0
        self.missing_schema = False
        self.fail_upload = False
        self.gate = None
        self.submitted = asyncio.Event()

    async def route(self, route):
        req = route.request
        path = urlparse(req.url).path
        token = req.headers.get('authorization', '').replace('Bearer ', '')
        try:
            claims = json.loads(base64.urlsafe_b64decode(token.split('.')[1] + '==='))
            user_id = claims['sub']
        except (ValueError, IndexError, KeyError):
            user_id = None
        if path.endswith('/auth/v1/user'):
            return await route.fulfill(json=session(user_id)['user'])
        if path.endswith('/auth/v1/logout'):
            return await route.fulfill(status=204)
        if path.endswith('/rest/v1/sync_states'):
            if self.missing_schema:
                return await route.fulfill(status=400, json={'code': '42703', 'message': 'revision does not exist'})
            requested = parse_qs(urlparse(req.url).query)['user_id'][0].removeprefix('eq.')
            assert requested == user_id, 'Account filter must match authenticated identity'
            row = self.rows.get(user_id)
            return await route.fulfill(json=[copy.deepcopy(row)] if row else [])
        if path.endswith('/rest/v1/rpc/save_money_sync_state'):
            self.rpc_calls += 1
            payload = req.post_data_json
            assert payload['p_user_id'] == user_id, 'Never upload another account ledger'
            self.submitted.set()
            if self.gate is not None:
                await self.gate.wait()
            if self.fail_upload:
                return await route.fulfill(status=503, json={'message': 'fixture temporary outage'})
            previous = self.rows.get(user_id)
            revision = previous['revision'] if previous else 0
            if revision != payload['p_expected_revision']:
                return await route.fulfill(json={'applied': False, 'row': copy.deepcopy(previous)})
            row = {'user_id': user_id, 'data_json': copy.deepcopy(payload['p_data_json']), 'revision': revision + 1,
                   'updated_at': '2026-10-03T10:00:00Z', 'device_id': payload['p_device_id'], 'app_version': payload['p_app_version']}
            self.rows[user_id] = row
            self.writes += 1
            return await route.fulfill(json={'applied': True, 'row': copy.deepcopy(row)})
        raise AssertionError(f'Unexpected fixture request: {req.method} {path}')


async def settled(page, phase='synced'):
    await page.wait_for_function('(phase) => syncPhase === phase && !syncInFlight', arg=phase, timeout=15000)


async def edit(page, name, amount=10):
    await page.evaluate('''({name,amount}) => {
      const stamp = nowStamp();
      currentMonth().expenses.push({id:name,date:'2026-05-01',category:'Groceries',note:name,amount,createdAt:stamp,updatedAt:stamp});
      currentMonth().funds[0].updatedAt = nowStamp();
      markFinancialDirty(); saveState(); render();
    }''', {'name': name, 'amount': amount})


async def main():
    cloud = Cloud()
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])

        async def device(saved_session=None, saved_storage=None):
            context = await browser.new_context(viewport={'width': 390, 'height': 844})
            await context.route('https://*.supabase.co/**', cloud.route)
            if saved_session:
                await context.add_init_script('if (!localStorage.getItem(' + json.dumps(AUTH_KEY) + ')) localStorage.setItem(' + json.dumps(AUTH_KEY) + ', ' + json.dumps(json.dumps(saved_session)) + ')')
            if saved_storage:
                await context.add_init_script('Object.entries(' + json.dumps(saved_storage) + ').forEach(([key,value])=>{if(!localStorage.getItem(key))localStorage.setItem(key,value)})')
            page = await context.new_page()
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.on('dialog', lambda dialog: asyncio.create_task(dialog.accept()))
            await page.goto('http://127.0.0.1:8000/?nosw=1', wait_until='networkidle')
            return context, page

        # Create a normalized fictional ledger with stable IDs, through the
        # application's actual legacy normalizer.
        seed_context, seed_page = await device()
        seed = await seed_page.evaluate('''normalizeStateLanguage({dataVersion:2,currentMonth:'2026-05',
          months:{'2026-05':{label:'May 2026',funds:[{id:'food',name:'Groceries',start:0,allocation:100}],
          incomes:[{id:'salary',name:'Salary',amount:100}],expenses:[],categoryEvents:[],debts:[]}},projects:[],restockItems:[]})''')
        await seed_context.close()
        cloud.rows[A] = {'user_id': A, 'data_json': seed, 'revision': 1, 'updated_at': '2026-05-01T00:00:00Z', 'device_id': 'seed', 'app_version': 'old'}
        computer_context, computer = await device(session())
        phone_context, phone = await device(session())
        await settled(computer)
        await settled(phone)
        assert cloud.writes == 0
        print('PASS: new devices download the existing ledger without uploading demo data', flush=True)

        await phone_context.set_offline(True)
        await edit(computer, 'computer-new')
        await settled(computer)
        assert cloud.rows[A]['revision'] == 2, {'revision': cloud.rows[A]['revision'], 'writes': cloud.writes, 'local': await computer.evaluate('({phase:syncPhase,dirty:syncIsDirty(),count:currentMonth().expenses.length,baseCount:syncBaseline.base.months["2026-05"].expenses.length})')}
        await edit(phone, 'phone-offline')
        assert await phone.evaluate('syncIsDirty()')
        assert cloud.rows[A]['revision'] == 2
        await phone_context.set_offline(False)
        await settled(phone)
        assert {e['id'] for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses']} == {'computer-new', 'phone-offline'}
        await computer.evaluate('runCloudSync({manual:true})')
        await settled(computer)
        print('PASS: offline edits merge with the other device on reconnection', flush=True)

        # Two automatic uploads fetch the same revision. The loser must re-read
        # and merge instead of forcefully retrying its old snapshot.
        cloud.gate = asyncio.Event()
        start_calls = cloud.rpc_calls
        await edit(computer, 'concurrent-computer')
        await edit(phone, 'concurrent-phone')
        async def both_submitted():
            while cloud.rpc_calls < start_calls + 2:
                await asyncio.sleep(0.05)
        await asyncio.wait_for(both_submitted(), 10)
        cloud.gate.set()
        cloud.gate = None
        await settled(computer)
        await settled(phone)
        assert {'concurrent-computer','concurrent-phone'} <= {e['id'] for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses']}
        await computer.evaluate('runCloudSync({manual:true})')
        await phone.evaluate('runCloudSync({manual:true})')
        print('PASS: a losing automatic CAS retries by merging both devices additions', flush=True)

        # Restore persisted pending state into a new browser process, as when
        # closing an offline home-screen app and reopening it later.
        await phone_context.set_offline(True)
        await edit(phone, 'pending-after-reopen')
        saved = await phone.evaluate('''() => Object.fromEntries([
          STORAGE_KEY,SYNC_OWNER_KEY,syncStorageKey('ledger'),syncStorageKey('baseline')
        ].map(key=>[key,localStorage.getItem(key)]).filter(([,value])=>value!==null))''')
        await phone_context.close()
        phone_context, phone = await device(session(), saved)
        await settled(phone)
        assert any(e['id']=='pending-after-reopen' for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses'])
        await computer.evaluate('runCloudSync({manual:true})')
        print('PASS: pending edits and their merge base survive closing and reopening the app', flush=True)

        await computer_context.set_offline(True)
        await edit(phone, 'remote-while-editing')
        await settled(phone)
        await edit(computer, 'local-before-editor')
        cloud.gate = asyncio.Event()
        cloud.submitted.clear()
        await computer_context.set_offline(False)
        await asyncio.wait_for(cloud.submitted.wait(), 10)
        await computer.evaluate('openDialog("income")')
        await computer.locator('#entryForm input[name="name"]').fill('Unsaved draft')
        cloud.gate.set()
        cloud.gate = None
        await computer.wait_for_function('!syncInFlight')
        assert await computer.locator('#entryForm input[name="name"]').input_value() == 'Unsaved draft'
        assert await computer.evaluate('els.dialog.open')
        assert not await computer.evaluate("currentMonth().expenses.some(e=>e.id==='remote-while-editing')")
        await computer.evaluate('closeEntryDialog()')
        await settled(computer)
        assert await computer.evaluate("currentMonth().expenses.some(e=>e.id==='remote-while-editing')")
        print('PASS: cloud changes are deferred while a form is open, without erasing its draft', flush=True)

        # Save divergent amounts on both offline devices, then synchronize each.
        await computer_context.set_offline(True)
        await phone_context.set_offline(True)
        change = "amount => {currentMonth().expenses.find(e=>e.id==='computer-new').amount=amount;saveState();render()}"
        await computer.evaluate(change, 20)
        await phone.evaluate(change, 30)
        await computer_context.set_offline(False)
        await settled(computer)
        revision = cloud.rows[A]['revision']
        await phone_context.set_offline(False)
        await settled(phone, 'conflict')
        assert cloud.rows[A]['revision'] == revision
        assert await phone.evaluate("currentMonth().expenses.find(e=>e.id==='computer-new').amount") == 30
        assert next(e['amount'] for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses'] if e['id']=='computer-new') == 20
        print('PASS: same-record conflicts preserve local and cloud copies without writing', flush=True)

        await phone.evaluate('downloadCloudSyncState()')
        await settled(phone)
        assert await phone.evaluate("readSyncStorage('recovery').at(-1).data.months['2026-05'].expenses.find(e=>e.id==='computer-new').amount") == 30
        print('PASS: explicit cloud choice saves the replaced local ledger for recovery', flush=True)

        cloud.submitted.clear()
        cloud.gate = asyncio.Event()
        await edit(computer, 'first-upload')
        await asyncio.wait_for(cloud.submitted.wait(), 10)
        await edit(computer, 'during-upload')
        cloud.gate.set()
        cloud.gate = None
        await settled(computer)
        ids = {e['id'] for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses']}
        assert {'first-upload', 'during-upload'} <= ids
        print('PASS: edits made during an upload remain pending and are uploaded next', flush=True)

        cloud.fail_upload = True
        await edit(computer, 'failed-upload')
        await settled(computer, 'error')
        assert await computer.evaluate('syncIsDirty()')
        assert 'failed-upload' not in {e['id'] for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses']}
        cloud.fail_upload = False
        await computer.evaluate('runCloudSync({manual:true})')
        await settled(computer)
        print('PASS: failed uploads do not mark pending edits as synchronized; retry succeeds', flush=True)

        # The database can change after the fetch but before an explicit upload.
        cloud.submitted.clear()
        cloud.gate = asyncio.Event()
        request = asyncio.create_task(phone.evaluate('uploadDeviceSyncState()'))
        await asyncio.wait_for(cloud.submitted.wait(), 10)
        cloud.rows[A]['revision'] += 1
        cloud.rows[A]['data_json']['months']['2026-05']['expenses'].append({'id':'race-winner','date':'2026-05-01','category':'Groceries','note':'winner','amount':1})
        cloud.gate.set()
        cloud.gate = None
        await request
        await settled(phone, 'conflict')
        assert any(e['id']=='race-winner' for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses'])
        print('PASS: stale explicit upload cannot overwrite a concurrent winning version', flush=True)

        # Switch the SDK session while an old-account upload is in flight.
        await computer.evaluate('runCloudSync({manual:true})')
        await settled(computer)
        other_seed = copy.deepcopy(seed)
        other_seed['months']['2026-05']['expenses'] = [{'id':'B-private','date':'2026-05-01','category':'Groceries','note':'B only','amount':2,'createdAt':'2026-05-01T00:00:00Z','updatedAt':'2026-05-01T00:00:00Z'}]
        cloud.rows[B] = {'user_id':B,'data_json':other_seed,'revision':1,'updated_at':'2026-05-01T00:00:00Z','device_id':'B','app_version':'old'}
        cloud.submitted.clear()
        cloud.gate = asyncio.Event()
        await edit(computer, 'A-before-switch')
        await asyncio.wait_for(cloud.submitted.wait(), 10)
        switched = await computer.evaluate('async value => {const r = await supabaseClient.auth.setSession(value); return {user:r.data?.session?.user?.id,error:r.error?.message}}', session(B))
        assert switched.get('user') == B, switched
        await computer.wait_for_function('(id) => syncUserId === id', arg=B)
        cloud.gate.set()
        cloud.gate = None
        await settled(computer)
        ids = await computer.evaluate('currentMonth().expenses.map(e=>e.id)')
        assert ids == ['B-private']
        assert cloud.rows[B]['revision'] == 1
        assert await computer.evaluate('(id) => JSON.parse(localStorage.getItem(syncStorageKey("ledger",id))).months["2026-05"].expenses.some(e=>e.id==="A-before-switch")', A)
        print('PASS: account switches isolate ledgers and ignore old-account responses', flush=True)

        await computer.evaluate('signOutOfCloudSync()')
        assert await computer.evaluate('currentMonth().expenses.length') == 0
        await computer.evaluate('value => supabaseClient.auth.setSession(value)', session(B))
        await computer.wait_for_function('(id) => syncUserId === id', arg=B)
        await settled(computer)
        assert await computer.evaluate('currentMonth().expenses.map(e=>e.id)') == ['B-private']
        assert cloud.rows[B]['revision'] == 1
        print('PASS: signing back into an account restores its ledger instead of uploading an empty copy', flush=True)

        cloud.missing_schema = True
        await computer.evaluate('runCloudSync({manual:true})')
        await settled(computer, 'setup-required')
        calls = cloud.rpc_calls
        await edit(computer, 'B-local-without-migration')
        await asyncio.sleep(1.2)
        assert cloud.rpc_calls == calls
        assert await computer.evaluate('syncIsDirty()')
        print('PASS: missing migration preserves local edits and blocks all cloud writes', flush=True)
        cloud.missing_schema = False

        # A legacy device has no v2 baseline: never guess which existing copy is
        # authoritative, even if its local timestamp appears more recent.
        user_c = '00000000-0000-4000-8000-000000000003'
        legacy = copy.deepcopy(seed)
        legacy['months']['2026-05']['expenses'] = [{'id':'legacy-local','date':'2026-05-01','category':'Groceries','note':'legacy','amount':5,'createdAt':'2026-05-01T00:00:00Z','updatedAt':'2026-05-01T00:00:00Z'}]
        cloud.rows[user_c] = {'user_id':user_c,'data_json':copy.deepcopy(seed),'revision':1,'updated_at':'2026-05-01T00:00:00Z','device_id':'legacy-cloud','app_version':'old'}
        legacy_context, legacy_page = await device(session(user_c), {'monthly-money-manager-v2': json.dumps(legacy)})
        await settled(legacy_page, 'linking')
        assert cloud.rows[user_c]['revision'] == 1
        await legacy_page.evaluate('uploadDeviceSyncState()')
        await settled(legacy_page)
        assert cloud.rows[user_c]['revision'] == 2
        assert len(await legacy_page.evaluate("readSyncStorage('recovery').at(-1).data.months['2026-05'].expenses")) == 0
        print('PASS: legacy ledger linking requires an explicit choice and preserves the previous cloud copy', flush=True)

        # Same-browser tabs share storage, but an open form can retain an older
        # in-memory ledger. Merge against that tab's last saved local snapshot.
        shared_context, tab_one = await device(session())
        await settled(tab_one)
        tab_two = await shared_context.new_page()
        tab_two.on('pageerror', lambda error: errors.append(str(error)))
        await tab_two.goto('http://127.0.0.1:8000/?nosw=1', wait_until='networkidle')
        await settled(tab_two)
        await shared_context.set_offline(True)
        await tab_two.evaluate('openDialog("income")')
        await edit(tab_one, 'tab-one-record')
        await edit(tab_two, 'tab-two-record')
        await tab_two.evaluate('closeEntryDialog()')
        await shared_context.set_offline(False)
        await settled(tab_one)
        await settled(tab_two)
        assert {'tab-one-record','tab-two-record'} <= {e['id'] for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses']}
        print('PASS: independent edits from stale tabs merge without losing either record', flush=True)

        await shared_context.set_offline(True)
        await tab_two.evaluate('openDialog("income")')
        await tab_one.evaluate(change, 70)
        await tab_two.evaluate(change, 80)
        await tab_two.evaluate('closeEntryDialog()')
        await shared_context.set_offline(False)
        await settled(tab_one, 'conflict')
        await settled(tab_two, 'conflict')
        assert await tab_two.evaluate("readSyncStorage('recovery').at(-1).data.months['2026-05'].expenses.find(e=>e.id==='computer-new').amount") == 70
        assert next(e['amount'] for e in cloud.rows[A]['data_json']['months']['2026-05']['expenses'] if e['id']=='computer-new') == 20
        print('PASS: conflicting tab edits pause synchronization and keep the displaced copy recoverable', flush=True)
        assert errors == [], errors
        await browser.close()
    print('16 browser checks passed; production reads/writes: 0', flush=True)


asyncio.run(main())
