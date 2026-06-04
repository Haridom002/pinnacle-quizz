import { useState } from 'react';
import { Quiz } from '../types';
import { SAMPLE_QUIZZES, SUBJECTS } from '../data/quizzes';
import { getAvatar } from '../lib/avatars';
import { MockUser } from '../AppPreview';
import CustomAudioManager from './CustomAudioManager';
import MusicPlayer from './MusicPlayer';

interface Props {
  user: MockUser|null; crestSrc: string;
  onStartQuiz: (q: Quiz) => void;
  onViewQuiz:  (q: Quiz) => void;
  onEditQuiz?: (q: Quiz) => void;
  onDeleteQuiz?:(q: Quiz) => void;
  onCreateQuiz: () => void;
  onArena:  () => void;
  onJoinCode: () => void;
  onProfile: () => void;
  onStats: () => void;
  onSettings: () => void;
  onSignOut: () => void;
  quizzes?: Quiz[];
}

const HOUSE_ICONS: Record<string,string> = {Alpha:'🏛️',Beta:'⚗️',Gamma:'☢️',Pulsar:'✨'};
const ROLE_COLORS: Record<string,string> = {student:'text-purple-400',teacher:'text-blue-400',parent:'text-green-400'};
const ROLE_ICONS:  Record<string,string> = {student:'🎓',teacher:'📋',parent:'👨‍👩‍👧'};
const SUBJECT_ICONS: Record<string,string> = {
  'Mathematics':'📐','Science':'🔬','English Language':'📝','History':'🏛️',
  'Geography':'🌍','Physics':'⚛️','Chemistry':'⚗️','Biology':'🧬',
  'Literature':'📚','Art':'🎨','Social Studies':'🤝','French':'🇫🇷',
  'Career Technology':'🔧','Twi':'🌍',
};

export default function HomeScreenPreview({
  user, crestSrc, onStartQuiz, onViewQuiz, onCreateQuiz,
  onArena, onJoinCode, onSignOut, onProfile, onStats, onSettings, onEditQuiz, onDeleteQuiz, quizzes: propQuizzes,
}: Props) {
  const [search,    setSearch]    = useState('');
  const [subject,   setSubject]   = useState('All');
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const quizzes = propQuizzes ?? SAMPLE_QUIZZES;
  const avatar  = user ? getAvatar(user.avatar_id) : null;

  const filtered = quizzes.filter(q => {
    const m = q.title.toLowerCase().includes(search.toLowerCase()) ||
              q.subject.toLowerCase().includes(search.toLowerCase());
    return m && (subject === 'All' || q.subject === subject);
  });

  return (
    <>
      {showAudio && <CustomAudioManager onClose={() => setShowAudio(false)} />}

      <div className="min-h-screen bg-[#070b18]">

        {/* ── HEADER ── */}
        <header className="bg-[#070b18]/98 backdrop-blur-xl border-b border-white/8 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3" style={{height:'58px'}}>

            {/* Logo */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              {crestSrc ? (
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-400/40 shadow-lg flex-shrink-0"
                  style={{boxShadow:'0 0 14px rgba(59,130,246,0.35)'}}>
                  <img src={crestSrc} alt="PEC" className="w-full h-full object-cover"/>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-xl">🏔️</div>
              )}
              <div className="hidden sm:block leading-none">
                <div className="text-white font-black text-base">PinnacleQuiz</div>
                <div className="text-blue-400/60 text-[10px] font-medium tracking-wide">Pinnacle Educational Centre</div>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* JOIN CODE — always visible */}
              <button onClick={onJoinCode}
                className="flex items-center gap-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 font-black px-3 py-2 rounded-full text-xs sm:text-sm transition-all hover:scale-105 active:scale-95">
                🎮 <span className="hidden xs:inline">Join</span>
              </button>

              <button onClick={onArena}
                className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-3 py-2 rounded-full text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95">
                ⚡ <span className="hidden sm:inline">Arena</span>
              </button>

              {user?.role !== 'parent' && (
                <button onClick={onCreateQuiz}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-3 py-2 rounded-full text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all">
                  <span className="hidden sm:inline">+ Create</span>
                  <span className="sm:hidden">+</span>
                </button>
              )}

              {/* Music */}
              <MusicPlayer category="home" compact />

              {/* User menu */}
              {user && avatar ? (
                <div className="relative">
                  <button onClick={() => setMenuOpen(o => !o)}
                    className="flex items-center gap-1.5 bg-white/8 hover:bg-white/12 border border-white/12 rounded-full pl-1 pr-2.5 py-1 transition-all">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatar.bg} flex items-center justify-center text-base`}
                      style={{boxShadow:`0 0 8px ${avatar.glow}50`}}>
                      {avatar.emoji}
                    </div>
                    <div className="hidden sm:block text-left leading-none">
                      <div className="text-white text-xs font-bold">{user.full_name.split(' ')[0]}</div>
                      <div className={`text-xs ${ROLE_COLORS[user.role]}`}>{ROLE_ICONS[user.role]} {user.role}</div>
                    </div>
                    <span className="text-white/25 text-xs">{menuOpen?'▲':'▼'}</span>
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-[#0f1729] border border-white/12 rounded-2xl shadow-2xl overflow-hidden z-50">
                      {/* Profile summary */}
                      <div className="p-4 bg-gradient-to-br from-purple-600/20 to-indigo-700/20 border-b border-white/8">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatar.bg} flex items-center justify-center text-2xl`}
                            style={{boxShadow:`0 0 14px ${avatar.glow}60`}}>{avatar.emoji}</div>
                          <div className="min-w-0">
                            <div className="text-white font-bold text-sm truncate">{user.full_name}</div>
                            <div className={`text-xs font-bold ${ROLE_COLORS[user.role]}`}>{ROLE_ICONS[user.role]} {user.role.charAt(0).toUpperCase()+user.role.slice(1)}</div>
                            {user.house&&<div className="text-white/30 text-xs">{HOUSE_ICONS[user.house]} House {user.house}</div>}
                          </div>
                        </div>
                        <div className="mt-2.5 flex items-center gap-2">
                          <span className="text-xs text-yellow-400/60">Lv.{user.level}</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{width:`${Math.min((user.xp%500)/5,100)}%`}}/>
                          </div>
                          <span className="text-xs text-white/25">{user.xp} XP</span>
                        </div>
                      </div>
                      <div className="p-2">
                        {[
                          {icon:'👤',label:'My Profile',sub:'Edit name, avatar, house',  fn:()=>{setMenuOpen(false);onProfile();}},
                          {icon:'🏆',label:'My Stats',  sub:'Scores, badges, rankings', fn:()=>{setMenuOpen(false);onStats();}},
                          {icon:'🎵',label:'Custom Audio',sub:'Upload your own songs',  fn:()=>{setMenuOpen(false);setShowAudio(true);}},
                          {icon:'⚙️',label:'Settings',  sub:'Sound, display, account',  fn:()=>{setMenuOpen(false);onSettings();}},
                        ].map(item=>(
                          <button key={item.label} onClick={item.fn}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/8 transition-colors text-left group">
                            <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                            <div>
                              <div className="text-white/85 text-sm font-medium">{item.label}</div>
                              <div className="text-white/30 text-xs">{item.sub}</div>
                            </div>
                            <span className="ml-auto text-white/15 group-hover:text-white/40 text-xs">→</span>
                          </button>
                        ))}
                        <div className="h-px bg-white/8 my-1.5 mx-2"/>
                        <button onClick={()=>{setMenuOpen(false);onSignOut();}}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/8 transition-colors text-left text-red-400">
                          <span className="text-lg">🚪</span>
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={onJoinCode} className="text-white/50 hover:text-white text-xs font-semibold transition-colors">Sign in</button>
              )}
            </div>
          </div>
        </header>

        {/* ── JOIN GAME BANNER (big, prominent) ── */}
        <div className="bg-gradient-to-r from-yellow-500/15 via-orange-500/10 to-yellow-500/15 border-b border-yellow-500/20">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎮</span>
              <div>
                <span className="text-white font-black text-sm">Got a game code?</span>
                <span className="text-white/40 text-xs ml-2 hidden sm:inline">No account needed — join instantly like Kahoot!</span>
              </div>
            </div>
            <button onClick={onJoinCode}
              className="flex-shrink-0 bg-yellow-500 hover:bg-yellow-400 text-black font-black px-4 py-2 rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-yellow-500/30">
              Enter Code →
            </button>
          </div>
        </div>

        {/* ── HERO ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0818] via-[#1a1040] to-[#0d1525] py-12 px-4">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-8 right-8 w-64 h-64 rounded-full opacity-10 animate-pulse" style={{background:'radial-gradient(circle,#7c3aed,transparent)'}}/>
            <div className="absolute bottom-0 left-16 w-64 h-64 rounded-full opacity-8 animate-pulse" style={{background:'radial-gradient(circle,#1e40af,transparent)',animationDelay:'2s'}}/>
          </div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            {user && avatar && (
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatar.bg} flex items-center justify-center text-2xl shadow-xl flex-shrink-0`}
                  style={{boxShadow:`0 0 20px ${avatar.glow}50`}}>{avatar.emoji}</div>
                <div className="text-left">
                  <div className="text-white font-black text-xl leading-none">
                    Welcome{user.role==='teacher'?' Teacher':user.role==='parent'?' Parent':''}, {user.full_name.split(' ')[0]}! 👋
                  </div>
                  <div className="text-white/40 text-sm mt-0.5">
                    {ROLE_ICONS[user.role]} {user.role.charAt(0).toUpperCase()+user.role.slice(1)} · Lv.{user.level} · {user.xp.toLocaleString()} XP
                    {user.house&&` · ${HOUSE_ICONS[user.house]} ${user.house}`}
                  </div>
                </div>
              </div>
            )}
            <div className="inline-flex items-center gap-2 bg-blue-500/12 border border-blue-400/22 text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-4">
              <span className="animate-pulse">●</span> Live · Grades 1–9 · Veritas et Virtus
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              Learn. Play. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Excel.</span>
            </h2>
            <p className="text-white/40 mb-7 max-w-xl mx-auto">Compete in live quizzes, earn XP, and climb the leaderboard — for all grades!</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
              <button onClick={onArena} className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-6 py-3.5 rounded-2xl text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/25">⚡ Math Arena</button>
              <button onClick={onJoinCode} className="flex items-center justify-center gap-2 bg-yellow-500/15 border-2 border-yellow-500/40 text-yellow-300 font-black px-6 py-3.5 rounded-2xl text-base hover:border-yellow-400 hover:bg-yellow-500/25 transition-all">🎮 Join with Code</button>
              {user?.role !== 'parent' && <button onClick={onCreateQuiz} className="flex items-center justify-center gap-2 bg-white/8 border border-white/15 text-white font-bold px-6 py-3.5 rounded-2xl text-base hover:bg-white/12 transition-all">+ Create Quiz</button>}
            </div>
            <div className="relative max-w-md mx-auto">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
              <input type="text" placeholder="Search quizzes by subject or title..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/8 border border-white/12 text-white placeholder-white/22 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"/>
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="bg-black/30 border-b border-white/6">
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap gap-5 justify-center">
            {[{icon:'🎮',v:quizzes.length,k:'Quizzes'},{icon:'👥',v:'2,847',k:'Students'},{icon:'🏆',v:quizzes.reduce((a,b)=>a+b.playCount,0).toLocaleString(),k:'Plays'},{icon:'⚡',v:'1,247',k:'Arena Battles'},{icon:'📚',v:'Grades 1–9',k:'All Levels'}].map(s=>(
              <div key={s.k} className="flex items-center gap-1.5">
                <span>{s.icon}</span><span className="text-white font-black text-sm">{s.v}</span><span className="text-white/30 text-xs">{s.k}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUBJECT FILTER ── */}
        <div className="max-w-7xl mx-auto px-4 pt-5">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={()=>setSubject('All')} className={`flex-none flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${subject==='All'?'bg-purple-500 text-white shadow-lg shadow-purple-500/20':'bg-white/6 text-white/55 hover:bg-white/12 border border-white/8'}`}>
              ✦ All
            </button>
            {SUBJECTS.map(s=>(
              <button key={s} onClick={()=>setSubject(s)} className={`flex-none flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${subject===s?'bg-purple-500 text-white shadow-lg shadow-purple-500/20':'bg-white/6 text-white/55 hover:bg-white/12 border border-white/8'}`}>
                {SUBJECT_ICONS[s]??'📖'} {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── QUIZ GRID ── */}
        <div className="max-w-7xl mx-auto px-4 py-5 pb-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">{subject==='All'?'All Quizzes':subject} <span className="text-white/25 text-sm font-normal">({filtered.length})</span></h3>
            <span className="text-white/25 text-xs hidden sm:block">Click to preview · Play Now to start</span>
          </div>

          {filtered.length===0?(
            <div className="text-center py-16 text-white/25">
              <div className="text-5xl mb-3">🔍</div>
              <p className="text-lg font-semibold">No quizzes found</p>
              <p className="text-sm mt-1">Try a different search or subject</p>
            </div>
          ):(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(quiz=>(
                <div key={quiz.id}
                  className="group bg-white/4 border border-white/6 rounded-2xl overflow-hidden hover:border-white/18 hover:bg-white/6 transition-all duration-200 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 cursor-pointer"
                  onClick={()=>onViewQuiz(quiz)}>
                  <div className={`h-24 bg-gradient-to-br ${quiz.coverColor} flex items-center justify-center relative`}>
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-200">{quiz.icon}</span>
                    <div className="absolute top-2 right-2 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full">{quiz.grade}</div>
                    <div className="absolute top-2 left-2 bg-black/30 text-white text-xs px-2 py-0.5 rounded-full">{SUBJECT_ICONS[quiz.subject]??'📖'}</div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-bold text-sm leading-tight mb-1 group-hover:text-purple-300 transition-colors line-clamp-2">{quiz.title}</h4>
                    <p className="text-white/35 text-xs mb-3 line-clamp-2">{quiz.description}</p>
                    <div className="flex items-center justify-between text-xs text-white/25 mb-3">
                      <span>{quiz.questions.length} questions</span>
                      <span>▶ {quiz.playCount.toLocaleString()}</span>
                    </div>
                    <button onClick={e=>{e.stopPropagation();onStartQuiz(quiz);}}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${quiz.coverColor} opacity-80 hover:opacity-100 transition-all active:scale-95`}>
                      ▶ Play Now
                    </button>
                    {(onEditQuiz || onDeleteQuiz) && (
                      <div className="flex gap-2 mt-2" onClick={e=>e.stopPropagation()}>
                        {onEditQuiz && (
                          <button onClick={()=>onEditQuiz(quiz)}
                            className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/25 transition-all">
                            ✏️ Edit
                          </button>
                        )}
                        {onDeleteQuiz && (
                          <button onClick={()=>onDeleteQuiz(quiz)}
                            className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/25 transition-all">
                            🗑️ Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
