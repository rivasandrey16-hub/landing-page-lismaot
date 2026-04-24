-- =====================================================
-- LISMAOT — Sales tracking (orders + order_items)
-- Paste into Supabase dashboard → SQL Editor → Run
-- =====================================================

-- 1. TABLES ---------------------------------------------
create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),
  customer_name text,
  customer_note text,
  channel       text not null default 'whatsapp',  -- whatsapp | local | otro
  total         integer not null,                   -- COP, no decimals
  occurred_at   timestamptz not null default now(),
  notes         text,
  created_at    timestamptz not null default now()
);

create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  item_name   text not null,                          -- snapshot
  quantity    integer not null default 1,
  unit_price  integer not null,                       -- snapshot, COP
  created_at  timestamptz not null default now()
);

create index if not exists orders_occurred_idx   on orders(occurred_at desc);
create index if not exists order_items_order_idx on order_items(order_id);
create index if not exists order_items_name_idx  on order_items(item_name);

-- 2. RLS ------------------------------------------------
alter table orders       enable row level security;
alter table order_items  enable row level security;

-- Authenticated only — orders are private business data
drop policy if exists "orders_auth_all" on orders;
create policy "orders_auth_all"
  on orders for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "order_items_auth_all" on order_items;
create policy "order_items_auth_all"
  on order_items for all
  to authenticated
  using (true)
  with check (true);
