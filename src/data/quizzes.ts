import { Quiz } from '../types';

export const ANSWER_COLORS = ['#E21B3C','#1368CE','#26890C','#FFA602'];
export const ANSWER_ICONS  = ['▲','◆','●','■'];

export const AVATARS = [
  '🦁','🐯','🦊','🐺','🦝','🐻','🐼','🐨',
  '🦄','🐸','🦋','🐙','🦈','🦅','🦚','🐲',
  '🚀','⭐','🔥','💎','🌊','⚡','🌈','🎯',
];

export const SUBJECTS = [
  'Mathematics','Science','English Language','History',
  'Geography','Physics','Chemistry','Biology',
  'Literature','Art','Social Studies','French',
  'Career Technology','Computing','Twi',
  'RME','Creative Arts','Physical Education','ICT',
  'Environmental Studies','Ghanaian Language',
];

export const GRADE_LEVELS = [
  'Grade 1','Grade 2','Grade 3','Grade 4','Grade 5',
  'Grade 6','Grade 7','Grade 8','Grade 9',
  'JHS 1','JHS 2','JHS 3',
];

export const QUIZ_COVER_COLORS = [
  'from-purple-600 to-indigo-700',
  'from-blue-600 to-cyan-700',
  'from-green-600 to-emerald-700',
  'from-orange-500 to-red-600',
  'from-pink-600 to-rose-700',
  'from-yellow-500 to-orange-600',
  'from-teal-600 to-green-700',
  'from-red-600 to-pink-700',
];

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id:'q1', title:'Multiplication Tables Mastery', description:'Test your times tables from 1–12.',
    subject:'Mathematics', grade:'Grade 4', coverColor:'from-purple-600 to-indigo-700',
    icon:'✖️', playCount:3421, createdAt:'2025-01-01',
    questions:[
      { id:'q1-1', text:'What is 7 × 8?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'54',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'56',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'48',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'63',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q1-2', text:'What is 9 × 6?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'45',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'52',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'54',isCorrect:true,color:'#26890C',icon:'●'},{id:'d',text:'58',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q1-3', text:'What is 12 × 11?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'121',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'132',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'144',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'112',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
  {
    id:'q2', title:'Basic Science — Living Things', description:'Plants, animals and life processes.',
    subject:'Science', grade:'Grade 3', coverColor:'from-green-600 to-emerald-700',
    icon:'🌿', playCount:2187, createdAt:'2025-01-02',
    questions:[
      { id:'q2-1', text:'What do plants need to make food?', type:'multiple-choice', timeLimit:25, points:1000,
        answers:[{id:'a',text:'Darkness',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Sunlight, water and CO₂',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'Only water',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'Meat',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q2-2', text:'Which animal is a mammal?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'Lizard',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Frog',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'Dolphin',isCorrect:true,color:'#26890C',icon:'●'},{id:'d',text:'Eagle',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
  {
    id:'q3', title:'English Language — Grammar Basics', description:'Nouns, verbs and sentence structure.',
    subject:'English Language', grade:'Grade 5', coverColor:'from-blue-600 to-cyan-700',
    icon:'📝', playCount:1893, createdAt:'2025-01-03',
    questions:[
      { id:'q3-1', text:'Which word is a noun?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'Run',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Happy',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'School',isCorrect:true,color:'#26890C',icon:'●'},{id:'d',text:'Quickly',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q3-2', text:'Which sentence is correct?', type:'multiple-choice', timeLimit:25, points:1000,
        answers:[{id:'a',text:'She go to school.',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'She goes to school.',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'She going to school.',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'She gone to school.',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
  {
    id:'q4', title:'Social Studies — Ghana', description:'History, culture and geography of Ghana.',
    subject:'Social Studies', grade:'Grade 6', coverColor:'from-yellow-500 to-orange-600',
    icon:'🇬🇭', playCount:1654, createdAt:'2025-01-04',
    questions:[
      { id:'q4-1', text:'What is the capital city of Ghana?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'Kumasi',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Tamale',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'Accra',isCorrect:true,color:'#26890C',icon:'●'},{id:'d',text:'Cape Coast',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q4-2', text:'In which year did Ghana gain independence?', type:'multiple-choice', timeLimit:25, points:1000,
        answers:[{id:'a',text:'1945',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'1957',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'1960',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'1963',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
  {
    id:'q5', title:'Career Technology — Tools & Safety', description:'Basic tools, technology and workplace safety.',
    subject:'Career Technology', grade:'JHS 1', coverColor:'from-teal-600 to-green-700',
    icon:'🔧', playCount:987, createdAt:'2025-01-05',
    questions:[
      { id:'q5-1', text:'Which tool is used to tighten screws?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'Hammer',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Screwdriver',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'Pliers',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'Saw',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
  {
    id:'q6', title:'French — Greetings & Numbers', description:'Basic French phrases and counting 1–20.',
    subject:'French', grade:'JHS 2', coverColor:'from-blue-600 to-indigo-700',
    icon:'🇫🇷', playCount:743, createdAt:'2025-01-06',
    questions:[
      { id:'q6-1', text:'How do you say "Hello" in French?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'Hola',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Bonjour',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'Ciao',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'Salut',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q6-2', text:'What is "Cinq" in English?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'Three',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Four',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'Five',isCorrect:true,color:'#26890C',icon:'●'},{id:'d',text:'Six',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
  {
    id:'q7', title:'Twi Language — Basic Vocabulary', description:'Learn common Twi words and phrases.',
    subject:'Twi', grade:'Grade 4', coverColor:'from-orange-500 to-red-600',
    icon:'🌍', playCount:1123, createdAt:'2025-01-07',
    questions:[
      { id:'q7-1', text:'What does "Medaase" mean in English?', type:'multiple-choice', timeLimit:25, points:1000,
        answers:[{id:'a',text:'Hello',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'Goodbye',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'Thank you',isCorrect:true,color:'#26890C',icon:'●'},{id:'d',text:'Sorry',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q7-2', text:'How do you say "Good morning" in Twi?', type:'multiple-choice', timeLimit:25, points:1000,
        answers:[{id:'a',text:'Maakye',isCorrect:true,color:'#E21B3C',icon:'▲'},{id:'b',text:'Mema wo adwo',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'Akwaaba',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'Yɛfrɛ wo sɛn?',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
  {
    id:'q8', title:'Mathematics — Fractions & Decimals', description:'Understanding parts of a whole.',
    subject:'Mathematics', grade:'Grade 5', coverColor:'from-pink-600 to-rose-700',
    icon:'🔢', playCount:2341, createdAt:'2025-01-08',
    questions:[
      { id:'q8-1', text:'What is ½ + ¼?', type:'multiple-choice', timeLimit:25, points:1000,
        answers:[{id:'a',text:'¾',isCorrect:true,color:'#E21B3C',icon:'▲'},{id:'b',text:'⅔',isCorrect:false,color:'#1368CE',icon:'◆'},{id:'c',text:'1',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'⅛',isCorrect:false,color:'#FFA602',icon:'■'}]},
      { id:'q8-2', text:'What is 0.5 as a fraction?', type:'multiple-choice', timeLimit:20, points:1000,
        answers:[{id:'a',text:'¼',isCorrect:false,color:'#E21B3C',icon:'▲'},{id:'b',text:'½',isCorrect:true,color:'#1368CE',icon:'◆'},{id:'c',text:'¾',isCorrect:false,color:'#26890C',icon:'●'},{id:'d',text:'⅓',isCorrect:false,color:'#FFA602',icon:'■'}]},
    ],
  },
];
