-- Run this in Supabase SQL Editor

-- Lobby players table — tracks who is in each game lobby in real time
create table if not exists public.lobby_players (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references public.game_sessions(id) on delete cascade,
  player_id    text not null,
  display_name text not null,
  avatar_id    text not null default '0',
  house        text not null default 'Alpha',
  is_host      boolean not null default false,
  joined_at    timestamptz not null default now(),
  unique(session_id, player_id)
);

alter table public.lobby_players enable row level security;

drop policy if exists "lobby_select" on public.lobby_players;
drop policy if exists "lobby_insert" on public.lobby_players;
drop policy if exists "lobby_delete" on public.lobby_players;

create policy "lobby_select" on public.lobby_players for select using (true);
create policy "lobby_insert" on public.lobby_players for insert with check (true);
create policy "lobby_delete" on public.lobby_players for delete using (true);

-- Enable realtime for lobby_players
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'lobby_players'
  ) then
    alter publication supabase_realtime add table public.lobby_players;
  end if;
end $$;
