import { useState, useEffect, useRef, useCallback } from 'react';
import { Quiz, Player } from '../types';
import { getAvatar, CARTOON_AVATARS } from '../lib/avatars';
import { supabase, startGameSession, DbLobbyPlayer } from '../lib/supabase';

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
  const [playerName,   setPlayerName]  = useState(mockUser?.full_name ?? '');
  const [avatarId,     setAvatarId]    = useState(mockUser?.avatar_id ?? '0');
  const [nameError,    setNameError]   = useState('');
  const [joined,       setJoined]      = useState(false);
  const [copied,       setCopied]      = useState(false);
  const [countdown,    setCountdown]   = useState<number|null>(null);
  const [lobbyPlayers, setLobbyPlayers]= useState<DbLobbyPlayer[]>([]);
  const [sessionId,    setSessionId]   = useState<string|null>(propSessionId ?? null);
  const [sessionError, setSessionError]= useState('');
  const [addBots,      setAddBots]     = useState(false);
  const playerRef = useRef<Player|null>(null);
  const av = getAvatar(avatarId);

  // ── Resolve session from code if not passed directly ─────────
  useEffect(() => {
    if (sessionId) return;
    if (!gameCode) return;
    supabase.from('game_sessions').select('id,status')
      .eq('game_code', gameCode.trim()).neq('status','completed').single()
      .then(({ data, error }) => {
        if (error || !data) { setSessionError('Game session not found.'); return; }
        setSessionId(data.id);
      });
  }, [gameCode, sessionId]);

  // ── Realtime: watch lobby_players ────────────────────────────
  useEffect(() => {
    if (!sessionId) return;

    // Load existing players
    supabase.from('lobby_players').select('*').eq('session_id', sessionId)
      .order('joined_at', { ascending: true })
      .then(({ data }) => { if (data) setLobbyPlayers(data as DbLobbyPlayer[]); });

    const ch = supabase.channel(`lobby-host-${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'lobby_players',
        filter: `session_id=eq.${sessionId}`,
      }, payload => {
        setLobbyPlayers(prev => {
          if (prev.find(p => p.player_id === payload.new.player_id)) return prev;
          return [...prev, payload.new as DbLobbyPlayer];
        });
      })
      .on('postgres_changes', {
        event: 'DELETE', schema: 'public', table: 'lobby_players',
        filter: `session_id=eq.${sessionId}`,
      }, payload => {
        setLobbyPlayers(prev => prev.filter(p => p.id !== (payload.old as DbLobbyPlayer).id));
      })
      .subscribe();

    return () => { supabase.removeChannel(ch); };
  }, [sessionId]);

  // ── Countdown → launch game ───────────────────────────────────
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      if (playerRef.current) {
        // Build real player list from lobby
        const bots = addBots ? lobbyPlayers
          .filter(p => !p.is_host && p.player_id.startsWith('bot-'))
          .map(p => ({
            id: p.player_id, name: p.display_name,
            avatar: getAvatar(p.avatar_id).emoji,
            score: 0, streak: 0, answers: [],
          })) : [];
        onStartGame(playerRef.current, bots);
      }
      return;
    }
    const t = setTimeout(() => setCountdown(c => c !== null ? c-1 : null), 1000);
    return () => clearTimeout(t);
  }, [countdown, onStartGame, addBots, lobbyPlayers]);

  // ── Host joins lobby ─────────────────────────────────────────
  const handleJoinAsHost = useCallback(async () => {
    if (!playerName.trim()) { setNameError('Enter your name first'); return; }
    if (!sessionId) return;
    setNameError('');

    const hostId = mockUser?.id ?? 'host-' + Date.now();
    const player: Player = {
      id: hostId, name: playerName,
      avatar: av.emoji, score: 0, streak: 0, answers: [],
    };
    playerRef.current = player;

    // Add host to lobby
    await supabase.from('lobby_players').upsert({
      session_id:   sessionId,
      player_id:    hostId,
      display_name: playerName,
      avatar_id:    avatarId,
      house:        (mockUser?.house as string) ?? 'Alpha',
      is_host:      true,
      joined_at:    new Date().toISOString(),
    }, { onConflict: 'session_id,player_id' });

    setJoined(true);
  }, [playerName, sessionId, mockUser, av.emoji, avatarId]);

  // ── Host starts game for everyone ────────────────────────────
  const handleStartGame = useCallback(async () => {
    if (!joined) { await handleJoinAsHost(); }
    if (!sessionId || !playerRef.current) return;

    // Update session to active — all waiting players get notified via realtime
    await startGameSession(sessionId);
    setCountdown(3);
  }, [joined, sessionId, handleJoinAsHost]);

  // ── Remove a player ──────────────────────────────────────────
  const removePlayer = async (playerId: string) => {
    if (!sessionId) return;
    await supabase.from('lobby_players')
      .delete().eq('session_id', sessionId).eq('player_id', playerId);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(gameCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const humanPlayers = lobbyPlayers.filter(p => !p.player_id.startsWith('bot-'));

  // ══════════════════════════════════════════════════════════════
  // COUNTDOWN OVERLAY
  // ══════════════════════════════════════════════════════════════
  if (countdown !== null && countdown > 0) return (
    <div className="fixed inset-0 z-50 bg-[#0d0d1a] flex flex-col items-center justify-center overflow-hidden">
      {/* Animated rings */}
      {[1,2,3].map(i => (
        <div key={i} className="absolute rounded-full border-2 border-purple-500/20 animate-ping"
          style={{ width: `${i*200}px`, height: `${i*200}px`, animationDuration: `${i*0.8}s` }}/>
      ))}
      <p className="text-white/50 text-lg mb-4 font-semibold tracking-widest uppercase relative z-10">Game starting in</p>
      <div className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-500 leading-none relative z-10"
        style={{ textShadow: '0 0 80px rgba(251,191,36,0.3)' }}>
        {countdown}
      </div>
      <div className="mt-8 flex items-center gap-3 relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-3xl shadow-xl`}>{av.emoji}</div>
        <div>
          <p className="text-white text-xl font-black">{playerName}</p>
          <p className="text-white/40 text-sm">{humanPlayers.length} player{humanPlayers.length!==1?'s':''} ready</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col">
      {/* Header */}
      <header className="bg-black/50 border-b border-white/10 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 text-sm transition-colors">← Exit</button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${sessionId ? 'bg-green-400 animate-pulse' : 'bg-yellow-400 animate-pulse'}`}/>
            <span className="text-white font-black text-sm">🏔️ PinnacleQuiz — Live Lobby</span>
          </div>
          <div className="text-white/30 text-xs">{humanPlayers.length} joined</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto w-full px-4 py-6 flex-1">

        {/* TOP: Game PIN + Quiz Info */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* PIN */}
          <div className="md:col-span-2 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl p-6 text-center">
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-2">🎮 Game PIN — Share with your class</p>
            <button onClick={copyCode}
              className="inline-flex items-center gap-4 hover:scale-[1.02] transition-all group mb-2">
              <span className="text-white font-black text-6xl tracking-[0.3em] drop-shadow-lg">{gameCode}</span>
              <span className="text-white/30 group-hover:text-purple-400 text-2xl transition-colors">{copied?'✓':'📋'}</span>
            </button>
            {copied && <p className="text-green-400 text-xs font-bold">Copied!</p>}
            <p className="text-white/30 text-xs mt-2">Students: Open PinnacleQuiz → Join with Code → Enter <strong className="text-white/60">{gameCode}</strong></p>
          </div>

          {/* Quiz card */}
          <div className={`bg-gradient-to-br ${quiz.coverColor} rounded-2xl p-5 flex flex-col justify-between shadow-xl`}>
            <div className="text-4xl mb-3">{quiz.icon}</div>
            <div>
              <p className="text-white font-black text-lg leading-tight">{quiz.title}</p>
              <p className="text-white/70 text-sm mt-1">{quiz.questions.length} questions · {quiz.grade}</p>
              <p className="text-white/50 text-xs mt-0.5">{quiz.subject}</p>
            </div>
          </div>
        </div>

        {sessionError && (
          <div className="bg-red-500/15 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">⚠️ {sessionError}</div>
        )}

        <div className="grid md:grid-cols-2 gap-5">

          {/* LEFT: Host Controls */}
          <div className="space-y-4">
            {/* Host profile */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-black text-base mb-4 flex items-center gap-2">👑 Host Controls</h3>

              {!joined ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>{av.emoji}</div>
                    <div className="flex-1">
                      <input type="text" value={playerName}
                        onChange={e => { setPlayerName(e.target.value); setNameError(''); }}
                        placeholder="Your display name…" maxLength={20}
                        className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm font-bold"/>
                      {nameError && <p className="text-red-400 text-xs mt-1">⚠ {nameError}</p>}
                    </div>
                  </div>
                  {/* Avatar quick picker */}
                  <div className="grid grid-cols-8 gap-1 mb-4">
                    {CARTOON_AVATARS.slice(0,8).map(a => (
                      <button key={a.id} onClick={() => setAvatarId(a.id)}
                        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.bg} flex items-center justify-center text-lg transition-all hover:scale-110 ${avatarId===a.id?'ring-2 ring-yellow-400 scale-110':'opacity-60'}`}>
                        {a.emoji}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleJoinAsHost}
                    className="w-full py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm mb-3">
                    ✋ Join as Host
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3 mb-4 bg-purple-500/15 border border-purple-400/25 rounded-xl p-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-2xl flex-shrink-0`}>{av.emoji}</div>
                  <div>
                    <p className="text-white font-black text-sm">{playerName}</p>
                    <p className="text-purple-300 text-xs">👑 Host — Ready</p>
                  </div>
                </div>
              )}

              {/* Add bots toggle */}
              <div className="flex items-center justify-between bg-white/4 border border-white/8 rounded-xl p-3 mb-4">
                <div>
                  <p className="text-white font-bold text-sm">🤖 Add AI Players</p>
                  <p className="text-white/35 text-xs">Fill empty spots with bots</p>
                </div>
                <button onClick={() => setAddBots(b => !b)}
                  className={`relative w-12 h-6 rounded-full transition-all ${addBots?'bg-purple-500':'bg-white/15'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${addBots?'left-6':'left-0.5'}`}/>
                </button>
              </div>

              {/* START BUTTON */}
              <button onClick={handleStartGame}
                disabled={!joined && !playerName.trim()}
                className="w-full py-5 font-black text-white text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{
                  background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                  boxShadow: '0 8px 32px rgba(124,58,237,0.5)',
                }}>
                🚀 Start Game
                {humanPlayers.length > 0 && (
                  <span className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    {humanPlayers.length} player{humanPlayers.length!==1?'s':''}
                  </span>
                )}
              </button>
              <p className="text-white/25 text-xs text-center mt-2">
                All players on their devices will start simultaneously
              </p>
            </div>
          </div>

          {/* RIGHT: Live Player List */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-black text-base flex items-center gap-2">
                👥 Players
                <span className="text-white/40 text-sm font-normal">({humanPlayers.length})</span>
              </h3>
              <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/25 rounded-full px-2.5 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-green-400 text-xs font-bold">LIVE</span>
              </div>
            </div>

            {humanPlayers.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4 animate-bounce">👀</div>
                <p className="text-white/30 font-bold">Waiting for players…</p>
                <p className="text-white/20 text-sm mt-1">Share the PIN: <strong className="text-white/40 tracking-widest">{gameCode}</strong></p>
                <div className="mt-4 flex gap-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-purple-500/50"
                      style={{ animation: `bounce 1s ease-in-out ${i*0.2}s infinite` }}/>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-2 overflow-y-auto max-h-96">
                {humanPlayers.map((p, i) => {
                  const pav = getAvatar(p.avatar_id);
                  const isMe = p.player_id === (mockUser?.id ?? '');
                  return (
                    <div key={p.id}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 group transition-all ${
                        p.is_host ? 'bg-purple-500/20 border border-purple-400/30' :
                        isMe ? 'bg-blue-500/15 border border-blue-400/25' :
                        'bg-white/5 border border-white/8 hover:bg-white/8'
                      }`}>
                      <span className="text-white/25 text-xs w-5 text-center font-bold">{i+1}</span>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pav.bg} flex items-center justify-center text-xl flex-shrink-0 shadow-md`}>{pav.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{p.display_name}</p>
                        <p className="text-white/30 text-xs">House {p.house}</p>
                      </div>
                      {p.is_host && <span className="text-yellow-400 text-xs font-black bg-yellow-400/10 px-2 py-0.5 rounded-full">HOST</span>}
                      {!p.is_host && (
                        <button onClick={() => removePlayer(p.player_id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400/60 hover:text-red-400 text-lg transition-all"
                          title="Remove player">×</button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {humanPlayers.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/8 text-center">
                <p className="text-white/25 text-xs">
                  {humanPlayers.length} real player{humanPlayers.length!==1?'s':''} connected
                  {addBots ? ' · AI players will fill remaining spots' : ' · AI off (human only)'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
