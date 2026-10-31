-- Add editable destination cards and up to five gallery photos per post.
-- Run this once in Supabase SQL Editor after the original setup.sql.

alter table public.memories
  add column if not exists gallery_urls text[] not null default '{}',
  add column if not exists place_tr text not null default '',
  add column if not exists title_tr text not null default '',
  add column if not exists body_tr text not null default '',
  add column if not exists excerpt_tr text not null default '',
  add column if not exists route_tr text not null default '';

create table if not exists public.journal_hidden_posts (
  post_id text primary key,
  created_at timestamptz not null default now()
);

alter table public.journal_hidden_posts enable row level security;
grant select on public.journal_hidden_posts to anon, authenticated;
grant insert, delete on public.journal_hidden_posts to authenticated;

drop policy if exists "Hidden post ids are readable by visitors" on public.journal_hidden_posts;
create policy "Hidden post ids are readable by visitors"
  on public.journal_hidden_posts for select
  to anon, authenticated
  using (true);

drop policy if exists "Journal admins can hide posts" on public.journal_hidden_posts;
create policy "Journal admins can hide posts"
  on public.journal_hidden_posts for insert
  to authenticated
  with check (public.is_journal_admin());

drop policy if exists "Journal admins can restore posts" on public.journal_hidden_posts;
create policy "Journal admins can restore posts"
  on public.journal_hidden_posts for delete
  to authenticated
  using (public.is_journal_admin());

create table if not exists public.journal_destinations (
  id text primary key,
  country text not null,
  country_tr text not null default '',
  count_label text not null default '',
  count_label_tr text not null default '',
  note text not null default '',
  note_tr text not null default '',
  image_url text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.journal_destinations
  add column if not exists country_tr text not null default '',
  add column if not exists count_label_tr text not null default '',
  add column if not exists note_tr text not null default '';

alter table public.journal_destinations enable row level security;
grant select on public.journal_destinations to anon, authenticated;
grant insert, update, delete on public.journal_destinations to authenticated;

drop policy if exists "Destinations are readable by visitors" on public.journal_destinations;
create policy "Destinations are readable by visitors"
  on public.journal_destinations for select
  to anon, authenticated
  using (true);

drop policy if exists "Journal admins can add destinations" on public.journal_destinations;
create policy "Journal admins can add destinations"
  on public.journal_destinations for insert
  to authenticated
  with check (public.is_journal_admin());

drop policy if exists "Journal admins can edit destinations" on public.journal_destinations;
create policy "Journal admins can edit destinations"
  on public.journal_destinations for update
  to authenticated
  using (public.is_journal_admin())
  with check (public.is_journal_admin());

drop policy if exists "Journal admins can delete destinations" on public.journal_destinations;
create policy "Journal admins can delete destinations"
  on public.journal_destinations for delete
  to authenticated
  using (public.is_journal_admin());
