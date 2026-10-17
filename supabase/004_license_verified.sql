-- Run once in Supabase SQL Editor: records whether a pledge's license was verified against OCM's public data
alter table public.pledges add column if not exists license_verified boolean not null default false;
update public.pledges set license_verified = true where license_number = 'OCM-RETL-24-000066';
