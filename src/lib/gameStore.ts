/**
 * GameStore — Reliable cross-device game code system
 * Stores full quiz data in game_sessions.quiz_data (jsonb)
 * so any device can load the quiz by code alone
 */
import { supabase } from './supabase';
import { Quiz } from '../types';

// In-memory fallback (same tab)
const memStore = new Map<string, { sessionId:string; quiz:Quiz; status:string }>();

function makeCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Host creates a game session — stores quiz data so any device can join */
export async function hostGame(
  quiz: Quiz, hostId: string
): Promise<{ code: string; sessionId: string }> {
  const code = makeCode();
  const tempId = 'mem-' + Date.now();

  // Always save to memory first
  memStore.set(code, { sessionId: tempId, quiz, status: 'waiting' });

  // Save to Supabase with full quiz embedded in quiz_data
  const { data, error } = await supabase
    .from('game_sessions')
    .insert({
      quiz_id:   quiz.id,
      host_id:   hostId,
      game_code: code,
      quiz_data: JSON.parse(JSON.stringify(quiz)), // store full quiz
      status:    'waiting',
    })
    .select('id')
    .single();

  if (error) {
    console.error('hostGame Supabase error:', error.message);
    // Return memory-only session — same-device join will still work
    return { code, sessionId: tempId };
  }

  const sessionId = data.id;
  memStore.set(code, { sessionId, quiz, status: 'waiting' });
  return { code, sessionId };
}

/** Find a game by code — checks memory then Supabase */
export async function findGame(
  code: string
): Promise<{ sessionId: string; quiz: Quiz | null } | null> {
  const trimmed = code.trim();

  // Check memory store (same device as host)
  const mem = memStore.get(trimmed);
  if (mem && mem.status !== 'completed') {
    return { sessionId: mem.sessionId, quiz: mem.quiz };
  }

  // Query Supabase — loads quiz from quiz_data column
  const { data, error } = await supabase
    .from('game_sessions')
    .select('id, status, quiz_data, quiz_id')
    .eq('game_code', trimmed)
    .neq('status', 'completed')
    .single();

  if (error || !data) {
    console.error('findGame error:', error?.message);
    return null;
  }

  // quiz_data has the full quiz embedded
  let quiz: Quiz | null = null;
  if (data.quiz_data) {
    quiz = data.quiz_data as Quiz;
  } else {
    // Fallback: try to load quiz from quizzes table
    const { data: qData } = await supabase
      .from('quizzes')
      .select('*, questions(*, answers(*))')
      .eq('id', data.quiz_id)
      .single();
    if (qData) quiz = convertDbQuiz(qData);
  }

  return { sessionId: data.id, quiz };
}

/** Start game — updates Supabase so all devices get notified via realtime */
export async function startGame(code: string, sessionId: string): Promise<void> {
  const mem = memStore.get(code);
  if (mem) memStore.set(code, { ...mem, status: 'active' });

  await supabase
    .from('game_sessions')
    .update({ status: 'active', started_at: new Date().toISOString() })
    .eq('id', sessionId);
}

/** Add player to lobby */
export async function joinLobby(sessionId: string, player: {
  playerId: string; displayName: string; avatarId: string;
  house: string; isHost: boolean;
}): Promise<void> {
  const { error } = await supabase.from('lobby_players').upsert({
    session_id:   sessionId,
    player_id:    player.playerId,
    display_name: player.displayName,
    avatar_id:    player.avatarId,
    house:        player.house,
    is_host:      player.isHost,
    joined_at:    new Date().toISOString(),
  }, { onConflict: 'session_id,player_id' });

  if (error) console.error('joinLobby error:', error.message);
}

function convertDbQuiz(dbQ: any): Quiz {
  return {
    id: dbQ.id, title: dbQ.title, description: dbQ.description ?? '',
    subject: dbQ.subject, grade: dbQ.grade, coverColor: dbQ.cover_color,
    icon: dbQ.icon, playCount: dbQ.play_count ?? 0, createdAt: dbQ.created_at,
    questions: (dbQ.questions ?? [])
      .sort((a: any, b: any) => a.position - b.position)
      .map((q: any) => ({
        id: q.id, text: q.text, type: q.type,
        timeLimit: q.time_limit, points: q.points,
        explanation: q.explanation ?? '',
        answers: (q.answers ?? [])
          .sort((a: any, b: any) => a.position - b.position)
          .map((a: any) => ({
            id: a.id, text: a.text, isCorrect: a.is_correct,
            color: a.color, icon: a.icon,
          })),
      })),
  };
}
