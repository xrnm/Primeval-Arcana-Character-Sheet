-- ICS persistence schema. Run in the Supabase SQL editor.
-- The JSONB blob (`data`) is the source of truth; generated columns are derived from it
-- purely so listings can query without parsing every blob.
--
-- Campaigns are the account-level context characters live within, and hold the shared
-- session log + notes. A character belongs to a campaign via characters.campaign_id.

-- ---------------------------------------------------------------------------
-- campaigns
-- ---------------------------------------------------------------------------
create table if not exists public.campaigns (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  data       jsonb not null,                              -- { name, sessions, notes }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name       text generated always as (data->>'name') stored
);

create index if not exists campaigns_user_id_idx on public.campaigns (user_id);

-- ---------------------------------------------------------------------------
-- characters
-- ---------------------------------------------------------------------------
create table if not exists public.characters (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  data        jsonb not null,                             -- the Game blob
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  name        text generated always as (data->'character'->>'name') stored,
  status      text generated always as (data->>'status') stored
);

create index if not exists characters_user_id_idx on public.characters (user_id);
create index if not exists characters_campaign_id_idx on public.characters (campaign_id);

-- ---------------------------------------------------------------------------
-- version history (throttled full snapshots; not user-exposed yet)
-- ---------------------------------------------------------------------------
create table if not exists public.character_versions (
  id           uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters(id) on delete cascade,
  data         jsonb not null,
  created_at   timestamptz not null default now()
);

create index if not exists character_versions_character_id_idx
  on public.character_versions (character_id, created_at desc);

create table if not exists public.campaign_versions (
  id          uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  data        jsonb not null,
  created_at  timestamptz not null default now()
);

create index if not exists campaign_versions_campaign_id_idx
  on public.campaign_versions (campaign_id, created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at + throttled version snapshot on every update.
-- SECURITY DEFINER so the version insert bypasses RLS from within the trigger.
-- ---------------------------------------------------------------------------
create or replace function public.record_character_version()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  if old.data is distinct from new.data then
    -- Snapshot the pre-edit state at most once per 5 minutes to avoid version spam from autosave.
    if not exists (
      select 1 from public.character_versions
      where character_id = old.id
        and created_at > now() - interval '5 minutes'
    ) then
      insert into public.character_versions (character_id, data) values (old.id, old.data);
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists characters_version_trigger on public.characters;
create trigger characters_version_trigger
  before update on public.characters
  for each row execute function public.record_character_version();

create or replace function public.record_campaign_version()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  if old.data is distinct from new.data then
    if not exists (
      select 1 from public.campaign_versions
      where campaign_id = old.id
        and created_at > now() - interval '5 minutes'
    ) then
      insert into public.campaign_versions (campaign_id, data) values (old.id, old.data);
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists campaigns_version_trigger on public.campaigns;
create trigger campaigns_version_trigger
  before update on public.campaigns
  for each row execute function public.record_campaign_version();

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.campaigns enable row level security;
alter table public.characters enable row level security;
alter table public.character_versions enable row level security;
alter table public.campaign_versions enable row level security;

drop policy if exists campaigns_owner_all on public.campaigns;
create policy campaigns_owner_all on public.campaigns
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists characters_owner_all on public.characters;
create policy characters_owner_all on public.characters
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Owners may read their own version history; inserts are done by the SECURITY DEFINER triggers.
drop policy if exists character_versions_owner_select on public.character_versions;
create policy character_versions_owner_select on public.character_versions
  for select
  using (
    exists (
      select 1 from public.characters c
      where c.id = character_versions.character_id
        and c.user_id = auth.uid()
    )
  );

drop policy if exists campaign_versions_owner_select on public.campaign_versions;
create policy campaign_versions_owner_select on public.campaign_versions
  for select
  using (
    exists (
      select 1 from public.campaigns c
      where c.id = campaign_versions.campaign_id
        and c.user_id = auth.uid()
    )
  );
