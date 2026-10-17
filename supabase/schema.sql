-- Run once in Supabase SQL Editor
create extension if not exists "pgcrypto";

create table if not exists public.pledges (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- company
  legal_name text not null,
  dba text,
  license_type text not null,
  license_number text not null,
  street text,
  city text not null,
  county text not null,
  social_equity boolean default false,

  -- contact
  contact_name text not null,
  contact_title text,
  contact_email text not null,
  contact_phone text,

  -- commitment
  amount_per_payment numeric(12,2) not null,
  frequency text not null,          -- annual | quarterly | monthly
  term_years int not null,
  total_commitment numeric(12,2) not null,
  start_date date,
  engagements text[] default '{}',
  partner_statement text,

  -- signoff
  signer_name text not null,
  signer_title text,
  status text not null default 'pledged',  -- pledged | invoiced | deposit | paid | cancelled
  list_publicly boolean not null default true,
  program text not null default 'general',  -- general | beyond_ged | justice
  license_verified boolean not null default false
);

-- Lock the table down: only the server (service role key) can read/write.
alter table public.pledges enable row level security;
