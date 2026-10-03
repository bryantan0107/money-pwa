"""Validate the migration in a disposable LOCAL PostgreSQL database only.

MONEY_TEST_PSQL=/path/to/psql MONEY_TEST_PGHOST=/tmp/private-socket
MONEY_TEST_PGUSER=money_test python3 tests/sync-database.py
The selected local cluster must be disposable; two Supabase-style roles are
created in it. No production endpoint or credentials are used.
"""
import concurrent.futures
import json
import os
from pathlib import Path
import subprocess

host = os.environ.get('MONEY_TEST_PGHOST', '')
assert host.startswith('/tmp/'), 'Use a private /tmp Unix socket, never a production database'
command = [os.environ['MONEY_TEST_PSQL'], '-h', host, '-U', os.environ['MONEY_TEST_PGUSER'],
           '-d', 'money_sync_test', '--no-psqlrc', '--quiet', '-tA', '-v', 'ON_ERROR_STOP=1']


def sql(text, *, fail=False):
    result = subprocess.run(command + ['-c', text], capture_output=True, text=True)
    if fail:
        assert result.returncode != 0, 'Expected database rejection'
        return
    assert result.returncode == 0, result.stderr
    return result.stdout.strip()


A = '00000000-0000-4000-8000-000000000001'
B = '00000000-0000-4000-8000-000000000002'
C = '00000000-0000-4000-8000-000000000003'
payload = json.dumps({'currentMonth': '2026-05', 'months': {'2026-05': {}}, 'marker': 'initial'})
sql(f"""
create role anon nologin;
create role authenticated nologin;
create schema auth;
create table auth.users (id uuid primary key);
insert into auth.users values ('{A}'), ('{B}'), ('{C}');
create function auth.uid() returns uuid language sql stable as
$$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
grant usage on schema auth, public to authenticated, anon;
grant execute on function auth.uid() to authenticated, anon;
create table public.sync_states (user_id uuid primary key references auth.users(id),
 data_json jsonb not null, updated_at timestamptz, device_id text, app_version text);
insert into public.sync_states values ('{A}', '{payload}'::jsonb, '2026-05-01', 'legacy', 'old');
alter table public.sync_states enable row level security;
create policy legacy_permissive on public.sync_states for all using (true);
grant all on public.sync_states to authenticated, anon;
""")
migration = Path(__file__).parents[1] / 'supabase' / 'sync-v2.sql'
for _ in range(2):
    result = subprocess.run(command + ['-f', str(migration)], capture_output=True, text=True)
    assert result.returncode == 0, result.stderr
assert sql(f"select data_json = '{payload}'::jsonb and revision = 1 and device_id = 'legacy' from public.sync_states where user_id = '{A}'") == 't'
print('PASS: legacy data preserved and migration repeatable')


def as_user(user, text):
    return f"set role authenticated; set request.jwt.claim.sub = '{user}'; {text}"


def rpc(user, expected, marker, target=None):
    data = json.dumps({'currentMonth': '2026-05', 'months': {'2026-05': {}}, 'marker': marker})
    return f"select public.save_money_sync_state('{target or user}', {expected}, '{data}'::jsonb, 'test-device', 'test-version')"


first = json.loads(sql(as_user(A, rpc(A, 1, 'new'))))
assert first['applied'] and first['row']['revision'] == 2
stale = json.loads(sql(as_user(A, rpc(A, 1, 'stale'))))
assert not stale['applied'] and stale['row']['data_json']['marker'] == 'new'
print('PASS: stale revision rejected without replacing accepted data')

with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    results = list(pool.map(lambda marker: json.loads(sql(as_user(A, rpc(A, 2, marker)))), ['computer', 'phone']))
assert sum(row['applied'] for row in results) == 1
assert sql(f"select revision from public.sync_states where user_id='{A}'") == '3'
print('PASS: concurrent updates have exactly one winner')

with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    results = list(pool.map(lambda marker: json.loads(sql(as_user(C, rpc(C, 0, marker)))), ['first-computer', 'first-phone']))
assert sum(row['applied'] for row in results) == 1
assert sql(f"select revision from public.sync_states where user_id='{C}'") == '1'
print('PASS: concurrent first uploads have exactly one winner')

sql(as_user(A, rpc(A, 0, 'cross-account', target=B)), fail=True)
sql('set role anon; select * from public.sync_states', fail=True)
sql(f"set role anon; {rpc(A, 0, 'anonymous')}", fail=True)
sql(as_user(A, f"update public.sync_states set data_json = '{{}}' where user_id='{A}'"), fail=True)
sql(as_user(A, f"insert into public.sync_states (user_id,data_json) values ('{B}','{{}}')"), fail=True)
print('PASS: impersonation, anonymous access, and legacy direct writes rejected')

json.loads(sql(as_user(B, rpc(B, 0, 'private-B'))))
assert sql(as_user(A, 'select count(*) from public.sync_states')) == '1'
assert sql(as_user(A, f"select count(*) from public.sync_states where user_id='{B}'")) == '0'
print('PASS: row-level security isolates users')

sql(as_user(A, rpc(A, -1, 'invalid')), fail=True)
sql(as_user(A, f"select public.save_money_sync_state('{A}',3,'{{}}','device','version')"), fail=True)
print('PASS: invalid payloads rejected')
print('7 PostgreSQL checks passed; production writes: 0')
