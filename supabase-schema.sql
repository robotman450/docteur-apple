-- ============================================================
-- DOCTEUR APPLE — Schéma Supabase (version corrigée)
-- À copier ENTIÈREMENT et coller dans Supabase → SQL Editor → New query → Run
-- Ce script peut être exécuté plusieurs fois sans problème : il repart
-- toujours de zéro proprement (il supprime puis recrée tout).
-- ============================================================

-- Outil nécessaire pour générer des identifiants uniques
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 0. NETTOYAGE — on supprime toute ancienne version des tables
--    pour repartir sur une base propre (évite les erreurs de colonnes)
-- ------------------------------------------------------------
drop table if exists orders cascade;
drop table if exists repair_requests cascade;
drop table if exists products cascade;

-- ------------------------------------------------------------
-- 1. TABLE PRODUITS
-- ------------------------------------------------------------
create table products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null,        -- iPhone, Samsung, Xiaomi, Tecno, Infinix, Accessoires
  price       numeric not null,     -- en FCFA
  description text,
  image_url   text,
  in_stock    boolean default true,
  created_at  timestamptz default now()
);

-- ------------------------------------------------------------
-- 2. TABLE DEMANDES DE DEVIS (réparation)
-- ------------------------------------------------------------
create table repair_requests (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  model       text not null,
  issue       text not null,
  description text,
  photo_url   text,
  status      text default 'nouveau',  -- nouveau, en_cours, traité
  created_at  timestamptz default now()
);

-- ------------------------------------------------------------
-- 3. TABLE COMMANDES
-- ------------------------------------------------------------
create table orders (
  id             uuid primary key default gen_random_uuid(),
  customer_name  text,
  customer_phone text,
  items          jsonb not null,      -- [{product_id, name, price, qty}, ...]
  total          numeric not null,
  status         text default 'en_attente', -- en_attente, confirmée, livrée, annulée
  created_at     timestamptz default now()
);

-- ------------------------------------------------------------
-- 4. SÉCURITÉ (Row Level Security)
-- ------------------------------------------------------------
alter table products         enable row level security;
alter table repair_requests  enable row level security;
alter table orders           enable row level security;

create policy "Lecture publique des produits"
  on products for select
  using (true);

create policy "Création publique de demandes de devis"
  on repair_requests for insert
  with check (true);

create policy "Création publique de commandes"
  on orders for insert
  with check (true);

create policy "Admin gère les produits"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin lit les devis"
  on repair_requests for select
  using (auth.role() = 'authenticated');

create policy "Admin modifie les devis"
  on repair_requests for update
  using (auth.role() = 'authenticated');

create policy "Admin lit les commandes"
  on orders for select
  using (auth.role() = 'authenticated');

create policy "Admin modifie les commandes"
  on orders for update
  using (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- 5. STOCKAGE (photos de produits + photos de réparation)
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('repair-photos', 'repair-photos', true)
on conflict (id) do nothing;

drop policy if exists "Lecture publique photos produits" on storage.objects;
drop policy if exists "Upload public photos réparation" on storage.objects;
drop policy if exists "Lecture publique photos réparation" on storage.objects;

create policy "Lecture publique photos produits"
  on storage.objects for select
  using (bucket_id = 'products');

create policy "Upload public photos réparation"
  on storage.objects for insert
  with check (bucket_id = 'repair-photos');

create policy "Lecture publique photos réparation"
  on storage.objects for select
  using (bucket_id = 'repair-photos');

-- ------------------------------------------------------------
-- 6. DONNÉES DE DÉPART (mêmes produits que la maquette)
-- ------------------------------------------------------------
insert into products (name, category, price, description, in_stock) values
  ('iPhone 15 Pro', 'iPhone', 850000, '256 Go · Titane naturel · Comme neuf', true),
  ('iPhone 14', 'iPhone', 550000, '128 Go · Toutes couleurs disponibles', true),
  ('iPhone 13', 'iPhone', 420000, '128 Go · Batterie certifiée 90%+', true),
  ('Samsung Galaxy S24', 'Samsung', 620000, '256 Go · Écran Dynamic AMOLED', true),
  ('Samsung Galaxy A55', 'Samsung', 280000, '128 Go · Rapport qualité-prix', true),
  ('Xiaomi Redmi Note 13', 'Xiaomi', 140000, '128 Go · Charge rapide 33W', true),
  ('Tecno Camon 20', 'Tecno', 110000, '256 Go · Excellent appareil photo', true),
  ('Infinix Note 30', 'Infinix', 95000, '128 Go · Grand écran 6.7"', false),
  ('AirPods Pro 2', 'Accessoires', 145000, 'Réduction de bruit active', true),
  ('Chargeur rapide 20W', 'Accessoires', 8000, 'Compatible iPhone & Android', true),
  ('Câble USB-C renforcé', 'Accessoires', 3500, '1m · Tressé anti-rupture', true),
  ('Power Bank 10000mAh', 'Accessoires', 15000, 'Charge rapide double port', true);

-- ============================================================
-- FIN — si vous voyez "Success. No rows returned", tout s'est bien passé.
-- Allez ensuite dans Table Editor (menu de gauche) pour voir vos 12 produits.
-- ============================================================
