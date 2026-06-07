import { useState, useEffect, useRef } from 'react';
import { getAvatar, CARTOON_AVATARS } from '../lib/avatars';
import { MockUser } from '../AppPreview';
import { findGame, joinLobby, getSessionStatus } from '../lib/gameStore';
import { soundEngine } from '../utils/soundEngine';

interface Props {
  user: MockUser | null;
  onJoined: (code: string, nickname: string, house: string, avatarId: string) => void;
  onBack: () => void;
}

const HOUSES = [
  { id:'Alpha',  color:'#ef4444', emoji:'🦁' },
  { id:'Beta',   color:'#3b82f6', emoji:'🦅' },
  { id:'Gamma',  color:'#10b981', emoji:'🐯' },
  { id:'Pulsar', color:'#f59e0b', emoji:'⭐' },
];

export default function JoinWithCode({ user, onJoined, onBack }: Props) {
  const [step,      setStep]      = useState<1|2|3>(1);
  const [code,      setCode]      = useState('');
  const [nickname,  setNickname]  = useState(user?.full_name ?? '');
  const [house,     setHouse]     = useState(user?.house as string ?? 'Alpha');
  const [avatarId,  setAvatarId]  = useState(user?.avatar_id ?? '0');
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [dots,      setDots]      = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const sessionRef = useRef<string>('');
  const codeRef    = useRef<string>('');
  const pollRef    = useRef<ReturnType<typeof setInterval>|null>(null);
  const av = getAvatar(avatarId);

  // Animate waiting dots
  useEffect(() => {
    if (step !== 3) return;
    const t = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 500);
    return () => clearInterval(t);
  }, [step]);

  // Poll for game start (every 2 seconds)
  useEffect(() => {
    if (step !== 3 || !sessionRef.current) return;
    pollRef.current = setInterval(async () => {
      const status = await getSessionStatus(sessionRef.current);
      if (status === 'active') {
        clearInterval(pollRef.current!);
        setGameStarted(true);
        soundEngine.hype();
        setTimeout(() => {
          onJoined(codeRef.current, nickname, house, avatarId);
        }, 1500);
      }
    }, 2000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [step, nickname, house, avatarId, onJoined]);

  // Step 1 — validate code
  const handleCode = async () => {
    if (code.trim().length !== 6) { setError('Enter all 6 digits'); return; }
    setError(''); setLoading(true);
    const result = await findGame(code.trim());
    setLoading(false);
    if (!result) { setError('Game not found. Check the code and try again.'); return; }
    codeRef.current = code.trim();
    sessionRef.current = result.sessionId;
    soundEngine.click();
    setStep(2);
  };

  // Step 2 — join lobby
  const handleJoin = async () => {
    if (!nickname.trim()) { setError('Enter a nickname'); return; }
    setError(''); setLoading(true);
    const playerId = user?.id ?? 'guest-' + Date.now();
    await joinLobby(sessionRef.current, {
      playerId, displayName: nickname.trim(),
      avatarId, house, isHost: false,
    });
    setLoading(false);
    soundEngine.click();
    setStep(3);
  };

  // ── Step 3: Waiting room ──────────────────────────────────────
  if (step === 3) return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        {gameStarted ? (
          <div>
            <div className="text-8xl mb-4 animate-bounce">🚀</div>
            <h2 className="text-3xl font-black text-white">Starting!</h2>
          </div>
        ) : (
          <div>
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-5xl mx-auto mb-5 shadow-2xl`}
              style={{ boxShadow: `0 0 40px ${av.glow}60` }}>{av.emoji}</div>
            <h2 className="text-2xl font-black text-white mb-1">{nickname}</h2>
            <p className="text-white/40 text-sm mb-6">
              {HOUSES.find(h=>h.id===house)?.emoji} House {house}
            </p>
            <div className="bg-green-500/15 border border-green-500/30 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-green-400 font-black text-sm">YOU'RE IN!</span>
              </div>
              <p className="text-white/60 text-sm">Game code: <span className="text-yellow-400 font-black tracking-widest">{codeRef.current}</span></p>
              <p className="text-white/40 text-xs mt-2">Waiting for host to start{dots}</p>
            </div>
            <div className="flex justify-center gap-2 mb-6">
              {[0,1,2].map(i => (
                <div key={i} className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
                  style={{ animationDelay: `${i*0.15}s` }}/>
              ))}
            </div>
            <button onClick={() => { if(pollRef.current) clearInterval(pollRef.current); onBack(); }}
              className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← Leave game
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col">
      <header className="bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/50 hover:text-white text-sm transition-colors">← Back</button>
        <span className="text-white font-black text-sm">🏔️ Join Game</span>
        <div className="flex gap-1">
          {[1,2].map(s => (
            <div key={s} className={`w-8 h-1.5 rounded-full transition-all ${s<=step?'bg-yellow-400':'bg-white/15'}`}/>
          ))}
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">

          {/* ── STEP 1: Enter Code ── */}
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <div className="text-6xl mb-3">🎮</div>
                <h1 className="text-3xl font-black text-white mb-2">Join a Game</h1>
                <p className="text-white/40 text-sm">Enter the 6-digit code from your teacher</p>
              </div>

              {/* Big digit display */}
              <div className="flex gap-2 justify-center mb-5">
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                    code[i] ? 'border-yellow-400 bg-yellow-400/15 text-white'
                    : i===code.length ? 'border-yellow-400/40 bg-yellow-400/5 text-white/20'
                    : 'border-white/12 bg-white/4 text-white/15'
                  }`}>{code[i] ?? '·'}</div>
                ))}
              </div>

              {/* Hidden input for mobile keyboard */}
              <input
                type="tel" inputMode="numeric" value={code}
                onChange={e => { setCode(e.target.value.replace(/\D/g,'').slice(0,6)); setError(''); }}
                onKeyDown={e => e.key==='Enter' && handleCode()}
                placeholder="Tap here to type code"
                className="w-full bg-white/8 border-2 border-white/15 focus:border-yellow-400 text-white text-center text-2xl font-black placeholder-white/20 rounded-2xl px-4 py-4 outline-none transition-all tracking-[0.3em] mb-4"/>

              {/* Numpad */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['1','2','3','4','5','6','7','8','9','⌫','0','OK'].map(k => (
                  <button key={k}
                    onClick={() => {
                      if (k==='⌫') { setCode(c=>c.slice(0,-1)); }
                      else if (k==='OK') handleCode();
                      else if (code.length<6) setCode(c=>c+k);
                    }}
                    className={`py-4 rounded-2xl font-black text-xl transition-all active:scale-90 border ${
                      k==='⌫' ? 'bg-red-500/15 text-red-400 border-red-500/25' :
                      k==='OK' ? 'bg-yellow-500/25 text-yellow-300 border-yellow-500/40' :
                      'bg-white/8 text-white border-white/10 hover:bg-white/15'
                    }`}>{k}</button>
                ))}
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 text-center">{error}</div>}

              <button onClick={handleCode} disabled={code.length!==6||loading}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black text-lg rounded-2xl disabled:opacity-30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                {loading ? <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"/>Checking...</> : '→ Find Game'}
              </button>
            </div>
          )}

          {/* ── STEP 2: Identity ── */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-400/25 text-green-400 text-xs font-bold px-4 py-2 rounded-full mb-3">
                  ✓ Game <span className="tracking-widest font-black mx-1">{code}</span> found!
                </div>
                <h2 className="text-2xl font-black text-white">Who are you?</h2>
              </div>

              {/* Avatar picker */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>{av.emoji}</div>
                  <p className="text-white/50 text-sm">Pick your avatar below</p>
                </div>
                <div className="grid grid-cols-8 gap-1.5">
                  {CARTOON_AVATARS.slice(0,16).map(a => (
                    <button key={a.id} onClick={()=>setAvatarId(a.id)}
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.bg} flex items-center justify-center text-xl transition-all hover:scale-110 ${avatarId===a.id?'ring-2 ring-yellow-400 scale-110':'opacity-60'}`}>
                      {a.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nickname */}
              <div className="mb-4">
                <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">Nickname</label>
                <input type="text" value={nickname}
                  onChange={e=>{setNickname(e.target.value);setError('');}}
                  onKeyDown={e=>e.key==='Enter'&&handleJoin()}
                  placeholder="e.g. MathKing…" maxLength={20}
                  className="w-full bg-white/8 border-2 border-white/15 focus:border-purple-400 text-white placeholder-white/25 rounded-xl px-4 py-3 outline-none font-bold text-lg transition-all"/>
              </div>

              {/* House */}
              <div className="mb-5">
                <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">House</label>
                <div className="grid grid-cols-2 gap-2">
                  {HOUSES.map(h=>(
                    <button key={h.id} onClick={()=>setHouse(h.id)}
                      className={`p-3 rounded-xl border-2 flex items-center gap-2 transition-all ${house===h.id?'scale-[1.02]':'opacity-60'}`}
                      style={{borderColor:house===h.id?h.color:h.color+'30',background:house===h.id?h.color+'20':'transparent'}}>
                      <span className="text-xl">{h.emoji}</span>
                      <span className="text-white font-black text-sm">{h.id}</span>
                      {house===h.id&&<span className="ml-auto" style={{color:h.color}}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 text-center">{error}</div>}

              <button onClick={handleJoin} disabled={!nickname.trim()||loading}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg rounded-2xl disabled:opacity-40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                {loading ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Joining...</> : '🚀 Join Game!'}
              </button>

              <button onClick={()=>{setStep(1);setError('');}}
                className="w-full mt-3 py-2 text-white/40 hover:text-white text-sm transition-colors text-center">
                ← Change code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
