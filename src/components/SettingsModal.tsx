import { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

interface Props { onClose: () => void; }

export default function SettingsModal({ onClose }: Props) {
  const [theme,      setTheme]      = useState<'dark'|'light'>(() =>
    (localStorage.getItem('pinnacle-theme') as 'dark'|'light') ?? 'dark');
  const [soundOn,    setSoundOn]    = useState(() =>
    localStorage.getItem('pinnacle-sound') !== 'off');
  const [musicOn,    setMusicOn]    = useState(() =>
    localStorage.getItem('pinnacle-music') !== 'off');
  const [fontSize,   setFontSize]   = useState(() =>
    localStorage.getItem('pinnacle-fontsize') ?? 'normal');
  const [saved,      setSaved]      = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg-primary', '#f0f4ff');
      document.documentElement.style.setProperty('--bg-card', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#1a1a2e');
      document.documentElement.style.setProperty('--text-secondary', '#4a4a6a');
      document.body.style.background = '#f0f4ff';
    } else {
      document.documentElement.style.removeProperty('--bg-primary');
      document.documentElement.style.removeProperty('--bg-card');
      document.documentElement.style.removeProperty('--text-primary');
      document.documentElement.style.removeProperty('--text-secondary');
      document.body.style.background = '#0d0d1a';
    }
  }, [theme]);

  // Apply font size
  useEffect(() => {
    const sizes: Record<string,string> = { small:'14px', normal:'16px', large:'18px' };
    document.documentElement.style.fontSize = sizes[fontSize] ?? '16px';
  }, [fontSize]);

  const handleSave = () => {
    localStorage.setItem('pinnacle-theme',    theme);
    localStorage.setItem('pinnacle-sound',    soundOn  ? 'on' : 'off');
    localStorage.setItem('pinnacle-music',    musicOn  ? 'on' : 'off');
    localStorage.setItem('pinnacle-fontsize', fontSize);
    if (!soundOn)  soundEngine.stopBgMusic();
    if (!musicOn)  soundEngine.stopBgMusic();
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#13132a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-black text-xl flex items-center gap-2">⚙️ Settings</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl transition-colors leading-none">×</button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

          {/* Theme */}
          <div>
            <label className="text-white/50 text-xs font-bold tracking-widest uppercase block mb-3">🎨 Display Theme</label>
            <div className="grid grid-cols-2 gap-3">
              {([
                { id:'dark',  label:'Dark Mode',  icon:'🌙', desc:'Easy on the eyes' },
                { id:'light', label:'Light Mode',  icon:'☀️', desc:'Bright & clear' },
              ] as const).map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${theme===t.id?'border-purple-400 bg-purple-400/15 scale-[1.02]':'border-white/12 bg-white/4 hover:bg-white/8'}`}>
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <div className="text-white font-bold text-sm">{t.label}</div>
                  <div className="text-white/40 text-xs">{t.desc}</div>
                  {theme===t.id && <div className="text-purple-400 text-xs font-bold mt-1">✓ Active</div>}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Effects */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold flex items-center gap-2">🔊 Sound Effects</div>
                <div className="text-white/40 text-xs mt-0.5">Quiz sounds, correct/wrong, combos</div>
              </div>
              <button onClick={() => setSoundOn(s => !s)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${soundOn?'bg-purple-500':'bg-white/20'}`}>
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${soundOn?'left-7':'left-0.5'}`}/>
              </button>
            </div>
          </div>

          {/* Background Music */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold flex items-center gap-2">🎵 Background Music</div>
                <div className="text-white/40 text-xs mt-0.5">Arena music, victory songs</div>
              </div>
              <button onClick={() => setMusicOn(m => !m)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${musicOn?'bg-purple-500':'bg-white/20'}`}>
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${musicOn?'left-7':'left-0.5'}`}/>
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-white/50 text-xs font-bold tracking-widest uppercase block mb-3">🔤 Text Size</label>
            <div className="grid grid-cols-3 gap-2">
              {(['small','normal','large'] as const).map(s => (
                <button key={s} onClick={() => setFontSize(s)}
                  className={`py-3 rounded-xl border-2 text-center transition-all ${fontSize===s?'border-purple-400 bg-purple-400/15':'border-white/12 bg-white/4'}`}>
                  <div className={`text-white font-bold ${s==='small'?'text-xs':s==='large'?'text-lg':'text-sm'}`}>Aa</div>
                  <div className="text-white/40 text-xs capitalize">{s}</div>
                </button>
              ))}
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-4 text-center">
            <div className="text-white/40 text-xs">PinnacleQuiz v1.0 · Pinnacle Educational Centre</div>
            <div className="text-white/25 text-xs mt-1">Built with ❤️ for Ghanaian learners</div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 bg-white/8 border border-white/15 text-white font-bold rounded-xl hover:bg-white/15 transition-all">
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black rounded-xl hover:scale-[1.02] transition-all shadow-lg">
            {saved ? '✅ Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
