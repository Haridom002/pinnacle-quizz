import { useState, useEffect, useRef, useCallback } from 'react';
import { Quiz, Player } from '../types';
import { getAvatar, CARTOON_AVATARS } from '../lib/avatars';
import { joinLobby, getLobbyPlayers, startGame } from '../lib/gameStore';
import { supabase } from '../lib/supabase';

interface MockUser { id:string; full_name:string; avatar_id:string; house?:unknown; [k:string]:unknown; }
interface LobbyPlayer { player_id:string; display_name:string; avatar_id:string; house:string; is_host:boolean; }

interface Props {
  quiz: Quiz;
  gameCode: string;
  sessionId?: string;
  mockUser: MockUser | null;
  onStartGame: (player: Player, bots: Player[]) => void;
  onBack: () => void;
}

export default function LobbyPreview({ quiz, gameCode, sessionId: propSid, mockUser, onStartGame, onBack }: Props) {
  const [name,        setName]        = useState(mockUser?.full_name ?? '');
  const [avatarId,    setAvatarId]    = useState(mockUser?.avatar_id ?? '0');
  const [nameErr,     setNameErr]     = useState('');
  const [joined,      setJoined]      = useState(false);
  const [copied,      setCopied]      = useState(false);
  const [countdown,   setCountdown]   = useState<number|null>(null);
  const [players,     setPlayers]     = useState<LobbyPlayer[]>([]);
  const [sessionId,   setSessionId]   = useState(propSid ?? '');
  const playerRef = useRef<Player|null>(null);
  const pollRef   = useRef<ReturnType<typeof setInterval>|null>(null);
  const av = getAvatar(avatarId);

  // Resolve sessionId from gameCode if not passed
  useEffect(() => {
    if (sessionId) return;
    if (!gameCode) return;
    supabase.from('game_sessions').select('id').eq('game_code', gameCode).single()
      .then(({ data }) => { if (data) setSessionId(data.id); });
  }, [gameCode, sessionId]);

  // Poll lobby players every 2 seconds
  useEffect(() => {
    if (!sessionId) return;
    const poll = async () => {
      const data = await getLobbyPlayers(sessionId);
      setPlayers(data as LobbyPlayer[]);
    };
    poll();
    pollRef.current = setInterval(poll, 2000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [sessionId]);

  // Countdown → start game
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      if (playerRef.current) onStartGame(playerRef.current, []);
      return;
    }
    const t = setTimeout(() => setCountdown(c => c!==null ? c-1 : null), 1000);
    return () => clearTimeout(t);
  }, [countdown, onStartGame]);

  const doJoin = useCallback(async (isHost: boolean) => {
    if (!name.trim()) { setNameErr('Enter your name'); return; }
    if (!sessionId) { setNameErr('Connecting…'); return; }
    const pid = mockUser?.id ?? (isHost?'host-':'player-') + Date.now();
    const player: Player = { id: pid, name: name.trim(), avatar: av.emoji, score:0, streak:0, answers:[] };
    playerRef.current = player;
    await joinLobby(sessionId, {
      playerId: pid, displayName: name.trim(),
      avatarId, house: (mockUser?.house as string) ?? 'Alpha', isHost,
    });
    setJoined(true);
    return pid;
  }, [name, sessionId, mockUser, av.emoji, avatarId]);

  const handleStart = useCallback(async () => {
    if (!joined) await doJoin(true);
    if (!sessionId) return;
    await startGame(gameCode, sessionId);
    setCountdown(3);
  }, [joined, doJoin, sessionId, gameCode]);

  const copy = () => {
    navigator.clipboard.writeText(gameCode).catch(()=>{});
    setCopied(true); setTimeout(()=>setCopied(false), 2000);
  };

  // Countdown overlay
  if (countdown !== null && countdown > 0) return (
    <div className="fixed inset-0 bg-[#0d0d1a] flex flex-col items-center justify-center z-50">
      <p className="text-white/40 text-sm font-bold tracking-widest uppercase mb-4">Starting in</p>
      <div className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-500 leading-none">{countdown}</div>
      <p className="text-white text-xl font-bold mt-6">{name} — Get ready! 🎮</p>
      <p className="text-white/30 text-sm mt-2">{players.length} players</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col">
      <header className="bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-white/50 hover:text-white text-sm">← Back</button>
        <span className="text-white font-black text-sm">🏔️ Game Lobby</span>
        <span className="text-white/30 text-xs">{players.length} joined</span>
      </header>

      <div className="max-w-4xl mx-auto w-full px-4 py-6 flex-1">

        {/* PIN */}
        <div className="text-center mb-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/25 rounded-2xl p-6">
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">📌 Game PIN — Share with class</p>
          <button onClick={copy} className="inline-flex items-center gap-3 group">
            <span className="text-white font-black text-6xl tracking-[0.3em]">{gameCode}</span>
            <span className="text-white/30 group-hover:text-purple-400 text-2xl">{copied?'✓':'📋'}</span>
          </button>
          {copied && <p className="text-green-400 text-xs mt-1 font-bold">Copied!</p>}
          <p className="text-white/25 text-xs mt-2">Students → Join with Code → type <strong className="text-white/50">{gameCode}</strong></p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Host controls */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-black text-base mb-4">👑 Host</h3>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-3xl flex-shrink-0`}>{av.emoji}</div>
              <input type="text" value={name} onChange={e=>{setName(e.target.value);setNameErr('');}}
                placeholder="Your name…" disabled={joined} maxLength={20}
                className="flex-1 bg-white/8 border border-white/15 text-white placeholder-white/25 rounded-xl px-3 py-2.5 outline-none focus:border-purple-400 text-sm font-bold disabled:opacity-50"/>
            </div>

            {!joined && (
              <div className="grid grid-cols-8 gap-1 mb-4">
                {CARTOON_AVATARS.slice(0,8).map(a=>(
                  <button key={a.id} onClick={()=>setAvatarId(a.id)}
                    className={`w-9 h-9 rounded-lg bg-gradient-to-br ${a.bg} flex items-center justify-center text-lg transition-all hover:scale-110 ${avatarId===a.id?'ring-2 ring-yellow-400 scale-110':'opacity-60'}`}>
                    {a.emoji}
                  </button>
                ))}
              </div>
            )}

            {nameErr && <p className="text-red-400 text-xs mb-3">⚠ {nameErr}</p>}

            {!joined ? (
              <button onClick={()=>doJoin(true)}
                className="w-full py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm mb-3">
                ✋ Join as Host
              </button>
            ) : (
              <div className="bg-purple-500/15 border border-purple-400/25 rounded-xl p-3 mb-3 flex items-center gap-2">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${av.bg} flex items-center justify-center text-xl`}>{av.emoji}</div>
                <div><p className="text-white font-bold text-sm">{name}</p><p className="text-purple-300 text-xs">👑 Host</p></div>
              </div>
            )}

            <button onClick={handleStart}
              className="w-full py-5 font-black text-white text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl flex items-center justify-center gap-2"
              style={{background:'linear-gradient(135deg,#7c3aed,#4f46e5)',boxShadow:'0 8px 32px rgba(124,58,237,0.4)'}}>
              🚀 Start Game
              {players.length > 0 && (
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  {players.length} player{players.length!==1?'s':''}
                </span>
              )}
            </button>
            <p className="text-white/20 text-xs text-center mt-2">All joined players start simultaneously</p>
          </div>

          {/* Live players */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-black text-base">
                👥 Players <span className="text-white/35 font-normal text-sm">({players.length})</span>
              </h3>
              <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-green-400 text-xs font-bold">LIVE</span>
              </div>
            </div>

            {players.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-10">
                <div className="text-5xl mb-3 animate-bounce">👀</div>
                <p className="text-white/30 font-bold text-sm">Waiting for players…</p>
                <p className="text-white/20 text-xs mt-1">Share PIN: <strong className="text-white/40 tracking-widest">{gameCode}</strong></p>
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto max-h-80">
                {players.map((p, i) => {
                  const pav = getAvatar(p.avatar_id);
                  return (
                    <div key={p.player_id}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${p.is_host?'bg-purple-500/20 border border-purple-400/25':'bg-white/5 border border-white/8'}`}>
                      <span className="text-white/25 text-xs w-5 text-right">{i+1}</span>
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${pav.bg} flex items-center justify-center text-xl flex-shrink-0`}>{pav.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{p.display_name}</p>
                        <p className="text-white/30 text-xs">House {p.house}</p>
                      </div>
                      {p.is_host && <span className="text-yellow-400 text-xs font-black bg-yellow-400/10 px-2 py-0.5 rounded-full">HOST</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
