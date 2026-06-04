// ================================================================
// JoinWithCode — Standalone screen shown when student clicks
// "Join a Game" from the home screen.
// Teachers share the 6-digit PIN and students land here directly.
// ================================================================
import { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';
import { getAvatar, CARTOON_AVATARS } from '../lib/avatars';
import { MockUser } from '../AppPreview';

const HOUSES = [
  { id:'Alpha',  color:'#ef4444', icon:'🔴', bg:'from-red-600 to-red-800',    motto:'Strength & Honor' },
  { id:'Beta',   color:'#3b82f6', icon:'🔵', bg:'from-blue-600 to-blue-800',  motto:'Wisdom & Truth' },
  { id:'Gamma',  color:'#10b981', icon:'🟢', bg:'from-green-600 to-green-800',motto:'Growth & Unity' },
  { id:'Pulsar', color:'#f59e0b', icon:'🟡', bg:'from-amber-500 to-yellow-600',motto:'Speed & Light' },
];

const NICKNAME_SUGGESTIONS = [
  'MathKing','SpeedStar','NumberNinja','QuickBrain','LightningBoy',
  'GeniusGirl','MathDestroyer','BrainStorm','AlgebraAce','SwiftMind',
  'ComboKing','ArenaChamp','MathWizard','ThinkFast','RapidFire',
];

interface Props {
  user: MockUser | null;
  prefillCode?: string;       // from URL ?code=XXXXXX
  onJoined: (code: string, nickname: string, house: string, avatarId: string) => void;
  onBack: () => void;
}

export default function JoinWithCode({ user, prefillCode = '', onJoined, onBack }: Props) {
  const [step, setStep]             = useState<1|2>(1);   // 1=enter code, 2=pick identity
  const [code, setCode]             = useState(prefillCode);
  const [nickname, setNickname]     = useState(user?.full_name ?? '');
  const [house, setHouse]           = useState('Alpha');
  const [avatarId, setAvatarId]     = useState(user?.avatar_id ?? '0');
  const [error, setError]           = useState('');
  const [joining, setJoining]       = useState(false);
  const inputRef                    = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the code input on mount
    setTimeout(() => inputRef.current?.focus(), 200);
    soundEngine.startBgMusic('home');
  }, []);

  const handleCodeSubmit = () => {
    if (code.length !== 6) { setError('Please enter the full 6-digit code'); return; }
    setError('');
    soundEngine.click();
    setStep(2);
  };

  const handleJoin = () => {
    if (!nickname.trim()) { setError('Please enter a nickname'); return; }
    setError('');
    setJoining(true);
    soundEngine.joinRoom();
    setTimeout(() => onJoined(code, nickname.trim(), house, avatarId), 600);
  };

  const handleDigitKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCodeSubmit();
  };

  const myAvatar = getAvatar(avatarId);
  const myHouse  = HOUSES.find(h => h.id === house)!;

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle,#7c3aed,transparent)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle,#f59e0b,transparent)', animationDelay:'1.5s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-white/50 hover:text-white flex items-center gap-2 text-sm transition-colors">
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-400/30 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-sm">🏔️</div>
          </div>
          <span className="text-white font-black text-sm">PinnacleQuiz</span>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          {[1,2].map(s => (
            <div key={s} className={`w-6 h-1.5 rounded-full transition-all ${s <= step ? 'bg-yellow-400' : 'bg-white/15'}`} />
          ))}
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">

          {/* ── STEP 1: Enter Code ── */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="text-6xl mb-3">🎮</div>
                <h1 className="text-3xl font-black text-white mb-2">Join a Game</h1>
                <p className="text-white/40 text-sm">Enter the 6-digit code from your teacher or host</p>
              </div>

              {/* Big PIN entry */}
              <div className="mb-6">
                <label className="text-white/40 text-xs font-bold tracking-widest uppercase block mb-4 text-center">
                  GAME PIN
                </label>

                {/* Visual digit boxes */}
                <div className="flex gap-2 justify-center mb-4">
                  {[0,1,2,3,4,5].map(i => (
                    <div key={i}
                      className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                        code[i]
                          ? 'border-yellow-400 bg-yellow-400/15 text-white'
                          : i === code.length
                          ? 'border-yellow-400/50 bg-yellow-400/5 text-white/20 animate-pulse'
                          : 'border-white/12 bg-white/4 text-white/15'
                      }`}>
                      {code[i] ?? '·'}
                    </div>
                  ))}
                </div>

                {/* Hidden input that captures typing */}
                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="numeric"
                  value={code}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g,'').slice(0,6);
                    setCode(v);
                    setError('');
                    if (v.length === 6) {
                      // Auto-advance when 6 digits entered
                      setTimeout(() => {
                        soundEngine.click();
                        setStep(2);
                      }, 200);
                    }
                  }}
                  onKeyDown={handleDigitKey}
                  placeholder="Type your code here"
                  maxLength={6}
                  className="w-full bg-white/8 border-2 border-white/15 text-white text-center text-3xl font-black placeholder-white/20 rounded-2xl px-4 py-4 focus:outline-none focus:border-yellow-400 transition-all tracking-[0.4em]"
                />
                <p className="text-white/25 text-xs text-center mt-2">Auto-advances when all 6 digits are entered</p>
              </div>

              {/* Quick numpad for mobile */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {['1','2','3','4','5','6','7','8','9','⌫','0','→'].map(k => (
                  <button key={k}
                    onClick={() => {
                      soundEngine.click();
                      if (k === '⌫') {
                        setCode(c => c.slice(0,-1));
                      } else if (k === '→') {
                        handleCodeSubmit();
                      } else if (code.length < 6) {
                        const newCode = code + k;
                        setCode(newCode);
                        setError('');
                        if (newCode.length === 6) {
                          setTimeout(() => { soundEngine.click(); setStep(2); }, 200);
                        }
                      }
                    }}
                    className={`py-4 rounded-2xl font-black text-xl transition-all active:scale-90 border ${
                      k === '⌫' ? 'bg-red-500/15 text-red-400 border-red-500/25 hover:bg-red-500/25' :
                      k === '→' ? 'bg-yellow-500/25 text-yellow-300 border-yellow-500/35 hover:bg-yellow-500/35' :
                      'bg-white/8 text-white border-white/10 hover:bg-white/15'
                    }`}>
                    {k}
                  </button>
                ))}
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 text-center">
                  ⚠ {error}
                </div>
              )}

              <button onClick={handleCodeSubmit} disabled={code.length !== 6}
                className="w-full py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-yellow-500/25 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100">
                → Continue
              </button>

              {/* How to find code */}
              <div className="mt-6 bg-blue-500/8 border border-blue-400/20 rounded-2xl p-4">
                <div className="text-blue-400 text-xs font-bold mb-2 flex items-center gap-1">
                  💡 Where is the code?
                </div>
                <ul className="text-white/40 text-xs space-y-1.5">
                  <li className="flex items-start gap-2"><span>1.</span><span>Your teacher or host starts a game on PinnacleQuiz</span></li>
                  <li className="flex items-start gap-2"><span>2.</span><span>A big 6-digit number appears on their screen</span></li>
                  <li className="flex items-start gap-2"><span>3.</span><span>They'll write it on the board or tell you verbally</span></li>
                  <li className="flex items-start gap-2"><span>4.</span><span>Type those 6 digits here and join!</span></li>
                </ul>
              </div>
            </div>
          )}

          {/* ── STEP 2: Identity (nickname + avatar + house) ── */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-400/25 text-green-400 text-xs font-bold px-4 py-2 rounded-full mb-3">
                  ✓ Room <span className="tracking-widest font-black">{code}</span> found!
                </div>
                <h2 className="text-3xl font-black text-white mb-1">Set Your Identity</h2>
                <p className="text-white/40 text-sm">Pick a nickname, avatar and house</p>
              </div>

              {/* Avatar preview + picker */}
              <div className="mb-5">
                <label className="text-white/40 text-xs font-bold tracking-wider uppercase block mb-3">Your Avatar</label>
                <div className="flex items-center gap-4 mb-3 p-3 bg-white/4 rounded-2xl border border-white/8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${myAvatar.bg} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${myAvatar.glow}50` }}>
                    {myAvatar.emoji}
                  </div>
                  <div>
                    <div className="text-white font-bold">{myAvatar.label}</div>
                    <div className="text-white/40 text-xs">Tap any avatar below to change</div>
                  </div>
                </div>
                {/* Avatar grid - scrollable row */}
                <div className="grid grid-cols-8 gap-1.5">
                  {CARTOON_AVATARS.slice(0,16).map(av => {
                    const a = getAvatar(av.id);
                    return (
                      <button key={av.id}
                        onClick={() => { setAvatarId(av.id); soundEngine.click(); }}
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${av.bg} flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95 ${
                          avatarId === av.id ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
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
                  <input
                    type="text"
                    value={nickname}
                    onChange={e => { setNickname(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleJoin()}
                    placeholder="e.g. MathKing..."
                    maxLength={20}
                    className="flex-1 bg-white/8 border-2 border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 transition-all font-bold text-lg"
                  />
                  <button onClick={() => { setNickname(NICKNAME_SUGGESTIONS[Math.floor(Math.random()*NICKNAME_SUGGESTIONS.length)]); soundEngine.click(); }}
                    className="px-3 bg-white/8 border border-white/15 text-white/50 rounded-xl hover:bg-white/15 transition-all text-xl" title="Random nickname">
                    🎲
                  </button>
                </div>
                {/* Quick nickname suggestions */}
                <div className="flex flex-wrap gap-1.5">
                  {NICKNAME_SUGGESTIONS.slice(0,6).map(n => (
                    <button key={n} onClick={() => { setNickname(n); soundEngine.click(); }}
                      className="text-xs px-2.5 py-1 bg-white/5 border border-white/8 text-white/45 rounded-full hover:bg-white/12 hover:text-white/70 transition-all">
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* House selection */}
              <div className="mb-6">
                <label className="text-white/40 text-xs font-bold tracking-wider uppercase block mb-3">Your House</label>
                <div className="grid grid-cols-2 gap-2">
                  {HOUSES.map(h => (
                    <button key={h.id}
                      onClick={() => { setHouse(h.id); soundEngine.click(); }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        house === h.id ? 'scale-[1.02]' : 'opacity-60 hover:opacity-90'
                      }`}
                      style={{
                        borderColor: house === h.id ? h.color : h.color + '35',
                        background: house === h.id ? h.color + '20' : h.color + '08',
                      }}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xl">{h.icon}</span>
                        <span className="text-white font-black text-sm">{h.id}</span>
                        {house === h.id && <span className="ml-auto text-sm" style={{ color: h.color }}>✓</span>}
                      </div>
                      <div className="text-white/35 text-xs italic">"{h.motto}"</div>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 text-center">
                  ⚠ {error}
                </div>
              )}

              {/* Preview card */}
              <div className="bg-white/4 border border-white/8 rounded-2xl p-3 mb-5 flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${myAvatar.bg} flex items-center justify-center text-2xl flex-shrink-0`}
                  style={{ boxShadow: `0 0 12px ${myAvatar.glow}40` }}>
                  {myAvatar.emoji}
                </div>
                <div>
                  <div className="text-white font-bold">{nickname || '...'}</div>
                  <div className="text-xs font-semibold" style={{ color: myHouse.color }}>
                    {myHouse.icon} House {house} · Joining room {code}
                  </div>
                </div>
              </div>

              <button onClick={handleJoin} disabled={!nickname.trim() || joining}
                className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-green-500/25 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {joining ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Joining game...
                  </>
                ) : (
                  '🚀 Join Game!'
                )}
              </button>

              <button onClick={() => { setStep(1); setError(''); soundEngine.click(); }}
                className="w-full mt-3 py-3 text-white/40 hover:text-white text-sm font-semibold transition-colors text-center">
                ← Change code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
