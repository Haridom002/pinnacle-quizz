import { MathQuestion, MathOperation, DifficultyLevel } from '../types';

let qIdCounter = 0;
function genId() { return `mq-${++qIdCounter}-${Date.now()}`; }

// Grade-based question configs: Grade 1-9 maps to appropriate operations and ranges
export type GradeLevel = 1|2|3|4|5|6|7|8|9;

interface RangeConfig { min: number; max: number; }

const DIFFICULTY_RANGES: Record<DifficultyLevel, Record<MathOperation, {a:RangeConfig;b:RangeConfig;timeLimit:number;points:number}>> = {
  beginner: {      // Grade 1-3
    multiply: {a:{min:1,max:5},  b:{min:1,max:5},  timeLimit:20, points:100},
    add:      {a:{min:1,max:20}, b:{min:1,max:20}, timeLimit:15, points:80},
    subtract: {a:{min:5,max:20}, b:{min:1,max:5},  timeLimit:15, points:80},
    divide:   {a:{min:1,max:5},  b:{min:1,max:5},  timeLimit:20, points:100},
    mixed:    {a:{min:1,max:15}, b:{min:1,max:10}, timeLimit:15, points:90},
  },
  intermediate: {  // Grade 4-6
    multiply: {a:{min:2,max:12}, b:{min:2,max:12}, timeLimit:15, points:150},
    add:      {a:{min:10,max:99},b:{min:10,max:99},timeLimit:12, points:120},
    subtract: {a:{min:20,max:99},b:{min:5,max:40}, timeLimit:12, points:120},
    divide:   {a:{min:6,max:72}, b:{min:2,max:9},  timeLimit:15, points:150},
    mixed:    {a:{min:5,max:50}, b:{min:2,max:25}, timeLimit:13, points:140},
  },
  advanced: {      // Grade 7-8
    multiply: {a:{min:7,max:25}, b:{min:7,max:25}, timeLimit:12, points:200},
    add:      {a:{min:50,max:500},b:{min:50,max:500},timeLimit:10,points:180},
    subtract: {a:{min:100,max:999},b:{min:10,max:200},timeLimit:10,points:180},
    divide:   {a:{min:24,max:200},b:{min:4,max:20},timeLimit:12,points:200},
    mixed:    {a:{min:10,max:100},b:{min:5,max:50}, timeLimit:11, points:190},
  },
  genius: {        // Grade 9 / JHS 3
    multiply: {a:{min:11,max:99},b:{min:11,max:99},timeLimit:10,points:350},
    add:      {a:{min:200,max:9999},b:{min:200,max:9999},timeLimit:8,points:300},
    subtract: {a:{min:500,max:9999},b:{min:100,max:999},timeLimit:8,points:300},
    divide:   {a:{min:50,max:500},b:{min:5,max:25},timeLimit:10,points:350},
    mixed:    {a:{min:20,max:500},b:{min:5,max:99},timeLimit:9, points:320},
  },
};

// Map grade to difficulty
export function gradeToDifficulty(grade: GradeLevel): DifficultyLevel {
  if (grade <= 3) return 'beginner';
  if (grade <= 6) return 'intermediate';
  if (grade <= 8) return 'advanced';
  return 'genius';
}

function rand(min:number,max:number){ return Math.floor(Math.random()*(max-min+1))+min; }

function pickOp(op:MathOperation):MathOperation {
  if (op!=='mixed') return op;
  const ops:MathOperation[]=['multiply','add','subtract','divide'];
  return ops[Math.floor(Math.random()*ops.length)];
}

export function generateMathQuestion(operation:MathOperation, difficulty:DifficultyLevel): MathQuestion {
  const actualOp = pickOp(operation);
  const cfg = DIFFICULTY_RANGES[difficulty][actualOp];
  let a:number, b:number, answer:number, question:string;

  switch(actualOp) {
    case 'multiply':
      a=rand(cfg.a.min,cfg.a.max); b=rand(cfg.b.min,cfg.b.max);
      answer=a*b; question=`${a} × ${b}`; break;
    case 'add':
      a=rand(cfg.a.min,cfg.a.max); b=rand(cfg.b.min,cfg.b.max);
      answer=a+b; question=`${a} + ${b}`; break;
    case 'subtract':
      a=rand(cfg.a.min,cfg.a.max);
      b=rand(cfg.b.min,Math.min(cfg.b.max,a-1));
      if(b<1)b=1; if(b>=a)a=b+rand(1,10);
      answer=a-b; question=`${a} − ${b}`; break;
    case 'divide':
      b=rand(cfg.b.min,cfg.b.max);
      answer=rand(2,Math.max(2,Math.floor(cfg.a.max/b)));
      a=b*answer; question=`${a} ÷ ${b}`; break;
    default:
      a=rand(1,20); b=rand(1,10); answer=a+b; question=`${a} + ${b}`;
  }

  return { id:genId(), question, answer, operation:actualOp, difficulty, timeLimit:cfg.timeLimit, points:cfg.points };
}

// Auto-generate questions for a grade level
export function generateQuestionsForGrade(grade:GradeLevel, count=10, operation:MathOperation='mixed'): MathQuestion[] {
  const diff = gradeToDifficulty(grade);
  return Array.from({length:count},()=>generateMathQuestion(operation,diff));
}

export function generateQuestionBatch(op:MathOperation,diff:DifficultyLevel,count=10): MathQuestion[] {
  return Array.from({length:count},()=>generateMathQuestion(op,diff));
}

export function calculateSpeedBonus(timeLimit:number,timeTaken:number): number {
  const ratio=Math.max(0,1-timeTaken/timeLimit);
  return Math.floor(ratio*ratio*500);
}

export function getComboMultiplier(combo:number): number {
  if(combo>=10) return 3.0; if(combo>=7) return 2.5;
  if(combo>=5)  return 2.0; if(combo>=3) return 1.5;
  if(combo>=2)  return 1.25; return 1.0;
}

export function calculateXP(points:number,combo:number,correct:boolean): number {
  if(!correct) return 0;
  return Math.floor(points/10)+(combo>=5?combo*2:combo);
}

export function getLevelFromXP(xp:number): number { return Math.floor(Math.sqrt(xp/100))+1; }
export function getXPForNextLevel(level:number): number { return level*level*100; }

export function getDifficultyColor(d:DifficultyLevel): string {
  return {beginner:'#10b981',intermediate:'#3b82f6',advanced:'#f59e0b',genius:'#ef4444'}[d];
}

export function getDifficultyLabel(d:DifficultyLevel): string {
  return {beginner:'Grade 1-3',intermediate:'Grade 4-6',advanced:'Grade 7-8',genius:'Grade 9'}[d];
}

export function adaptDifficulty(current:DifficultyLevel,accuracy:number): DifficultyLevel {
  const levels:DifficultyLevel[]=['beginner','intermediate','advanced','genius'];
  const idx=levels.indexOf(current);
  if(accuracy>0.85&&idx<levels.length-1) return levels[idx+1];
  if(accuracy<0.5&&idx>0) return levels[idx-1];
  return current;
}

export function getScoreGrade(score:number,maxScore:number): {grade:string;color:string;message:string} {
  const pct = maxScore>0 ? score/maxScore : 0;
  if(pct>=0.95) return {grade:'S+',color:'text-yellow-400',message:'Perfect! Absolutely incredible!'};
  if(pct>=0.85) return {grade:'A',color:'text-green-400',message:'Excellent work!'};
  if(pct>=0.70) return {grade:'B',color:'text-blue-400',message:'Good job, keep improving!'};
  if(pct>=0.55) return {grade:'C',color:'text-orange-400',message:'Not bad, practice more!'};
  return {grade:'D',color:'text-red-400',message:'Keep trying — you will improve!'};
}

export function getAchievements(correct:number,bestCombo:number,xp:number): string[] {
  const b:string[]=[];
  if(correct>=1)  b.push('🎯 First Blood');
  if(correct>=10) b.push('🔟 Ten Correct');
  if(correct>=50) b.push('💯 Half Century');
  if(bestCombo>=5) b.push('🔥 On Fire');
  if(bestCombo>=10) b.push('⚡ Unstoppable');
  if(xp>=1000) b.push('⭐ XP Master');
  return b;
}
