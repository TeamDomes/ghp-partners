-- Run once in Supabase SQL Editor (adds opt-in for the public Community Partners list)
alter table public.pledges add column if not exists list_publicly boolean not null default true;
