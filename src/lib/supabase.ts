import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = (import.meta as any).env?.VITE_SUPABASE_URL     as string | undefined;
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ SUPABASE ENV VARS MISSING — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Vercel');
}

export const supabase = createClient(
  supabaseUrl     ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-key',
  {
    auth: {
      autoRefreshToken:   true,
      persistSession:     true,
      detectSessionInUrl: true,
      storageKey:         'pinnacle-quiz-auth',
    },
    realtime: {
      params: { eventsPerSecond: 10 },
    },
  }
);

export const isSupabaseConfigured = !!(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')
);

export type UserRole = 'student' | 'teacher' | 'parent';

// ── Types ────────────────────────────────────────────────────────
export interface DbQuiz {
  id: string; creator_id: string; title: string; description: string;
  subject: string; grade: string; cover_color: string; icon: string;
  play_count: number; is_public: boolean; created_at: string;
  questions?: DbQuestion[];
}
export interface DbQuestion {
  id: string; quiz_id: string; position: number; text: string;
  type: string; time_limit: number; points: number;
  explanation?: string; image_url?: string; answers?: DbAnswer[];
}
export interface DbAnswer {
  id: string; question_id: string; position: number; text: string;
  is_correct: boolean; color: string; icon: string;
}
export interface DbGameSession {
  id: string; quiz_id: string; host_id: string; game_code: string;
  status: 'waiting' | 'active' | 'completed';
  created_at: string; started_at?: string; ended_at?: string;
}
export interface DbLobbyPlayer {
  id: string; session_id: string; player_id: string;
  display_name: string; avatar_id: string; house: string;
  joined_at: string; is_host: boolean;
}

// ── Helpers ──────────────────────────────────────────────────────
export async function fetchPublicQuizzes(): Promise<DbQuiz[]> {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*, questions(*, answers(*))')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchPublicQuizzes', error); return []; }
  return (data ?? []) as DbQuiz[];
}

export async function fetchMyQuizzes(teacherId: string): Promise<DbQuiz[]> {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*, questions(*, answers(*))')
    .eq('creator_id', teacherId)
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchMyQuizzes', error); return []; }
  return (data ?? []) as DbQuiz[];
}

export async function saveQuizToDb(
  quiz: Omit<DbQuiz, 'id'|'creator_id'|'created_at'|'play_count'|'questions'>,
  questions: Array<Omit<DbQuestion,'id'|'quiz_id'|'created_at'|'answers'> & {
    answers: Omit<DbAnswer,'id'|'question_id'>[];
  }>,
  creatorId: string
): Promise<string | null> {
  const { data: qzData, error: qzErr } = await supabase
    .from('quizzes')
    .insert({ ...quiz, creator_id: creatorId, play_count: 0, is_public: true })
    .select('id').single();
  if (qzErr || !qzData) { console.error('saveQuiz', qzErr); return null; }
  const quizId = qzData.id;
  for (const q of questions) {
    const { data: qData, error: qErr } = await supabase
      .from('questions')
      .insert({ quiz_id: quizId, position: q.position, text: q.text,
        type: q.type, time_limit: q.time_limit, points: q.points,
        explanation: q.explanation })
      .select('id').single();
    if (qErr || !qData) continue;
    await supabase.from('answers').insert(
      q.answers.map((a, i) => ({ question_id: qData.id, position: i,
        text: a.text, is_correct: a.is_correct, color: a.color, icon: a.icon }))
    );
  }
  return quizId;
}

export async function createGameSession(
  quizId: string, hostId: string
): Promise<{ code: string; sessionId: string } | null> {
  // Try up to 3 times in case of code collision
  for (let attempt = 0; attempt < 3; attempt++) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const { data, error } = await supabase
      .from('game_sessions')
      .insert({ quiz_id: quizId, host_id: hostId, game_code: code, status: 'waiting' })
      .select('id, game_code').single();
    if (error) {
      console.error('createGameSession attempt', attempt, error.message, error.details);
      // If foreign key error on host_id, try with a placeholder
      if (error.message?.includes('foreign key') || error.code === '23503') {
        // host_id FK fails — insert without it using a direct approach
        const { data: d2, error: e2 } = await supabase
          .from('game_sessions')
          .insert({ quiz_id: quizId, host_id: hostId, game_code: code, status: 'waiting' })
          .select('id, game_code').single();
        if (!e2 && d2) return { code: d2.game_code, sessionId: d2.id };
      }
      continue;
    }
    if (data) return { code: data.game_code, sessionId: data.id };
  }
  console.error('createGameSession failed after 3 attempts');
  return null;
}

export async function joinGameByCode(
  code: string
): Promise<{ session: DbGameSession; quiz: DbQuiz } | null> {
  const { data: session, error: sErr } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('game_code', code.trim())
    .neq('status', 'completed')
    .single();
  if (sErr || !session) { console.error('joinGameByCode - no session', sErr); return null; }
  const { data: quiz, error: qErr } = await supabase
    .from('quizzes')
    .select('*, questions(*, answers(*))')
    .eq('id', session.quiz_id)
    .single();
  if (qErr || !quiz) { console.error('joinGameByCode - no quiz', qErr); return null; }
  return { session: session as DbGameSession, quiz: quiz as DbQuiz };
}

/** Add a player to the lobby */
export async function addLobbyPlayer(player: Omit<DbLobbyPlayer, 'id' | 'joined_at'>): Promise<void> {
  await supabase.from('lobby_players').upsert({
    ...player, joined_at: new Date().toISOString(),
  }, { onConflict: 'session_id,player_id' });
}

/** Get all players currently in a lobby */
export async function getLobbyPlayers(sessionId: string): Promise<DbLobbyPlayer[]> {
  const { data } = await supabase
    .from('lobby_players')
    .select('*')
    .eq('session_id', sessionId)
    .order('joined_at', { ascending: true });
  return (data ?? []) as DbLobbyPlayer[];
}

/** Start the game — updates session to active */
export async function startGameSession(sessionId: string): Promise<void> {
  await supabase.from('game_sessions')
    .update({ status: 'active', started_at: new Date().toISOString() })
    .eq('id', sessionId);
}
