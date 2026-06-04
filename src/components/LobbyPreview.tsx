import { useState, useEffect, useRef, useCallback } from 'react';
import { Quiz, Player } from '../types';
import { getAvatar, CARTOON_AVATARS } from '../lib/avatars';
import {
  supabase, addLobbyPlayer, getLobbyPlayers,
  startGameSession, DbLobbyPlayer
} from '../lib/supabase';

interface MockUser { id:string; full_name:string; avatar_id:string; house?:unknown; [k:string]:unknown; }
interface Props {
  quiz: Quiz;
  gameCode: string;
  sessionId?: string;
  mockUser: MockUser | null;
  onStartGame: (player: Player, botPlayers: Player[]) => void;
  onBack: () => void;
}

export default function LobbyPreview({ quiz, gameCode, sessionId: propSessionId, mockUser, onStartGame, onBack }: Props) {
  const [playerName,  setPlayerName]  = useState(mockUser?.full_name ?? '');
  const [avatarId,    setAvatarId]    = useState(mockUser?.avatar_id ?? '0');
  const [showPicker,  setShowPicker]  = useState(false);
  const [nameError,   setNameError]   = useState('');
  const [joined,      setJoined]      = useState(false);
  const [copied,      setCopied]      = useState(false);
  const [countdown,   setCountdown]   = useState<number|null>(null);
  const [lobbyPlayers,setLobbyPlayers]= useState<DbLobbyPlayer[]>([]);
  const [sessionId,   setSessionId]   = useState<string|null>(propSessionId ?? null);
  const [sessionError,setSessionError]= useState('');
  const playerRef = useRef<Player|null>(null);
  const av = getAvatar(avatarId);

  // ── Step 1: Resolve session ID from game code ─────────────────
  useEffect(() => {
    if (sessionId) return;
    if (!gameCode) return;
    supabase.from('game_sessions')
      .select('id, status')
      .eq('game_code', gameCode.trim())
      .neq('status', 'completed')
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setSessionError('Game not found. Check the code and try again.');
          return;
        }
        setSessionId(data.id);
        // If already active (late joiner), start countdown immediately after joining
        if (data.status === 'active') setCountdown(3);
      });
  }, [gameCode, sessionId]);

  // ── Step 2: Realtime — watch lobby_players for new joiners ────
  useEffect(() => {
    if (!sessionId) return;

    // Load existing players first
    getLobbyPlayers(sessionId).then(setLobbyPlayers);

    // Subscribe to new inserts
    const channel = supabase
      .channel(`lobby-players-${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'lobby_players',
        filter: `session_id=eq.${sessionId}`,
      }, payload => {
        setLobbyPlayers(prev => {
          const exists = prev.find(p => p.player_id === payload.new.player_id);
          if (exists) return prev;
          return [...prev, payload.new as DbLobbyPlayer];
        });
      })
      .on('postgres_changes', {
        event: 'DELETE', schema: 'public', table: 'lobby_players',
        filter: `session_id=eq.${sessionId}`,
      }, payload => {
        setLobbyPlayers(prev => prev.filter(p => p.id !== payload.old.id));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId]);

  // ── Step 3: Realtime — watch game_sessions for host starting ──
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`session-status-${sessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'game_sessions',
        filter: `id=eq.${sessionId}`,
      }, payload => {
        if (payload.new?.status === 'active' && joined) {
          setCountdown(3);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId, joined]);

  // ── Step 4: Countdown → launch game ──────────────────────────
  useEffect(() => {
    if (countdown === null || countdown < 0) return;
    if (countdown === 0) {
      if (playerRef.current) {
        onStartGame(playerRef.current, []);
      }
      return;
    }
    const t = setTimeout(() => setCountdown(c => c !== null ? c - 1 : null), 1000);
    return () => clearTimeout(t);
  }, [countdown, onStartGame]);

  // ── Join lobby ────────────────────────────────────────────────
  const handleJoin = useCallback(async () => {
    if (!playerName.trim()) { setNameError('Enter your name to join'); return; }
    if (!sessionId) { setNameError('Still connecting… try again in a moment'); return; }
    setNameError('');

    const playerId = mockUser?.id ?? 'guest-' + Date.now();
    const player: Player = {
      id: playerId,
      name: playerName,
      avatar: av.emoji,
      score: 0, streak: 0, answers: [],
    };
    playerRef.current = player;

    // Add to Supabase lobby_players — all devices see this instantly
    await addLobbyPlayer({
      session_id:   sessionId,
      player_id:    playerId,
      display_name: playerName,
      avatar_id:    avatarId,
      house:        (mockUser?.house as string) ?? 'Alpha',
      is_host:      false,
    });

    setJoined(true);
  }, [playerName, sessionId, mockUser, av.emoji, avatarId]);

  // ── Host starts game for everyone ────────────────────────────
  const handleHostStart = useCallback(async () => {
    if (!playerName.trim()) { setNameError('Enter your name first'); return; }
    if (!sessionId) return;
    setNameError('');

    const playerId = mockUser?.id ?? 'host-' + Date.now();
    const player: Player = {
      id: playerId, name: playerName,
      avatar: av.emoji, score: 0, streak: 0, answers: [],
    };
    playerRef.current = player;

    // Add host to lobby
    await addLobbyPlayer({
      session_id:   sessionId,
      player_id:    playerId,
      display_name: playerName,
      avatar_id:    avatarId,
      house:        (mockUser?.house as string) ?? 'Alpha',
      is_host:      true,
    });

    setJoined(true);

    // Update session status to 'active' — ALL subscribed players get notified
    await startGameSession(sessionId);

    // Host also starts countdown
    setCountdown(3);
  }, [playerName, sessionId, mockUser, av.emoji, avatarId]);

  const copyCode = () => {
    navigator.clipboard.writeText(gameCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ══════════════════════════════════════════════════════════════
  // COUNTDOWN OVERLAY
  // ══════════════════════════════════════════════════════════════
  if (countdown !== null && countdown > 0) return (
    <div className="fixed inset-0 z-50 bg-[#0d0d1a] flex flex-col items-center justify-center">
      <p className="text-white/50 text-lg mb-4 font-semibold tracking-wider uppercase">Game starting in</p>
      <div className="text-[9rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-500 leading-none animate-pulse">
        {countdown}
      </div>
      <div className="mt-8 flex items-center gap-3">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-3xl`}
          style={{ boxShadow: `0 0 20px ${av.glow}60` }}>{av.emoji}</div>
        <p className="text-white text-xl font-bold">{playerName} — Get ready! 🎮</p>
      </div>
      <p className="text-white/30 text-sm mt-4">{lobbyPlayers.length} player{lobbyPlayers.length !== 1 ? 's' : ''} in this game</p>
    </div>
  );

  // ══════════════════════════════════════════════════════════════
  // LOBBY SCREEN
  // ══════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col">
      {/* Header */}
      <header className="bg-black/40 border-b border-white/10 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 text-sm transition-colors">← Back</button>
          <span className="text-white font-bold text-sm">🏔️ PinnacleQuiz Lobby</span>
          <div className="w-16"/>
        </div>
      </header>

      <div className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">

        {/* Game Code Banner */}
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">Game PIN — Share with your class</p>
          <button onClick={copyCode}
            className="inline-flex items-center gap-3 bg-white/8 hover:bg-white/14 border-2 border-white/20 hover:border-purple-400/50 rounded-2xl px-8 py-4 transition-all group">
            <span className="text-white font-black text-5xl tracking-[0.3em]">{gameCode}</span>
            <span className="text-white/40 group-hover:text-purple-400 text-lg transition-colors">{copied ? '✓' : '📋'}</span>
          </button>
          {copied && <p className="text-green-400 text-xs mt-1 font-semibold">Copied to clipboard!</p>}
          <p className="text-white/25 text-xs mt-2">Students open the app → Join with Code → enter this PIN</p>
        </div>

        {sessionError && (
          <div className="bg-red-500/15 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl text-center mb-4">
            ⚠️ {sessionError}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">

          {/* LEFT — Your Profile */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="text-white font-black text-lg mb-4 flex items-center gap-2">👤 Your Profile</h2>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                style={{ boxShadow: `0 0 18px ${av.glow}45` }}>{av.emoji}</div>
              <div>
                <p className="text-white font-bold">{av.label}</p>
                <button onClick={() => setShowPicker(s => !s)} disabled={joined}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors disabled:opacity-30">
                  {showPicker ? 'Close ↑' : 'Change avatar →'}
                </button>
              </div>
            </div>

            {showPicker && !joined && (
              <div className="mb-4 bg-black/30 rounded-xl p-3 border border-white/8">
                <div className="grid grid-cols-8 gap-1.5">
                  {CARTOON_AVATARS.slice(0, 16).map(a => {
                    const av2 = getAvatar(a.id);
                    return (
                      <button key={a.id} onClick={() => { setAvatarId(a.id); setShowPicker(false); }}
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.bg} flex items-center justify-center text-lg transition-all hover:scale-110 ${avatarId === a.id ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-60'}`}
                        style={avatarId === a.id ? { boxShadow: `0 0 10px ${av2.glow}` } : {}}>
                        {a.emoji}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Name input */}
            <div className="mb-4">
              <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-1.5">Display Name</label>
              <input type="text" value={playerName}
                onChange={e => { setPlayerName(e.target.value); setNameError(''); }}
                onKeyDown={e => e.key === 'Enter' && !joined && handleJoin()}
                placeholder="Enter your name…" maxLength={20} disabled={joined}
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all disabled:opacity-50 text-sm"/>
              {nameError && <p className="text-red-400 text-xs mt-1">⚠ {nameError}</p>}
            </div>

            {/* Quiz card */}
            <div className={`bg-gradient-to-r ${quiz.coverColor} rounded-xl p-3.5 mb-4 flex items-center gap-3 shadow-lg`}>
              <span className="text-3xl">{quiz.icon}</span>
              <div>
                <p className="text-white font-bold text-sm">{quiz.title}</p>
                <p className="text-white/70 text-xs">{quiz.questions.length} questions · {quiz.grade}</p>
              </div>
            </div>

            {/* Buttons */}
            {!joined ? (
              <button onClick={handleJoin}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-base rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-green-500/20">
                ✋ Join the Game
              </button>
            ) : (
              <div className="space-y-3">
                <div className="text-center py-3 bg-green-500/15 border border-green-500/30 rounded-xl">
                  <p className="text-green-400 font-bold text-sm">✅ You're in the lobby!</p>
                  <p className="text-white/40 text-xs mt-0.5">Waiting for host to start…</p>
                </div>
                {/* Only the host (or anyone) can start — show start button */}
                <button onClick={handleHostStart}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-base rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-500/20">
                  🚀 Start Game for Everyone!
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Live Players */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-black text-lg flex items-center gap-2">
                👥 Players
                <span className="text-white/40 text-sm font-normal">({lobbyPlayers.length})</span>
              </h2>
              <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/25 rounded-full px-2.5 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-green-400 text-xs font-bold">LIVE</span>
              </div>
            </div>

            {lobbyPlayers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">👀</div>
                <p className="text-white/30 text-sm">No one here yet…</p>
                <p className="text-white/20 text-xs mt-1">Share the PIN above with your class</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {lobbyPlayers.map((p, i) => {
                  const pav = getAvatar(p.avatar_id);
                  const isMe = p.player_id === (mockUser?.id ?? '');
                  return (
                    <div key={p.id}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${isMe ? 'bg-purple-500/20 border border-purple-400/30' : 'bg-white/5 border border-white/8'}`}>
                      <span className="text-white/30 text-xs w-5 text-center font-bold">{i + 1}</span>
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${pav.bg} flex items-center justify-center text-xl flex-shrink-0`}
                        style={{ boxShadow: `0 0 8px ${pav.glow}40` }}>{pav.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{p.display_name}</p>
                        <p className="text-white/30 text-xs">House {p.house}</p>
                      </div>
                      {p.is_host && <span className="text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-0.5 rounded-full">HOST</span>}
                      {isMe && !p.is_host && <span className="text-purple-400 text-xs font-bold">YOU</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {lobbyPlayers.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/8 text-center">
                <p className="text-white/30 text-xs">
                  {lobbyPlayers.length} player{lobbyPlayers.length !== 1 ? 's' : ''} ready · Host starts the game for everyone
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
