import { useState, useMemo } from 'react';
import {
  GES_SUBJECTS, getGrades, getStrands, getSubStrands, getTopics,
  getAllQuestionsForTopic, Difficulty, BankQuestion,
} from '../data/gesBank';
import { Quiz, Question, Answer } from '../types';
import { ANSWER_COLORS, ANSWER_ICONS } from '../data/quizzes';

interface Props {
  onStart: (quiz: Quiz) => void;
  onBack: () => void;
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const QUESTION_COUNTS = [5, 10, 15, 20, 30];
const TIME_OPTIONS = [10, 20, 30, 60];
const DIFFICULTIES: { value: Difficulty | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All Levels', emoji: '🌟' },
  { value: 'beginner', label: 'Beginner', emoji: '🟢' },
  { value: 'intermediate', label: 'Intermediate', emoji: '🟡' },
  { value: 'advanced', label: 'Advanced', emoji: '🔴' },
];

type Step = 'subject' | 'grade' | 'strand' | 'substrand' | 'topic' | 'settings';

export default function GESQuizSelector({ onStart, onBack }: Props) {
  const [step, setStep] = useState<Step>('subject');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [strand, setStrand] = useState('');
  const [subStrand, setSubStrand] = useState('');
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(20);
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');

  const grades = useMemo(() => getGrades(subject), [subject]);
  const strands = useMemo(() => getStrands(subject, grade), [subject, grade]);
  const subStrands = useMemo(() => getSubStrands(subject, grade, strand), [subject, grade, strand]);
  const topics = useMemo(() => getTopics(subject, grade, strand, subStrand), [subject, grade, strand, subStrand]);

  const availableQuestions = useMemo(() => {
    if (!topic) return [];
    return getAllQuestionsForTopic(subject, grade, strand, subStrand, topic, difficulty === 'all' ? undefined : difficulty);
  }, [subject, grade, strand, subStrand, topic, difficulty]);

  function pick(value: string, nextStep: Step, setter: (v: string) => void) {
    setter(value);
    setStep(nextStep);
  }

  function buildAndStart() {
    const pool: BankQuestion[] = shuffle(availableQuestions).slice(0, questionCount);
    const questions: Question[] = pool.map(q => {
      const shuffledIndexes = shuffle([0, 1, 2, 3]);
      const answers: Answer[] = shuffledIndexes.map((origIdx, newIdx) => ({
        id: generateId(),
        text: q.answers[origIdx],
        isCorrect: origIdx === q.correct,
        color: ANSWER_COLORS[newIdx] ?? '#E21B3C',
        icon: ANSWER_ICONS[newIdx] ?? '▲',
      }));
      return {
        id: generateId(),
        text: q.text,
        type: 'multiple-choice' as any,
        timeLimit,
        points: difficulty === 'advanced' ? 1500 : difficulty === 'intermediate' ? 1200 : 1000,
        explanation: '',
        answers,
      };
    });

    const quiz: Quiz = {
      id: generateId(),
      title: `${subject} – ${topic}`,
      description: `${grade} | ${strand} › ${subStrand} | ${difficulty === 'all' ? 'All Levels' : difficulty}`,
      subject,
      grade,
      coverColor: subject === 'Mathematics' ? 'from-blue-600 to-indigo-700'
        : subject === 'English Language' ? 'from-green-600 to-teal-700'
        : 'from-orange-600 to-red-700',
      icon: subject === 'Mathematics' ? '📐' : subject === 'English Language' ? '📖' : '🔬',
      questions,
      createdAt: new Date().toISOString().split('T')[0],
      playCount: 0,
    };

    onStart(quiz);
  }

  const breadcrumb = [subject, grade, strand, subStrand, topic].filter(Boolean).join(' › ');

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      {/* Header */}
      <div className="bg-[#16213e] px-4 py-4 flex items-center gap-3 border-b border-white/10">
        <button onClick={step === 'subject' ? onBack : () => {
          const steps: Step[] = ['subject','grade','strand','substrand','topic','settings'];
          const idx = steps.indexOf(step);
          setStep(steps[Math.max(0, idx - 1)]);
        }} className="text-white/70 hover:text-white text-2xl">←</button>
        <div>
          <h1 className="text-white font-bold text-lg">GES Question Bank</h1>
          {breadcrumb && <p className="text-white/50 text-xs mt-0.5">{breadcrumb}</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* SUBJECT */}
        {step === 'subject' && (
          <Section title="Select Subject" emoji="📚">
            {GES_SUBJECTS.map(s => (
              <OptionCard key={s} label={s}
                emoji={s === 'Mathematics' ? '📐' : s === 'English Language' ? '📖' : '🔬'}
                onClick={() => pick(s, 'grade', setSubject)} />
            ))}
          </Section>
        )}

        {/* GRADE */}
        {step === 'grade' && (
          <Section title="Select Grade" emoji="🎓">
            {grades.map(g => (
              <OptionCard key={g} label={g} emoji="📋"
                onClick={() => pick(g, 'strand', setGrade)} />
            ))}
          </Section>
        )}

        {/* STRAND */}
        {step === 'strand' && (
          <Section title="Select Strand" emoji="🗂️">
            {strands.map(s => (
              <OptionCard key={s} label={s} emoji="📌"
                onClick={() => pick(s, 'substrand', setStrand)} />
            ))}
          </Section>
        )}

        {/* SUB-STRAND */}
        {step === 'substrand' && (
          <Section title="Select Sub-Strand" emoji="📎">
            {subStrands.map(ss => (
              <OptionCard key={ss} label={ss} emoji="🔖"
                onClick={() => pick(ss, 'topic', setSubStrand)} />
            ))}
          </Section>
        )}

        {/* TOPIC */}
        {step === 'topic' && (
          <Section title="Select Topic" emoji="💡">
            {topics.map(t => (
              <OptionCard key={t} label={t} emoji="📝"
                onClick={() => pick(t, 'settings', setTopic)} />
            ))}
          </Section>
        )}

        {/* SETTINGS */}
        {step === 'settings' && (
          <div className="space-y-6">
            <div className="bg-[#16213e] rounded-2xl p-4 border border-white/10">
              <p className="text-white/50 text-xs mb-1">Topic</p>
              <p className="text-white font-bold">{topic}</p>
              <p className="text-white/50 text-xs mt-1">{availableQuestions.length} questions available</p>
            </div>

            {/* Number of Questions */}
            <SettingSection title="Number of Questions" emoji="🔢">
              <div className="grid grid-cols-5 gap-2">
                {QUESTION_COUNTS.map(n => {
                  const available = availableQuestions.length;
                  const disabled = n > available;
                  return (
                    <button key={n} disabled={disabled}
                      onClick={() => setQuestionCount(n)}
                      className={`py-3 rounded-xl font-bold text-sm transition-all ${
                        questionCount === n
                          ? 'bg-purple-600 text-white scale-105'
                          : disabled
                          ? 'bg-white/5 text-white/20 cursor-not-allowed'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}>
                      {n}
                    </button>
                  );
                })}
              </div>
            </SettingSection>

            {/* Time per Question */}
            <SettingSection title="Time per Question" emoji="⏱️">
              <div className="grid grid-cols-4 gap-2">
                {TIME_OPTIONS.map(t => (
                  <button key={t} onClick={() => setTimeLimit(t)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all ${
                      timeLimit === t ? 'bg-purple-600 text-white scale-105' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                    {t}s
                  </button>
                ))}
              </div>
            </SettingSection>

            {/* Difficulty */}
            <SettingSection title="Difficulty" emoji="🎯">
              <div className="grid grid-cols-2 gap-2">
                {DIFFICULTIES.map(d => (
                  <button key={d.value} onClick={() => setDifficulty(d.value)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      difficulty === d.value ? 'bg-purple-600 text-white scale-105' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}>
                    <span>{d.emoji}</span> {d.label}
                  </button>
                ))}
              </div>
            </SettingSection>

            {/* Start Button */}
            <button onClick={buildAndStart}
              disabled={availableQuestions.length === 0}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              🚀 Start Quiz ({Math.min(questionCount, availableQuestions.length)} Questions)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-white font-bold text-xl mb-4">{emoji} {title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function OptionCard({ label, emoji, onClick }: { label: string; emoji: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full bg-[#16213e] border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-purple-500 hover:bg-[#1e2a4a] transition-all text-left group">
      <span className="text-2xl">{emoji}</span>
      <span className="text-white font-medium group-hover:text-purple-300 transition-colors">{label}</span>
      <span className="ml-auto text-white/30 group-hover:text-purple-400">›</span>
    </button>
  );
}

function SettingSection({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#16213e] rounded-2xl p-4 border border-white/10">
      <p className="text-white font-bold mb-3">{emoji} {title}</p>
      {children}
    </div>
  );
}
