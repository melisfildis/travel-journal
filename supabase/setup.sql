-- Create the memories table and public photo bucket.
create table if not exists public.memories (
  id text primary key,
  place text not null,
  place_tr text not null default '',
  title text not null,
  title_tr text not null default '',
  category text not null,
  memory_date date not null,
  body text not null,
  body_tr text not null default '',
  excerpt text not null default '',
  excerpt_tr text not null default '',
  route text not null default '',
  route_tr text not null default '',
  image_url text not null default '',
  gallery_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.memories
  add column if not exists gallery_urls text[] not null default '{}',
  add column if not exists place_tr text not null default '',
  add column if not exists title_tr text not null default '',
  add column if not exists body_tr text not null default '',
  add column if not exists excerpt_tr text not null default '',
  add column if not exists route_tr text not null default '';

create table if not exists public.journal_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.journal_hidden_posts (
  post_id text primary key,
  created_at timestamptz not null default now()
);

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

alter table public.memories enable row level security;
alter table public.journal_admins enable row level security;
alter table public.journal_hidden_posts enable row level security;
alter table public.journal_destinations enable row level security;
grant select on public.journal_admins to authenticated;
grant select on public.journal_hidden_posts to anon, authenticated;
grant insert, delete on public.journal_hidden_posts to authenticated;

drop policy if exists "Journal admins can view their own record" on public.journal_admins;
create policy "Journal admins can view their own record"
  on public.journal_admins for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.is_journal_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.journal_admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_journal_admin() from public;
grant execute on function public.is_journal_admin() to authenticated;

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

grant select on public.memories to anon, authenticated;
grant insert, update, delete on public.memories to authenticated;

drop policy if exists "Memories are readable by visitors" on public.memories;
create policy "Memories are readable by visitors"
  on public.memories for select
  to anon, authenticated
  using (true);

drop policy if exists "Journal admins can add memories" on public.memories;
create policy "Journal admins can add memories"
  on public.memories for insert
  to authenticated
  with check (public.is_journal_admin());

drop policy if exists "Journal admins can edit memories" on public.memories;
create policy "Journal admins can edit memories"
  on public.memories for update
  to authenticated
  using (public.is_journal_admin())
  with check (public.is_journal_admin());

drop policy if exists "Journal admins can delete memories" on public.memories;
create policy "Journal admins can delete memories"
  on public.memories for delete
  to authenticated
  using (public.is_journal_admin());

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

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('memory-photos', 'memory-photos', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Memory photos are public to read" on storage.objects;
create policy "Memory photos are public to read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'memory-photos');

drop policy if exists "Journal admins can upload memory photos" on storage.objects;
create policy "Journal admins can upload memory photos"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'memory-photos'
    and public.is_journal_admin()
  );

drop policy if exists "Journal admins can update memory photos" on storage.objects;
create policy "Journal admins can update memory photos"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'memory-photos'
    and public.is_journal_admin()
  )
  with check (
    bucket_id = 'memory-photos'
    and public.is_journal_admin()
  );

drop policy if exists "Journal admins can delete memory photos" on storage.objects;
create policy "Journal admins can delete memory photos"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'memory-photos'
    and public.is_journal_admin()
  );

-- Run this after inviting and confirming the journal owner in Authentication > Users.
insert into public.journal_admins (user_id)
select id from auth.users where email = 'melisfildis@gmail.com'
on conflict (user_id) do nothing;
