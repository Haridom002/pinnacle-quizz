/**
 * GameStore v3 — Simple polling-based multiplayer
 * No realtime channels, no FK issues, just works
 */
import { supabase } from './supabase';
import { Quiz } from '../types';

const mem = new Map<string, {
  sessionId: string; quiz: Quiz; status: string;
}>();

function code6(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function hostGame(quiz: Quiz, hostId: string) {
  const code = code6();
  const fallbackId = 'local-' + Date.now();
  mem.set(code, { sessionId: fallbackId, quiz, status: 'waiting' });

  try {
    const { data, error } = await supabase.from('game_sessions').insert({
      quiz_id:   quiz.id,
      host_id:   hostId,
      game_code: code,
      quiz_data: quiz,
      status:    'waiting',
    }).select('id').single();

    if (!error && data) {
      mem.set(code, { sessionId: data.id, quiz, status: 'waiting' });
      return { code, sessionId: data.id };
    }
    console.error('hostGame error:', error?.message);
  } catch (e) {
    console.error('hostGame exception:', e);
  }
  return { code, sessionId: fallbackId };
}

export async function findGame(code: string) {
  const t = code.trim();

  // Same device — instant
  const local = mem.get(t);
  if (local && local.status !== 'completed') {
    return { sessionId: local.sessionId, quiz: local.quiz };
  }

  // Different device — query Supabase
  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .select('id, status, quiz_data')
      .eq('game_code', t)
      .neq('status', 'completed')
      .maybeSingle();

    if (error) { console.error('findGame error:', error.message); return null; }
    if (!data)  { console.error('findGame: no session for code', t); return null; }

    const quiz = (data.quiz_data as Quiz) ?? null;
    return { sessionId: data.id, quiz };
  } catch (e) {
    console.error('findGame exception:', e);
    return null;
  }
}

export async function joinLobby(sessionId: string, p: {
  playerId: string; displayName: string; avatarId: string;
  house: string; isHost: boolean;
}) {
  try {
    const { error } = await supabase.from('lobby_players').upsert({
      session_id:   sessionId,
      player_id:    p.playerId,
      display_name: p.displayName,
      avatar_id:    p.avatarId,
      house:        p.house,
      is_host:      p.isHost,
      joined_at:    new Date().toISOString(),
    }, { onConflict: 'session_id,player_id' });
    if (error) console.error('joinLobby error:', error.message);
  } catch (e) {
    console.error('joinLobby exception:', e);
  }
}

export async function getLobbyPlayers(sessionId: string) {
  try {
    const { data } = await supabase
      .from('lobby_players')
      .select('*')
      .eq('session_id', sessionId)
      .order('joined_at', { ascending: true });
    return data ?? [];
  } catch { return []; }
}

export async function startGame(code: string, sessionId: string) {
  const local = mem.get(code);
  if (local) mem.set(code, { ...local, status: 'active' });
  try {
    await supabase.from('game_sessions')
      .update({ status: 'active', started_at: new Date().toISOString() })
      .eq('id', sessionId);
  } catch (e) {
    console.error('startGame error:', e);
  }
}

export async function getSessionStatus(sessionId: string): Promise<string> {
  try {
    const { data } = await supabase
      .from('game_sessions')
      .select('status')
      .eq('id', sessionId)
      .single();
    return data?.status ?? 'waiting';
  } catch { return 'waiting'; }
}
