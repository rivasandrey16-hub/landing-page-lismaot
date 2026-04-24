-- =====================================================
-- LISMAOT admin panel — initial schema
-- Paste into Supabase dashboard → SQL Editor → Run
-- =====================================================

-- 1. TABLES ---------------------------------------------
create table if not exists categories (
  id          text primary key,
  label       text not null,
  note        text,
  min_price   text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists menu_items (
  id           uuid primary key default gen_random_uuid(),
  category_id  text not null references categories(id) on delete cascade,
  name         text not null,
  description  text,
  price        text not null,
  image        text not null,
  featured     boolean not null default false,
  available    boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists menu_items_category_id_idx on menu_items(category_id);
create index if not exists menu_items_sort_idx on menu_items(category_id, sort_order);

-- 2. updated_at TRIGGER --------------------------------
create or replace function touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists categories_touch on categories;
create trigger categories_touch before update on categories
  for each row execute function touch_updated_at();

drop trigger if exists menu_items_touch on menu_items;
create trigger menu_items_touch before update on menu_items
  for each row execute function touch_updated_at();

-- 3. ROW LEVEL SECURITY --------------------------------
alter table categories  enable row level security;
alter table menu_items  enable row level security;

-- Public read
drop policy if exists "categories_public_read" on categories;
create policy "categories_public_read"
  on categories for select
  using (true);

drop policy if exists "menu_items_public_read" on menu_items;
create policy "menu_items_public_read"
  on menu_items for select
  using (true);

-- Authenticated write (any logged-in user)
drop policy if exists "categories_auth_write" on categories;
create policy "categories_auth_write"
  on categories for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "menu_items_auth_write" on menu_items;
create policy "menu_items_auth_write"
  on menu_items for all
  to authenticated
  using (true)
  with check (true);

-- 4. STORAGE BUCKET ------------------------------------
-- Run this too. Bucket must be PUBLIC so public site can read images.
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "menu_images_public_read" on storage.objects;
create policy "menu_images_public_read"
  on storage.objects for select
  using (bucket_id = 'menu-images');

drop policy if exists "menu_images_auth_insert" on storage.objects;
create policy "menu_images_auth_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'menu-images');

drop policy if exists "menu_images_auth_update" on storage.objects;
create policy "menu_images_auth_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'menu-images');

drop policy if exists "menu_images_auth_delete" on storage.objects;
create policy "menu_images_auth_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'menu-images');
