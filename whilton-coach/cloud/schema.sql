-- The team's shared brain: run this once in the Supabase SQL editor of a fresh project.
-- Three tables: who may sign in, every lap driven, and the venue's official times.
-- Row level security lets any signed-in member read the whole team's rows and add their own.

create table if not exists members (
  email text primary key,
  added_at timestamptz default now()
);

create table if not exists laps (
  id bigint generated always as identity primary key,
  user_id uuid default auth.uid(),
  driver text not null,
  layout text not null,           -- intl_c, intl_n, nat_c, nat_n
  ms integer not null,            -- the lap time in milliseconds, from the phone (a few tenths out at one fix a second)
  m jsonb not null,               -- per corner: tSeg, vMin, brakeOn, thrLag
  at bigint not null,             -- the phone's clock, milliseconds since 1970
  rate real,                      -- GPS fixes a second during the lap
  created_at timestamptz default now(),
  unique (driver, at, ms)
);

create table if not exists official (
  driver text primary key,
  ms integer not null,
  laps integer,
  user_id uuid default auth.uid(),
  updated_at timestamptz default now()
);

alter table members enable row level security;
alter table laps enable row level security;
alter table official enable row level security;

-- a member is anyone whose email is in the members table
create or replace function is_member() returns boolean language sql stable as $$
  select exists (select 1 from members where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')))
$$;

create policy "members read members" on members for select to authenticated using (is_member());
create policy "members read laps" on laps for select to authenticated using (is_member());
create policy "members add laps" on laps for insert to authenticated with check (is_member());
create policy "members read official" on official for select to authenticated using (is_member());
create policy "members add official" on official for insert to authenticated with check (is_member());
create policy "members update official" on official for update to authenticated using (is_member()) with check (is_member());

-- add your team here, one row each, then they can sign in with those addresses
-- insert into members (email) values ('one@example.com'), ('two@example.com'), ('three@example.com'), ('four@example.com');
