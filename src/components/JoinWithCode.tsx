import { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { getAvatar, CARTOON_AVATARS } from '../lib/avatars';
import { MockUser } from '../AppPreview';
import { supabase } from '../lib/supabase';
import { findGame, joinLobby } from '../lib/gameStore';

const HOUSES = [
  { id:'Alpha',  color:'#ef4444', icon:'🔴', bg:'from-red-600 to-red-800',    motto:'Strength & Honor' },
  { id:'Beta',   color:'#3b82f6', icon:'🔵', bg:'from-blue-600 to-blue-800',  motto:'Wisdom & Truth' },
  { id:'Gamma',  color:'#10b981', icon:'🟢', bg:'from-green-600 to-green-800',motto:'Growth & Unity' },
  { id:'Pulsar', color:'#f59e0b', icon:'🟡', bg:'from-amber-500 to-yellow-600',motto:'Speed & Light' },
];

const NICKNAME_SUGGESTIONS = [
  'MathKing','SpeedStar','NumberNinja','QuickBrain','LightningBoy',
  'GeniusGirl','BrainStorm','AlgebraAce','SwiftMind','ComboKing',
  'ArenaChamp','MathWizard','ThinkFast','RapidFire','CodeNinja',
];

interface Props {
  user: MockUser | null;
  prefillCode?: string;
  onJoined: (code: string, nickname: string, house: string, avatarId: string) => void;
  onBack: () => void;
}

export default function JoinWithCode({ user, prefillCode = '', onJoined, onBack }: Props) {
  const [step,      setStep]      = useState<1|2|3>(1); // 1=code, 2=identity, 3=waiting
  const [code,      setCode]      = useState(prefillCode);
  const [nickname,  setNickname]  = useState(user?.full_name ?? '');
  const [house,     setHouse]     = useState(user?.house as string ?? 'Alpha');
  const [avatarId,  setAvatarId]  = useState(user?.avatar_id ?? '0');
  const [error,     setError]     = useState('');
  const [joining,   setJoining]   = useState(false);
  const [sessionId, setSessionId] = useState<string|null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const playerId = useRef(user?.id ?? 'guest-' + Date.now());

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 200);
    soundEngine.startBgMusic('home');
  }, []);

  // ── Watch for host to start game (realtime) ───────────────────
  useEffect(() => {
    if (!sessionId || step !== 3) return;
    // Subscribe to session status changes
    const channel = supabase
      .channel(`join-session-${sessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'game_sessions',
        filter: `id=eq.${sessionId}`,
      }, payload => {
        if (payload.new?.status === 'active') {
          setGameStarted(true);
          soundEngine.hype();
          setTimeout(() => {
            onJoined(code, nickname.trim(), house, avatarId);
          }, 800);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [sessionId, step, code, nickname, house, avatarId, onJoined]);

  // ── Step 1: Validate code ────────────────────────────────────
  const handleCodeSubmit = async () => {
    const trimmedCode = code.trim();
    if (trimmedCode.length !== 6) { setError('Please enter the full 6-digit code'); return; }
    setError('');
    setJoining(true);

    // findGame checks memory store first then Supabase
    const result = await findGame(trimmedCode);
    setJoining(false);

    if (!result) {
      setError('❌ Game not found. Ask your teacher to check the code.');
      return;
    }

    setSessionId(result.sessionId);
    soundEngine.click();
    setStep(2);
  };

  // ── Step 2: Save player to lobby then wait ───────────────────
  const handleJoin = async () => {
    if (!nickname.trim()) { setError('Please enter a nickname'); return; }
    if (!sessionId) { setError('Session lost, please go back and try again'); return; }
    setError('');
    setJoining(true);
    soundEngine.joinRoom();

    // Add to lobby — works via gameStore (memory + Supabase)
    await joinLobby(sessionId, {
      playerId:    playerId.current,
      displayName: nickname.trim(),
      avatarId,
      house,
      isHost:      false,
    });
    setJoining(false);

    // Check if game already active
    const result = await findGame(code.trim());
    if (!result) { setStep(3); return; }

    // Otherwise enter waiting room
    setStep(3);
  };

  const handleDigitInput = (val: string) => {
    const v = val.replace(/\D/g,'').slice(0,6);
    setCode(v);
    setError('');
    if (v.length === 6) {
      setTimeout(() => { soundEngine.click(); setStep(2); setSessionId(null); }, 200);
      // Still validate via handleCodeSubmit logic inline
      findGame(v).then(result => {
        if (!result) { setError('❌ Game not found. Check the code.'); setStep(1); return; }
        setSessionId(result.sessionId);
      });
    }
  };

  const myAvatar = getAvatar(avatarId);
  const myHouse  = HOUSES.find(h => h.id === house)!;

  // ══════════════════════════════════════════════════════════════
  // STEP 3 — WAITING ROOM (player joined, waiting for host)
  // ══════════════════════════════════════════════════════════════
  if (step === 3) return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {gameStarted ? (
          <>
            <div className="text-8xl mb-4 animate-bounce">🚀</div>
            <h2 className="text-3xl font-black text-white mb-2">Game Starting!</h2>
            <p className="text-white/50">Get ready…</p>
          </>
        ) : (
          <>
            {/* Player card */}
            <div className="mb-8">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${myAvatar.bg} flex items-center justify-center text-5xl mx-auto mb-4 shadow-2xl`}
                style={{ boxShadow: `0 0 40px ${myAvatar.glow}60` }}>
                {myAvatar.emoji}
              </div>
              <h2 className="text-2xl font-black text-white">{nickname}</h2>
              <div className="text-sm font-bold mt-1" style={{ color: myHouse.color }}>
                {myHouse.icon} House {house}
              </div>
            </div>

            {/* Status */}
            <div className="bg-green-500/15 border border-green-500/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-green-400 font-black text-sm">YOU'RE IN THE LOBBY!</span>
              </div>
              <div className="text-white/60 text-sm">
                You've joined game <span className="text-yellow-400 font-black tracking-widest">{code}</span>
              </div>
              <div className="text-white/40 text-xs mt-2">
                Waiting for the host to start the game…
              </div>
            </div>

            {/* Animated waiting indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[0,1,2,3].map(i => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-purple-500"
                  style={{ animation: `bounce 1s ease-in-out ${i*0.15}s infinite` }}/>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
              <p className="text-white/40 text-sm">💡 Your teacher will start the game for everyone when ready. Stay on this screen!</p>
            </div>

            <button onClick={() => {
              // Remove from lobby then go back
              if (sessionId) {
                supabase.from('lobby_players').delete()
                  .eq('session_id', sessionId).eq('player_id', playerId.current).then(() => {});
              }
              onBack();
            }} className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← Leave game
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle,#7c3aed,transparent)' }}/>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle,#f59e0b,transparent)', animationDelay:'1.5s' }}/>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 text-sm transition-colors">← Back</button>
        <span className="text-white font-black text-sm">🏔️ PinnacleQuiz</span>
        <div className="flex gap-1.5">
          {[1,2].map(s => (
            <div key={s} className={`w-6 h-1.5 rounded-full transition-all ${s <= step ? 'bg-yellow-400' : 'bg-white/15'}`}/>
          ))}
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">

          {/* ── STEP 1: Enter Code ── */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="text-6xl mb-3">🎮</div>
                <h1 className="text-3xl font-black text-white mb-2">Join a Game</h1>
                <p className="text-white/40 text-sm">Enter the 6-digit code from your teacher</p>
              </div>

              <div className="mb-6">
                <label className="text-white/40 text-xs font-bold tracking-widest uppercase block mb-4 text-center">GAME PIN</label>
                <div className="flex gap-2 justify-center mb-4">
                  {[0,1,2,3,4,5].map(i => (
                    <div key={i}
                      className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                        code[i] ? 'border-yellow-400 bg-yellow-400/15 text-white'
                        : i === code.length ? 'border-yellow-400/50 bg-yellow-400/5 text-white/20 animate-pulse'
                        : 'border-white/12 bg-white/4 text-white/15'
                      }`}>
                      {code[i] ?? '·'}
                    </div>
                  ))}
                </div>
                <input ref={inputRef} type="tel" inputMode="numeric" value={code}
                  onChange={e => handleDigitInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleCodeSubmit()}
                  placeholder="Type code here" maxLength={6}
                  className="w-full bg-white/8 border-2 border-white/15 text-white text-center text-3xl font-black placeholder-white/20 rounded-2xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-all tracking-[0.4em]"/>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {['1','2','3','4','5','6','7','8','9','⌫','0','→'].map(k => (
                  <button key={k} onClick={() => {
                    soundEngine.click();
                    if (k === '⌫') setCode(c => c.slice(0,-1));
                    else if (k === '→') handleCodeSubmit();
                    else handleDigitInput(code + k);
                  }}
                  className={`py-4 rounded-2xl font-black text-xl transition-all active:scale-90 border ${
                    k === '⌫' ? 'bg-red-500/15 text-red-400 border-red-500/25 hover:bg-red-500/25' :
                    k === '→' ? 'bg-yellow-500/25 text-yellow-300 border-yellow-500/35 hover:bg-yellow-500/35' :
                    'bg-white/8 text-white border-white/10 hover:bg-white/15'
                  }`}>{k}</button>
                ))}
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 text-center">⚠ {error}</div>}

              <button onClick={handleCodeSubmit} disabled={code.length !== 6 || joining}
                className="w-full py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-yellow-500/25 disabled:opacity-30 flex items-center justify-center gap-2">
                {joining ? <><div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin"/>Checking...</> : '→ Continue'}
              </button>

              <div className="mt-5 bg-blue-500/8 border border-blue-400/20 rounded-2xl p-4">
                <p className="text-blue-400 text-xs font-bold mb-2">💡 Where is the code?</p>
                <ul className="text-white/40 text-xs space-y-1">
                  <li>1. Your teacher starts a game on PinnacleQuiz</li>
                  <li>2. A big 6-digit PIN appears on their screen</li>
                  <li>3. They write it on the board or tell you verbally</li>
                  <li>4. Type those 6 digits here and join!</li>
                </ul>
              </div>
            </div>
          )}

          {/* ── STEP 2: Identity ── */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-400/25 text-green-400 text-xs font-bold px-4 py-2 rounded-full mb-3">
                  ✓ Game <span className="tracking-widest font-black">{code}</span> found!
                </div>
                <h2 className="text-3xl font-black text-white mb-1">Set Your Identity</h2>
                <p className="text-white/40 text-sm">Pick a nickname, avatar and house</p>
              </div>

              {/* Avatar */}
              <div className="mb-5">
                <label className="text-white/40 text-xs font-bold tracking-wider uppercase block mb-3">Your Avatar</label>
                <div className="flex items-center gap-4 mb-3 p-3 bg-white/4 rounded-2xl border border-white/8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${myAvatar.bg} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${myAvatar.glow}50` }}>{myAvatar.emoji}</div>
                  <div>
                    <div className="text-white font-bold">{myAvatar.label}</div>
                    <div className="text-white/40 text-xs">Tap any avatar below</div>
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {CARTOON_AVATARS.slice(0,16).map(av => {
                    const a = getAvatar(av.id);
                    return (
                      <button key={av.id} onClick={() => { setAvatarId(av.id); soundEngine.click(); }}
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-xl transition-all hover:scale-110 ${avatarId === av.id ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-70'}`}
                        style={avatarId === av.id ? { boxShadow: `0 0 12px ${a.glow}` } : {}}>
                        {av.emoji}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nickname */}
              <div className="mb-5">
                <label className="text-white/40 text-xs font-bold tracking-wider uppercase block mb-2">Nickname</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={nickname} onChange={e => { setNickname(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleJoin()}
                    placeholder="e.g. MathKing..." maxLength={20}
                    className="flex-1 bg-white/8 border-2 border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all font-bold text-lg"/>
                  <button onClick={() => { setNickname(NICKNAME_SUGGESTIONS[Math.floor(Math.random()*NICKNAME_SUGGESTIONS.length)]); soundEngine.click(); }}
                    className="px-3 bg-white/8 border border-white/15 text-white/50 rounded-xl hover:bg-white/15 transition-all text-xl">🎲</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {NICKNAME_SUGGESTIONS.slice(0,6).map(n => (
                    <button key={n} onClick={() => { setNickname(n); soundEngine.click(); }}
                      className="text-xs px-2.5 py-1 bg-white/5 border border-white/8 text-white/45 rounded-full hover:bg-white/12 hover:text-white/70 transition-all">{n}</button>
                  ))}
                </div>
              </div>

              {/* House */}
              <div className="mb-5">
                <label className="text-white/40 text-xs font-bold tracking-wider uppercase block mb-3">Your House</label>
                <div className="grid grid-cols-2 gap-2">
                  {HOUSES.map(h => (
                    <button key={h.id} onClick={() => { setHouse(h.id); soundEngine.click(); }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${house === h.id ? 'scale-[1.02]' : 'opacity-60 hover:opacity-90'}`}
                      style={{ borderColor: house===h.id?h.color:h.color+'35', background: house===h.id?h.color+'20':h.color+'08' }}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xl">{h.icon}</span>
                        <span className="text-white font-black text-sm">{h.id}</span>
                        {house===h.id && <span className="ml-auto" style={{color:h.color}}>✓</span>}
                      </div>
                      <div className="text-white/35 text-xs italic">"{h.motto}"</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white/4 border border-white/8 rounded-2xl p-3 mb-4 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${myAvatar.bg} flex items-center justify-center text-2xl flex-shrink-0`}
                  style={{ boxShadow: `0 0 12px ${myAvatar.glow}40` }}>{myAvatar.emoji}</div>
                <div>
                  <div className="text-white font-bold">{nickname || '...'}</div>
                  <div className="text-xs font-semibold" style={{ color: myHouse.color }}>{myHouse.icon} House {house} · Game {code}</div>
                </div>
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 text-center">⚠ {error}</div>}

              <button onClick={handleJoin} disabled={!nickname.trim() || joining}
                className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-green-500/25 disabled:opacity-40 flex items-center justify-center gap-2">
                {joining ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Joining...</> : '🚀 Join Game!'}
              </button>
              <button onClick={() => { setStep(1); setError(''); soundEngine.click(); }}
                className="w-full mt-3 py-3 text-white/40 hover:text-white text-sm font-semibold transition-colors text-center">← Change code</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
