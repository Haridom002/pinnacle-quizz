import { useState, useEffect, useCallback, useRef } from 'react';
import { Quiz, Player, PlayerAnswer } from './types';
import { SAMPLE_QUIZZES } from './data/quizzes';
import { simulateBotAnswer, calculatePoints, getStreakMultiplier, generateBotPlayers } from './utils/gameUtils';
import { CARTOON_AVATARS, getAvatar } from './lib/avatars';
import { CREST_B64 } from './lib/crestBase64';
import CREST_FILE from './assets/PEC_Crest.jpg';
const CREST_SRC = CREST_FILE || CREST_B64;
import HomeScreenPreview from './components/HomeScreenPreview';
import QuizDetail from './components/QuizDetail';
import QuestionScreen from './components/QuestionScreen';
import Leaderboard from './components/Leaderboard';
import Podium from './components/Podium';
import QuizBuilder from './components/QuizBuilder';
import ArenaHub from './components/ArenaHub';
import LightningCalculator from './components/LightningCalculator';
import FormationMode from './components/FormationMode';
import TugOfWar from './components/TugOfWar';
import LobbyPreview from './components/LobbyPreview';
import ProfileModal from './components/ProfileModal';
import StatsModal from './components/StatsModal';
import ArenaHostMode from './components/ArenaHostMode';
import CodingArena from './components/CodingArena';
import JoinWithCode from './components/JoinWithCode';
import { soundEngine } from './utils/soundEngine';
import SettingsModal from './components/SettingsModal';
import {
  supabase, fetchPublicQuizzes, saveQuizToDb,
  DbQuiz, isSupabaseConfigured
} from './lib/supabase';
import { hostGame, findGame } from './lib/gameStore';

type Phase =
  | 'auth' | 'home' | 'join-code'
  | 'lobby' | 'question' | 'leaderboard' | 'podium'
  | 'quiz-builder' | 'quiz-detail'
  | 'arena-hub' | 'lightning-calc' | 'formation-mode'
  | 'tug-war' | 'arena-host' | 'coding-arena' | 'robotics-arena';

type UserRole = 'student' | 'teacher' | 'parent';
type AuthStep = 'landing' | 'signin' | 'signup-1' | 'signup-2' | 'signup-3';

export interface MockUser {
  id: string; full_name: string; email: string;
  avatar_id: string; role: UserRole; house: string; xp: number; level: number;
}

const HOUSES = ['Alpha','Beta','Gamma','Pulsar'] as const;
const HOUSE_ICONS: Record<string,string> = {Alpha:'🏛️',Beta:'⚗️',Gamma:'☢️',Pulsar:'✨'};
const ROLES: {id:UserRole;label:string;icon:string;desc:string;color:string}[] = [
  {id:'student', label:'Student',  icon:'🎓', desc:'Play quizzes & earn XP',        color:'from-purple-500 to-indigo-600'},
  {id:'teacher', label:'Teacher',  icon:'📋', desc:'Create & host live games',       color:'from-blue-500 to-cyan-600'},
  {id:'parent',  label:'Parent',   icon:'👨‍👩‍👧', desc:"Monitor your child's progress", color:'from-green-500 to-emerald-600'},
];

// Convert DbQuiz → local Quiz type
function dbToQuiz(dbQ: DbQuiz): Quiz {
  return {
    id: dbQ.id, title: dbQ.title, description: dbQ.description,
    subject: dbQ.subject, grade: dbQ.grade, coverColor: dbQ.cover_color,
    icon: dbQ.icon, playCount: dbQ.play_count, createdAt: dbQ.created_at,
    questions: (dbQ.questions ?? [])
      .sort((a,b) => a.position - b.position)
      .map(q => ({
        id: q.id, text: q.text, type: q.type as any,
        timeLimit: q.time_limit, points: q.points,
        explanation: q.explanation ?? '',
        answers: (q.answers ?? [])
          .sort((a,b) => a.position - b.position)
          .map(a => ({ id: a.id, text: a.text, isCorrect: a.is_correct, color: a.color, icon: a.icon })),
      })),
  };
}

export default function AppPreview() {
  // ── Navigation ────────────────────────────────────────────────
  const [phase,         setPhase]         = useState<Phase>(() => {
    try {
      const saved = localStorage.getItem('pinnacle-user');
      return saved ? 'home' : 'auth';
    } catch { return 'auth'; }
  });
  const phaseHistory                      = useRef<Phase[]>([]);

  const navigate = useCallback((next: Phase) => {
    phaseHistory.current.push(phase);
    setPhase(next);
  }, [phase]);

  const goBack = useCallback(() => {
    const prev = phaseHistory.current.pop();
    setPhase(prev ?? 'home');
  }, []);

  const goHome = useCallback(() => {
    phaseHistory.current = [];
    setPhase('home');
    soundEngine.stopBgMusic();
  }, []);

  // ── User / Auth ───────────────────────────────────────────────
  const [mockUser,      setMockUser]      = useState<MockUser|null>(() => {
    try {
      const saved = localStorage.getItem('pinnacle-user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (mockUser) localStorage.setItem('pinnacle-user', JSON.stringify(mockUser));
    else localStorage.removeItem('pinnacle-user');
  }, [mockUser]);
  const [authStep,      setAuthStep]      = useState<AuthStep>('landing');
  const [role,          setRole]          = useState<UserRole>('student');
  const [fullName,      setFullName]      = useState('');
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [avatarId,      setAvatarId]      = useState('0');
  const [house,         setHouse]         = useState('Alpha');
  const [authError,     setAuthError]     = useState('');
  const [authLoading,   setAuthLoading]   = useState(false);

  // ── Quiz library ──────────────────────────────────────────────
  const [quizLibrary,   setQuizzes]       = useState<Quiz[]>(SAMPLE_QUIZZES);
  const [selectedQuiz,  setSelectedQuiz]  = useState<Quiz|null>(null);
  const [gameCode,      setGameCode]      = useState('');
  const [sessionId,     setSessionId]     = useState<string|undefined>(undefined);

  // ── Game state ────────────────────────────────────────────────
  const [currentPlayer, setCurrentPlayer] = useState<Player|null>(null);
  const [allPlayers,    setAllPlayers]    = useState<Player[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showProfile,   setShowProfile]   = useState(false);
  const [showStats,     setShowStats]     = useState(false);
  const [showSettings,  setShowSettings]  = useState(false);
  const [editingQuiz,   setEditingQuiz]   = useState<Quiz|null>(null);

  // ── Load profile from Supabase — never gets stuck ────────────
  const loadProfile = useCallback(async (uid: string, fallbackEmail?: string): Promise<MockUser|null> => {
    const { data, error } = await supabase
      .from('profiles').select('*').eq('id', uid).single();

    // Profile exists — return it
    if (!error && data) {
      const u: MockUser = {
        id: data.id, full_name: data.full_name, email: data.email,
        avatar_id: data.avatar_id, role: data.role,
        house: data.house ?? 'Alpha', xp: data.xp ?? 0,
        level: Math.floor((data.xp ?? 0) / 500) + 1,
      };
      setMockUser(u);
      return u;
    }

    // Profile missing — create a default one so sign-in never gets stuck
    const emailToUse = fallbackEmail ?? '';
    const nameFallback = emailToUse.split('@')[0] || 'Player';
    const newProfile = {
      id: uid, email: emailToUse, full_name: nameFallback,
      avatar_id: '0', role: 'student' as UserRole, house: 'Alpha', xp: 0,
      created_at: new Date().toISOString(),
    };
    const { data: created } = await supabase.from('profiles').insert(newProfile).select().single();
    const profileData = created ?? newProfile;
    const u: MockUser = {
      id: profileData.id, full_name: profileData.full_name, email: profileData.email,
      avatar_id: profileData.avatar_id ?? '0', role: (profileData.role ?? 'student') as UserRole,
      house: profileData.house ?? 'Alpha', xp: profileData.xp ?? 0,
      level: 1,
    };
    setMockUser(u);
    return u;
  }, []);

  // ── Load quizzes from Supabase ────────────────────────────────
  const loadQuizzes = useCallback(async () => {
    // Always load from localStorage first (instant, works offline)
    const saved = localStorage.getItem('pinnacle-quizzes');
    if (saved) {
      try {
        const localQs = JSON.parse(saved) as Quiz[];
        if (localQs.length > 0) setQuizzes(localQs);
      } catch {}
    }
    // Then try Supabase (may be blocked, that's OK)
    try {
      const dbQs = await fetchPublicQuizzes();
      if (dbQs.length > 0) {
        const merged = dbQs.map(dbToQuiz);
        setQuizzes(merged);
        localStorage.setItem('pinnacle-quizzes', JSON.stringify(merged));
      }
    } catch (e) {
      console.warn('Supabase quiz load failed, using local cache', e);
    }
  }, []);

  // ── Restore session on app load ───────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (s?.user) {
        // Active Supabase session — load fresh profile from DB
        await loadProfile(s.user.id, s.user.email ?? '');
        await loadQuizzes();
        setPhase('home');
      } else {
        // No Supabase session — check localStorage for cached user
        const cached = localStorage.getItem('pinnacle-user');
        if (cached) {
          try {
            // Keep cached user for display, but try to reload quizzes
            await loadQuizzes();
            setPhase('home');
          } catch {
            localStorage.removeItem('pinnacle-user');
            setMockUser(null);
            setPhase('auth');
          }
        } else {
          setPhase('auth');
        }
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, s) => {
      if (s?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
        await loadProfile(s.user.id, s.user.email ?? '');
        await loadQuizzes();
        setPhase('home');
      }
      if (!s?.user && event === 'SIGNED_OUT') {
        localStorage.removeItem('pinnacle-user');
        setMockUser(null);
        setPhase('auth');
      }
    });
    return () => subscription.unsubscribe();
  }, [loadProfile, loadQuizzes]);

  // ── Sign In (real Supabase) ───────────────────────────────────
  const signIn = async () => {
    if (!email || !password) { setAuthError('Please fill in all fields.'); return; }
    setAuthError(''); setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setAuthLoading(false); setAuthError(error.message); return; }
    // Directly load profile — don't rely solely on onAuthStateChange
    if (data?.user) {
      await loadProfile(data.user.id, data.user.email ?? '');
      await loadQuizzes();
      setAuthLoading(false);
      setPhase('home');
    } else {
      setAuthLoading(false);
    }
  };

  // ── Sign Up (real Supabase) ───────────────────────────────────
  const signUp = async () => {
    if (authStep === 'signup-1') { setAuthStep('signup-2'); return; }
    if (authStep === 'signup-2') {
      if (!fullName.trim()) { setAuthError('Enter your name'); return; }
      if (!email) { setAuthError('Enter your email'); return; }
      if (password.length < 6) { setAuthError('Password must be at least 6 characters'); return; }
      setAuthStep('signup-3'); return;
    }
    // Step 3 — final submit
    setAuthError(''); setAuthLoading(true);

    // Step A: Create auth user
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } },
    });
    if (error) { setAuthLoading(false); setAuthError(error.message); return; }
    if (!data.user) { setAuthLoading(false); setAuthError('Sign up failed. Please try again.'); return; }

    // Step B: Sign in immediately to get active session
    const { data: siData, error: siErr } = await supabase.auth.signInWithPassword({ email, password });
    if (siErr || !siData?.user) {
      // Email confirmation may be required — show message
      setAuthLoading(false);
      setAuthError('Account created! Please check your email to confirm, then sign in.');
      setAuthStep('signin');
      return;
    }

    // Step C: Create profile with active session
    await supabase.from('profiles').upsert({
      id: siData.user.id,
      email,
      full_name: fullName,
      avatar_id: avatarId,
      role,
      house: role === 'student' ? house : null,
      xp: 0,
      created_at: new Date().toISOString(),
    }, { onConflict: 'id' });

    // Step D: Load profile and go home
    await loadProfile(siData.user.id, email);
    await loadQuizzes();
    setAuthLoading(false);
    setPhase('home');
  };

  // ── Sign Out ──────────────────────────────────────────────────
  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('pinnacle-user');
    localStorage.removeItem('pinnacle-quiz-auth');
    setMockUser(null);
    setQuizzes(SAMPLE_QUIZZES);
    setPhase('auth');
    soundEngine.stopBgMusic();
  };

  // ── Bot simulation ────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'question' || !selectedQuiz) return;
    const q = selectedQuiz.questions[questionIndex];
    if (!q) return;
    const t = setTimeout(() => {
      setAllPlayers(prev => prev.map(p => {
        if (p.id === currentPlayer?.id) return p;
        const { answerId, timeMs } = simulateBotAnswer(q, 'medium');
        const isCorrect = q.answers.find(a => a.id === answerId)?.isCorrect ?? false;
        const pts = Math.floor(
          calculatePoints(q.points, q.timeLimit, timeMs, isCorrect) *
          getStreakMultiplier(p.streak)
        );
        return { ...p, score: p.score + pts, streak: isCorrect ? p.streak + 1 : 0,
          answers: [...p.answers, { questionId: q.id, answerId, timeMs, pointsEarned: pts, isCorrect } as PlayerAnswer] };
      }));
    }, 500);
    return () => clearTimeout(t);
  }, [questionIndex, phase, selectedQuiz, currentPlayer?.id]);

  const handleStartGame = useCallback((player: Player, botPlayers: Player[]) => {
    setCurrentPlayer(player); setAllPlayers([player, ...botPlayers]);
    setQuestionIndex(0); setPhase('question');
  }, []);

  const handleAnswer = useCallback((answerId: string|null, pts: number, isCorrect: boolean) => {
    if (!selectedQuiz || !currentPlayer) return;
    const q = selectedQuiz.questions[questionIndex];
    const updated = { ...currentPlayer, score: currentPlayer.score + pts,
      streak: isCorrect ? currentPlayer.streak + 1 : 0,
      answers: [...currentPlayer.answers, { questionId: q.id, answerId, timeMs: 0, pointsEarned: pts, isCorrect }] };
    setCurrentPlayer(updated);
    setAllPlayers(prev => prev.map(p => p.id === currentPlayer.id ? updated : p));
    setPhase('leaderboard');
  }, [selectedQuiz, currentPlayer, questionIndex]);

  const handleContinue = useCallback(() => {
    if (!selectedQuiz) return;
    if (questionIndex >= selectedQuiz.questions.length - 1) setPhase('podium');
    else { setQuestionIndex(i => i + 1); setPhase('question'); }
  }, [selectedQuiz, questionIndex]);

  const modals = (
    <>
      {showProfile  && mockUser && <ProfileModal user={mockUser} onClose={() => setShowProfile(false)} onUpdate={u => setMockUser(m => m ? { ...m, ...u } as MockUser : m)} />}
      {showStats    && mockUser && <StatsModal   user={mockUser} onClose={() => setShowStats(false)} />}
      {showSettings &&            <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );

  // ══════════════════════════════════════════════════════════════
  // AUTH SCREENS
  // ══════════════════════════════════════════════════════════════
  if (phase === 'auth') {
    const Logo = () => (
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-blue-400/35 shadow-xl">
          <img src={CREST_SRC} alt="PEC" className="w-full h-full object-cover"/>
        </div>
        <div>
          <div className="text-white font-black text-xl leading-tight">PinnacleQuiz</div>
          <div className="text-white/40 text-xs">Pinnacle Educational Centre</div>
        </div>
      </div>
    );

    const StepBar = ({ s }: { s: number }) => (
      <div className="flex gap-1.5 mb-6">
        {[1,2,3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= s ? 'bg-purple-500' : 'bg-white/12'}`}/>
        ))}
      </div>
    );

    // LANDING
    if (authStep === 'landing') return (
      <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          {!isSupabaseConfigured && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-xs px-4 py-3 rounded-xl mb-4 text-center">
              ⚠️ <b>Database not connected.</b> Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Vercel environment variables, then redeploy.
            </div>
          )}
          <Logo/>
          <h1 className="text-3xl font-black text-white text-center mb-2">Welcome! 👋</h1>
          <p className="text-white/40 text-sm text-center mb-8">The smart quiz platform for Pinnacle students, teachers and parents</p>
          <div className="space-y-3">
            <button onClick={() => { setAuthError(''); setAuthStep('signup-1'); }}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-lg rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-purple-500/25">
              🚀 Create Account — Free
            </button>
            <button onClick={() => { setAuthError(''); setAuthStep('signin'); }}
              className="w-full py-4 bg-white/8 border border-white/15 text-white font-bold rounded-2xl hover:bg-white/15 transition-all">
              → Sign In
            </button>
            <button onClick={() => navigate('join-code')}
              className="w-full py-3 bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 font-bold rounded-xl hover:bg-yellow-500/25 transition-all text-sm">
              🎮 Join a game with code (no account needed)
            </button>
          </div>
        </div>
      </div>
    );

    // SIGN IN
    if (authStep === 'signin') return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <button onClick={() => setAuthStep('landing')} className="text-white/40 hover:text-white text-sm mb-5 flex items-center gap-2">← Back</button>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
            <Logo/>
            <h2 className="text-2xl font-black text-white text-center -mt-2 mb-5">Welcome back!</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="text-white/50 text-sm font-semibold block mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && signIn()}
                  placeholder="you@example.com"
                  className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"/>
              </div>
              <div>
                <label className="text-white/50 text-sm font-semibold block mb-1.5">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && signIn()}
                  placeholder="••••••••"
                  className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"/>
              </div>
            </div>
            {authError && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">⚠ {authError}</div>}
            <button onClick={signIn} disabled={authLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black rounded-xl hover:scale-[1.02] transition-all shadow-lg mb-3 disabled:opacity-50 flex items-center justify-center gap-2">
              {authLoading ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Signing in...</> : '→ Sign In'}
            </button>
            <button onClick={() => navigate('join-code')}
              className="w-full py-3 bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 font-bold rounded-xl hover:bg-yellow-500/25 transition-all text-sm">
              🎮 Join game with code instead
            </button>
            <p className="text-center text-white/35 text-sm mt-4">No account? <button onClick={() => { setAuthError(''); setAuthStep('signup-1'); }} className="text-purple-400 font-semibold">Sign up</button></p>
          </div>
        </div>
      </div>
    );

    // SIGN UP step 1 — role
    if (authStep === 'signup-1') return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <button onClick={() => setAuthStep('landing')} className="text-white/40 hover:text-white text-sm mb-5 flex items-center gap-2">← Back</button>
          <StepBar s={1}/>
          <h2 className="text-2xl font-black text-white mb-1">I am a…</h2>
          <p className="text-white/40 text-sm mb-6">Choose your role to get started</p>
          <div className="space-y-3 mb-6">
            {ROLES.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${role === r.id ? 'scale-[1.02]' : 'opacity-60 hover:opacity-90'}`}
                style={{ borderColor: role === r.id ? '#a855f7' : '#a855f720', background: role === r.id ? '#a855f715' : 'transparent' }}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center text-2xl flex-shrink-0`}>{r.icon}</div>
                <div className="text-left flex-1">
                  <div className="text-white font-black">{r.label}</div>
                  <div className="text-white/40 text-sm">{r.desc}</div>
                </div>
                {role === r.id && <div className="text-purple-400 text-xl">✓</div>}
              </button>
            ))}
          </div>
          <button onClick={() => setAuthStep('signup-2')}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black rounded-xl hover:scale-[1.02] transition-all shadow-lg">
            Continue →
          </button>
        </div>
      </div>
    );

    // SIGN UP step 2 — details
    if (authStep === 'signup-2') return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <button onClick={() => setAuthStep('signup-1')} className="text-white/40 hover:text-white text-sm mb-5 flex items-center gap-2">← Back</button>
          <StepBar s={2}/>
          <h2 className="text-2xl font-black text-white mb-1">Your details</h2>
          <p className="text-white/40 text-sm mb-6">This is how others will see you</p>
          <div className="space-y-4 mb-4">
            <div>
              <label className="text-white/50 text-sm font-semibold block mb-1.5">Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. Kwame Mensah"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"/>
            </div>
            <div>
              <label className="text-white/50 text-sm font-semibold block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"/>
            </div>
            <div>
              <label className="text-white/50 text-sm font-semibold block mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"/>
            </div>
          </div>
          {authError && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">⚠ {authError}</div>}
          <button onClick={signUp}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black rounded-xl hover:scale-[1.02] transition-all shadow-lg">
            Continue →
          </button>
        </div>
      </div>
    );

    // SIGN UP step 3 — avatar + house (students only)
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <button onClick={() => setAuthStep('signup-2')} className="text-white/40 hover:text-white text-sm mb-5 flex items-center gap-2">← Back</button>
          <StepBar s={3}/>
          <h2 className="text-2xl font-black text-white mb-1">Almost there!</h2>
          <p className="text-white/40 text-sm mb-5">Pick your avatar{role === 'student' ? ' and house' : ''}</p>
          <div className="mb-5">
            <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">Your Avatar</label>
            <div className="grid grid-cols-8 gap-1.5">
              {CARTOON_AVATARS.slice(0,16).map(av => {
                const a = getAvatar(av.id);
                return (
                  <button key={av.id} onClick={() => setAvatarId(av.id)}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-xl transition-all hover:scale-110 ${avatarId === av.id ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-60'}`}
                    style={avatarId === av.id ? { boxShadow: `0 0 12px ${a.glow}` } : {}}>
                    {av.emoji}
                  </button>
                );
              })}
            </div>
          </div>
          {role === 'student' && (
            <div className="mb-5">
              <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">Your House</label>
              <div className="grid grid-cols-2 gap-2">
                {HOUSES.map(h => (
                  <button key={h} onClick={() => setHouse(h)}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-2 ${house === h ? 'border-purple-400 bg-purple-400/15' : 'border-white/12 bg-white/4'}`}>
                    <span className="text-xl">{HOUSE_ICONS[h]}</span>
                    <div>
                      <div className="text-white font-bold text-sm">House {h}</div>
                    </div>
                    {house === h && <span className="ml-auto text-purple-400">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {authError && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">⚠ {authError}</div>}
          <button onClick={signUp} disabled={authLoading}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-lg rounded-xl hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2">
            {authLoading ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Creating account...</> : '🎉 Create My Account'}
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // JOIN WITH CODE (works for guests too — no login needed)
  // ══════════════════════════════════════════════════════════════
  if (phase === 'join-code') return (
    <JoinWithCode
      user={mockUser}
      onJoined={async (code, nickname, houseId, avId) => {
        // Load the real quiz from Supabase via game code
        const result = await findGame(code);
        let quizToPlay: Quiz;
        if (result?.quiz) {
          quizToPlay = result.quiz;
        } else {
          // Fallback: use first sample quiz (demo mode)
          quizToPlay = SAMPLE_QUIZZES[0];
        }
        setSelectedQuiz(quizToPlay);
        setGameCode(code);
        if (result) setSessionId(result.sessionId);
        // Set guest user if not logged in
        if (!mockUser) {
          setMockUser({ id: 'guest-' + Date.now(), full_name: nickname,
            email: '', avatar_id: avId, role: 'student', house: houseId, xp: 0, level: 1 });
        } else {
          setMockUser(m => m ? { ...m, full_name: nickname, house: houseId, avatar_id: avId } : m);
        }
        navigate('lobby');
      }}
      onBack={() => setPhase(mockUser ? 'home' : 'auth')}
    />
  );

  // ══════════════════════════════════════════════════════════════
  // ARENAS
  // ══════════════════════════════════════════════════════════════
  if (phase === 'arena-hub')     return <>{modals}<ArenaHub onMode={m => navigate(m==='lightning'?'lightning-calc':m==='formation'?'formation-mode':m==='tug'?'tug-war':m==='coding'?'coding-arena':m==='robotics'?'robotics-arena':'arena-host')} onBack={goHome}/></>;
  if (phase === 'arena-host')    return <ArenaHostMode    onBack={() => navigate('arena-hub')}/>;
  if (phase === 'lightning-calc')return <LightningCalculator onBack={() => navigate('arena-hub')}/>;
  if (phase === 'formation-mode')return <FormationMode    onBack={() => navigate('arena-hub')}/>;
  if (phase === 'tug-war')       return <TugOfWar         onBack={() => navigate('arena-hub')}/>;
  if (phase === 'coding-arena')  return <CodingArena mode='coding'   onBack={() => navigate('arena-hub')}/>;
  if (phase === 'robotics-arena')return <CodingArena mode='robotics' onBack={() => navigate('arena-hub')}/>;

  // ══════════════════════════════════════════════════════════════
  // QUIZ BUILDER — saves to Supabase, visible to all users
  // ══════════════════════════════════════════════════════════════
  if (phase === 'quiz-builder') return (
    <QuizBuilder
      initialQuiz={editingQuiz ?? undefined}
      onSave={async q => {
        if (editingQuiz) {
          // Update existing quiz in library
          setQuizzes(p => p.map(existing => existing.id === editingQuiz.id ? { ...q, id: editingQuiz.id } : existing));
          // Update in Supabase
          if (mockUser) {
            await supabase.from('quizzes').update({
              title: q.title, description: q.description, subject: q.subject,
              grade: q.grade, cover_color: q.coverColor, icon: q.icon,
            }).eq('id', editingQuiz.id);
          }
          setEditingQuiz(null);
        } else {
          // Save to local state immediately
          setQuizzes(p => {
            const updated = [q, ...p.filter(x => x.id !== q.id)];
            // Save to localStorage so it survives refresh
            localStorage.setItem('pinnacle-quizzes', JSON.stringify(updated));
            return updated;
          });

        if (mockUser) {
          // Try Supabase (best effort — may be blocked by network restrictions)
          try {
            const qs = q.questions.map((qu, i) => ({
              position: i, text: qu.text, type: 'multiple-choice',
              time_limit: qu.timeLimit, points: qu.points,
              explanation: qu.explanation ?? '',
              answers: qu.answers.map((a, ai) => ({
                position: ai, text: a.text, is_correct: a.isCorrect,
                color: a.color ?? '#E21B3C', icon: a.icon ?? '▲',
              })),
            }));
            await saveQuizToDb({
              title: q.title, description: q.description ?? '',
              subject: q.subject, grade: q.grade,
              cover_color: q.coverColor, icon: q.icon, is_public: true,
            }, qs, mockUser.id);
            await loadQuizzes();
          } catch (e) {
            console.warn('Supabase quiz save failed, saved locally only', e);
          }
        }
        }
        goHome();
      }}
      onBack={goBack}
    />
  );

  // ══════════════════════════════════════════════════════════════
  // QUIZ DETAIL — teacher can start, creates real game session
  // ══════════════════════════════════════════════════════════════
  if (phase === 'quiz-detail' && selectedQuiz) return (
    <QuizDetail
      quiz={selectedQuiz}
      onPlay={async () => {
        const hostId = mockUser?.id ?? 'host-' + Date.now();
        // hostGame always works — memory store + best-effort Supabase
        const { code, sessionId: sid } = await hostGame(selectedQuiz, hostId);
        setGameCode(code);
        setSessionId(sid);
        navigate('lobby');
      }}
      onBack={goBack}
    />
  );

  // ══════════════════════════════════════════════════════════════
  // LOBBY — shows game code, students join here
  // ══════════════════════════════════════════════════════════════
  if (phase === 'lobby' && selectedQuiz) return (
    <LobbyPreview
      quiz={selectedQuiz}
      gameCode={gameCode}
      sessionId={sessionId}
      mockUser={mockUser ? { id: mockUser.id, full_name: mockUser.full_name, avatar_id: mockUser.avatar_id } : null}
      onStartGame={handleStartGame}
      onBack={goBack}
    />
  );

  // ══════════════════════════════════════════════════════════════
  // QUESTION / LEADERBOARD / PODIUM
  // ══════════════════════════════════════════════════════════════
  if (phase === 'question' && selectedQuiz && currentPlayer) {
    const q = selectedQuiz.questions[questionIndex];
    if (!q) return null;
    return <QuestionScreen key={`q-${questionIndex}`} question={q} questionNumber={questionIndex+1} totalQuestions={selectedQuiz.questions.length} player={currentPlayer} allPlayers={allPlayers} onAnswer={handleAnswer} quizCoverColor={selectedQuiz.coverColor}/>;
  }
  if (phase === 'leaderboard' && selectedQuiz && currentPlayer)
    return <Leaderboard players={allPlayers} currentPlayer={currentPlayer} onContinue={handleContinue} questionNumber={questionIndex+1} totalQuestions={selectedQuiz.questions.length} isLastQuestion={questionIndex>=selectedQuiz.questions.length-1}/>;
  if (phase === 'podium' && selectedQuiz && currentPlayer)
    return <Podium players={allPlayers} currentPlayer={currentPlayer} quiz={selectedQuiz}
      onPlayAgain={() => { setCurrentPlayer(null); setAllPlayers([]); setQuestionIndex(0); navigate('lobby'); }}
      onHome={goHome}/>;

  // ══════════════════════════════════════════════════════════════
  // HOME SCREEN
  // ══════════════════════════════════════════════════════════════
  return (
    <>{modals}
    <HomeScreenPreview
      user={mockUser}
      crestSrc={CREST_SRC}
      onStartQuiz={q => { setSelectedQuiz(q); const bots = generateBotPlayers(4); const player: Player = { id: mockUser?.id ?? 'player-me', name: mockUser?.full_name ?? 'You', avatar: getAvatar(mockUser?.avatar_id ?? '0').emoji, score: 0, streak: 0, answers: [] }; handleStartGame(player, bots); }}
      onViewQuiz={q => { setSelectedQuiz(q); navigate('quiz-detail'); }}
      onEditQuiz={q => { setEditingQuiz(q); navigate('quiz-builder'); }}
      onDeleteQuiz={async q => {
        if (!window.confirm(`Delete "${q.title}"? This cannot be undone.`)) return;
        setQuizzes(p => {
          const updated = p.filter(x => x.id !== q.id);
          localStorage.setItem('pinnacle-quizzes', JSON.stringify(updated));
          return updated;
        });
        try { await supabase.from('quizzes').delete().eq('id', q.id); } catch {}
      }}
      onCreateQuiz={() => { setEditingQuiz(null); navigate('quiz-builder'); }}
      onArena={() => navigate('arena-hub')}
      onJoinCode={() => navigate('join-code')}
      onProfile={() => setShowProfile(true)}
      onStats={() => setShowStats(true)}
      onSettings={() => setShowSettings(true)}
      onSignOut={signOut}
      quizzes={quizLibrary}
    /></>
  );
}
