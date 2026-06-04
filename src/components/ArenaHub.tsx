import { useState } from 'react';
import { soundEngine } from '../utils/soundEngine';
import MusicPlayer from './MusicPlayer';

interface Props {
  onMode: (mode: 'lightning' | 'formation' | 'tug' | 'host' | 'coding' | 'robotics') => void;
  onBack: () => void;
}

const MODES = [
  { id:'host'     as const, icon:'🎮', title:'Live Arena',            subtitle:'Real-time multiplayer',      desc:'Host or join a live math battle with a 6-digit code. Pick your house and compete!', color:'#a855f7', gradient:'from-purple-500/20 to-violet-700/20', border:'border-purple-500/40', badge:'🔴 LIVE',   hot:true  },
  { id:'lightning'as const, icon:'⚡', title:'Lightning Calculator',  subtitle:'Solo speed challenge',        desc:'Race the clock answering math at lightning speed. Combos, XP, power-ups and lives!', color:'#f59e0b', gradient:'from-yellow-500/18 to-orange-600/18', border:'border-yellow-500/35', badge:'SOLO',   hot:false },
  { id:'coding'   as const, icon:'💻', title:'Coding Arena',          subtitle:'Computer programming',        desc:'Test your coding knowledge from complete beginner to professional developer!', color:'#06b6d4', gradient:'from-cyan-500/18 to-blue-600/18',   border:'border-cyan-500/35',   badge:'NEW 🔥', hot:true  },
  { id:'robotics' as const, icon:'🤖', title:'Robotics Arena',        subtitle:'Engineering the future',      desc:'From robot basics to advanced AI and autonomous systems — can you reach Pro level?', color:'#a855f7', gradient:'from-purple-500/18 to-pink-600/18', border:'border-purple-500/35', badge:'NEW 🔥', hot:true  },
  { id:'formation'as const, icon:'🧠', title:'Formation Training',    subtitle:'AI adaptive drills',          desc:'Rapid-fire arithmetic with AI difficulty scaling. Build mental calculation reflexes.', color:'#10b981', gradient:'from-emerald-500/18 to-teal-600/18', border:'border-emerald-500/35', badge:'TRAIN', hot:false },
  { id:'tug'      as const, icon:'⚔️', title:'Math Tug Arena',        subtitle:'Team vs team battle',         desc:'Two houses battle in tug-of-war math. Super Pull with 3-combo streaks. All 4 houses!', color:'#ef4444', gradient:'from-red-600/18 to-orange-600/18', border:'border-red-500/35',    badge:'VS',    hot:false },
];

const LEADERBOARD = [
  { rank:1, name:'MathDestroyer', xp:45230, avatar:'🦁', house:'Alpha' },
  { rank:2, name:'CodeNinja_Ama', xp:38910, avatar:'💻', house:'Pulsar' },
  { rank:3, name:'RoboKing_Kofi', xp:35670, avatar:'🤖', house:'Gamma' },
  { rank:4, name:'QuickBrain',    xp:29340, avatar:'⚡', house:'Beta' },
  { rank:5, name:'SpeedStar',     xp:24120, avatar:'🔥', house:'Alpha' },
];

const HOUSE_SCORES = [
  { house:'Alpha',  icon:'🔴', score:142300, color:'#ef4444' },
  { house:'Pulsar', icon:'🟡', score:138900, color:'#f59e0b' },
  { house:'Gamma',  icon:'🟢', score:125600, color:'#10b981' },
  { house:'Beta',   icon:'🔵', score:118400, color:'#3b82f6' },
];

export default function ArenaHub({ onMode, onBack }: Props) {
  const [hovered, setHovered] = useState<string|null>(null);
  const [showLB, setShowLB] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b18] overflow-x-hidden">
      {/* Animated BG */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 animate-pulse" style={{background:'radial-gradient(circle,#a855f7,transparent)'}}/>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10 animate-pulse" style={{background:'radial-gradient(circle,#f59e0b,transparent)',animationDelay:'1.5s'}}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5" style={{background:'radial-gradient(circle,#06b6d4,transparent)'}}/>
        {[...Array(20)].map((_,i)=>(
          <div key={i} className="absolute rounded-full animate-pulse" style={{width:`${2+Math.random()*5}px`,height:`${2+Math.random()*5}px`,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,background:['#f59e0b','#a855f7','#06b6d4','#ef4444','#10b981'][i%5],opacity:0.2+Math.random()*0.3,animationDuration:`${2+Math.random()*4}s`,animationDelay:`${Math.random()*3}s`}}/>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/8 bg-black/40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={()=>{soundEngine.click();onBack();}} className="text-white/40 hover:text-white flex items-center gap-2 text-sm transition-colors">← Home</button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="text-white font-black text-lg leading-none">Smart Calc Arena</div>
              <div className="text-yellow-400/60 text-xs">Maths · Coding · Robotics</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setShowLB(s=>!s)} className="hidden sm:flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 rounded-full px-3 py-1.5 text-xs font-bold hover:bg-yellow-500/18 transition-colors">🏆 Board</button>
            <MusicPlayer category="home" compact/>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold px-4 py-2 rounded-full mb-5">
            <span className="animate-pulse">●</span> 1,842 students active · Grades 1–9
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3" style={{textShadow:'0 0 60px rgba(168,85,247,0.25)'}}>
            Choose Your<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">Battle Mode</span>
          </h1>
          <p className="text-white/40 text-lg max-w-lg mx-auto">Maths · Computer Programming · Robotics · Live Multiplayer</p>
        </div>

        {/* Leaderboard */}
        {showLB && (
          <div className="mb-8 bg-black/40 border border-yellow-500/18 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏆</span>
              <h3 className="text-white font-black text-lg">This Week's Champions</h3>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {HOUSE_SCORES.sort((a,b)=>b.score-a.score).map((h,i)=>(
                <div key={h.house} className="p-3 rounded-xl border text-center" style={{borderColor:h.color+'35',background:h.color+'0d'}}>
                  <div className="text-xl">{h.icon}</div>
                  <div className="text-white font-black text-xs mt-0.5">{h.house}</div>
                  <div className="text-xs font-bold" style={{color:h.color}}>{(h.score/1000).toFixed(1)}K</div>
                  {i===0&&<div className="text-yellow-400 text-xs">👑</div>}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {LEADERBOARD.map((p,i)=>(
                <div key={p.rank} className={`flex items-center gap-3 p-3 rounded-xl ${i===0?'bg-yellow-500/8 border border-yellow-500/18':'bg-white/3 border border-white/6'}`}>
                  <div className="w-7 text-center font-black text-sm" style={{color:i===0?'#ffd700':i===1?'#c0c0c0':i===2?'#cd7f32':'rgba(255,255,255,0.35)'}}>
                    {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${p.rank}`}
                  </div>
                  <span className="text-xl">{p.avatar}</span>
                  <div className="flex-1"><div className="text-white font-bold text-sm">{p.name}</div><div className="text-white/30 text-xs">House {p.house}</div></div>
                  <div className="text-yellow-400 font-black text-sm">{p.xp.toLocaleString()} XP</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mode cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {MODES.map(m=>(
            <button key={m.id}
              onClick={()=>{soundEngine.click();onMode(m.id);}}
              onMouseEnter={()=>setHovered(m.id)} onMouseLeave={()=>setHovered(null)}
              className={`relative text-left p-5 rounded-3xl border-2 transition-all duration-300 bg-gradient-to-br ${m.gradient} ${m.border} hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] overflow-hidden`}
              style={hovered===m.id?{boxShadow:`0 0 35px ${m.color}30`}:{}}>
              {hovered===m.id&&<div className="absolute inset-0 rounded-3xl opacity-12 pointer-events-none" style={{background:`radial-gradient(ellipse at center,${m.color},transparent)`}}/>}
              <div className="absolute top-3 right-3">
                {m.hot
                  ? <div className="bg-red-500/80 text-white text-xs font-black px-2 py-0.5 rounded-full animate-pulse">{m.badge}</div>
                  : <div className="bg-white/10 text-white/50 text-xs font-bold px-2 py-0.5 rounded-full border border-white/10">{m.badge}</div>
                }
              </div>
              <div className="text-4xl mb-3" style={hovered===m.id?{filter:`drop-shadow(0 0 16px ${m.color})`}:{}}>{m.icon}</div>
              <h3 className="text-white font-black text-lg mb-0.5 leading-tight">{m.title}</h3>
              <div className="text-xs font-bold mb-2" style={{color:m.color}}>{m.subtitle}</div>
              <p className="text-white/40 text-xs leading-relaxed mb-3">{m.desc}</p>
              <div className="flex items-center gap-1.5 font-bold text-xs" style={{color:m.color}}>
                {m.id==='host'?'Host or Join →':'Play Now →'}
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[['42,819','Questions','🎯'],['8,312','Students','👥'],['1,247','Battles Today','⚔️'],['3','Arenas','💻']].map(([v,k,icon])=>(
            <div key={k} className="bg-white/3 border border-white/6 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xl font-black text-white">{v}</div>
              <div className="text-white/30 text-xs">{k}</div>
            </div>
          ))}
        </div>

        {/* House competition */}
        <div className="bg-gradient-to-r from-purple-500/8 to-indigo-600/8 border border-purple-500/18 rounded-3xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🏛️</span>
            <div><h3 className="text-white font-black">School House Competition</h3><p className="text-white/35 text-sm">Earn XP for your house across all arenas</p></div>
            <div className="ml-auto bg-green-500/18 border border-green-500/25 text-green-400 text-xs font-bold px-3 py-1 rounded-full animate-pulse">● LIVE</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {HOUSE_SCORES.map((h,i)=>(
              <div key={h.house} className="text-center p-3 rounded-2xl bg-white/3 border border-white/6">
                <div className="text-2xl mb-0.5">{h.icon}</div>
                <div className="text-xs font-black text-white">{h.house}</div>
                <div className="text-xs font-bold mt-0.5" style={{color:h.color}}>{(h.score/1000).toFixed(1)}K</div>
                {i===0&&<div className="text-yellow-400 text-xs">👑 #1</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
