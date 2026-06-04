import { useState, useEffect, useCallback, useRef } from 'react';
import { MathQuestion, DifficultyLevel } from '../types';
import { generateMathQuestion } from '../utils/mathEngine';
import { soundEngine } from '../utils/soundEngine';
import MusicPlayer from './MusicPlayer';
import ParticleExplosion from './ParticleExplosion';

interface Props { onBack: () => void; }
type Phase = 'setup' | 'waiting' | 'playing' | 'victory';
type PlayMode = 'solo' | 'local2p' | 'online';
type TugLevel = 'beginner' | 'intermediate' | 'advanced' | 'pro';
type TugSubject = 'maths' | 'coding' | 'robotics' | 'mixed';

interface TriviaQ { question:string; options:string[]; correct:number; xp:number; }

const TRIVIA_BANK: Record<TugSubject, Record<TugLevel, TriviaQ[]>> = {
  coding: {
    beginner: [
      {question:'What does print() do in Python?',options:['Sends email','Shows text on screen','Prints on paper','Deletes code'],correct:1,xp:100},
      {question:'Which is NOT a programming language?',options:['Python','Scratch','Microsoft Word','JavaScript'],correct:2,xp:100},
      {question:'What is a variable?',options:['A type of error','A named container for data','A type of screen','The CPU'],correct:1,xp:100},
      {question:'What symbol starts a Python comment?',options:['//','/*','#','<!--'],correct:2,xp:100},
      {question:'What does CPU stand for?',options:['Central Processing Unit','Computer Power Unit','Creative Program Usage','Central Power Utility'],correct:0,xp:100},
      {question:'Which is an INPUT device?',options:['Monitor','Speaker','Printer','Keyboard'],correct:3,xp:100},
      {question:'What is RAM?',options:['Read Access Memory','Random Access Memory','Run All Memory','Real Application Mode'],correct:1,xp:100},
      {question:'What does "if" do in programming?',options:['Repeats code','Stores data','Makes a decision','Ends the program'],correct:2,xp:100},
      {question:'What is a "bug" in programming?',options:['A real insect','An error in code','A type of virus','A feature'],correct:1,xp:100},
      {question:'What does "www" stand for?',options:['Wide Web World','World Wide Web','World Web Window','Wide World Window'],correct:1,xp:100},
      {question:'Which stores data permanently?',options:['RAM','CPU','Hard Drive','Screen'],correct:2,xp:110},
      {question:'What does a loop do?',options:['Stores data','Repeats code','Makes decisions','Ends program'],correct:1,xp:100},
      {question:'What is an algorithm?',options:['A type of computer','Step-by-step problem solving','A language','A computer error'],correct:1,xp:110},
      {question:'What does HTML stand for?',options:['High Text Machine Language','HyperText Markup Language','Hyper Transfer Machine Language','High Transfer Markup Language'],correct:1,xp:110},
    ],
    intermediate: [
      {question:'What will print(2 + 3 * 4) output?',options:['20','14','24','11'],correct:1,xp:150},
      {question:'What does list.append() do?',options:['Removes last item','Adds item to end','Sorts the list','Finds an item'],correct:1,xp:140},
      {question:'What is the index of the FIRST item in a Python list?',options:['1','0','-1','First'],correct:1,xp:150},
      {question:'What does len() return?',options:['Largest item','Smallest item','Number of items','First item'],correct:2,xp:140},
      {question:'What is x after: x=10; x=x+5?',options:['10','5','15','x+5'],correct:2,xp:160},
      {question:'What HTML tag creates a paragraph?',options:['<div>','<p>','<span>','<text>'],correct:1,xp:140},
      {question:'What is a Python dictionary?',options:['A word book','Collection of key-value pairs','A type of loop','A list of numbers'],correct:1,xp:160},
      {question:'What does "def" keyword do?',options:['Deletes code','Defines a function','Declares a variable','Downloads data'],correct:1,xp:150},
      {question:'What does 17 % 5 equal?',options:['3.4','2','3','85'],correct:1,xp:170},
      {question:'What is f-string syntax in Python?',options:['name = f"Hello"','print(f"Hello {name}")','f = "Hello {name}"','format("Hello {name}")'],correct:1,xp:150},
      {question:'What does a for loop need?',options:['A condition only','A sequence or range to iterate','A function call','An if statement'],correct:1,xp:140},
      {question:'What does CSS stand for?',options:['Computer Style Sheets','Cascading Style Sheets','Creative Style System','Computer Screen Styles'],correct:1,xp:150},
      {question:'What is the output of print(type(42))?',options:["<class 'str'>",'42',"<class 'int'>",'int'],correct:2,xp:160},
      {question:'What does .split() do to a string?',options:['Joins two strings','Breaks into a list','Removes spaces','Counts characters'],correct:1,xp:150},
    ],
    advanced: [
      {question:'What does OOP stand for?',options:['Only One Process','Object-Oriented Programming','Open Operation Protocol','Optional Output Print'],correct:1,xp:200},
      {question:'What is a class in OOP?',options:['A lesson','A blueprint for creating objects','A type of loop','A database table'],correct:1,xp:220},
      {question:'What is recursion?',options:['A type of loop','A function that calls itself','A sorting method','A web technique'],correct:1,xp:250},
      {question:'Time complexity of binary search?',options:['O(n)','O(n²)','O(log n)','O(1)'],correct:2,xp:280},
      {question:'What does API stand for?',options:['Application Programming Interface','Automated Program Input','Advanced Processing Index','Application Procedure Input'],correct:0,xp:220},
      {question:'Which is a Stack data structure?',options:['First In First Out','Last In First Out','Random access','Sorted linked list'],correct:1,xp:250},
      {question:'What does SQL JOIN do?',options:['Splits tables','Combines rows from multiple tables','Deletes records','Creates databases'],correct:1,xp:220},
      {question:'What is async/await used for?',options:['Speeds up loops','Handles asynchronous operations','Styles HTML','Sorts arrays'],correct:1,xp:240},
      {question:'What is a constructor in OOP?',options:['Destructor method','Method that initialises an object','A type of variable','A sorting function'],correct:1,xp:230},
      {question:'Which sorting is O(n log n) average?',options:['Bubble Sort','Selection Sort','Quick Sort','Insertion Sort'],correct:2,xp:260},
      {question:'What does Git version control do?',options:['Speeds up programs','Tracks code changes over time','Compresses files','Protects from viruses'],correct:1,xp:220},
      {question:'What is a linked list?',options:['A Python list','Nodes connected by pointers','A sorted array','A database table'],correct:1,xp:240},
      {question:'What does MVC stand for?',options:['Multiple View Controller','Model View Controller','Main Value Component','Module Version Control'],correct:1,xp:220},
      {question:'What is machine learning?',options:['Teaching computers to type','Algorithms that learn from data','A programming language','Hardware management'],correct:1,xp:250},
    ],
    pro: [
      {question:'Which design pattern ensures one class instance?',options:['Factory','Observer','Singleton','Strategy'],correct:2,xp:400},
      {question:'Which HTTP method creates a new resource?',options:['GET','PUT','POST','DELETE'],correct:2,xp:380},
      {question:'What does Docker containerise?',options:['Just the code','App and all its dependencies','Only databases','Only the OS'],correct:1,xp:380},
      {question:'What is Big O O(1) called?',options:['Linear','Quadratic','Constant','Logarithmic'],correct:2,xp:360},
      {question:'What is a microservice?',options:['A tiny computer','A small, independently deployable service','A type of CSS','A database query'],correct:1,xp:400},
      {question:'What is functional programming?',options:['Programming with functions only','Programs that use pure functions without side effects','Only using loops','Programs that run faster'],correct:1,xp:380},
      {question:'What does CI/CD stand for?',options:['Code Integration/Continuous Deployment','Continuous Integration/Continuous Deployment','Computer Interface/Code Deployment','Continuous Integration/Code Delivery'],correct:1,xp:360},
      {question:'What is a WebSocket used for?',options:['Styling web pages','Real-time bidirectional communication','Storing data','Routing URLs'],correct:1,xp:380},
      {question:'What is a race condition?',options:['Fastest algorithm wins','Two threads access shared data simultaneously causing bugs','A performance benchmark','A sorting race'],correct:1,xp:400},
      {question:'What is memoisation?',options:['Computer memory','Caching function results to avoid recomputation','A type of recursion','Memorising code'],correct:1,xp:380},
      {question:'What does GraphQL solve vs REST?',options:['Slower queries','Over-fetching and under-fetching of data','Security issues','Database problems'],correct:1,xp:400},
      {question:'What is a deadlock?',options:['A security lock','Two processes each waiting for the other to release a resource','A broken loop','A null pointer'],correct:1,xp:380},
    ],
  },
  robotics: {
    beginner: [
      {question:'What is a robot?',options:['Only a toy','A machine that performs tasks automatically','A computer game','A type of car'],correct:1,xp:100},
      {question:'What acts as a robot\'s brain?',options:['The motor','The sensor','The microcontroller','The battery'],correct:2,xp:100},
      {question:'What do sensors do on a robot?',options:['Make it move','Detect things in the environment','Power the robot','Connect to internet'],correct:1,xp:100},
      {question:'What makes a robot\'s wheels move?',options:['Sensors','Batteries alone','Motors','Screens'],correct:2,xp:100},
      {question:'Which is the most popular beginner robotics board?',options:['NASA Board','Intel i7','Arduino Uno','NVIDIA GPU'],correct:2,xp:110},
      {question:'What does digitalWrite(pin, HIGH) do?',options:['Reads a value','Turns a pin ON','Turns a pin OFF','Resets Arduino'],correct:1,xp:110},
      {question:'What kind of sensor measures distance with sound?',options:['IR sensor','Touch sensor','Ultrasonic sensor','Light sensor'],correct:2,xp:120},
      {question:'What do LEGO Spike kits use for programming?',options:['Complex assembly code','Block-based visual programming','Hand-writing','Voice commands'],correct:1,xp:110},
      {question:'What is the purpose of a battery in a robot?',options:['To detect obstacles','To provide electrical power','To control speed','To process data'],correct:1,xp:100},
      {question:'Which is a real household robot?',options:['A pencil','Roomba vacuum cleaner','A bicycle','A wooden chair'],correct:1,xp:100},
      {question:'What is Scratch used for in robotics?',options:['Drawing robots','Programming robots with visual blocks','Building parts','Charging batteries'],correct:1,xp:110},
      {question:'What does void loop() do in Arduino?',options:['Runs once at startup','Runs forever repeatedly','Reads sensors only','Stops the program'],correct:1,xp:110},
      {question:'What is a servo motor?',options:['A motor that spins freely','A motor that rotates to precise angles','A power generator','A sensor'],correct:1,xp:110},
      {question:'What does LED stand for?',options:['Light Emitting Diode','Large Electric Device','Light Energy Display','Linear Electric Diode'],correct:0,xp:100},
    ],
    intermediate: [
      {question:'What does an IR sensor detect?',options:['Sound waves','Infrared light (line following)','Magnetic fields','Radio signals'],correct:1,xp:160},
      {question:'What does PWM stand for?',options:['Power Wire Module','Pulse Width Modulation','Programmed Wheel Motion','Power With Motor'],correct:1,xp:180},
      {question:'Why do we use the L298N motor driver?',options:['To sense distance','Amplify signals to drive motors','To program the robot','To display info'],correct:1,xp:180},
      {question:'What does analogRead() return on Arduino?',options:['True or False','0 to 1023','0 to 5','A string'],correct:1,xp:170},
      {question:'What is an encoder in robotics?',options:['Converts data to code','Measures motor rotation','A type of battery','A wireless transmitter'],correct:1,xp:180},
      {question:'What does Serial.begin(9600) do?',options:['Sets motor speed','Starts serial communication at 9600 baud','Reads sensor','Resets Arduino'],correct:1,xp:160},
      {question:'Why do LEDs need resistors?',options:['Make them brighter','Limit current to prevent burning out','Change colour','Make them blink'],correct:1,xp:160},
      {question:'What is pinMode(pin, OUTPUT) for?',options:['Reads from pin','Sets pin to receive voltage','Configures pin to send voltage','Resets the pin'],correct:2,xp:150},
      {question:'What does delay(1000) do in Arduino?',options:['Speeds up code','Pauses program for 1 second','Runs loop 1000 times','Reads sensor for 1 second'],correct:1,xp:160},
      {question:'What is a breadboard used for?',options:['Cutting wood','Prototyping circuits without soldering','Storing electricity','Programming Arduino'],correct:1,xp:150},
      {question:'What is GND in a circuit?',options:['Ground (0V reference)','Generator Node Device','Green Negative Diode','A power source'],correct:0,xp:160},
      {question:'What does map() do in Arduino?',options:['Shows directions','Re-scales a number from one range to another','Stores sensor data','Controls motor direction'],correct:1,xp:170},
      {question:'What is a pull-up resistor used for?',options:['Increase voltage','Ensure a pin reads HIGH when button not pressed','Cool down components','Slow motor speed'],correct:1,xp:170},
      {question:'What does tone(pin, 262) do?',options:['Sets motor speed to 262','Plays a 262Hz sound on buzzer','Reads pin 262 times','Sets LED brightness'],correct:1,xp:160},
    ],
    advanced: [
      {question:'What does PID stand for?',options:['Power Input Device','Proportional Integral Derivative','Programmed Input Drive','Pulse Integrated Distance'],correct:1,xp:280},
      {question:'What is ROS in robotics?',options:['Read Only Storage','Robot Operating System','Remote Output Signal','Rotational Object Sensor'],correct:1,xp:280},
      {question:'What is SLAM in robotics?',options:['Simultaneous Localisation And Mapping','Speed Limit And Motion','System Load And Management','Software Layer And Module'],correct:0,xp:300},
      {question:'What is inverse kinematics?',options:['Making robots reverse','Calculating joint angles to reach a target position','A type of sensor','Battery management'],correct:1,xp:300},
      {question:'What is computer vision?',options:['Making robots look good','Enabling robots to understand image data','A type of monitor','Connecting to cameras'],correct:1,xp:280},
      {question:'What is a feedback control system?',options:['A system that only sends commands','Measures output and adjusts to reduce error','A type of sensor array','Wireless communication'],correct:1,xp:300},
      {question:'Which languages do professional roboticists use most?',options:['Scratch and Logo','C++ and Python','HTML and CSS','Visual Basic'],correct:1,xp:280},
      {question:'What are degrees of freedom?',options:['How freely robot can roam','Number of independent movements it can make','How much robot weighs','Battery capacity'],correct:1,xp:280},
      {question:'What is a stepper motor?',options:['A fast DC motor','A motor that moves in precise fixed increments','A motor without feedback','A solar motor'],correct:1,xp:270},
      {question:'What does an IMU measure?',options:['Current and voltage','Acceleration and angular velocity','Distance and temperature','Light and sound'],correct:1,xp:290},
      {question:'What is LiDAR used for in robotics?',options:['Lighting the environment','Measuring distances using laser pulses to create 3D maps','Communicating wirelessly','Storing map data'],correct:1,xp:300},
      {question:'What is the purpose of a gyroscope in a robot?',options:['Measures speed','Measures orientation and angular rate of rotation','Measures distance','Controls motor speed'],correct:1,xp:280},
      {question:'What is dead reckoning?',options:['Robot stops when battery is low','Estimating position from known starting point using speed and direction','Robot avoids obstacles','A type of sensor fusion'],correct:1,xp:290},
      {question:'What is gazebo in robotics?',options:['A type of robot','A 3D robot simulation environment','A programming language','A motor driver'],correct:1,xp:270},
    ],
    pro: [
      {question:'What is a Kalman Filter used for?',options:['Image processing','Estimating state from noisy sensor data','Motor speed control','WiFi communication'],correct:1,xp:450},
      {question:'Which neural network is best for robot vision?',options:['RNN','Convolutional Neural Network (CNN)','Feed-forward NN','Decision Tree'],correct:1,xp:450},
      {question:'What is reinforcement learning in robotics?',options:['Teaching robots by demonstration','AI learning via trial-and-error with rewards','Supervised learning','Programming fixed rules'],correct:1,xp:450},
      {question:'What is edge computing in robotics?',options:['Computing at screen edges','Processing data locally on the robot','Using edge detection','Computing with less electricity'],correct:1,xp:400},
      {question:'What is a behaviour tree?',options:['Managing robot power','Hierarchical structure for robot decision-making','Sensor calibration','Network protocol'],correct:1,xp:440},
      {question:'What is sim-to-real transfer?',options:['Moving simulation software to real computer','Training a robot in simulation then deploying on real hardware','Transferring real robot data to simulation','Simulating reality with VR'],correct:1,xp:450},
      {question:'What does OMPL stand for?',options:['Object Motion Planning Library','Open Motion Planning Library','Operational Movement Planning Language','Output Motion Process Library'],correct:1,xp:400},
      {question:'What is RRT in path planning?',options:['Robot Range Testing','Rapidly-exploring Random Tree','Real-time Routing Technology','Robot Response Time'],correct:1,xp:420},
      {question:'What is the Nav2 stack used for?',options:['Navigation in ROS2 for mobile robots','A type of battery stack','Network navigation','Sensor calibration'],correct:0,xp:420},
      {question:'What is an EKF?',options:['Electronic Kinematic Framework','Extended Kalman Filter','Edge Knowledge Framework','External Kinematics Function'],correct:1,xp:440},
      {question:'What is imitation learning?',options:['Copying another AI','Robot learns by observing and mimicking human demonstrations','Learning from rewards','Supervised classification'],correct:1,xp:450},
      {question:'What is Isaac Sim used for?',options:['Controlling real robots','NVIDIA\'s robot simulation platform for training AI','A programming language','A sensor type'],correct:1,xp:430},
    ],
  },
  mixed: { beginner:[], intermediate:[], advanced:[], pro:[] },
  maths: { beginner:[], intermediate:[], advanced:[], pro:[] },
};
// Mixed pulls from coding + robotics
(['beginner','intermediate','advanced','pro'] as TugLevel[]).forEach(lvl => {
  TRIVIA_BANK.mixed[lvl] = [...TRIVIA_BANK.coding[lvl], ...TRIVIA_BANK.robotics[lvl]].sort(()=>Math.random()-0.5);
});

const LEVEL_INFO: Record<TugLevel, {label:string;icon:string;color:string;grade:string}> = {
  beginner:     {label:'Beginner',     icon:'🌱', color:'#10b981', grade:'Grade 1–4'},
  intermediate: {label:'Intermediate', icon:'⚡', color:'#3b82f6', grade:'Grade 5–7'},
  advanced:     {label:'Advanced',     icon:'🔥', color:'#f59e0b', grade:'Grade 8–9'},
  pro:          {label:'Pro / Expert', icon:'💎', color:'#ef4444', grade:'JHS 3+'},
};

const SUBJECT_INFO: Record<TugSubject, {label:string;icon:string}> = {
  maths:    {label:'Maths',           icon:'🔢'},
  coding:   {label:'Coding',          icon:'💻'},
  robotics: {label:'Robotics',        icon:'🤖'},
  mixed:    {label:'Coding & Robotics',icon:'⚡'},
};

const HOUSE_OPTIONS = [
  { id:'Alpha',  name:'Alpha Lions',  emoji:'🦁', color:'#ef4444', bg:'from-red-600 to-red-900',    icon:'🔴' },
  { id:'Beta',   name:'Beta Hawks',   emoji:'🦅', color:'#3b82f6', bg:'from-blue-600 to-blue-900',  icon:'🔵' },
  { id:'Gamma',  name:'Gamma Tigers', emoji:'🐯', color:'#10b981', bg:'from-green-600 to-green-900',icon:'🟢' },
  { id:'Pulsar', name:'Pulsar Stars',  emoji:'⭐', color:'#f59e0b', bg:'from-amber-500 to-yellow-600',icon:'🟡' },
];

interface Team {
  id: 'left'|'right'; houseId: string; name: string; emoji: string;
  color: string; score: number; combo: number; power: number;
}

export default function TugOfWar({ onBack }: Props) {
  const [phase,       setPhase]       = useState<Phase>('setup');
  const [_playMode,    _setPlayMode]    = useState<PlayMode>('local2p');
  const [_gameCode,    _setGameCode]    = useState('');
  const [_joinCode,    _setJoinCode]    = useState('');
  const [_joinStep,    _setJoinStep]    = useState<'code'|'identity'>('code');
  const [_playerSide,  _setPlayerSide]  = useState<'left'|'right'>('left'); // which side the solo player is
  const [_botThinking, _setBotThinking] = useState(false);
  const [leftHouse,   setLeftHouse]   = useState('Alpha');
  const [rightHouse,  setRightHouse]  = useState('Beta');
  const [difficulty,  setDifficulty]  = useState<DifficultyLevel>('intermediate');
  const [grade,       setGrade]       = useState('Grade 4-6');
  const [tugLevel,    setTugLevel]    = useState<TugLevel>('beginner');
  const [tugSubject,  setTugSubject]  = useState<TugSubject>('mixed');
  const [_triviaPool, setTriviaPool]  = useState<TriviaQ[]>([]);
  const [_triviaIdx,  setTriviaIdx]   = useState(0);
  const [teams,       setTeams]       = useState<Team[]>([]);
  const [ropePos,     setRopePos]     = useState(50);
  const [question,    setQuestion]    = useState<MathQuestion|null>(null);
  const [triviaQ,     setTriviaQ]     = useState<TriviaQ|null>(null);
  const [userInput,   setUserInput]   = useState('');
  const [feedback,    setFeedback]    = useState<{correct:boolean;team:'left'|'right'}|null>(null);
  const [currentTeam, setCurrentTeam] = useState<'left'|'right'>('left');
  const [timeLeft,    setTimeLeft]    = useState(0);
  const [gameTime,    setGameTime]    = useState(120);
  const [showSuper,   setShowSuper]   = useState(false);
  const [showParticle,setShowParticle]= useState<{x:number;y:number}|null>(null);
  const [winner,      setWinner]      = useState<Team|null>(null);
  const [sudden,      setSudden]      = useState(false);
  const [leftPull,    setLeftPull]    = useState(false);
  const [rightPull,   setRightPull]   = useState(false);
  const [ropeShake,   setRopeShake]   = useState(false);
  const [qKey,        setQKey]        = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const triviaPoolRef = useRef<TriviaQ[]>([]);
  const triviaIdxRef  = useRef(0);

  const buildTeams = useCallback(() => {
    const L = HOUSE_OPTIONS.find(h=>h.id===leftHouse)!;
    const R = HOUSE_OPTIONS.find(h=>h.id===rightHouse)!;
    return [
      {id:'left'  as const, houseId:L.id, name:L.name, emoji:L.emoji, color:L.color, score:0, combo:0, power:50},
      {id:'right' as const, houseId:R.id, name:R.name, emoji:R.emoji, color:R.color, score:0, combo:0, power:50},
    ];
  }, [leftHouse, rightHouse]);

  const nextQ = useCallback((team:'left'|'right') => {
    if(tugSubject === 'maths') {
      const q = generateMathQuestion('mixed', difficulty);
      setQuestion(q); setTriviaQ(null); setTimeLeft(q.timeLimit);
    } else {
      const pool = triviaPoolRef.current;
      const idx  = triviaIdxRef.current % Math.max(pool.length, 1);
      const tq   = pool[idx] ?? null;
      triviaIdxRef.current = idx + 1;
      setTriviaQ(tq); setQuestion(null); setTimeLeft(20);
    }
    setUserInput(''); setFeedback(null);
    setCurrentTeam(team); setQKey(k=>k+1);
    setTimeout(()=>inputRef.current?.focus(),60);
  }, [difficulty, tugSubject]);

  // Question timer
  useEffect(()=>{
    if(phase!=='playing'||feedback)return;
    if(timeLeft<=0){
      soundEngine.wrong();
      setFeedback({correct:false,team:currentTeam});
      setTeams(prev=>prev.map(t=>t.id===currentTeam?{...t,combo:0,power:Math.max(t.power-5,0)}:t));
      setTimeout(()=>nextQ(currentTeam==='left'?'right':'left'),1000);return;
    }
    if(timeLeft<=3)soundEngine.timerWarning();
    timerRef.current=setTimeout(()=>setTimeLeft(t=>t-0.1),100);
    return()=>{if(timerRef.current)clearTimeout(timerRef.current);};
  },[timeLeft,phase,feedback,currentTeam,nextQ]);

  // Game timer
  useEffect(()=>{
    if(phase!=='playing')return;
    if(gameTime<=0){
      soundEngine.stopBgMusic();
      const w=ropePos>55?teams[0]:ropePos<45?teams[1]:null;
      if(!w){setSudden(true);setGameTime(30);soundEngine.hype();return;}
      setWinner(w);soundEngine.stopBgMusic();soundEngine.victory();soundEngine.crowd();setTimeout(()=>{soundEngine.startBgMusic('victory');setPhase('victory');},500);return;
    }
    const t=setTimeout(()=>setGameTime(g=>g-1),1000);
    return()=>clearTimeout(t);
  },[gameTime,phase,ropePos,teams]);

  const handleAnswer=useCallback(()=>{
    if(feedback)return;
    let isCorrect = false;
    if(triviaQ) {
      // trivia: userInput holds selected option index as string
      const sel = parseInt(userInput.trim(), 10);
      isCorrect = sel === triviaQ.correct;
    } else {
      if(!question)return;
      const val=parseInt(userInput.trim(),10);
      if(isNaN(val))return;
      isCorrect=val===question.answer;
    }
    const team=currentTeam;
    setTeams(prev=>prev.map(t=>{
      if(t.id!==team)return t;
      const nc=isCorrect?t.combo+1:0;
      const pull=isCorrect?(nc>=3?18:10):-4;
      return{...t,combo:nc,score:t.score+(isCorrect?100+nc*25:0),power:Math.min(Math.max(t.power+pull,0),100)};
    }));
    if(isCorrect){
      soundEngine.correct();
      const teamObj=teams.find(t=>t.id===team)!;
      const nc=teamObj.combo+1;
      if(nc>=3){soundEngine.superPull();soundEngine.roar();setShowSuper(true);setTimeout(()=>setShowSuper(false),2200);}
      else if(nc>=2)soundEngine.combo(nc);
      soundEngine.crowd();
      if(team==='left'){setLeftPull(true);setTimeout(()=>setLeftPull(false),400);}
      else{setRightPull(true);setTimeout(()=>setRightPull(false),400);}
      setRopeShake(true);setTimeout(()=>setRopeShake(false),300);
      const pull=nc>=3?15:8;
      setRopePos(pos=>{
        const np=team==='left'?Math.min(pos+pull,96):Math.max(pos-pull,4);
        if(np>=96){soundEngine.stopBgMusic();soundEngine.victory();soundEngine.crowd();setWinner(teams.find(t=>t.id==='left')!);setTimeout(()=>{soundEngine.startBgMusic('victory');setPhase('victory');},500);}
        if(np<=4) {soundEngine.stopBgMusic();soundEngine.victory();soundEngine.crowd();setWinner(teams.find(t=>t.id==='right')!);setTimeout(()=>{soundEngine.startBgMusic('victory');setPhase('victory');},500);}
        return np;
      });
      setShowParticle({x:team==='left'?20:80,y:50});
      setTimeout(()=>setShowParticle(null),800);
    } else soundEngine.wrong();
    setFeedback({correct:isCorrect,team});
    setTimeout(()=>nextQ(team==='left'?'right':'left'),isCorrect?700:1000);
  },[question,triviaQ,userInput,feedback,currentTeam,teams,nextQ]);

  // Trivia: called immediately when player taps an option
  const handleAnswerTrivia = useCallback((optionIdx: number) => {
    if(!triviaQ || feedback) return;
    const isCorrect = optionIdx === triviaQ.correct;
    const team = currentTeam;
    setTeams(prev=>prev.map(t=>{
      if(t.id!==team)return t;
      const nc=isCorrect?t.combo+1:0;
      const pull=isCorrect?(nc>=3?18:10):-4;
      return{...t,combo:nc,score:t.score+(isCorrect?triviaQ.xp+nc*25:0),power:Math.min(Math.max(t.power+pull,0),100)};
    }));
    if(isCorrect){
      soundEngine.correct();
      const teamObj=teams.find(t=>t.id===team)!;
      const nc=teamObj.combo+1;
      if(nc>=3){soundEngine.superPull();soundEngine.roar();setShowSuper(true);setTimeout(()=>setShowSuper(false),2200);}
      else if(nc>=2)soundEngine.combo(nc);
      soundEngine.crowd();
      if(team==='left'){setLeftPull(true);setTimeout(()=>setLeftPull(false),400);}
      else{setRightPull(true);setTimeout(()=>setRightPull(false),400);}
      setRopeShake(true);setTimeout(()=>setRopeShake(false),300);
      const pull=nc>=3?15:8;
      setRopePos(pos=>{
        const np=team==='left'?Math.min(pos+pull,96):Math.max(pos-pull,4);
        if(np>=96){soundEngine.stopBgMusic();soundEngine.victory();soundEngine.crowd();setWinner(teams.find(t=>t.id==='left')!);setTimeout(()=>{soundEngine.startBgMusic('victory');setPhase('victory');},500);}
        if(np<=4) {soundEngine.stopBgMusic();soundEngine.victory();soundEngine.crowd();setWinner(teams.find(t=>t.id==='right')!);setTimeout(()=>{soundEngine.startBgMusic('victory');setPhase('victory');},500);}
        return np;
      });
      setShowParticle({x:team==='left'?20:80,y:50});
      setTimeout(()=>setShowParticle(null),800);
    } else soundEngine.wrong();
    setFeedback({correct:isCorrect,team});
    setTimeout(()=>nextQ(team==='left'?'right':'left'),isCorrect?900:1200);
  },[triviaQ,feedback,currentTeam,teams,nextQ]);

  const startGame=()=>{
    if(tugSubject !== 'maths') {
      const pool = [...(TRIVIA_BANK[tugSubject]?.[tugLevel] || [])].sort(()=>Math.random()-0.5);
      triviaPoolRef.current = pool;
      triviaIdxRef.current  = 0;
      setTriviaPool(pool);
      setTriviaIdx(0);
    }
    const t=buildTeams();
    setTeams(t);setRopePos(50);setGameTime(120);setSudden(false);
    setPhase('playing');
    soundEngine.stopBgMusic();
    setTimeout(()=>soundEngine.startBgMusic('tug'),200);
    soundEngine.crowd();
    setTimeout(()=>nextQ('left'),400);
  };

  const numpad=['7','8','9','4','5','6','1','2','3','0','-','⌫'];
  const handleNumpad=(k:string)=>{
    if(k==='⌫')setUserInput(i=>i.slice(0,-1));
    else if(k==='-')setUserInput(i=>i.startsWith('-')?i.slice(1):'-'+i);
    else setUserInput(i=>i.length<6?i+k:i);
  };

  // ── SETUP ──
  if(phase==='setup') return(
    <div className="min-h-screen bg-[#0d0d1a] px-4 py-6 overflow-y-auto">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-5">
          <button onClick={()=>{soundEngine.stopBgMusic();onBack();}} className="text-white/40 hover:text-white text-sm flex items-center gap-2 transition-colors">← Back</button>
          <MusicPlayer category="home" compact/>
        </div>

        <div className="text-center mb-5">
          <div className="text-5xl mb-2">⚔️</div>
          <h1 className="text-3xl font-black text-white mb-1">Tug of War Arena</h1>
          <p className="text-white/40 text-sm">Two houses battle it out — answer questions to pull the rope!</p>
        </div>

        {/* Play Mode selector */}
        <div className="mb-5">
          <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">How to Play</div>
          <div className="grid grid-cols-3 gap-2">
            {([
              {id:'solo',    icon:'🤖', label:'Solo vs Bot',  desc:'1 player vs AI'},
              {id:'local2p', icon:'👥', label:'Local 2 Player',desc:'Pass & play'},
              {id:'online',  icon:'🔗', label:'Join with Code',desc:'2 devices'},
            ] as {id:PlayMode;icon:string;label:string;desc:string}[]).map(m=>(
              <button key={m.id}
                onClick={()=>{ _setPlayMode(m.id); soundEngine.click(); }}
                className={`p-3 rounded-xl border-2 text-center transition-all ${_playMode===m.id?'scale-[1.02]':''}`}
                style={{borderColor:_playMode===m.id?'#a855f7':'#a855f725',background:_playMode===m.id?'#a855f720':'#a855f708'}}>
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="text-white font-bold text-xs">{m.label}</div>
                <div className="text-white/35 text-xs">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Online join code UI */}
        {_playMode==='online' && (
          <div className="mb-5 bg-purple-500/8 border border-purple-500/25 rounded-2xl p-4">
            <div className="text-white font-black text-sm mb-3">🔗 Online Multiplayer</div>
            <div className="grid grid-cols-2 gap-3">
              {/* Host */}
              <div>
                <div className="text-white/50 text-xs font-bold mb-2">Host a Game</div>
                <button onClick={()=>{
                  const code = Math.floor(100000+Math.random()*900000).toString();
                  _setGameCode(code);
                  soundEngine.click();
                }}
                className="w-full py-3 bg-purple-500/20 border border-purple-400/40 text-purple-300 font-black rounded-xl text-sm hover:bg-purple-500/30 transition-all">
                  🎮 Generate Code
                </button>
                {_gameCode && (
                  <div className="mt-2 text-center">
                    <div className="text-white/40 text-xs mb-1">Share this code:</div>
                    <div className="text-yellow-400 font-black text-2xl tracking-widest bg-black/40 rounded-xl py-2">{_gameCode}</div>
                    <div className="text-white/25 text-xs mt-1">Both players tap Start when ready</div>
                  </div>
                )}
              </div>
              {/* Join */}
              <div>
                <div className="text-white/50 text-xs font-bold mb-2">Join a Game</div>
                <input type="tel" inputMode="numeric" maxLength={6}
                  value={_joinCode}
                  onChange={e=>_setJoinCode(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="Enter code"
                  className="w-full bg-white/8 border border-white/15 text-white text-center font-black text-lg rounded-xl px-3 py-2.5 focus:outline-none focus:border-yellow-400 tracking-widest placeholder-white/20"/>
                <div className="text-white/25 text-xs mt-1 text-center">Get code from host</div>
              </div>
            </div>
            <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-300 text-xs">
              💡 <b>Guest-friendly:</b> No account needed! Share the code with any student — they open the app, tap "Join with Code", enter it and play instantly.
            </div>
          </div>
        )}
        <div className="mb-5">
          <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">Choose Subject</div>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(SUBJECT_INFO) as [TugSubject, typeof SUBJECT_INFO[TugSubject]][]).map(([s, si]) => (
              <button key={s} onClick={()=>setTugSubject(s)}
                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${tugSubject===s?'scale-[1.02]':''}`}
                style={{borderColor:tugSubject===s?'#a855f7':'#a855f725',background:tugSubject===s?'#a855f720':'#a855f708'}}>
                <span className="text-xl">{si.icon}</span>
                <span className="text-white font-bold text-sm">{si.label}</span>
                {tugSubject===s&&<span className="ml-auto text-purple-400">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Level selector (hide for maths — uses grade dropdown) */}
        {tugSubject !== 'maths' && (
          <div className="mb-5">
            <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">Choose Level</div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(LEVEL_INFO) as [TugLevel, typeof LEVEL_INFO[TugLevel]][]).map(([lvl, li]) => (
                <button key={lvl} onClick={()=>setTugLevel(lvl)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${tugLevel===lvl?'scale-[1.02]':''}`}
                  style={{borderColor:tugLevel===lvl?li.color:li.color+'25',background:tugLevel===lvl?li.color+'18':li.color+'06'}}>
                  <span className="text-xl">{li.icon}</span>
                  <div className="text-left">
                    <div className="text-white font-black text-xs">{li.label}</div>
                    <div className="text-white/40 text-xs">{li.grade}</div>
                  </div>
                  {tugLevel===lvl&&<span className="ml-auto" style={{color:li.color}}>✓</span>}
                </button>
              ))}
            </div>
            <div className="mt-2 text-center text-white/30 text-xs">
              {TRIVIA_BANK[tugSubject]?.[tugLevel]?.length ?? 0} questions available (shuffled each game)
            </div>
          </div>
        )}

        {/* Maths: grade + difficulty */}
        {tugSubject === 'maths' && (
          <div className="mb-5">
            <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">Grade Level</div>
            <select value={grade} onChange={e=>{setGrade(e.target.value);setDifficulty(e.target.value.includes('1-3')?'beginner':e.target.value.includes('4-6')?'intermediate':e.target.value.includes('7-8')?'advanced':'genius');}}
              className="w-full bg-white/8 border border-white/15 text-white rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm">
              <option value="Grade 1-3">Grade 1–3 (Easy)</option>
              <option value="Grade 4-6">Grade 4–6 (Medium)</option>
              <option value="Grade 7-8">Grade 7–8 (Hard)</option>
              <option value="Grade 9">Grade 9 (Expert)</option>
            </select>
          </div>
        )}

        {/* Team selectors */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">🔴 Left Team</label>
            <div className="space-y-2">
              {HOUSE_OPTIONS.map(h=>(
                <button key={h.id} onClick={()=>setLeftHouse(h.id)} disabled={h.id===rightHouse}
                  className={`w-full flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${leftHouse===h.id?'scale-[1.02]':''} ${h.id===rightHouse?'opacity-30 cursor-not-allowed':''}`}
                  style={{borderColor:leftHouse===h.id?h.color:h.color+'30',background:leftHouse===h.id?h.color+'20':h.color+'06'}}>
                  <span className="text-2xl">{h.emoji}</span>
                  <div className="text-left"><div className="text-white text-xs font-bold">{h.id}</div><div className="text-white/40 text-xs">{h.icon}</div></div>
                  {leftHouse===h.id&&<span className="ml-auto" style={{color:h.color}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">🔵 Right Team</label>
            <div className="space-y-2">
              {HOUSE_OPTIONS.map(h=>(
                <button key={h.id} onClick={()=>setRightHouse(h.id)} disabled={h.id===leftHouse}
                  className={`w-full flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${rightHouse===h.id?'scale-[1.02]':''} ${h.id===leftHouse?'opacity-30 cursor-not-allowed':''}`}
                  style={{borderColor:rightHouse===h.id?h.color:h.color+'30',background:rightHouse===h.id?h.color+'20':h.color+'06'}}>
                  <span className="text-2xl">{h.emoji}</span>
                  <div className="text-left"><div className="text-white text-xs font-bold">{h.id}</div><div className="text-white/40 text-xs">{h.icon}</div></div>
                  {rightHouse===h.id&&<span className="ml-auto" style={{color:h.color}}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* VS preview */}
        <div className="flex items-center justify-center gap-4 mb-5 p-4 bg-white/4 rounded-2xl border border-white/8">
          {[leftHouse,rightHouse].map((hid,i)=>{
            const h=HOUSE_OPTIONS.find(x=>x.id===hid)!;
            return(<>
              {i===1&&<div className="text-white/30 font-black text-xl">VS</div>}
              <div key={hid} className="text-center">
                <div className="text-4xl mb-1">{h.emoji}</div>
                <div className="text-white font-bold text-sm">{h.name}</div>
                <div className="text-xs" style={{color:h.color}}>{h.icon} {h.id}</div>
              </div>
            </>);
          })}
        </div>

        {/* Game time */}
        <div className="mb-5">
          <label className="text-white/50 text-xs font-bold tracking-wider uppercase block mb-2">Game Time</label>
          <select defaultValue="120" onChange={e=>setGameTime(parseInt(e.target.value))}
            className="w-full bg-white/8 border border-white/15 text-white rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm">
            <option value="60">1 minute</option>
            <option value="120">2 minutes</option>
            <option value="180">3 minutes</option>
            <option value="300">5 minutes</option>
          </select>
        </div>

        <button onClick={startGame}
          className="w-full py-5 text-white font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
          style={{background:`linear-gradient(135deg,${HOUSE_OPTIONS.find(h=>h.id===leftHouse)?.color},#1e1b4b,${HOUSE_OPTIONS.find(h=>h.id===rightHouse)?.color})`}}>
          ⚔️ Start Battle!
        </button>
      </div>
    </div>
  );

  // ── VICTORY ──
  if(phase==='victory'&&winner){
    const _isLeftWinner = winner.id === 'left'; void _isLeftWinner;
    
    // Play victory sounds on mount
    return(
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{background:`radial-gradient(ellipse at 50% 30%,${winner.color}35 0%,#0d0d1a 70%)`}}>
        <ParticleExplosion active count={90} colors={[winner.color,'#ffd700','#fff','#ffec00',winner.color+'aa']}/>

        {/* Firework layers */}
        {[...Array(6)].map((_,i)=>(
          <div key={i} className="absolute animate-ping opacity-20 rounded-full"
            style={{
              width:`${60+i*30}px`, height:`${60+i*30}px`,
              background:winner.color,
              top:`${10+i*12}%`, left:`${10+i*15}%`,
              animationDuration:`${0.8+i*0.3}s`, animationDelay:`${i*0.15}s`
            }}/>
        ))}

        <div className="relative z-10 text-center max-w-sm w-full">
          {/* Trophy + winner emoji */}
          <div className="relative inline-block mb-4">
            <div className="text-8xl animate-bounce">{winner.emoji}</div>
            <div className="absolute -top-2 -right-2 text-4xl animate-spin" style={{animationDuration:'3s'}}>🏆</div>
          </div>

          {/* Winner name */}
          <div className="text-5xl font-black text-white mb-1" style={{textShadow:`0 0 40px ${winner.color},0 0 80px ${winner.color}60`}}>
            {winner.name}
          </div>
          <div className="text-3xl font-black mb-2" style={{color:winner.color}}>
            WINS! 🎉
          </div>

          {/* Motivational message */}
          <div className="bg-white/8 border border-white/15 rounded-2xl px-5 py-3 mb-6">
            <div className="text-yellow-300 font-black text-lg mb-1">
              {winner.score >= 1000 ? '🔥 UNSTOPPABLE!' : winner.score >= 500 ? '⚡ BRILLIANT PERFORMANCE!' : '✨ WELL PLAYED!'}
            </div>
            <div className="text-white/60 text-sm">
              {winner.score >= 1000
                ? 'An absolutely dominant display of knowledge!'
                : winner.score >= 500
                ? 'Great answers and amazing combos!'
                : 'Keep practising — victory is yours!'}
            </div>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {teams.map(t=>(
              <div key={t.id} className="rounded-2xl p-4 border-2 transition-all"
                style={{
                  borderColor: t.id===winner.id ? t.color : 'rgba(255,255,255,0.08)',
                  background: t.id===winner.id ? t.color+'20' : 'rgba(255,255,255,0.03)'
                }}>
                <div className="text-4xl mb-2">{t.emoji}</div>
                <div className="text-white font-black text-sm mb-1">{t.name}</div>
                <div className="text-2xl font-black" style={{color:t.color}}>{t.score}</div>
                <div className="text-xs text-white/40 mt-1">XP earned</div>
                {t.id===winner.id && (
                  <div className="mt-2 text-xs font-black text-yellow-400">🏆 WINNER</div>
                )}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button onClick={()=>{
                soundEngine.startBgMusic('tug');
                soundEngine.crowd();
                startGame();
              }}
              className="w-full py-4 font-black text-white rounded-2xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
              style={{background:`linear-gradient(135deg,${winner.color},${winner.color}80)`, boxShadow:`0 8px 32px ${winner.color}40`}}>
              ⚔️ Rematch!
            </button>
            <button onClick={()=>{soundEngine.stopBgMusic();onBack();}}
              className="w-full py-4 bg-white/10 border border-white/15 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">
              🏠 Back to Arena Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PLAYING ──
  const activeTeam=teams.find(t=>t.id===currentTeam)!;
  if(!activeTeam)return null;
  const timerPct=question?(timeLeft/question.timeLimit)*100:100;
  const timerColor=timerPct>60?'#10b981':timerPct>30?'#f59e0b':'#ef4444';

  return(
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col select-none">
      {showParticle&&(
        <div className="fixed inset-0 pointer-events-none z-50">
          <ParticleExplosion active x={showParticle.x} y={showParticle.y} count={28} colors={[activeTeam.color,'#fff','#ffd700']} onComplete={()=>setShowParticle(null)}/>
        </div>
      )}
      {showSuper&&(
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-5xl font-black text-white mb-1" style={{textShadow:`0 0 40px ${activeTeam.color},0 0 80px ${activeTeam.color}80`}}>⚡ SUPER PULL! ⚡</div>
            <div className="text-2xl font-black" style={{color:activeTeam.color}}>{activeTeam.emoji} {activeTeam.name}</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button onClick={()=>{soundEngine.stopBgMusic();onBack();}} className="text-white/40 hover:text-white text-sm px-3 py-1.5 bg-white/8 rounded-lg transition-colors">✕ Quit</button>
          {sudden&&<div className="bg-red-500/20 border border-red-500/40 rounded-full px-3 py-1 text-red-400 text-xs font-black animate-pulse">☠️ SUDDEN DEATH</div>}
        </div>
        <div className={`text-2xl font-black px-4 py-1 rounded-xl ${gameTime<=10?'text-red-400 bg-red-400/20 animate-pulse':'text-white bg-white/10'}`}>{gameTime}s</div>
        <MusicPlayer category="tug" compact/>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 divide-x divide-white/10">
        {teams.map(t=>(
          <div key={t.id} className={`px-4 py-2.5 flex items-center gap-2 transition-all ${currentTeam===t.id?'bg-white/8':'bg-black/20'}`}>
            <span className="text-2xl">{t.emoji}</span>
            <div><div className="text-white font-bold text-xs">{t.name}</div><div className="text-2xl font-black" style={{color:t.color}}>{t.score}</div></div>
            {t.combo>=2&&<div className="ml-auto text-xs font-black animate-pulse" style={{color:t.color}}>🔥{t.combo}x</div>}
          </div>
        ))}
      </div>

      {/* ── Tug of War Visual ── */}
      <div className="relative bg-gradient-to-b from-[#0a0a1a] to-[#111827] overflow-hidden" style={{height:'200px'}}>
        {/* Arena floor */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1e1b4b]/60 to-transparent"/>
        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-r border-dashed border-yellow-400/20"/>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-yellow-400/40 text-xs font-bold">CENTER</div>

        {/* LEFT animal */}
        {teams[0]&&(
          <div className="absolute bottom-6 transition-all duration-500 ease-out"
            style={{left:`${Math.max(ropePos-42,2)}%`,transform:`translateX(-50%) scaleX(-1)${leftPull?' rotate(-5deg)':''}`,filter:`drop-shadow(0 0 ${teams[0].combo>=3?'16px':'6px'} ${teams[0].color}70)`}}>
            <div style={{fontSize:'80px',lineHeight:1,userSelect:'none'}}>{teams[0].emoji}</div>
          </div>
        )}

        {/* RIGHT animal */}
        {teams[1]&&(
          <div className="absolute bottom-6 transition-all duration-500 ease-out"
            style={{right:`${Math.max(100-ropePos-42,2)}%`,transform:`translateX(50%)${rightPull?' rotate(5deg)':''}`,filter:`drop-shadow(0 0 ${teams[1].combo>=3?'16px':'6px'} ${teams[1].color}70)`}}>
            <div style={{fontSize:'80px',lineHeight:1,userSelect:'none'}}>{teams[1].emoji}</div>
          </div>
        )}

        {/* Rope */}
        <div className={`absolute ${ropeShake?'animate-rope-shake':''}`} style={{top:'52%',left:'8%',right:'8%',height:'20px',transform:'translateY(-50%)'}}>
          <svg width="100%" height="20" viewBox="0 0 400 20" preserveAspectRatio="none">
            <path d="M0 10 Q100 6 200 10 Q300 14 400 10" stroke="#92400e" strokeWidth="7" fill="none" strokeLinecap="round"/>
            <path d="M0 8 Q100 4 200 8 Q300 12 400 8" stroke="#a16207" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6"/>
            {[...Array(14)].map((_,i)=>(<line key={i} x1={i*30} y1="4" x2={i*30+12} y2="16" stroke="#fbbf2430" strokeWidth="2"/>))}
          </svg>
          {/* Knot */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 z-10" style={{left:`${ropePos}%`}}>
            <div className="w-9 h-9 rounded-full border-4 border-yellow-400 bg-[#0d0d1a] flex items-center justify-center text-base shadow-lg" style={{boxShadow:'0 0 16px #fbbf24,0 0 32px #fbbf2440'}}>⚡</div>
          </div>
        </div>

        {/* Power bars */}
        <div className="absolute bottom-1 left-3 right-3 flex items-center gap-3">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-xs font-bold" style={{color:teams[0]?.color}}>{teams[0]?.power}%</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{width:`${teams[0]?.power}%`,background:teams[0]?.color}}/></div>
          </div>
          <span className="text-white/20 text-xs flex-shrink-0">PWR</span>
          <div className="flex items-center gap-1 flex-1">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full ml-auto" style={{width:`${teams[1]?.power}%`,background:teams[1]?.color}}/></div>
            <span className="text-xs font-bold" style={{color:teams[1]?.color}}>{teams[1]?.power}%</span>
          </div>
        </div>
      </div>

      {/* Turn indicator */}
      <div className="flex items-center justify-center gap-2 py-2 border-b border-white/5 bg-black/20">
        <span className="text-xl">{activeTeam.emoji}</span>
        <span className="font-bold text-sm" style={{color:activeTeam.color}}>{activeTeam.name}'s turn</span>
        {activeTeam.combo>=2&&<span className="text-xs font-black animate-pulse" style={{color:activeTeam.color}}>🔥{activeTeam.combo}x</span>}
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3">
        {/* MATHS question */}
        {question&&!triviaQ&&(
          <div key={qKey} className="w-full max-w-md">
            <div className="h-2 rounded-full overflow-hidden mb-4 border border-white/10">
              <div className="h-full rounded-full transition-none" style={{width:`${timerPct}%`,background:timerColor,transition:'width 0.1s linear'}}/>
            </div>
            <div className={`text-center p-6 rounded-3xl border-2 mb-4 transition-all ${feedback?.correct?'border-green-400 bg-green-400/8':feedback&&!feedback.correct?'border-red-400 bg-red-400/8':'border-white/12 bg-white/3'}`}
              style={!feedback?{borderColor:activeTeam.color+'45'}:{}}>
              <div className="text-4xl md:text-5xl font-black text-white">{question.question} = ?</div>
              {feedback&&(
                <div className={`mt-2 text-base font-bold ${feedback.correct?'text-green-400':'text-red-400'}`}>
                  {feedback.correct?`✓ ${activeTeam.name} pulls forward!`:`✗ Answer: ${question.answer}`}
                </div>
              )}
            </div>
            <div className="flex gap-2 mb-3">
              <input ref={inputRef} type="number" value={userInput}
                onChange={e=>setUserInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleAnswer()}
                placeholder="Type answer…" disabled={!!feedback}
                className="flex-1 bg-white/8 border-2 text-white text-xl font-black rounded-2xl px-4 py-3 outline-none transition-colors placeholder-white/18"
                style={{borderColor:feedback?(feedback.correct?'#10b981':'#ef4444'):activeTeam.color+'60'}}/>
              <button onClick={handleAnswer} disabled={!!feedback||!userInput}
                className="px-6 py-3 font-black text-white rounded-2xl disabled:opacity-30 active:scale-95 transition-all text-lg"
                style={{background:`linear-gradient(135deg,${activeTeam.color},${activeTeam.color}80)`}}>
                PULL!
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {numpad.map(k=>(
                <button key={k} onClick={()=>{soundEngine.click();handleNumpad(k);}} disabled={!!feedback}
                  className={`py-3 rounded-xl font-black text-lg transition-all active:scale-95 disabled:opacity-30 ${k==='⌫'?'bg-red-500/18 text-red-400 border border-red-500/22':k==='-'?'bg-blue-500/18 text-blue-400 border border-blue-500/22':'bg-white/7 text-white border border-white/8 hover:bg-white/14'}`}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TRIVIA question */}
        {triviaQ&&(
          <div key={qKey} className="w-full max-w-md">
            <div className="h-2 rounded-full overflow-hidden mb-4 border border-white/10">
              <div className="h-full rounded-full transition-none" style={{width:`${timerPct}%`,background:timerColor,transition:'width 0.1s linear'}}/>
            </div>
            <div className={`p-5 rounded-3xl border-2 mb-4 transition-all ${feedback?.correct?'border-green-400 bg-green-400/8':feedback&&!feedback.correct?'border-red-400 bg-red-400/8':'border-white/12 bg-white/3'}`}
              style={!feedback?{borderColor:activeTeam.color+'45'}:{}}>
              <div className="text-white font-black text-lg leading-snug mb-1">{triviaQ.question}</div>
              {feedback&&(
                <div className={`mt-1 text-sm font-bold ${feedback.correct?'text-green-400':'text-red-400'}`}>
                  {feedback.correct?`✓ ${activeTeam.name} pulls forward!`:`✗ Correct: ${triviaQ.options[triviaQ.correct]}`}
                </div>
              )}
            </div>
            {/* Multiple choice buttons */}
            <div className="grid grid-cols-2 gap-2">
              {triviaQ.options.map((opt, i) => {
                const isSelected = userInput === String(i);
                const isCorrect  = i === triviaQ.correct;
                let btnStyle = 'bg-white/7 border-white/15 text-white';
                if(feedback) {
                  if(isCorrect) btnStyle = 'bg-green-500/20 border-green-400 text-green-300';
                  else if(isSelected && !isCorrect) btnStyle = 'bg-red-500/20 border-red-400 text-red-300 opacity-60';
                  else btnStyle = 'bg-white/4 border-white/8 text-white/40';
                } else if(isSelected) {
                  btnStyle = 'border-2 text-white';
                }
                return (
                  <button key={i}
                    onClick={()=>{ if(!feedback){ soundEngine.click(); setUserInput(String(i)); handleAnswerTrivia(i); }}}
                    disabled={!!feedback}
                    className={`p-3 rounded-2xl border-2 font-bold text-sm text-left transition-all active:scale-95 ${btnStyle}`}
                    style={isSelected && !feedback ? {borderColor:activeTeam.color, background:activeTeam.color+'22'} : {}}>
                    <span className="font-black mr-2 opacity-50">{['A','B','C','D'][i]}.</span>{opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
