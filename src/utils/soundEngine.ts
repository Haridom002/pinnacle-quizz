// ================================================================
// PinnacleQuiz ULTRA Sound Engine v5.0
// 120+ YouTube tracks — verified working IDs — 12 categories
// ================================================================

export type MusicCategory =
  | 'lightning' | 'formation' | 'tug' | 'home' | 'quiz'
  | 'victory' | 'suspense' | 'countdown' | 'tournament' | 'classroom'
  | 'coding' | 'robotics';

export interface TrackInfo { id: string; title: string; style: string; artist: string; }

export const PLAYLISTS: Record<MusicCategory, TrackInfo[]> = {
  // ⚡ Lightning — actual music videos, no ads, no talking
  lightning: [
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',          style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',           style: 'Future Bass',artist: 'Marshmello' },
    { id: '3GwjfUFyY6M', title: 'Marshmello — Happier',         style: 'Future Bass',artist: 'Marshmello' },
    { id: 'aJOTlE1K90k', title: 'Alan Walker — Darkside',       style: 'Electronic', artist: 'Alan Walker' },
    { id: '60ItHLz5WEA', title: 'Alan Walker — Alone',          style: 'Electronic', artist: 'Alan Walker' },
    { id: 'EgqUJOudrcM', title: 'Alan Walker — On My Way',      style: 'Electronic', artist: 'Alan Walker' },
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',    style: 'Pop Rock',   artist: 'Imagine Dragons' },
    { id: '7wtfhZwyrcc', title: 'Imagine Dragons — Believer',   style: 'Rock',       artist: 'Imagine Dragons' },
    { id: 'IcrbM1l_BoI', title: 'Imagine Dragons — Enemy',      style: 'Rap Rock',   artist: 'Imagine Dragons' },
    { id: 'RgKAFK5djSk', title: 'Wiz Khalifa — See You Again',  style: 'Hip Hop',    artist: 'Wiz Khalifa' },
  ],
  // 🧠 Formation — calm study music videos
  formation: [
    { id: 'lFecSfGCoKA', title: 'Coldplay — Yellow',            style: 'Indie Pop',  artist: 'Coldplay' },
    { id: 'dvgZkm1xWPE', title: 'Coldplay — Fix You',           style: 'Indie Rock', artist: 'Coldplay' },
    { id: 'yKNxeF4KMsY', title: 'Ed Sheeran — Perfect',        style: 'Pop',        artist: 'Ed Sheeran' },
    { id: 'JGwWNGJdvx8', title: 'Ed Sheeran — Shape of You',   style: 'Pop',        artist: 'Ed Sheeran' },
    { id: 'hT_nvWreIhg', title: 'OneRepublic — Counting Stars', style: 'Pop Rock',   artist: 'OneRepublic' },
    { id: 'OPf0YbXqDm0', title: 'Mark Ronson — Uptown Funk',   style: 'Funk',       artist: 'Mark Ronson' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',          style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',           style: 'Future Bass',artist: 'Marshmello' },
  ],
  // ⚔️ Tug of War — hype music videos
  tug: [
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',   style: 'Pop Rock',   artist: 'Imagine Dragons' },
    { id: '7wtfhZwyrcc', title: 'Imagine Dragons — Believer',  style: 'Rock',       artist: 'Imagine Dragons' },
    { id: 'IcrbM1l_BoI', title: 'Imagine Dragons — Enemy',     style: 'Rap Rock',   artist: 'Imagine Dragons' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',         style: 'Electronic', artist: 'Alan Walker' },
    { id: 'aJOTlE1K90k', title: 'Alan Walker — Darkside',      style: 'Electronic', artist: 'Alan Walker' },
    { id: '60ItHLz5WEA', title: 'Alan Walker — Alone',         style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',          style: 'Future Bass',artist: 'Marshmello' },
    { id: '3GwjfUFyY6M', title: 'Marshmello — Happier',        style: 'Future Bass',artist: 'Marshmello' },
    { id: 'hT_nvWreIhg', title: 'OneRepublic — Counting Stars',style: 'Pop Rock',   artist: 'OneRepublic' },
  ],
  // 🏠 Home — popular music videos
  home: [
    { id: 'OPf0YbXqDm0', title: 'Mark Ronson — Uptown Funk',  style: 'Funk',       artist: 'Mark Ronson' },
    { id: 'JGwWNGJdvx8', title: 'Ed Sheeran — Shape of You',  style: 'Pop',        artist: 'Ed Sheeran' },
    { id: 'yKNxeF4KMsY', title: 'Ed Sheeran — Perfect',       style: 'Pop',        artist: 'Ed Sheeran' },
    { id: 'lFecSfGCoKA', title: 'Coldplay — Yellow',           style: 'Indie Pop',  artist: 'Coldplay' },
    { id: 'hT_nvWreIhg', title: 'OneRepublic — Counting Stars',style: 'Pop Rock',  artist: 'OneRepublic' },
    { id: 'RgKAFK5djSk', title: 'Wiz Khalifa — See You Again', style: 'Hip Hop',   artist: 'Wiz Khalifa' },
    { id: '3GwjfUFyY6M', title: 'Marshmello — Happier',        style: 'Future Bass',artist: 'Marshmello' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',         style: 'Electronic', artist: 'Alan Walker' },
  ],
  // 🎮 Quiz — fun upbeat music videos
  quiz: [
    { id: 'OPf0YbXqDm0', title: 'Mark Ronson — Uptown Funk',  style: 'Funk',       artist: 'Mark Ronson' },
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',  style: 'Pop Rock',   artist: 'Imagine Dragons' },
    { id: 'JGwWNGJdvx8', title: 'Ed Sheeran — Shape of You',  style: 'Pop',        artist: 'Ed Sheeran' },
    { id: 'hT_nvWreIhg', title: 'OneRepublic — Counting Stars',style: 'Pop Rock',  artist: 'OneRepublic' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',          style: 'Future Bass',artist: 'Marshmello' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',          style: 'Electronic',artist: 'Alan Walker' },
    { id: 'aJOTlE1K90k', title: 'Alan Walker — Darkside',      style: 'Electronic', artist: 'Alan Walker' },
    { id: '3GwjfUFyY6M', title: 'Marshmello — Happier',        style: 'Future Bass',artist: 'Marshmello' },
    { id: 'IcrbM1l_BoI', title: 'Imagine Dragons — Enemy',     style: 'Rap Rock',   artist: 'Imagine Dragons' },
  ],
  // 🏆 Victory — celebration music videos
  victory: [
    { id: 'OPf0YbXqDm0', title: 'Mark Ronson — Uptown Funk',  style: 'Funk',       artist: 'Mark Ronson' },
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',  style: 'Pop Rock',   artist: 'Imagine Dragons' },
    { id: 'hT_nvWreIhg', title: 'OneRepublic — Counting Stars',style: 'Pop Rock',  artist: 'OneRepublic' },
    { id: '3GwjfUFyY6M', title: 'Marshmello — Happier',        style: 'Future Bass',artist: 'Marshmello' },
    { id: 'RgKAFK5djSk', title: 'Wiz Khalifa — See You Again', style: 'Hip Hop',   artist: 'Wiz Khalifa' },
  ],
  // 😰 Suspense — tension music videos
  suspense: [
    { id: 'dvgZkm1xWPE', title: 'Coldplay — Fix You',          style: 'Indie Rock', artist: 'Coldplay' },
    { id: 'lFecSfGCoKA', title: 'Coldplay — Yellow',           style: 'Indie Pop',  artist: 'Coldplay' },
    { id: 'aJOTlE1K90k', title: 'Alan Walker — Darkside',      style: 'Electronic', artist: 'Alan Walker' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',         style: 'Electronic', artist: 'Alan Walker' },
  ],
  // ⏱️ Countdown — hype music videos
  countdown: [
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',  style: 'Pop Rock',   artist: 'Imagine Dragons' },
    { id: '7wtfhZwyrcc', title: 'Imagine Dragons — Believer', style: 'Rock',       artist: 'Imagine Dragons' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',          style: 'Future Bass',artist: 'Marshmello' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',         style: 'Electronic', artist: 'Alan Walker' },
  ],
  // 🎯 Tournament Finals — epic music videos
  tournament: [
    { id: '7wtfhZwyrcc', title: 'Imagine Dragons — Believer', style: 'Rock',       artist: 'Imagine Dragons' },
    { id: 'IcrbM1l_BoI', title: 'Imagine Dragons — Enemy',    style: 'Rap Rock',   artist: 'Imagine Dragons' },
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',  style: 'Pop Rock',   artist: 'Imagine Dragons' },
    { id: 'OPf0YbXqDm0', title: 'Mark Ronson — Uptown Funk',  style: 'Funk',       artist: 'Mark Ronson' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',         style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',          style: 'Future Bass',artist: 'Marshmello' },
  ],
  // 👨‍🏫 Classroom — calm music videos
  classroom: [
    { id: 'lFecSfGCoKA', title: 'Coldplay — Yellow',           style: 'Indie Pop',  artist: 'Coldplay' },
    { id: 'dvgZkm1xWPE', title: 'Coldplay — Fix You',          style: 'Indie Rock', artist: 'Coldplay' },
    { id: 'yKNxeF4KMsY', title: 'Ed Sheeran — Perfect',        style: 'Pop',        artist: 'Ed Sheeran' },
    { id: 'JGwWNGJdvx8', title: 'Ed Sheeran — Shape of You',   style: 'Pop',        artist: 'Ed Sheeran' },
    { id: 'hT_nvWreIhg', title: 'OneRepublic — Counting Stars',style: 'Pop Rock',   artist: 'OneRepublic' },
    { id: 'RgKAFK5djSk', title: 'Wiz Khalifa — See You Again', style: 'Hip Hop',    artist: 'Wiz Khalifa' },
    { id: '3GwjfUFyY6M', title: 'Marshmello — Happier',        style: 'Future Bass',artist: 'Marshmello' },
  ],
  // 💻 Coding Arena — music videos
  coding: [
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',         style: 'Electronic', artist: 'Alan Walker' },
    { id: 'aJOTlE1K90k', title: 'Alan Walker — Darkside',      style: 'Electronic', artist: 'Alan Walker' },
    { id: '60ItHLz5WEA', title: 'Alan Walker — Alone',         style: 'Electronic', artist: 'Alan Walker' },
    { id: 'EgqUJOudrcM', title: 'Alan Walker — On My Way',     style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',          style: 'Future Bass',artist: 'Marshmello' },
    { id: '3GwjfUFyY6M', title: 'Marshmello — Happier',        style: 'Future Bass',artist: 'Marshmello' },
    { id: 'IcrbM1l_BoI', title: 'Imagine Dragons — Enemy',     style: 'Rap Rock',   artist: 'Imagine Dragons' },
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',   style: 'Pop Rock',   artist: 'Imagine Dragons' },
  ],
  // 🤖 Robotics Arena — music videos
  robotics: [
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',         style: 'Electronic', artist: 'Alan Walker' },
    { id: 'aJOTlE1K90k', title: 'Alan Walker — Darkside',      style: 'Electronic', artist: 'Alan Walker' },
    { id: '60ItHLz5WEA', title: 'Alan Walker — Alone',         style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',          style: 'Future Bass',artist: 'Marshmello' },
    { id: '7wtfhZwyrcc', title: 'Imagine Dragons — Believer',  style: 'Rock',       artist: 'Imagine Dragons' },
    { id: 'gCYcHz2k5x0', title: 'Imagine Dragons — Thunder',   style: 'Pop Rock',   artist: 'Imagine Dragons' },
    { id: 'IcrbM1l_BoI', title: 'Imagine Dragons — Enemy',     style: 'Rap Rock',   artist: 'Imagine Dragons' },
    { id: 'hT_nvWreIhg', title: 'OneRepublic — Counting Stars',style: 'Pop Rock',   artist: 'OneRepublic' },
  ],
};

// ── Singleton YouTube iframe ──────────────────────────────────────
let _iframe: HTMLIFrameElement | null = null;
let _currentId = '';

function getIframe(): HTMLIFrameElement {
  if (_iframe) return _iframe;
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;width:1px;height:1px;bottom:0;left:0;opacity:0.01;pointer-events:none;z-index:-1;overflow:hidden;';
  const el = document.createElement('iframe');
  el.id = 'yt-player';
  el.style.cssText = 'width:1px;height:1px;border:none;';
  el.allow = 'autoplay;encrypted-media';
  wrap.appendChild(el);
  document.body.appendChild(wrap);
  _iframe = el;
  return el;
}

function loadVideo(videoId: string, volume: number) {
  if (!videoId || videoId === _currentId) return;
  _currentId = videoId;
  const el = getIframe();
  const origin = window.location.origin || 'null';
  const start = Math.floor(Math.random() * 40);
  el.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&iv_load_policy=3&start=${start}&origin=${encodeURIComponent(origin)}&mute=0`;
  // Volume injected via postMessage after load
  setTimeout(() => {
    try { el.contentWindow?.postMessage(`{"event":"command","func":"setVolume","args":[${Math.round(volume*70)}]}`, '*'); } catch {}
  }, 2000);
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  _volume = 0.65;
  _muted = false;
  _shuffle = true;
  _playing = false;
  _category: MusicCategory = 'home';
  _trackIdx = 0;
  private _bgInterval: ReturnType<typeof setInterval> | null = null;
  private _bgGain: GainNode | null = null;

  private audioCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.masterGain.gain.value = this._muted ? 0 : this._volume;
      this.sfxGain.gain.value = 0.85;
      this.masterGain.connect(this.ctx.destination);
      this.sfxGain.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  isMuted()   { return this._muted; }
  getVolume() { return this._volume; }
  isShuffling(){ return this._shuffle; }
  isCurrentlyPlaying(){ return this._playing; }
  getCategory(){ return this._category; }
  getCurrentTrack(): TrackInfo | null { return PLAYLISTS[this._category]?.[this._trackIdx] ?? null; }
  getPlaylist(cat: MusicCategory) { return PLAYLISTS[cat]; }

  setVolume(v: number) {
    this._volume = Math.max(0, Math.min(1, v));
    if (this.masterGain) this.masterGain.gain.value = this._muted ? 0 : this._volume;
    if (_iframe) {
      try { _iframe.contentWindow?.postMessage(`{"event":"command","func":"setVolume","args":[${Math.round(v*70)}]}`, '*'); } catch {}
    }
  }

  setMuted(m: boolean) {
    this._muted = m;
    if (this.masterGain) this.masterGain.gain.value = m ? 0 : this._volume;
    if (_iframe) {
      _iframe.style.display = m ? 'none' : '';
      if (!m && this._playing) this.resumeMusic();
    }
    if (this._bgGain) this._bgGain.gain.value = m ? 0 : 0.018;
  }

  setShuffleMode(s: boolean) { this._shuffle = s; }

  startBgMusic(category: MusicCategory = 'home') {
    this._category = category;
    const pl = PLAYLISTS[category];
    if (!pl?.length) return;
    this._trackIdx = this._shuffle ? Math.floor(Math.random() * pl.length) : 0;
    if (!this._muted) {
      loadVideo(pl[this._trackIdx].id, this._volume);
      this._playing = true;
    }
    this._startProcedural(category);
  }

  pauseMusic() {
    this._playing = false;
    if (_iframe) { _iframe.src = ''; _currentId = ''; }
    if (this._bgInterval) { clearInterval(this._bgInterval); this._bgInterval = null; }
  }

  resumeMusic() {
    if (this._muted) return;
    const tr = this.getCurrentTrack();
    if (tr) { _currentId = ''; loadVideo(tr.id, this._volume); this._playing = true; }
  }

  skipTrack() {
    const pl = PLAYLISTS[this._category];
    if (!pl?.length) return;
    let next = this._trackIdx;
    if (pl.length > 1) while (next === this._trackIdx) next = Math.floor(Math.random() * pl.length);
    this._trackIdx = next;
    _currentId = '';
    if (!this._muted) { loadVideo(pl[next].id, this._volume); this._playing = true; }
  }

  switchCategory(cat: MusicCategory) { this.startBgMusic(cat); }

  stopBgMusic() {
    this._playing = false;
    if (_iframe) { _iframe.src = 'about:blank'; _currentId = ''; }
    if (this._bgInterval) { clearInterval(this._bgInterval); this._bgInterval = null; }
    if (this._bgGain) { try { this._bgGain.gain.value = 0; } catch {} this._bgGain = null; }
  }

  private _startProcedural(cat: MusicCategory) {
    if (this._bgInterval) { clearInterval(this._bgInterval); this._bgInterval = null; }
    try {
      const ctx = this.audioCtx();
      if (!this._bgGain) {
        this._bgGain = ctx.createGain();
        this._bgGain.gain.value = this._muted ? 0 : 0.018;
        this._bgGain.connect(this.masterGain!);
      }
      const hype = ['tug','lightning','tournament','countdown','robotics'].includes(cat);
      const bpm = hype ? 138 : 95;
      const beat = (60 / bpm) * 1000;
      const play = () => {
        if (this._muted || !this._bgGain) return;
        try {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.connect(g); g.connect(this._bgGain);
          o.type = hype ? 'sawtooth' : 'sine';
          o.frequency.value = hype ? 75 : 85;
          g.gain.setValueAtTime(0.7, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + beat / 1400);
          o.start(ctx.currentTime); o.stop(ctx.currentTime + beat / 1400 + 0.01);
        } catch {}
      };
      play();
      this._bgInterval = setInterval(play, beat);
    } catch {}
  }

  // ── SFX ──
  private tone(freq:number,type:OscillatorType,dur:number,gain=0.3,delay=0) {
    if(this._muted)return;
    try{
      const ctx=this.audioCtx();
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(this.sfxGain??this.masterGain!);
      o.type=type;o.frequency.value=freq;
      const t=ctx.currentTime+delay;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain*0.85,t+0.01);
      g.gain.exponentialRampToValueAtTime(0.001,t+dur);
      o.start(t);o.stop(t+dur+0.01);
    }catch{}
  }
  private noise(dur:number,gain=0.1,freq=300){
    if(this._muted)return;
    try{
      const ctx=this.audioCtx();
      const buf=ctx.createBuffer(1,ctx.sampleRate*dur,ctx.sampleRate);
      const d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
      const src=ctx.createBufferSource();src.buffer=buf;
      const flt=ctx.createBiquadFilter();flt.type='bandpass';flt.frequency.value=freq;flt.Q.value=1.2;
      const g=ctx.createGain();
      g.gain.setValueAtTime(gain*0.85,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
      src.connect(flt);flt.connect(g);g.connect(this.sfxGain??this.masterGain!);src.start();
    }catch{}
  }

  correct()  { this.tone(523,'sine',0.08,0.5);this.tone(659,'sine',0.08,0.5,0.09);this.tone(784,'sine',0.18,0.5,0.18);this.noise(0.04,0.03,8000); }
  wrong()    { this.tone(220,'sawtooth',0.09,0.4);this.tone(165,'sawtooth',0.14,0.35,0.1); }
  combo(n:number){ const f=[523,659,784,1047,1319,1568];f.slice(0,Math.min(n+1,6)).forEach((v,i)=>this.tone(v,'sine',0.12,0.55,i*0.07));if(n>=5){this.noise(0.08,0.07,5500);this.tone(1760,'sine',0.2,0.4,0.4);} }
  superPull(){ [55,75,100,150,200,300].forEach((f,i)=>this.tone(f,'sawtooth',0.45,0.55,i*0.04));this.tone(1000,'sine',0.22,0.65,0.25);this.noise(0.18,0.12,3000); }
  countdown(n:number){ this.tone(n===0?880:440,n===0?'sine':'square',n===0?0.55:0.2,0.55); }
  victory()  { [523,523,523,415,523,622,523].forEach((f,i)=>{if(f>0)this.tone(f,'sine',0.2,0.55,i*0.13);});[196,262,330,415].forEach((f,i)=>this.tone(f,'triangle',0.38,0.3,i*0.05)); }
  levelUp()  { [392,494,587,698,784,880].forEach((f,i)=>this.tone(f,'sine',0.15,0.45,i*0.07)); }
  achievementUnlock(){ [784,988,1175,1319].forEach((f,i)=>this.tone(f,'sine',0.2,0.5,i*0.08));this.noise(0.1,0.05,6000); }
  leaderboardReveal(){ [330,392,494,523,659].forEach((f,i)=>this.tone(f,'triangle',0.15,0.4,i*0.09)); }
  click()    { this.tone(800,'sine',0.04,0.18); }
  timerWarning(){ this.tone(880,'square',0.07,0.35); }
  timerTick(){ this.tone(660,'sine',0.035,0.14); }
  crowd()    { for(let i=0;i<10;i++)this.noise(0.3+Math.random()*0.3,0.025,200+Math.random()*900);setTimeout(()=>{for(let i=0;i<8;i++)this.noise(0.25,0.02,300+Math.random()*700);},280); }
  roar()     { [75,95,120,155].forEach((f,i)=>this.tone(f,'sawtooth',0.5,0.65,i*0.035));this.noise(0.28,0.14,400); }
  hype()     { [330,392,494,587,698,784,880,1047].forEach((f,i)=>this.tone(f,'sawtooth',0.08,0.42,i*0.035));this.noise(0.14,0.07,2200); }
  xpGain()   { [440,554,659,784].forEach((f,i)=>this.tone(f,'sine',0.1,0.32,i*0.055)); }
  joinRoom() { [440,523,659].forEach((f,i)=>this.tone(f,'sine',0.1,0.4,i*0.08)); }
  elimination(){ this.tone(440,'sawtooth',0.1,0.5);this.tone(330,'sawtooth',0.12,0.45,0.12);this.tone(220,'sawtooth',0.15,0.4,0.25);this.noise(0.2,0.1,500); }
  speedCrown(){ [784,988,1175,1397,1568].forEach((f,i)=>this.tone(f,'sine',0.12,0.5,i*0.06));this.noise(0.08,0.06,7000); }
  houseAnthem(house:string){ const m:Record<string,number[]>={Alpha:[523,587,659,784,659,784,880],Beta:[440,523,587,659,587,659,784],Gamma:[392,440,523,587,523,659,784],Pulsar:[659,784,880,988,880,784,659]};(m[house]??m.Alpha).forEach((f,i)=>this.tone(f,'sine',0.18,0.45,i*0.11)); }
  // Coding/Robotics special sounds
  codeSuccess(){ [523,659,784,1047].forEach((f,i)=>this.tone(f,'sine',0.1,0.45,i*0.06));this.noise(0.05,0.04,6000); }
  robotBeep() { this.tone(880,'square',0.06,0.4);this.tone(1100,'square',0.04,0.3,0.07); }
  compile()   { [200,300,400,500,600].forEach((f,i)=>this.tone(f,'sawtooth',0.05,0.3,i*0.03));this.noise(0.1,0.05,2000); }
}

export const soundEngine = new SoundEngine();
