-- AttendPAC schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────────────────────

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists sites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  location text,
  created_at timestamptz not null default now()
);

create type user_role as enum ('staff', 'manager', 'org_admin', 'super_admin');

-- One row per auth.users row. Created automatically by the trigger below.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid references organizations(id) on delete set null,
  site_id uuid references sites(id) on delete set null,
  full_name text,
  email text,
  role user_role not null default 'staff',
  created_at timestamptz not null default now()
);

create type attendance_status as enum ('on_time', 'late', 'absent', 'no_show');

create table if not exists attendance_records (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  site_id uuid not null references sites(id) on delete cascade,
  staff_id uuid not null references profiles(id) on delete cascade,
  clock_in timestamptz,
  clock_out timestamptz,
  status attendance_status not null default 'on_time',
  method text, -- 'gps' | 'biometric' | 'kiosk' | 'web'
  created_at timestamptz not null default now()
);

create type leave_status as enum ('pending', 'approved', 'denied');

create table if not exists leave_requests (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  site_id uuid not null references sites(id) on delete cascade,
  staff_id uuid not null references profiles(id) on delete cascade,
  leave_type text not null, -- 'Sick' | 'Annual' | ...
  start_date date not null,
  end_date date not null,
  status leave_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organizations(id) on delete cascade,
  site_id uuid references sites(id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- Auto-create a profile row whenever a new auth user signs up
-- ─────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'staff')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- Row Level Security — every org only ever sees its own data
-- ─────────────────────────────────────────────────────────────

alter table organizations enable row level security;
alter table sites enable row level security;
alter table profiles enable row level security;
alter table attendance_records enable row level security;
alter table leave_requests enable row level security;
alter table notifications enable row level security;

-- Helper: current user's org_id and role, read from their profile row.
create or replace function public.current_org_id()
returns uuid language sql stable security definer as $$
  select org_id from public.profiles where id = auth.uid();
$$;

create or replace function public.current_role()
returns user_role language sql stable security definer as $$
  select role from public.profiles where id = auth.uid();
$$;

-- organizations: super_admin sees all; everyone else sees only their own org
create policy "org read" on organizations for select
  using (public.current_role() = 'super_admin' or id = public.current_org_id());

-- profiles: users see profiles in their own org; super_admin sees all
create policy "profiles read" on profiles for select
  using (public.current_role() = 'super_admin' or org_id = public.current_org_id());

create policy "profiles self update" on profiles for update
  using (id = auth.uid());

-- sites / attendance / leave / notifications: org-isolated for everyone
-- except super_admin, who can read across all orgs.
create policy "sites read" on sites for select
  using (public.current_role() = 'super_admin' or org_id = public.current_org_id());

create policy "attendance read" on attendance_records for select
  using (public.current_role() = 'super_admin' or org_id = public.current_org_id());

create policy "attendance write" on attendance_records for insert
  with check (org_id = public.current_org_id());

create policy "attendance update" on attendance_records for update
  using (org_id = public.current_org_id() and public.current_role() in ('manager', 'org_admin'));

create policy "leave read" on leave_requests for select
  using (public.current_role() = 'super_admin' or org_id = public.current_org_id());

create policy "leave write" on leave_requests for insert
  with check (org_id = public.current_org_id());

create policy "leave update" on leave_requests for update
  using (org_id = public.current_org_id() and public.current_role() in ('manager', 'org_admin'));

create policy "notifications read" on notifications for select
  using (public.current_role() = 'super_admin' or org_id = public.current_org_id());

-- ─────────────────────────────────────────────────────────────
-- Seed data (optional) — one demo org, one site, and reference the
-- admin/manager users you create via Supabase Auth by updating their
-- profile role + org_id + site_id after sign-up, e.g.:
--
-- update profiles set role = 'org_admin', org_id = '<org uuid>'
--   where email = 'admin@nairobifacilities.com';
-- ─────────────────────────────────────────────────────────────

insert into organizations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Nairobi Facilities Ltd')
on conflict do nothing;

insert into sites (id, org_id, name, location)
values
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 'Westlands Site', 'Westlands'),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', 'Industrial Area', 'Industrial Area'),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000001', 'Mombasa Road', 'Mombasa Road'),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000001', 'Kilimani', 'Kilimani')
on conflict do nothing;
