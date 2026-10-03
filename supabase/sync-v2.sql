-- Run in the Supabase SQL Editor before deploying the new PWA.
-- This transaction preserves existing rows. It intentionally disables the
-- old clients' unconditional upserts; every write must use the atomic RPC.
begin;

create table if not exists public.sync_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data_json jsonb not null,
  updated_at timestamptz not null default clock_timestamp(),
  device_id text,
  app_version text
);
alter table public.sync_states add column if not exists revision bigint not null default 1;
-- Fail and roll back on duplicate users rather than deleting any ledger.
create unique index if not exists sync_states_user_id_sync_unique on public.sync_states (user_id);
alter table public.sync_states enable row level security;

-- Replace unknown legacy policies so an old permissive SELECT policy cannot
-- expose another account's data. The new policy allows only the owner's reads.
do $$
declare policy record;
begin
  for policy in select policyname from pg_catalog.pg_policies
    where schemaname = 'public' and tablename = 'sync_states'
  loop
    execute format('drop policy %I on public.sync_states', policy.policyname);
  end loop;
end $$;
create policy sync_states_owner_read on public.sync_states for select to authenticated
  using ((select auth.uid()) = user_id);
revoke all on public.sync_states from public, anon, authenticated;
grant select on public.sync_states to authenticated;

create or replace function public.sync_states_assign_revision()
returns trigger language plpgsql set search_path = '' as $$
begin
  if TG_OP = 'INSERT' then NEW.revision := 1;
  else NEW.revision := OLD.revision + 1;
  end if;
  NEW.updated_at := clock_timestamp();
  return NEW;
end $$;
drop trigger if exists sync_states_revision on public.sync_states;
create trigger sync_states_revision before insert or update on public.sync_states
  for each row execute function public.sync_states_assign_revision();
revoke all on function public.sync_states_assign_revision() from public, anon, authenticated;

create or replace function public.save_money_sync_state(
  p_user_id uuid,
  p_expected_revision bigint,
  p_data_json jsonb,
  p_device_id text,
  p_app_version text
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  caller uuid := auth.uid();
  current_row public.sync_states%rowtype;
begin
  if caller is null or caller <> p_user_id then
    raise exception 'Account mismatch' using errcode = '42501';
  end if;
  if p_expected_revision is null or p_expected_revision < 0
    or p_data_json is null or jsonb_typeof(p_data_json) <> 'object'
    or jsonb_typeof(p_data_json->'months') is distinct from 'object'
    or jsonb_typeof(p_data_json->'currentMonth') is distinct from 'string' then
    raise exception 'Invalid sync payload' using errcode = '22023';
  end if;
  select * into current_row from public.sync_states where user_id = caller for update;
  if not found then
    if p_expected_revision <> 0 then
      return jsonb_build_object('applied', false, 'row', null);
    end if;
    insert into public.sync_states (user_id, data_json, device_id, app_version)
      values (caller, p_data_json, p_device_id, p_app_version)
      on conflict (user_id) do nothing returning * into current_row;
    if found then
      return jsonb_build_object('applied', true, 'row', to_jsonb(current_row));
    end if;
    -- A concurrent first upload won. Return it without overwriting it.
    select * into current_row from public.sync_states where user_id = caller for update;
    return jsonb_build_object('applied', false, 'row', to_jsonb(current_row));
  end if;
  if current_row.revision <> p_expected_revision then
    return jsonb_build_object('applied', false, 'row', to_jsonb(current_row));
  end if;
  update public.sync_states set data_json = p_data_json, device_id = p_device_id,
    app_version = p_app_version where user_id = caller returning * into current_row;
  return jsonb_build_object('applied', true, 'row', to_jsonb(current_row));
end $$;
revoke all on function public.save_money_sync_state(uuid, bigint, jsonb, text, text) from public, anon;
grant execute on function public.save_money_sync_state(uuid, bigint, jsonb, text, text) to authenticated;
notify pgrst, 'reload schema';
commit;
