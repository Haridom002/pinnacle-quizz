import { useState } from 'react';
import { GES_SUBJECTS, getGESQuestions, gesQuestionsToQuiz, GESSubject } from '../data/gesQuestions';
import { Quiz } from '../types';

interface Props {
  onStartQuiz: (quiz: Quiz) => void;
  onBack: () => void;
}

type Step = 'subject' | 'strand' | 'substrand' | 'settings';

const GRADES = [
  { value: 0,  label: 'All Grades' },
  { value: 1,  label: 'Grade 1' },
  { value: 2,  label: 'Grade 2' },
  { value: 3,  label: 'Grade 3' },
  { value: 4,  label: 'Grade 4' },
  { value: 5,  label: 'Grade 5' },
  { value: 6,  label: 'Grade 6' },
  { value: 7,  label: 'Grade 7 (JHS 1)' },
  { value: 8,  label: 'Grade 8 (JHS 2)' },
  { value: 9,  label: 'Grade 9 (JHS 3)' },
];

const DIFFICULTIES = [
  { value: '',             label: 'All Levels',    icon: '🌟', desc: 'Mix of all difficulties' },
  { value: 'beginner',     label: 'Beginner',      icon: '🌱', desc: 'Easy questions, more time' },
  { value: 'intermediate', label: 'Intermediate',  icon: '⚡', desc: 'Standard WAEC level' },
  { value: 'advanced',     label: 'Advanced',      icon: '🔥', desc: 'Challenging WAEC questions' },
];

const QUESTION_COUNTS = [5, 10, 15, 20, 25, 30];
const TIME_OPTIONS = [
  { value: 0,  label: 'Default time per question' },
  { value: 10, label: '10 seconds per question' },
  { value: 15, label: '15 seconds per question' },
  { value: 20, label: '20 seconds per question' },
  { value: 30, label: '30 seconds per question' },
  { value: 45, label: '45 seconds per question' },
  { value: 60, label: '60 seconds per question' },
];

export default function GESQuizSelector({ onStartQuiz, onBack }: Props) {
  const [step,        setStep]        = useState<Step>('subject');
  const [subject,     setSubject]     = useState<GESSubject | null>(null);
  const [strandName,  setStrandName]  = useState('');
  const [subStrand,   setSubStrand]   = useState('');
  const [grade,       setGrade]       = useState(0);
  const [difficulty,  setDifficulty]  = useState('');
  const [qCount,      setQCount]      = useState(10);
  const [timePerQ,    setTimePerQ]    = useState(0);
  const [error,       setError]       = useState('');

  const selectedStrand = subject?.strands.find(s => s.name === strandName);

  // Count available questions
  const availableCount = getGESQuestions({
    subject: subject?.name,
    strand: strandName || undefined,
    subStrand: subStrand || undefined,
    grade: grade || undefined,
    difficulty: difficulty || undefined,
  }).length;

  const handleStart = () => {
    setError('');
    const questions = getGESQuestions({
      subject: subject?.name,
      strand: strandName || undefined,
      subStrand: subStrand || undefined,
      grade: grade || undefined,
      difficulty: difficulty || undefined,
    });

    if (questions.length === 0) {
      setError('No questions found for these filters. Try selecting different options.');
      return;
    }

    // Shuffle and take requested count
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(qCount, shuffled.length));

    // Apply custom time if set
    const finalQuestions = selected.map(q => ({
      ...q,
      timeLimit: timePerQ > 0 ? timePerQ : q.timeLimit,
    }));

    const title = subStrand || strandName || subject?.name || 'GES Quiz';
    const quiz = gesQuestionsToQuiz(
      finalQuestions, title,
      subject?.name ?? 'General',
      grade > 0 ? `Grade ${grade}` : 'All Grades',
      subject?.coverColor ?? 'from-purple-600 to-indigo-700',
      subject?.icon ?? '📚'
    );

    onStartQuiz(quiz as Quiz);
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-1 mb-6">
      {(['subject','strand','substrand','settings'] as Step[]).map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
            step === s ? 'bg-purple-500 text-white scale-110' :
            ['subject','strand','substrand','settings'].indexOf(step) > i ? 'bg-green-500 text-white' :
            'bg-white/10 text-white/30'
          }`}>{i + 1}</div>
          {i < 3 && <div className={`w-8 h-0.5 rounded ${['subject','strand','substrand','settings'].indexOf(step) > i ? 'bg-green-500' : 'bg-white/10'}`}/>}
        </div>
      ))}
      <div className="ml-2 text-white/40 text-xs capitalize">{step}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col">
      <header className="bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => {
          if (step === 'subject') onBack();
          else if (step === 'strand') setStep('subject');
          else if (step === 'substrand') setStep('strand');
          else setStep('substrand');
        }} className="text-white/50 hover:text-white text-sm flex items-center gap-2 transition-colors">← Back</button>
        <span className="text-white font-black text-sm">📚 GES Curriculum Quiz</span>
        <div className="w-16"/>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <StepIndicator/>

        {/* ── STEP 1: Subject ── */}
        {step === 'subject' && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Choose a Subject</h2>
            <p className="text-white/40 text-sm mb-5">GES New Curriculum — Grades 1–9</p>
            <div className="grid grid-cols-2 gap-3">
              {GES_SUBJECTS.map(subj => {
                const total = getGESQuestions({ subject: subj.name }).length;
                return (
                  <button key={subj.name}
                    onClick={() => { setSubject(subj); setStrandName(''); setSubStrand(''); setStep('strand'); }}
                    className={`bg-gradient-to-br ${subj.coverColor} p-5 rounded-2xl text-left hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg`}>
                    <div className="text-4xl mb-3">{subj.icon}</div>
                    <div className="text-white font-black text-sm mb-1">{subj.name}</div>
                    <div className="text-white/60 text-xs">{subj.strands.length} strands · {total} questions</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 2: Strand ── */}
        {step === 'strand' && subject && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${subject.coverColor} flex items-center justify-center text-2xl`}>{subject.icon}</div>
              <div>
                <h2 className="text-xl font-black text-white">{subject.name}</h2>
                <p className="text-white/40 text-sm">Choose a strand (topic area)</p>
              </div>
            </div>

            {/* All topics option */}
            <button onClick={() => { setStrandName(''); setSubStrand(''); setStep('settings'); }}
              className="w-full p-4 mb-3 rounded-2xl border-2 border-purple-400/40 bg-purple-400/10 text-left hover:bg-purple-400/20 transition-all flex items-center gap-3">
              <span className="text-3xl">✨</span>
              <div>
                <div className="text-white font-black">All Strands</div>
                <div className="text-white/40 text-sm">{getGESQuestions({ subject: subject.name }).length} total questions</div>
              </div>
              <span className="ml-auto text-purple-400">→</span>
            </button>

            <div className="space-y-2">
              {subject.strands.map(strand => {
                const count = getGESQuestions({ subject: subject.name, strand: strand.name }).length;
                return (
                  <button key={strand.name}
                    onClick={() => { setStrandName(strand.name); setSubStrand(''); setStep('substrand'); }}
                    className="w-full p-4 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 text-left transition-all flex items-center gap-3">
                    <span className="text-2xl">{strand.icon}</span>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{strand.name}</div>
                      <div className="text-white/35 text-xs">{strand.subStrands.length} sub-strands · {count} questions</div>
                    </div>
                    <span className="text-white/30">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 3: Sub-strand ── */}
        {step === 'substrand' && subject && selectedStrand && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{selectedStrand.icon}</span>
              <div>
                <h2 className="text-xl font-black text-white">{selectedStrand.name}</h2>
                <p className="text-white/40 text-sm">Choose a specific topic</p>
              </div>
            </div>

            <button onClick={() => { setSubStrand(''); setStep('settings'); }}
              className="w-full p-4 mb-3 rounded-2xl border-2 border-purple-400/40 bg-purple-400/10 text-left hover:bg-purple-400/20 transition-all flex items-center gap-3">
              <span className="text-3xl">✨</span>
              <div>
                <div className="text-white font-black">All Topics in {selectedStrand.name}</div>
                <div className="text-white/40 text-sm">{getGESQuestions({ subject: subject.name, strand: strandName }).length} questions</div>
              </div>
              <span className="ml-auto text-purple-400">→</span>
            </button>

            <div className="space-y-2">
              {selectedStrand.subStrands.map(ss => {
                const count = getGESQuestions({ subject: subject.name, strand: strandName, subStrand: ss.name }).length;
                return (
                  <button key={ss.name}
                    onClick={() => { setSubStrand(ss.name); setStep('settings'); }}
                    className="w-full p-4 rounded-2xl border border-white/10 bg-white/4 hover:bg-white/8 text-left transition-all flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: selectedStrand.color }}/>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{ss.name}</div>
                      <div className="text-white/35 text-xs">{count} question{count !== 1 ? 's' : ''}</div>
                    </div>
                    <span className="text-white/30">→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 4: Settings ── */}
        {step === 'settings' && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Quiz Settings</h2>
            <div className="text-white/40 text-sm mb-5">
              {subject?.name}{strandName ? ` › ${strandName}` : ''}{subStrand ? ` › ${subStrand}` : ''}
              <span className="ml-2 text-purple-400 font-bold">({availableCount} questions available)</span>
            </div>

            {/* Grade selector */}
            <div className="mb-5">
              <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">📚 Grade Level</label>
              <div className="grid grid-cols-2 gap-2">
                {GRADES.map(g => (
                  <button key={g.value} onClick={() => setGrade(g.value)}
                    className={`py-2.5 px-3 rounded-xl border-2 text-sm font-bold transition-all text-left ${grade === g.value ? 'border-purple-400 bg-purple-400/20 text-white' : 'border-white/10 bg-white/4 text-white/50 hover:bg-white/8'}`}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-5">
              <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">⚡ Difficulty</label>
              <div className="grid grid-cols-2 gap-2">
                {DIFFICULTIES.map(d => (
                  <button key={d.value} onClick={() => setDifficulty(d.value)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${difficulty === d.value ? 'border-purple-400 bg-purple-400/20' : 'border-white/10 bg-white/4 hover:bg-white/8'}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{d.icon}</span>
                      <span className="text-white font-bold text-xs">{d.label}</span>
                    </div>
                    <div className="text-white/35 text-xs">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of questions */}
            <div className="mb-5">
              <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">🔢 Number of Questions</label>
              <div className="grid grid-cols-3 gap-2">
                {QUESTION_COUNTS.map(n => (
                  <button key={n} onClick={() => setQCount(n)}
                    className={`py-3 rounded-xl border-2 font-black text-lg transition-all ${qCount === n ? 'border-purple-400 bg-purple-400/20 text-white' : 'border-white/10 bg-white/4 text-white/50 hover:bg-white/8'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Time per question */}
            <div className="mb-6">
              <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">⏱️ Time per Question</label>
              <select value={timePerQ} onChange={e => setTimePerQ(Number(e.target.value))}
                className="w-full bg-white/8 border border-white/15 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm">
                {TIME_OPTIONS.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
              <div className="text-white font-black text-sm mb-3">📋 Quiz Summary</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/40">Subject</span><span className="text-white font-bold">{subject?.name}</span></div>
                {strandName && <div className="flex justify-between"><span className="text-white/40">Strand</span><span className="text-white font-bold">{strandName}</span></div>}
                {subStrand && <div className="flex justify-between"><span className="text-white/40">Topic</span><span className="text-white font-bold">{subStrand}</span></div>}
                <div className="flex justify-between"><span className="text-white/40">Grade</span><span className="text-white font-bold">{grade > 0 ? `Grade ${grade}` : 'All Grades'}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Difficulty</span><span className="text-white font-bold">{difficulty || 'All Levels'}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Questions</span><span className="text-purple-400 font-black">{Math.min(qCount, availableCount)} of {availableCount} available</span></div>
              </div>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">⚠ {error}</div>}

            <button onClick={handleStart} disabled={availableCount === 0}
              className="w-full py-5 font-black text-white text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 8px 32px rgba(124,58,237,0.4)' }}>
              🚀 Start Quiz
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                {Math.min(qCount, availableCount)} questions
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
