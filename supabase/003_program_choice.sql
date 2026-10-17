-- Run once in Supabase SQL Editor (adds the funding-option choice)
-- Existing pledges (e.g., Domes) were Beyond GED pledges.
alter table public.pledges add column if not exists program text not null default 'beyond_ged';
alter table public.pledges alter column program set default 'general';
