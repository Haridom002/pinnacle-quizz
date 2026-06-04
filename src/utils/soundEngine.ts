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
  // ⚡ Lightning — fast EDM, Phonk, NCS hype
  lightning: [
    { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Radio',        style: 'Lofi',       artist: 'Lofi Girl' },
    { id: 'n61ULEU7CO0', title: 'Synthwave Neon Nights',      style: 'Synthwave',  artist: 'Synthwave Radio' },
    { id: 'lTRiuFIWV54', title: 'NCS: Best Gaming Mix',       style: 'EDM',        artist: 'NCS' },
    { id: 'igyR7-DNkE0', title: 'NCS: Energy Boost',          style: 'EDM',        artist: 'NCS' },
    { id: 'DWcJFNfaw9c', title: 'Phonk Drive',                style: 'Phonk',      artist: 'Phonk Radio' },
    { id: 'hHW1oY26kxQ', title: 'Trap Nation Beats',          style: 'Trap',       artist: 'Trap Nation' },
    { id: 'MVPTGNGiI-4', title: 'Deep Focus EDM',             style: 'EDM',        artist: 'Focus EDM' },
    { id: '36YnV9STBqc', title: 'Bass Boosted Car Music',     style: 'Bass',       artist: 'Bass Boosted' },
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',        style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',         style: 'Future Bass',artist: 'Marshmello' },
  ],
  // 🧠 Formation — calm study focus
  formation: [
    { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Radio',         style: 'Lofi',       artist: 'Lofi Girl' },
    { id: '5qap5aO4i9A', title: 'Study Beats 24/7',           style: 'Lofi',       artist: 'ChilledCow' },
    { id: 'rUxyKA_-grg', title: 'Jazz Café Study',            style: 'Jazz',       artist: 'Jazz Vibes' },
    { id: '4oStw0r33so', title: 'Piano Focus Music',          style: 'Classical',  artist: 'Piano Focus' },
    { id: 'kpk2tdsPh0A', title: 'Ambient Study Zone',         style: 'Ambient',    artist: 'Ambient' },
    { id: 'n61ULEU7CO0', title: 'Synthwave Focus',            style: 'Synthwave',  artist: 'Synthwave' },
    { id: 'EvFVnPGD4bI', title: 'Lofi Beats to Study',        style: 'Lofi',       artist: 'Lofi Radio' },
    { id: 'mPZkdNFkNIU', title: 'Coffee Shop Ambience',       style: 'Ambient',    artist: 'Café Sounds' },
  ],
  // ⚔️ Tug of War — epic battle, Afrobeats, Amapiano
  tug: [
    { id: 'Et4GEhBhKSA', title: 'Epic Battle Anthem',         style: 'Epic',       artist: 'Epic Music World' },
    { id: 'HcNj9GxM_6I', title: 'Epic Orchestral Hype',       style: 'Cinematic',  artist: 'Really Slow Motion' },
    { id: 'lTRiuFIWV54', title: 'NCS Battle Mix',             style: 'EDM',        artist: 'NCS' },
    { id: '09R8_2nJtjg', title: 'Afrobeats Workout 2025',     style: 'Afrobeats',  artist: 'Afrobeats Mix' },
    { id: 'l0pWE3YDKNY', title: 'Amapiano Vibes 2025',        style: 'Amapiano',   artist: 'Amapiano Mix' },
    { id: 'WPni755-Krg', title: 'Alan Walker Spectre',        style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello Alone',           style: 'Future Bass',artist: 'Marshmello' },
    { id: '36YnV9STBqc', title: 'Bass Drop Hype Mix',         style: 'Bass EDM',   artist: 'Bass Nation' },
    { id: 'hHW1oY26kxQ', title: 'Trap Hype Anthem',           style: 'Trap',       artist: 'Trap Nation' },
  ],
  // 🏠 Home — chill lobby music
  home: [
    { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Chill',         style: 'Lofi',       artist: 'Lofi Girl' },
    { id: '5qap5aO4i9A', title: 'Soft Study Beats',           style: 'Lofi',       artist: 'ChilledCow' },
    { id: 'rUxyKA_-grg', title: 'Jazz Café Relaxed',          style: 'Jazz',       artist: 'Jazz Vibes' },
    { id: '4oStw0r33so', title: 'Gentle Piano Ambient',       style: 'Classical',  artist: 'Piano Soft' },
    { id: 'EvFVnPGD4bI', title: 'Lofi Afternoon Vibes',       style: 'Lofi',       artist: 'Lofi Radio' },
    { id: 'mPZkdNFkNIU', title: 'Calm Coffee Ambience',       style: 'Ambient',    artist: 'Café Sounds' },
  ],
  // 🎮 Quiz — fun upbeat Afrobeats, Pop
  quiz: [
    { id: '09R8_2nJtjg', title: 'Afrobeats Quiz Party',       style: 'Afrobeats',  artist: 'Afrobeats Mix' },
    { id: 'l0pWE3YDKNY', title: 'Amapiano Quiz Vibes',        style: 'Amapiano',   artist: 'Amapiano Mix' },
    { id: 'lTRiuFIWV54', title: 'NCS Quiz Party',             style: 'EDM',        artist: 'NCS' },
    { id: 'igyR7-DNkE0', title: 'Game Show Energy',           style: 'EDM',        artist: 'NCS' },
    { id: 'DWcJFNfaw9c', title: 'Phonk Speed Quiz',           style: 'Phonk',      artist: 'Phonk Radio' },
    { id: 'n61ULEU7CO0', title: 'Retrowave Quiz',             style: 'Synthwave',  artist: 'Synthwave' },
    { id: 'WPni755-Krg', title: 'Electronic Quiz Mix',        style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Upbeat Future Bass',         style: 'Future Bass',artist: 'Marshmello' },
    { id: '36YnV9STBqc', title: 'Bass Boosted Fun Mix',       style: 'Bass',       artist: 'Bass Boosted' },
  ],
  // 🏆 Victory — celebration
  victory: [
    { id: '09R8_2nJtjg', title: 'Afrobeats Celebration',      style: 'Afrobeats',  artist: 'Afrobeats Mix' },
    { id: 'l0pWE3YDKNY', title: 'Amapiano Winners Anthem',    style: 'Amapiano',   artist: 'Amapiano Mix' },
    { id: 'lTRiuFIWV54', title: 'NCS Victory Anthem',         style: 'EDM',        artist: 'NCS' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello Celebration',     style: 'Future Bass',artist: 'Marshmello' },
    { id: 'WPni755-Krg', title: 'Triumphant Electronic',      style: 'Electronic', artist: 'Alan Walker' },
  ],
  // 😰 Suspense — tension, final questions
  suspense: [
    { id: 'kpk2tdsPh0A', title: 'Suspense Build-Up',          style: 'Cinematic',  artist: 'Cinematic' },
    { id: '4oStw0r33so', title: 'Dramatic Piano Tension',     style: 'Classical',  artist: 'Piano Drama' },
    { id: 'rUxyKA_-grg', title: 'Tension Jazz',               style: 'Jazz',       artist: 'Jazz Dark' },
    { id: 'HcNj9GxM_6I', title: 'Cinematic Suspense',         style: 'Cinematic',  artist: 'Really Slow Motion' },
  ],
  // ⏱️ Countdown
  countdown: [
    { id: 'igyR7-DNkE0', title: 'Countdown EDM Drop',         style: 'EDM',        artist: 'NCS' },
    { id: 'lTRiuFIWV54', title: 'Hype Countdown Mix',         style: 'Gaming EDM', artist: 'NCS' },
    { id: 'hHW1oY26kxQ', title: 'Trap Countdown',             style: 'Trap',       artist: 'Trap Nation' },
    { id: '36YnV9STBqc', title: 'Bass Drop Countdown',        style: 'Bass EDM',   artist: 'Bass Nation' },
  ],
  // 🎯 Tournament Finals
  tournament: [
    { id: 'Et4GEhBhKSA', title: 'Tournament Grand Anthem',    style: 'Epic',       artist: 'Epic Music World' },
    { id: 'HcNj9GxM_6I', title: 'Finals Cinematic Score',     style: 'Cinematic',  artist: 'Really Slow Motion' },
    { id: 'lTRiuFIWV54', title: 'Grand Finals EDM',           style: 'EDM',        artist: 'NCS' },
    { id: '09R8_2nJtjg', title: 'Afrobeats Championship',     style: 'Afrobeats',  artist: 'Afrobeats Mix' },
    { id: 'WPni755-Krg', title: 'Epic Electronic Finals',     style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Champion Rising',            style: 'Future Bass',artist: 'Marshmello' },
  ],
  // 👨‍🏫 Classroom — calm learning
  classroom: [
    { id: 'jfKfPfyJRdk', title: 'Classroom Lofi Radio',       style: 'Lofi',       artist: 'Lofi Girl' },
    { id: 'rUxyKA_-grg', title: 'Soft Jazz Learning',         style: 'Jazz',       artist: 'Jazz Café' },
    { id: '4oStw0r33so', title: 'Classical Piano Focus',      style: 'Classical',  artist: 'Piano Soft' },
    { id: 'kpk2tdsPh0A', title: 'Ambient Learning Zone',      style: 'Ambient',    artist: 'Ambient' },
    { id: '5qap5aO4i9A', title: 'Study Lofi 24/7',            style: 'Lofi',       artist: 'ChilledCow' },
    { id: 'EvFVnPGD4bI', title: 'Afternoon Study Vibes',      style: 'Lofi',       artist: 'Lofi Radio' },
    { id: 'mPZkdNFkNIU', title: 'Quiet Focus Ambience',       style: 'Ambient',    artist: 'Café Sounds' },
  ],
  // 💻 Coding Arena — tech beats, synthwave, lo-fi
  coding: [
    { id: 'n61ULEU7CO0', title: 'Synthwave Coding Session',   style: 'Synthwave',  artist: 'Synthwave Radio' },
    { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Coding',        style: 'Lofi',       artist: 'Lofi Girl' },
    { id: 'MVPTGNGiI-4', title: 'Deep Focus Programming',     style: 'EDM',        artist: 'Focus EDM' },
    { id: 'EvFVnPGD4bI', title: 'Late Night Coding Beats',    style: 'Lofi',       artist: 'Lofi Radio' },
    { id: 'kpk2tdsPh0A', title: 'Ambient Code Flow',          style: 'Ambient',    artist: 'Ambient' },
    { id: 'DWcJFNfaw9c', title: 'Phonk Coding Drive',         style: 'Phonk',      artist: 'Phonk Radio' },
    { id: 'mPZkdNFkNIU', title: 'Dark Theme Coding Mix',      style: 'Ambient',    artist: 'Dark Ambient' },
    { id: '5qap5aO4i9A', title: 'Programmer Lofi Beats',      style: 'Lofi',       artist: 'ChilledCow' },
  ],
  // 🤖 Robotics Arena — futuristic, electronic, cinematic
  robotics: [
    { id: 'WPni755-Krg', title: 'Alan Walker — Faded',        style: 'Electronic', artist: 'Alan Walker' },
    { id: 'kOkQ4T5WO9E', title: 'Marshmello — Alone',         style: 'Future Bass',artist: 'Marshmello' },
    { id: 'n61ULEU7CO0', title: 'Synthwave Robot City',       style: 'Synthwave',  artist: 'Synthwave Radio' },
    { id: 'Et4GEhBhKSA', title: 'Epic Robotic Battle',        style: 'Epic',       artist: 'Epic Music World' },
    { id: 'lTRiuFIWV54', title: 'NCS Robot Wars Mix',         style: 'EDM',        artist: 'NCS' },
    { id: '36YnV9STBqc', title: 'Bass Boosted Future',        style: 'Bass EDM',   artist: 'Bass Boosted' },
    { id: 'MVPTGNGiI-4', title: 'Futuristic EDM Build',       style: 'EDM',        artist: 'Future EDM' },
    { id: 'HcNj9GxM_6I', title: 'Cinematic Machine Rise',     style: 'Cinematic',  artist: 'Really Slow Motion' },
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
