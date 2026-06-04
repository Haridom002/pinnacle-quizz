import { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';
import MusicPlayer from './MusicPlayer';
import ParticleExplosion from './ParticleExplosion';

interface Props { onBack: () => void; mode: 'coding' | 'robotics'; }

type Level = 'beginner' | 'intermediate' | 'advanced' | 'pro';
type Phase = 'setup' | 'playing' | 'results';
type MainTab = 'learn' | 'quiz';
type LearnSection = 'lessons' | 'projects';

interface Question {
  id: string;
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
  xp: number;
  badge?: string;
}

// ── CODING QUESTIONS ─────────────────────────────────────────────
const CODING_QUESTIONS: Record<Level, Question[]> = {
  beginner: [
    { id:'c1', question:'What does a computer use to store information temporarily while working?', options:['Hard Drive','RAM (Memory)','Screen','Keyboard'], correct:1, explanation:'RAM (Random Access Memory) stores data temporarily while the computer is running.', xp:100 },
    { id:'c2', question:'Which of these is an INPUT device?', options:['Monitor','Printer','Keyboard','Speaker'], correct:2, explanation:'A keyboard is used to put information INTO the computer — that makes it an input device.', xp:100 },
    { id:'c3', question:'What does "www" stand for in a website address?', options:['World Wide Web','World Wide Window','Wide Web World','World Web Window'], correct:0, explanation:'www stands for World Wide Web — the system of web pages connected across the internet.', xp:100 },
    { id:'c4', question:'What is a "bug" in computer programming?', options:['A real insect in the computer','An error or mistake in the code','A type of computer game','A computer virus'], correct:1, explanation:'A bug is an error in the code that makes the program behave incorrectly. Finding bugs is called debugging!', xp:100 },
    { id:'c5', question:'What symbol is used to start a Python comment?', options:['//','/*','#','<!--'], correct:2, explanation:'In Python, the # symbol starts a comment. Comments are notes for programmers that the computer ignores.', xp:120 },
    { id:'c6', question:'Which device is used to OUTPUT information?', options:['Mouse','Scanner','Monitor','Microphone'], correct:2, explanation:'A monitor (screen) shows information coming OUT of the computer — making it an output device.', xp:100 },
    { id:'c7', question:'What does CPU stand for?', options:['Central Processing Unit','Computer Power Unit','Central Power Usage','Computer Processing Unit'], correct:0, explanation:'CPU stands for Central Processing Unit — it\'s the "brain" of the computer that processes instructions.', xp:110 },
    { id:'c8', question:'In programming, what is a "variable"?', options:['A type of computer','A container that stores data','A computer error','A type of screen'], correct:1, explanation:'A variable is like a named box that stores a piece of data, like a number or word, in your program.', xp:120 },
    { id:'c9', question:'Which of these is NOT a programming language?', options:['Python','Scratch','HTML','Microsoft Word'], correct:3, explanation:'Microsoft Word is a word processor, not a programming language. Python, Scratch, and HTML are used to create programs and websites.', xp:100 },
    { id:'c10', question:'What does the internet allow computers to do?', options:['Run faster','Communicate and share information','Print documents','Play music'], correct:1, explanation:'The internet is a global network that lets computers communicate and share information with each other worldwide.', xp:100 },
  ],
  intermediate: [
    { id:'i1', question:'What will this print?\nprint(2 + 3 * 4)', code:'print(2 + 3 * 4)', options:['20','14','24','11'], correct:1, explanation:'Multiplication (*) happens before addition (+) — so 3×4=12, then 2+12=14.', xp:150, badge:'🧮 Order of Ops' },
    { id:'i2', question:'Which loop runs a set number of times?', options:['while loop','for loop','if statement','switch statement'], correct:1, explanation:'A for loop runs a specific number of times. A while loop runs until a condition becomes false.', xp:150 },
    { id:'i3', question:'What does "if" do in programming?', options:['Repeats code','Makes a decision based on a condition','Stores data','Ends the program'], correct:1, explanation:'An "if" statement makes a decision — it runs code only when a condition is true.', xp:150 },
    { id:'i4', question:'What is the output of:\nx = 5\nx = x + 3\nprint(x)', code:'x = 5\nx = x + 3\nprint(x)', options:['5','3','8','53'], correct:2, explanation:'x starts as 5, then x+3 = 8, so x becomes 8. The output is 8.', xp:160 },
    { id:'i5', question:'What data type is: "Hello World"?', options:['Integer','Boolean','String','Float'], correct:2, explanation:'Text in programming is called a String. It\'s written inside quotation marks.', xp:150 },
    { id:'i6', question:'What does a function do in programming?', options:['Stores numbers','A reusable block of code','Displays the screen','Connects to internet'], correct:1, explanation:'A function is a named block of reusable code. You write it once and can call (use) it many times.', xp:160 },
    { id:'i7', question:'How many times does this loop run?\nfor i in range(5):', code:'for i in range(5):\n    print(i)', options:['4 times','5 times','6 times','0 times'], correct:1, explanation:'range(5) gives numbers 0,1,2,3,4 — that\'s 5 numbers, so the loop runs 5 times.', xp:160 },
    { id:'i8', question:'What is a list (array) in programming?', options:['A single number','A collection of items','A type of loop','A function'], correct:1, explanation:'A list (or array) is a collection that can hold multiple items — like a shopping list!', xp:150 },
    { id:'i9', question:'What does "True" and "False" represent in programming?', options:['Numbers 1 and 0','Boolean values','String values','Error messages'], correct:1, explanation:'True and False are Boolean values — used for conditions and logic decisions in code.', xp:150 },
    { id:'i10', question:'What symbol is used for division in most programming languages?', options:['÷','\\','/',':'], correct:2, explanation:'The forward slash / is used for division in most programming languages like Python, JavaScript, and Java.', xp:140 },
  ],
  advanced: [
    { id:'a1', question:'What is the time complexity of binary search?', options:['O(n)','O(n²)','O(log n)','O(1)'], correct:2, explanation:'Binary search divides the search space in half each time, giving O(log n) time complexity.', xp:250, badge:'🔍 Algorithm Expert' },
    { id:'a2', question:'What does HTML stand for?', options:['Hyper Text Markup Language','High Transfer Markup Language','Hyper Transfer Machine Language','High Text Machine Language'], correct:0, explanation:'HTML stands for HyperText Markup Language — the standard language for creating web pages.', xp:200 },
    { id:'a3', question:'What is recursion in programming?', options:['A type of loop','A function that calls itself','A database query','A sorting method'], correct:1, explanation:'Recursion is when a function calls itself. It\'s used to solve problems that can be broken into smaller versions of the same problem.', xp:250 },
    { id:'a4', question:'What does CSS stand for?', options:['Computer Style Sheets','Cascading Style Sheets','Creative Style System','Computer Screen Styles'], correct:1, explanation:'CSS stands for Cascading Style Sheets — it controls how HTML elements look (colors, fonts, layout).', xp:200 },
    { id:'a5', question:'Which data structure works on LIFO principle?', options:['Queue','Stack','Array','Linked List'], correct:1, explanation:'A Stack uses Last In First Out (LIFO) — like a stack of plates, the last one placed is the first removed.', xp:250, badge:'📚 Data Structures' },
    { id:'a6', question:'What is an API?', options:['A type of virus','Application Programming Interface','Advanced Programming Index','Automated Process Interface'], correct:1, explanation:'API stands for Application Programming Interface — it lets different software programs communicate with each other.', xp:220 },
    { id:'a7', question:'What is the output of: print(10 % 3)?', code:'print(10 % 3)', options:['3','1','0','3.33'], correct:1, explanation:'% is the modulo operator — it gives the remainder. 10 ÷ 3 = 3 remainder 1, so 10 % 3 = 1.', xp:230, badge:'🔢 Modulo Master' },
    { id:'a8', question:'Which is NOT a valid Python data structure?', options:['List','Dictionary','Tuple','Table'], correct:3, explanation:'Python has Lists, Dictionaries, Tuples, and Sets — but no built-in "Table" data structure.', xp:220 },
    { id:'a9', question:'What does "OOP" stand for in programming?', options:['Out Of Program','Object-Oriented Programming','Only One Process','Open Output Programming'], correct:1, explanation:'OOP stands for Object-Oriented Programming — a style of programming using objects that combine data and functions.', xp:240 },
    { id:'a10', question:'What is a database?', options:['A type of computer','An organized collection of data','A programming language','A type of network'], correct:1, explanation:'A database is an organized collection of data that can be easily accessed, managed, and updated.', xp:200 },
  ],
  pro: [
    { id:'p1', question:'What design pattern ensures only one instance of a class exists?', options:['Factory','Observer','Singleton','Strategy'], correct:2, explanation:'The Singleton pattern ensures a class has only one instance and provides a global access point to it.', xp:400, badge:'🏆 Design Pattern Pro' },
    { id:'p2', question:'What is Big O notation used for?', options:['Measuring screen size','Describing algorithm efficiency','Counting bugs','Database queries'], correct:1, explanation:'Big O notation describes how the runtime or space of an algorithm grows relative to input size.', xp:380 },
    { id:'p3', question:'Which HTTP method is used to CREATE a new resource in REST APIs?', options:['GET','PUT','POST','DELETE'], correct:2, explanation:'POST is used to create new resources in RESTful APIs. GET reads, PUT updates, DELETE removes.', xp:380, badge:'🌐 REST Expert' },
    { id:'p4', question:'What is a SQL JOIN used for?', options:['Splitting tables','Combining rows from two or more tables','Deleting records','Creating new databases'], correct:1, explanation:'A SQL JOIN combines rows from two or more tables based on a related column between them.', xp:380 },
    { id:'p5', question:'What does "async/await" do in JavaScript?', options:['Speeds up loops','Handles asynchronous operations','Styles HTML elements','Sorts arrays'], correct:1, explanation:'async/await makes asynchronous code (like API calls) easier to write and read, avoiding "callback hell".', xp:400, badge:'⚡ Async Master' },
    { id:'p6', question:'What is version control (like Git) used for?', options:['Virus protection','Tracking code changes over time','Speeding up programs','Compressing files'], correct:1, explanation:'Version control tracks changes to code over time, allowing teams to collaborate and revert to earlier versions.', xp:360 },
    { id:'p7', question:'Which sorting algorithm has the best average-case time complexity?', options:['Bubble Sort O(n²)','Selection Sort O(n²)','Quick Sort O(n log n)','Insertion Sort O(n²)'], correct:2, explanation:'Quick Sort has O(n log n) average-case complexity, making it much faster than the O(n²) algorithms for large datasets.', xp:400, badge:'🚀 Algorithm Master' },
    { id:'p8', question:'What is the purpose of Docker?', options:['A design tool','Containerizing applications for consistent deployment','A database','A text editor'], correct:1, explanation:'Docker packages applications into containers — ensuring they run the same way on any computer or server.', xp:380 },
    { id:'p9', question:'What does MVC stand for in software architecture?', options:['Multiple View Controller','Model View Controller','Main Value Component','Module Version Control'], correct:1, explanation:'MVC stands for Model-View-Controller — a design pattern that separates an app into three components.', xp:380 },
    { id:'p10', question:'What is machine learning?', options:['Teaching computers to type','Algorithms that learn from data to make predictions','A programming language','Computer memory management'], correct:1, explanation:'Machine Learning is a type of AI where algorithms learn patterns from data to make predictions or decisions without being explicitly programmed.', xp:400, badge:'🤖 AI Pioneer' },
  ],
};

// ── ROBOTICS QUESTIONS ─────────────────────────────────────────────
const ROBOTICS_QUESTIONS: Record<Level, Question[]> = {
  beginner: [
    { id:'r1', question:'What is a robot?', options:['Only a toy','A machine that can do tasks automatically','A type of computer game','A type of car'], correct:1, explanation:'A robot is a machine that can perform tasks automatically, often programmed by humans to help with work.', xp:100 },
    { id:'r2', question:'Which part of a robot acts like its "brain"?', options:['Motor','Sensor','Microcontroller/Computer','Battery'], correct:2, explanation:'The microcontroller or computer is the robot\'s brain — it processes information and decides what to do.', xp:100 },
    { id:'r3', question:'What do sensors do on a robot?', options:['Make the robot move','Help the robot detect things in its environment','Power the robot','Connect to the internet'], correct:1, explanation:'Sensors allow robots to detect things like light, distance, temperature, and touch from their environment.', xp:100 },
    { id:'r4', question:'What makes a robot\'s wheels or arms move?', options:['Sensors','Batteries alone','Motors','Screens'], correct:2, explanation:'Motors convert electrical energy into movement — they make a robot\'s wheels, arms, and joints move.', xp:100 },
    { id:'r5', question:'What is Scratch used for in robotics for beginners?', options:['Drawing robots','Programming robots visually with blocks','Building robot parts','Charging robots'], correct:1, explanation:'Scratch is a visual programming language where you drag and drop blocks to create programs — perfect for beginners learning to control robots.', xp:110 },
    { id:'r6', question:'What popular beginner robot kit uses colored blocks of code?', options:['NASA Rover','LEGO Mindstorms / Spike','Military Drone','Factory Robot'], correct:1, explanation:'LEGO Mindstorms and LEGO Spike are popular robotics kits for students that use visual block-based coding.', xp:110 },
    { id:'r7', question:'What does "programming a robot" mean?', options:['Painting the robot','Giving the robot step-by-step instructions','Building the robot body','Charging the robot battery'], correct:1, explanation:'Programming a robot means writing instructions that tell it exactly what to do and when to do it.', xp:100 },
    { id:'r8', question:'Which is an example of a robot used in everyday life?', options:['A pencil','A vacuum cleaner robot (like Roomba)','A bicycle','A book'], correct:1, explanation:'The Roomba is a robot vacuum cleaner that moves around your home and cleans the floor automatically!', xp:100 },
  ],
  intermediate: [
    { id:'ri1', question:'What does an ultrasonic sensor measure?', options:['Temperature','Light levels','Distance to objects','Speed'], correct:2, explanation:'An ultrasonic sensor sends out sound waves and measures how long they take to bounce back — this tells the robot how far away an object is.', xp:160, badge:'📡 Sensor Expert' },
    { id:'ri2', question:'In Arduino programming, what does "digitalWrite(pin, HIGH)" do?', options:['Reads data from a pin','Turns a pin ON (sends voltage)','Turns a pin OFF','Resets the Arduino'], correct:1, explanation:'digitalWrite(pin, HIGH) turns a digital pin ON by sending 5V (or 3.3V) to it — used to power LEDs, motors, etc.', xp:170 },
    { id:'ri3', question:'What is a servo motor used for in robotics?', options:['Powering the entire robot','Precise controlled rotation to specific angles','Generating electricity','Cooling the robot'], correct:1, explanation:'A servo motor can rotate to a specific angle with precision — perfect for robot arms, steering, and joints.', xp:160 },
    { id:'ri4', question:'What does PWM stand for in robotics?', options:['Power Wire Module','Pulse Width Modulation','Programmed Wheel Movement','Power With Motor'], correct:1, explanation:'PWM (Pulse Width Modulation) controls how much power goes to a component by rapidly switching it on/off — used to control motor speed and LED brightness.', xp:180 },
    { id:'ri5', question:'What is the purpose of a motor driver (like L298N)?', options:['To sense distance','To amplify signals to drive motors that need more current','To program the robot','To display information'], correct:1, explanation:'A motor driver like the L298N takes small signals from the microcontroller and amplifies them to power larger motors safely.', xp:180, badge:'⚙️ Motor Expert' },
    { id:'ri6', question:'Which microcontroller is most popular for beginner robotics?', options:['Raspberry Pi 4','Intel Core i7','Arduino Uno','NVIDIA GPU'], correct:2, explanation:'The Arduino Uno is the most popular beginner microcontroller for robotics — it\'s simple, affordable, and has a huge community.', xp:160 },
    { id:'ri7', question:'What does an IR sensor detect?', options:['Sound waves','Infrared light (used for line following)','Magnetic fields','Radio signals'], correct:1, explanation:'IR (Infrared) sensors detect infrared light. Line-following robots use them to detect the difference between a black line and white floor.', xp:170 },
    { id:'ri8', question:'What is a robot "actuator"?', options:['A sensor that detects motion','A component that causes movement or action','The robot\'s power supply','The robot\'s camera'], correct:1, explanation:'An actuator is any component that creates movement — motors, servos, and pneumatic cylinders are all actuators.', xp:160 },
  ],
  advanced: [
    { id:'ra1', question:'What does PID stand for in robot control systems?', options:['Power Input Device','Proportional Integral Derivative','Programmed Input Drive','Pulse Integrated Distance'], correct:1, explanation:'PID (Proportional-Integral-Derivative) is a control algorithm that helps robots maintain precise position or speed by calculating error corrections.', xp:280, badge:'🎯 Control Systems' },
    { id:'ra2', question:'What is ROS in robotics?', options:['Read Only Storage','Robot Operating System','Remote Output Signal','Rotational Object Sensor'], correct:1, explanation:'ROS (Robot Operating System) is an open-source framework for building robot software, widely used in research and industry.', xp:280 },
    { id:'ra3', question:'What type of AI does a self-driving car mainly use to recognize objects?', options:['Rule-based programming','Computer Vision with Neural Networks','Simple if-else logic','Database lookup'], correct:1, explanation:'Self-driving cars use Computer Vision with Convolutional Neural Networks (CNNs) to recognize pedestrians, signs, and other vehicles.', xp:300, badge:'🚗 Autonomous Systems' },
    { id:'ra4', question:'What is SLAM in robotics?', options:['Simultaneous Localization And Mapping','Speed Limit And Motion','System Load And Management','Software Layer And Module'], correct:0, explanation:'SLAM (Simultaneous Localization and Mapping) allows robots to build a map of an unknown environment while tracking their location within it.', xp:300 },
    { id:'ra5', question:'Which programming language is most used in professional robotics?', options:['Scratch','C++ and Python','HTML','Visual Basic'], correct:1, explanation:'C++ is used for performance-critical robot code, while Python is popular for AI and high-level robot behavior. Most professional robots use both.', xp:280 },
    { id:'ra6', question:'What is an encoder in a robot motor system?', options:['A device that converts data to code','A sensor measuring motor rotation speed/position','A type of battery','A wireless transmitter'], correct:1, explanation:'An encoder is a sensor attached to a motor that measures how far and fast it has rotated — essential for precise movement control.', xp:280, badge:'🔄 Encoder Expert' },
    { id:'ra7', question:'What does "degrees of freedom" mean for a robot arm?', options:['How free the robot is to roam','The number of independent movements it can make','How much the robot weighs','The robot\'s battery level'], correct:1, explanation:'Degrees of freedom (DOF) is the number of independent ways a robot arm can move. More DOF = more flexible movement.', xp:280 },
    { id:'ra8', question:'What is inverse kinematics in robotics?', options:['Making robots run backwards','Calculating joint angles needed to reach a target position','A type of sensor','Robot battery management'], correct:1, explanation:'Inverse kinematics calculates the joint angles a robot arm needs to position its end-effector (hand) at a desired location in space.', xp:300 },
  ],
  pro: [
    { id:'rp1', question:'What is a Kalman Filter used for in robotics?', options:['Image processing','Estimating state from noisy sensor data','Motor control','Network communication'], correct:1, explanation:'A Kalman Filter is an algorithm that estimates a system\'s true state by combining noisy sensor measurements with a mathematical model — critical for navigation.', xp:450, badge:'📊 State Estimation Pro' },
    { id:'rp2', question:'What type of neural network is best for processing robot camera images?', options:['Recurrent Neural Network (RNN)','Convolutional Neural Network (CNN)','Feed-forward Network','Decision Tree'], correct:1, explanation:'CNNs (Convolutional Neural Networks) are specifically designed to process grid-like data such as images, making them ideal for robot vision.', xp:450, badge:'👁️ Computer Vision Pro' },
    { id:'rp3', question:'What is the key advantage of using ROS2 over ROS1?', options:['Better graphics','Real-time support and improved security','Cheaper hardware','Easier installation'], correct:1, explanation:'ROS2 adds real-time computing support, improved security, better multi-robot support, and works without a central master node.', xp:420 },
    { id:'rp4', question:'In reinforcement learning for robotics, what is a "reward function"?', options:['The robot\'s battery level','A score signal telling the AI how well it performed','The robot\'s speed','Memory usage'], correct:1, explanation:'A reward function gives the AI a numerical score for each action — the AI learns to maximize this reward over time through trial and error.', xp:450, badge:'🤖 RL Robotics Expert' },
    { id:'rp5', question:'What is path planning in autonomous robotics?', options:['Planning robot maintenance schedules','Calculating the optimal route from start to goal avoiding obstacles','Designing robot aesthetics','Network configuration'], correct:1, explanation:'Path planning algorithms (like A* or RRT) calculate the safest and most efficient route for a robot to travel from its current position to its goal.', xp:440, badge:'🗺️ Navigation Expert' },
    { id:'rp6', question:'What does "gazebo" provide in robotics development?', options:['Real robot hardware','A 3D robot simulation environment','A coding editor','A database system'], correct:1, explanation:'Gazebo is a powerful 3D robot simulator that lets developers test and train robots in realistic virtual environments before deploying on real hardware.', xp:420 },
    { id:'rp7', question:'What is the purpose of a behavior tree in robot AI?', options:['Managing robot power','Hierarchical structure for robot decision-making','Sensor calibration','Network communication'], correct:1, explanation:'Behavior trees provide a modular, hierarchical way to define robot behavior and decision-making — more flexible than finite state machines.', xp:440, badge:'🌳 Behavior Tree Expert' },
    { id:'rp8', question:'Which technique allows a robot to learn from human demonstrations?', options:['Supervised classification','Imitation Learning / Learning from Demonstration','Genetic algorithms','Bubble sort'], correct:1, explanation:'Imitation Learning (or Learning from Demonstration) allows robots to learn new skills by observing and mimicking human demonstrations.', xp:450, badge:'👨‍🏫 Learning from Demo' },
  ],
};

// ── LEARN DATA: CODING LESSONS ────────────────────────────────────
interface Concept { emoji:string; name:string; desc:string; }
interface Lesson { id:string; title:string; tag:string; explain:string; analogy:string; code?:string; output?:string; concepts:Concept[]; }
interface RobotStep { num:number; color:string; title:string; desc:string; tip:string; }
interface RobotProject { id:string; emoji:string; color:string; name:string; tags:string[]; desc:string; diff:string; parts:string[]; steps:RobotStep[]; code:string; }

const CODING_LESSONS: Record<Level, Lesson[]> = {
  beginner: [
    { id:'b1', title:'What is a Computer?', tag:'Basics',
      explain:'A computer is an electronic machine that follows instructions. It takes INPUT (from you), PROCESSES it (thinks about it), and gives OUTPUT (an answer or action). Think of it like a very fast, very obedient helper — it only does exactly what you tell it!',
      analogy:'🏫 TEACHER ANALOGY: Imagine a cook in a kitchen. You give the cook a recipe (INPUT), they follow the steps (PROCESS), and produce a meal (OUTPUT). A computer works exactly the same — but instead of food, it processes information!',
      concepts:[ {emoji:'⌨️',name:'Input',desc:'Keyboard, mouse, microphone — things you use to put data INTO the computer'}, {emoji:'🖥️',name:'Output',desc:'Screen, printer, speaker — things that show results coming OUT'}, {emoji:'🧠',name:'CPU (Brain)',desc:'The Central Processing Unit that thinks and calculates everything'}, {emoji:'💾',name:'Memory (RAM)',desc:'Temporary storage — like a desk where you keep things you are currently working on'} ] },
    { id:'b2', title:'Your First Python Program', tag:'Python',
      explain:'Python is a programming language — a way to talk to the computer using special words. We use print() to make the computer show something on screen. Everything inside the brackets and quotes is what gets displayed.',
      analogy:'💡 BEGINNER TIP: Think of print() as the computer\'s mouth. You put words inside it, and the computer speaks them on the screen. The quotes are a container for your words.',
      code:'# This is my first Python program!\n# Lines starting with # are COMMENTS\n# The computer ignores them — notes for humans\n\nprint("Hello, World!")\nprint("My name is Kofi")\nprint("I am learning to code!")',
      output:'Hello, World!\nMy name is Kofi\nI am learning to code!',
      concepts:[ {emoji:'#️⃣',name:'Comment',desc:'Lines starting with # — notes for humans, computer ignores them'}, {emoji:'🖨️',name:'print()',desc:'The command that shows text on the screen'}, {emoji:'"…"',name:'String',desc:'Text inside quotes — treated as words, not commands'} ] },
    { id:'b3', title:'Variables — Storing Information', tag:'Python',
      explain:'A variable is like a labelled box where you store information. You give the box a name, then put something inside it. Later you can open the box and use what\'s inside. Create a variable by writing: name = value',
      analogy:'📦 REAL WORLD LINK: Imagine a box with the label "age" on it. You put the number 12 inside. Whenever someone asks your age, you open the box and read the number. That\'s exactly what variables do!',
      code:'# Creating variables (named storage boxes)\nname = "Ama"\nage = 14\nfavourite_colour = "blue"\n\nprint("My name is", name)\nprint("I am", age, "years old")\nprint("My favourite colour is", favourite_colour)\n\n# You can change the value!\nage = 15\nprint("Next year I will be", age)',
      output:'My name is Ama\nI am 14 years old\nMy favourite colour is blue\nNext year I will be 15',
      concepts:[ {emoji:'📦',name:'Variable',desc:'A named container that stores a value you can use later'}, {emoji:'=',name:'Assignment',desc:'The = sign puts a value INTO a variable'}, {emoji:'🔢',name:'Integer',desc:'A whole number like 14, 100, -5 (no decimal point)'}, {emoji:'📝',name:'String',desc:'Text in quotes: "Ama", "blue", "hello world"'} ] },
    { id:'b4', title:'Making Decisions with IF', tag:'Python',
      explain:'Programs need to make decisions! The "if" statement checks if something is true, and only runs certain code if it is. It\'s like a checkpoint — IF this condition is met, THEN do this action.',
      analogy:'🚦 TRAFFIC LIGHT ANALOGY: IF the light is red → STOP. IF the light is green → GO. ELSE → slow down. Your code makes decisions exactly the same way!',
      code:'score = 75\n\nif score >= 80:\n    print("You got an A! Excellent work!")\nelif score >= 70:\n    print("You got a B! Well done!")\nelif score >= 60:\n    print("You got a C. Keep practising!")\nelse:\n    print("Keep studying — you can do it!")\n\nprint("Your score was:", score)',
      output:'You got a B! Well done!\nYour score was: 75',
      concepts:[ {emoji:'🔍',name:'if',desc:'Checks a condition — runs the code inside ONLY if it is True'}, {emoji:'🔄',name:'elif',desc:'Short for "else if" — checked only if the first was False'}, {emoji:'🏁',name:'else',desc:'Runs when ALL conditions above it were False'}, {emoji:'≥',name:'Comparison',desc:'>, <, >=, <=, ==, != compare two values'} ] },
    { id:'b5', title:'Loops — Repeating Actions', tag:'Python',
      explain:'Loops let us repeat actions without writing the same code over and over. A "for" loop repeats a set number of times. A "while" loop repeats until a condition becomes False.',
      analogy:'🔁 CLASSROOM ANALOGY: Imagine your teacher says "Write your name 10 times". Without loops, you\'d write print("Kofi") ten times! With a loop, you tell the computer "repeat this 10 times" — much smarter!',
      code:'print("Counting from 1 to 5:")\nfor i in range(1, 6):\n    print("Number:", i)\n\nfruits = ["mango", "orange", "pawpaw", "banana"]\nprint("\\nFruits in my basket:")\nfor fruit in fruits:\n    print("  -", fruit)\n\ncountdown = 5\nprint("\\nCountdown:")\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\nprint("Blast off! 🚀")',
      output:'Counting from 1 to 5:\nNumber: 1\nNumber: 2\nNumber: 3\nNumber: 4\nNumber: 5\n\nFruits in my basket:\n  - mango\n  - orange\n  - pawpaw\n  - banana\n\nCountdown:\n5 4 3 2 1\nBlast off! 🚀',
      concepts:[ {emoji:'🔁',name:'for loop',desc:'Runs a set number of times — great for lists and ranges'}, {emoji:'🔄',name:'while loop',desc:'Keeps running as long as a condition is True'}, {emoji:'📋',name:'range()',desc:'Generates a number sequence: range(5) gives 0,1,2,3,4'}, {emoji:'📝',name:'List',desc:'A collection of items in square brackets: ["mango","orange"]'} ] },
    { id:'b6', title:'Functions — Reusable Code Blocks', tag:'Python',
      explain:'A function is a named block of code that does one job. You define it once with "def", then call (use) it as many times as you like. Functions help organise code and avoid repeating ourselves.',
      analogy:'🍳 RECIPE ANALOGY: A function is like a recipe card. You write the recipe once (define). Whenever you want to cook that dish, you follow the recipe (call). You do not rewrite it every time!',
      code:'def greet_student(student_name):\n    print("Welcome to school,", student_name + "!")\n    print("Let\'s learn something amazing today.")\n    print("")\n\ngreet_student("Kofi")\ngreet_student("Ama")\n\ndef add_numbers(a, b):\n    result = a + b\n    return result\n\nprint("15 + 27 =", add_numbers(15, 27))\nprint("100 + 250 =", add_numbers(100, 250))',
      output:'Welcome to school, Kofi!\nLet\'s learn something amazing today.\n\nWelcome to school, Ama!\nLet\'s learn something amazing today.\n\n15 + 27 = 42\n100 + 250 = 350',
      concepts:[ {emoji:'📋',name:'def',desc:'The keyword used to DEFINE (create) a new function'}, {emoji:'📞',name:'Call',desc:'Running a function by writing its name with () after it'}, {emoji:'📥',name:'Parameter',desc:'A variable that receives input into the function'}, {emoji:'📤',name:'return',desc:'Sends a result back from the function to the caller'} ] },
  ],
  intermediate: [
    { id:'i1', title:'Lists and Indexing', tag:'Python',
      explain:'A list stores multiple items in one variable. Items are numbered starting from 0 (not 1!). This is called zero-based indexing. You can add, remove, or change items.',
      analogy:'🏠 CLASS REGISTER ANALOGY: The first student is at position 0, second at 1. A Python list works exactly like a class register — you access items by their position number.',
      code:'students = ["Kofi", "Ama", "Kwame", "Akua", "Fiifi"]\n\nprint("First student:", students[0])\nprint("Second student:", students[1])\nprint("Last student:", students[-1])\nprint("Total students:", len(students))\n\nstudents.append("Adwoa")\nprint("After adding Adwoa:", students)\n\nstudents.remove("Kwame")\nprint("After removing Kwame:", students)\n\nprint("\\nClass roll call:")\nfor i, name in enumerate(students):\n    print(f"  {i+1}. {name}")',
      output:'First student: Kofi\nSecond student: Ama\nLast student: Fiifi\nTotal: 5\n...',
      concepts:[ {emoji:'0️⃣',name:'Index',desc:'Position of item in a list — STARTS AT 0, not 1!'}, {emoji:'➕',name:'.append()',desc:'Adds an item to the END of the list'}, {emoji:'➖',name:'.remove()',desc:'Removes the first matching item from the list'}, {emoji:'📏',name:'len()',desc:'Returns how many items are in the list'} ] },
    { id:'i2', title:'Dictionaries — Key-Value Pairs', tag:'Python',
      explain:'A dictionary stores data in pairs: a KEY (label) and a VALUE (data). Instead of using a position number like lists, you use a meaningful name. Perfect for storing related info about one thing.',
      analogy:'📚 REAL DICTIONARY ANALOGY: You look up a WORD (key) to find its MEANING (value). Python dictionaries work exactly the same — look up a key to get its value. Like a student record card!',
      code:'student = {\n    "name": "Ama Mensah",\n    "age": 13,\n    "grade": "Grade 7",\n    "score": 88\n}\n\nprint("Name:", student["name"])\nprint("Score:", student["score"])\n\nstudent["house"] = "Alpha"\nstudent["score"] = 92\n\nprint("\\n--- Full Record ---")\nfor key, value in student.items():\n    print(f"  {key}: {value}")',
      output:'Name: Ama Mensah\nScore: 88\n\n--- Full Record ---\n  name: Ama Mensah\n  age: 13\n  grade: Grade 7\n  score: 92\n  house: Alpha',
      concepts:[ {emoji:'🔑',name:'Key',desc:'The label used to look up data ("name", "age")'}, {emoji:'💎',name:'Value',desc:'The actual data stored under a key ("Ama Mensah", 13)'}, {emoji:'{}',name:'Dict literal',desc:'Curly braces {} create a dictionary'}, {emoji:'🔄',name:'.items()',desc:'Returns all key-value pairs for looping'} ] },
    { id:'i3', title:'Reading Code — Trace Through It', tag:'Code Reading',
      explain:'One of the most important coding skills is READING code and understanding what it does. Trace through each line, track what each variable holds, and predict the output BEFORE looking at the answer.',
      analogy:'🕵️ DETECTIVE SKILL: Reading code is like being a detective. You trace through each line, figure out what each variable holds, and predict what will happen. Always ask: "What is the value of X right now?"',
      code:'# What will this print? Predict before looking!\ntotal = 0\nnumbers = [10, 20, 30, 40, 50]\n\nfor num in numbers:\n    total = total + num\n\naverage = total / len(numbers)\n\nprint("Total:", total)\nprint("Average:", average)\n\nif average > 25:\n    print("Above 25!")\nelse:\n    print("25 or below.")',
      output:'Total: 150\nAverage: 30.0\nAbove 25!',
      concepts:[ {emoji:'👣',name:'Trace',desc:'Go through code line by line, tracking variable values'}, {emoji:'🧮',name:'Accumulator',desc:'total = total + num adds to a running total each loop'}, {emoji:'➗',name:'Average',desc:'Sum of all values divided by how many there are'}, {emoji:'🔍',name:'Predict',desc:'Always predict output BEFORE running — builds real skill!'} ] },
    { id:'i4', title:'String Manipulation', tag:'Python',
      explain:'Python gives us many tools to work with strings (text). We can change their case, split them into parts, check what\'s inside them, and format them into messages using f-strings.',
      analogy:'✂️ SCISSORS AND GLUE: Working with strings is like cutting paper (splitting), gluing pieces together (joining), measuring with a ruler (len), or stamping labels (f-strings).',
      code:'name = "Pinnacle Education Centre"\n\nprint("Original:", name)\nprint("UPPERCASE:", name.upper())\nprint("lowercase:", name.lower())\nprint("Length:", len(name))\nprint("First 8 letters:", name[0:8])\n\nwords = name.split(" ")\nprint("Words:", words)\n\nstudent = "Kofi"\nscore = 95\nprint(f"Student {student} scored {score} out of 100")\n\nmessage = "Hello World"\nprint("Contains World:", "World" in message)',
      output:'Original: Pinnacle Education Centre\nUPPERCASE: PINNACLE EDUCATION CENTRE\nlowercase: pinnacle education centre\nLength: 27\nFirst 8 letters: Pinnacle\nWords: [\'Pinnacle\', \'Education\', \'Centre\']\nStudent Kofi scored 95 out of 100\nContains World: True',
      concepts:[ {emoji:'🔪',name:'Slicing',desc:'name[0:8] gets characters from position 0 up to 7'}, {emoji:'✂️',name:'.split()',desc:'Breaks a string into a list at the character you specify'}, {emoji:'🖊️',name:'f-string',desc:'f"Hello {name}" inserts variable values directly into text'}, {emoji:'🔍',name:'in operator',desc:'"World" in text returns True if found'} ] },
    { id:'i5', title:'Introduction to HTML & Web', tag:'Web Dev',
      explain:'HTML (HyperText Markup Language) is the language of web pages. HTML uses TAGS to describe what things are. Most tags have an opening and closing pair: <p>text</p>. Browsers read HTML and display it as a website.',
      analogy:'🏗️ BUILDING ANALOGY: HTML is the skeleton/structure of a building. CSS (colours, fonts) is the paint. JavaScript is the electricity making things interactive. HTML comes first!',
      code:'<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Web Page</title>\n</head>\n<body>\n\n  <h1>Welcome to My School</h1>\n  <h2>Pinnacle Education Centre</h2>\n\n  <p>This is my first web page!</p>\n\n  <h3>Subjects I Study:</h3>\n  <ul>\n    <li>Mathematics</li>\n    <li>Science</li>\n    <li>Coding</li>\n    <li>Robotics</li>\n  </ul>\n\n  <a href="https://example.com">Click here!</a>\n\n</body>\n</html>',
      output:'[Browser displays: large heading, smaller heading, paragraph, bulleted list of 4 subjects, and a clickable link]',
      concepts:[ {emoji:'🏷️',name:'Tag',desc:'<tagname>...</tagname> — wraps content to give it meaning'}, {emoji:'📄',name:'<body>',desc:'Everything inside <body> appears on the visible web page'}, {emoji:'📝',name:'<p>',desc:'Paragraph tag — used for blocks of text'}, {emoji:'🔗',name:'<a href>',desc:'Anchor tag — creates a clickable hyperlink'} ] },
    { id:'i6', title:'Bubble Sort Algorithm', tag:'Algorithms',
      explain:'An algorithm is a step-by-step method to solve a problem. Bubble Sort compares adjacent items and swaps them if they are in the wrong order. Bigger values "bubble up" to the end of the list.',
      analogy:'🫧 WHY "BUBBLE"? Like comparing students by height — if taller person is on the left, they swap. You keep doing this until no more swaps are needed. Larger values bubble up like bubbles rising in water!',
      code:'def bubble_sort(numbers):\n    n = len(numbers)\n    for i in range(n - 1):\n        for j in range(n - 1 - i):\n            if numbers[j] > numbers[j + 1]:\n                numbers[j], numbers[j+1] = numbers[j+1], numbers[j]\n    return numbers\n\nscores = [85, 42, 91, 67, 33, 78, 55]\nprint("Before:", scores)\nprint("After:", bubble_sort(scores))',
      output:'Before: [85, 42, 91, 67, 33, 78, 55]\nAfter: [33, 42, 55, 67, 78, 85, 91]',
      concepts:[ {emoji:'🔄',name:'Algorithm',desc:'A step-by-step procedure to solve a specific problem'}, {emoji:'↔️',name:'Swap',desc:'Exchange the positions of two items in a list'}, {emoji:'🔁',name:'Pass',desc:'One complete run through the entire list'}, {emoji:'⏱️',name:'O(n²)',desc:'Bubble sort is slow for big lists — advanced sorts are faster'} ] },
  ],
  advanced: [
    { id:'a1', title:'Object-Oriented Programming (OOP)', tag:'Python/OOP',
      explain:'OOP organises code using "objects". An object has ATTRIBUTES (properties/data) and METHODS (actions it can do). A CLASS is the blueprint; an OBJECT is the actual thing created from that blueprint.',
      analogy:'🏗️ BLUEPRINT ANALOGY: A Class is like a house blueprint. From ONE blueprint, you can build MANY houses. Each house has the same structure but different colours and owners. OOP works exactly the same way!',
      code:'class Student:\n    def __init__(self, name, grade, house):\n        self.name = name\n        self.grade = grade\n        self.house = house\n        self.scores = []\n    \n    def add_score(self, subject, score):\n        self.scores.append({"subject": subject, "score": score})\n        print(f"{self.name} scored {score} in {subject}")\n    \n    def get_average(self):\n        if not self.scores: return 0\n        return sum(s["score"] for s in self.scores) / len(self.scores)\n    \n    def report(self):\n        avg = self.get_average()\n        grade = "A" if avg >= 80 else "B" if avg >= 70 else "C"\n        print(f"Report for {self.name}: Average {avg:.1f} — Grade {grade}")\n\nstudent1 = Student("Kofi", "Grade 8", "Alpha")\nstudent1.add_score("Maths", 85)\nstudent1.add_score("Coding", 95)\nstudent1.report()',
      output:'Kofi scored 85 in Maths\nKofi scored 95 in Coding\nReport for Kofi: Average 90.0 — Grade A',
      concepts:[ {emoji:'📐',name:'Class',desc:'The blueprint/template defining what objects look like and do'}, {emoji:'📦',name:'Object',desc:'An actual instance created from a class'}, {emoji:'🏷️',name:'Attribute',desc:'Data stored inside an object (self.name, self.grade)'}, {emoji:'⚙️',name:'Method',desc:'A function inside a class that defines what an object can DO'} ] },
    { id:'a2', title:'APIs — Programs Talking to Programs', tag:'Python/Web',
      explain:'APIs let programs share data with each other. When you check weather on your phone, it uses an API to get data from a weather server. Python\'s requests library lets us get data from the internet.',
      analogy:'📞 WAITER ANALOGY: An API is like a waiter. You (the program) tell the waiter what you want (request). The waiter goes to the kitchen (server). The kitchen sends food back through the waiter (response).',
      code:'# How APIs work (conceptual demo)\nweather_data = {\n    "city": "Accra",\n    "temperature": 32,\n    "humidity": 78,\n    "condition": "Partly cloudy"\n}\n\nprint(f"Weather for {weather_data[\'city\']}")\nprint(f"Temperature: {weather_data[\'temperature\']}°C")\nprint(f"Humidity: {weather_data[\'humidity\']}%")\n\nif weather_data["temperature"] > 30:\n    print("Very hot — drink water!")\nelse:\n    print("Nice weather!")',
      output:'Weather for Accra\nTemperature: 32°C\nHumidity: 78%\nVery hot — drink water!',
      concepts:[ {emoji:'🌐',name:'API',desc:'Application Programming Interface — how programs share data'}, {emoji:'📨',name:'Request',desc:'Your program ASKING a server for data'}, {emoji:'📩',name:'Response',desc:'The server\'s REPLY with the data you asked for'}, {emoji:'📋',name:'JSON',desc:'Common data format — like a Python dictionary'} ] },
    { id:'a3', title:'Data Structures: Stacks & Queues', tag:'CS Theory',
      explain:'Data structures are ways to organise information. A STACK works Last In, First Out (LIFO) like a stack of plates. A QUEUE works First In, First Out (FIFO) like a line of people.',
      analogy:'🍽️ STACK = Stack of plates: add to TOP, take from TOP. Last one placed, first one taken.\n👥 QUEUE = Line at the tuck shop: first person IN is first person SERVED.',
      code:'# STACK — Last In, First Out\nclass Stack:\n    def __init__(self): self.items = []\n    def push(self, item):\n        self.items.append(item)\n        print(f"Pushed: {item}")\n    def pop(self):\n        if self.items:\n            print(f"Popped: {self.items.pop()}")\n    def peek(self): return self.items[-1] if self.items else None\n\nstack = Stack()\nstack.push("Plate 1")\nstack.push("Plate 2")\nstack.push("Plate 3")\nprint("Top:", stack.peek())\nstack.pop()\n\n# QUEUE — First In, First Out\nfrom collections import deque\nqueue = deque(["Person 1", "Person 2", "Person 3"])\nprint("\\nQueue:", list(queue))\nprint("Served:", queue.popleft())\nprint("Queue now:", list(queue))',
      output:'Pushed: Plate 1\nPushed: Plate 2\nPushed: Plate 3\nTop: Plate 3\nPopped: Plate 3\n\nQueue: [\'Person 1\', \'Person 2\', \'Person 3\']\nServed: Person 1\nQueue now: [\'Person 2\', \'Person 3\']',
      concepts:[ {emoji:'📚',name:'Stack (LIFO)',desc:'Last In, First Out — like a stack of books or plates'}, {emoji:'👥',name:'Queue (FIFO)',desc:'First In, First Out — like a line or queue of people'}, {emoji:'⬆️',name:'Push / Enqueue',desc:'Adding an item to the data structure'}, {emoji:'⬇️',name:'Pop / Dequeue',desc:'Removing an item from the data structure'} ] },
  ],
  pro: [
    { id:'p1', title:'Recursion — Functions Calling Themselves', tag:'Advanced Python',
      explain:'Recursion is when a function calls ITSELF. This is powerful for problems that can be broken into smaller versions of the same problem. Every recursive function MUST have a base case — the stopping condition!',
      analogy:'🪞 MIRROR ANALOGY: Two mirrors facing each other create infinite reflections. Recursion is like that — BUT with a stopping rule (base case). Without a base case it runs forever. With one, it stops at exactly the right moment.',
      code:'def factorial(n):\n    if n == 0 or n == 1:  # BASE CASE — stops recursion!\n        return 1\n    return n * factorial(n - 1)  # RECURSIVE CASE\n\nfor n in range(8):\n    print(f"  {n}! = {factorial(n)}")\n\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nfib = [fibonacci(i) for i in range(10)]\nprint("Fibonacci:", fib)',
      output:'  0! = 1\n  1! = 1\n  2! = 2\n  3! = 6\n  4! = 24\n  5! = 120\n  6! = 720\n  7! = 5040\nFibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]',
      concepts:[ {emoji:'🔁',name:'Recursion',desc:'A function that calls itself to solve a smaller version of the problem'}, {emoji:'🛑',name:'Base Case',desc:'The condition that STOPS recursion — absolutely essential!'}, {emoji:'🔽',name:'Recursive Case',desc:'The part that calls itself with a simpler/smaller input'}, {emoji:'📊',name:'Call Stack',desc:'Memory tracking all nested function calls — can overflow!'} ] },
    { id:'p2', title:'Machine Learning Concepts', tag:'AI/ML',
      explain:'Machine Learning algorithms LEARN from data rather than following fixed rules. You show the machine examples, and it learns to find patterns. ML powers face recognition, spam filters, self-driving cars, and more.',
      analogy:'👶 CHILD LEARNING: A child learns to recognise dogs by seeing many examples — nobody gave them a rulebook. Machine Learning works the same: show it thousands of examples and it figures out the pattern!',
      code:'# CONCEPTUAL ML demo\nstudent_data = [\n    {"study_hours": 1, "attendance": 50, "result": "Fail"},\n    {"study_hours": 4, "attendance": 80, "result": "Pass"},\n    {"study_hours": 5, "attendance": 85, "result": "Pass"},\n]\n\n# Simple rule "learned" from data\ndef simple_predict(study_hours, attendance):\n    score = (study_hours * 10) + (attendance * 0.5)\n    return "Pass" if score >= 75 else "Fail"\n\nnew_students = [\n    {"name": "Kofi",  "hours": 5, "attendance": 88},\n    {"name": "Ama",   "hours": 1, "attendance": 55},\n]\n\nprint("ML Predictions:")\nfor s in new_students:\n    pred = simple_predict(s["hours"], s["attendance"])\n    print(f"  {s[\'name\']}: {s[\'hours\']}h study, {s[\'attendance\']}% attend → {pred}")',
      output:'ML Predictions:\n  Kofi: 5h study, 88% attend → Pass\n  Ama: 1h study, 55% attend → Fail',
      concepts:[ {emoji:'📊',name:'Training Data',desc:'Labelled examples the ML model learns from'}, {emoji:'🔮',name:'Prediction',desc:'Using the trained model to forecast new data'}, {emoji:'🏷️',name:'Supervised ML',desc:'Model learns from labelled examples (inputs + correct answers)'}, {emoji:'🏆',name:'Reinforcement',desc:'Model learns by trial and error, getting rewards for correct actions'} ] },
  ],
};

// ── LEARN DATA: ROBOTICS PROJECTS ─────────────────────────────────
const ROBOTICS_PROJECTS: Record<Level, RobotProject[]> = {
  beginner: [
    { id:'rp1', emoji:'🚦', color:'#10b981', name:'Traffic Light Robot', tags:['Arduino','LEDs','Grade 3-5'], desc:'Build a working traffic light that cycles automatically using 3 LEDs and an Arduino. Perfect first project!', diff:'★☆☆☆',
      parts:['1× Arduino Uno board','1× Red LED','1× Yellow/Amber LED','1× Green LED','3× 220Ω resistors','1× Breadboard','Jumper wires','USB cable'],
      steps:[
        {num:1,color:'#10b981',title:'Understand the Circuit',desc:'A circuit is a path that electricity flows through. The Arduino sends power (5V) through resistors to each LED, then back to Ground (GND). Think of it like water flowing through pipes!',tip:'🔧 TEACHER TIP: Use a diagram to show students where pins are on the Arduino. Pin 13 = built-in LED. Pins 9, 10, 11 are Digital Output pins we will use.'},
        {num:2,color:'#3b82f6',title:'Build on the Breadboard',desc:'Insert each LED into the breadboard. The LONGER leg (+) connects through a 220Ω resistor to the Arduino pin. The SHORTER leg (-) connects to GND. Red LED → Pin 9, Yellow → Pin 10, Green → Pin 11.',tip:'💡 BEGINNER TIP: A breadboard has rows of holes connected underneath. The blue rail is GND (negative). The red rail is +5V (positive).'},
        {num:3,color:'#f59e0b',title:'Write the Arduino Code',desc:'Open the Arduino IDE on your computer. Type the code shown below. The code tells each pin whether to be HIGH (5V = ON) or LOW (0V = OFF), with delays to create the traffic light sequence.',tip:'📝 CODE TIP: delay(1000) means wait 1000 milliseconds = 1 second. delay(3000) = 3 seconds. Change these numbers to change the timing!'},
        {num:4,color:'#a855f7',title:'Upload and Test',desc:'Connect your Arduino with the USB cable. In Arduino IDE: Tools → Board → Arduino Uno. Tools → Port → your port. Click the Upload button (right arrow). Watch your traffic light work!',tip:'🎉 CELEBRATE: When it works, ask students "What would happen if we changed the delay to 500?" Then let them experiment!'},
        {num:5,color:'#ef4444',title:'Extend the Project',desc:'Add a button so the light changes when pressed (pedestrian crossing). Add a buzzer that beeps when safe to walk. Change timing for different traffic conditions.',tip:'🚀 CHALLENGE: Can you add a countdown? Can you make it respond to how many people are waiting?'},
      ],
      code:'// Traffic Light Arduino Code\nint redPin    = 9;\nint yellowPin = 10;\nint greenPin  = 11;\n\nvoid setup() {\n  pinMode(redPin, OUTPUT);\n  pinMode(yellowPin, OUTPUT);\n  pinMode(greenPin, OUTPUT);\n}\n\nvoid loop() {\n  // RED — Stop! (3 seconds)\n  digitalWrite(redPin, HIGH);\n  digitalWrite(yellowPin, LOW);\n  digitalWrite(greenPin, LOW);\n  delay(3000);\n\n  // YELLOW — Get ready (1 second)\n  digitalWrite(redPin, LOW);\n  digitalWrite(yellowPin, HIGH);\n  digitalWrite(greenPin, LOW);\n  delay(1000);\n\n  // GREEN — Go! (3 seconds)\n  digitalWrite(redPin, LOW);\n  digitalWrite(yellowPin, LOW);\n  digitalWrite(greenPin, HIGH);\n  delay(3000);\n}' },
    { id:'rp2', emoji:'🚗', color:'#3b82f6', name:'LEGO Obstacle-Avoiding Car', tags:['LEGO Spike','Block Code','Grade 4-6'], desc:'Build a LEGO robot car that drives forward and automatically turns away when it detects a wall or obstacle. Uses block-based coding!', diff:'★★☆☆',
      parts:['1× LEGO Spike Prime Hub','2× Large LEGO motors','1× LEGO Distance Sensor (ultrasonic)','LEGO Technic bricks and axles','Micro-USB cable','Spike app on tablet or computer'],
      steps:[
        {num:1,color:'#10b981',title:'Build the Robot Body',desc:'Use LEGO Technic pieces to build a rectangular base. Attach one large motor to each side — LEFT and RIGHT drive wheels. Mount the distance sensor at the FRONT pointing forward, like the robot\'s eyes.',tip:'🔧 BUILD TIP: Make sure both motors are mounted symmetrically (same distance from center). Uneven placement makes the robot drive crooked!'},
        {num:2,color:'#3b82f6',title:'Connect Motors and Sensors',desc:'Plug the LEFT motor into Port A on the Spike Hub. Plug the RIGHT motor into Port B. Plug the distance sensor into Port C. Use the same ports as your code specifies, or update your code to match.',tip:'💡 WIRING TIP: Plug cables in firmly until you feel a click. A loose cable is the most common reason a robot does not work!'},
        {num:3,color:'#f59e0b',title:'Create the Block Code',desc:'Open the Spike app. Drag these blocks: "When program starts" → "Loop forever" → "If distance < 20 cm" → "Stop then Turn right" → "Else drive forward". The robot continuously checks distance and decides what to do.',tip:'📏 DISTANCE TIP: 20cm is a good starting distance. If robot turns too late, lower it. If it turns too early, raise it. Encourage experimentation!'},
        {num:4,color:'#a855f7',title:'Test on Different Surfaces',desc:'Test on flat floor first. Then try carpet (slower), smooth tiles (faster), and outside. The robot\'s behaviour changes with surface — exactly what real robot engineers deal with!',tip:'🔬 SCIENCE LINK: This connects to friction! More friction (carpet) = more motor power needed for same speed. Real robots adjust for this automatically.'},
        {num:5,color:'#ef4444',title:'Add Colour Navigation',desc:'Add the colour sensor pointing DOWN at the floor. Program the robot to follow a black line on white paper. This is how warehouse robots navigate! Place black tape on the floor and watch your robot follow it.',tip:'🏭 REAL WORLD: Amazon warehouses use robots that follow lines on the floor to carry shelves to workers. Your students just built the same basic system!'},
      ],
      code:'# LEGO Spike Python equivalent\nfrom spike import PrimeHub, MotorPair, DistanceSensor\n\nhub = PrimeHub()\nmotors = MotorPair("A", "B")\ndistance_sensor = DistanceSensor("C")\n\nwhile True:\n    dist = distance_sensor.get_distance_cm()\n    if dist is not None and dist < 20:\n        motors.stop()\n        motors.move(-10, "cm", 100, 100)  # back up\n        motors.move(20, "cm", 100, -100)  # turn right\n    else:\n        motors.start(0, 50)  # straight, 50% power' },
    { id:'rp3', emoji:'🎵', color:'#f59e0b', name:'Musical Robot — Sound Maker', tags:['Arduino','Buzzer','Grade 3-5'], desc:'Create a robot that plays music! Wire a piezo buzzer to an Arduino and program it to play simple tunes.', diff:'★☆☆☆',
      parts:['1× Arduino Uno','1× Piezo buzzer (passive)','1× Breadboard','Jumper wires','Optional: 4× push buttons'],
      steps:[
        {num:1,color:'#10b981',title:'What is Sound?',desc:'Sound is vibrations in air. The buzzer vibrates when electricity switches on and off rapidly. The FASTER it vibrates, the HIGHER the sound. We control this with tone() in Arduino.',tip:'🎓 PHYSICS LINK: Frequency = vibrations per second. Middle C = 262 Hz. A higher note = more Hz. Connects to your Science curriculum!'},
        {num:2,color:'#3b82f6',title:'Wire the Buzzer',desc:'Connect the + pin of the buzzer to Arduino Pin 8. Connect the - pin to GND. That\'s it! The buzzer does not need a resistor.',tip:'📌 WHICH PIN IS +? Usually the longer pin, or labeled + on the buzzer. If sound is wrong, try flipping it around.'},
        {num:3,color:'#f59e0b',title:'Play Your First Note',desc:'tone(8, 262) plays middle C. noTone(8) stops the sound. delay() controls how long the note plays. Load the starter code and listen!',tip:'🎵 NOTE FREQUENCIES: 262=C, 294=D, 330=E, 349=F, 392=G, 440=A, 494=B, 523=High C. Students can figure out which song to recreate!'},
        {num:4,color:'#a855f7',title:'Program a Song',desc:'Try to program "Happy Birthday" or the Ghana national anthem intro. Plan it on paper first — write each note name then look up its frequency.',tip:'🎼 CREATIVE CHALLENGE: Give students paper to write a short melody, then program it. Cross-curricular: art + coding + music!'},
        {num:5,color:'#ef4444',title:'Add Button Control',desc:'Add 4 push buttons, each playing a different note when pressed. Now students can "play" the robot like an instrument! Demonstrates INPUT → PROCESSING → OUTPUT.',tip:'🎹 EXTENSION: Program a drum beat using different buzzers. Create a robot band!'},
      ],
      code:'// Musical Robot — plays Twinkle Twinkle\n#define C4  262\n#define D4  294\n#define E4  330\n#define F4  349\n#define G4  392\n#define A4  440\n#define C5  523\n\nint buzzerPin = 8;\nint melody[] = {C4,C4,G4,G4,A4,A4,G4,F4,F4,E4,E4,D4,D4,C4};\nint beats[]  = {1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2};\n\nvoid setup() { pinMode(buzzerPin, OUTPUT); }\n\nvoid loop() {\n  for (int i = 0; i < 14; i++) {\n    int duration = beats[i] * 300;\n    tone(buzzerPin, melody[i], duration);\n    delay(duration + 50);\n    noTone(buzzerPin);\n  }\n  delay(1000);\n}' },
  ],
  intermediate: [
    { id:'rp4', emoji:'🔍', color:'#3b82f6', name:'Obstacle-Avoiding Robot (Arduino)', tags:['Arduino','Ultrasonic','Motor Driver','Grade 6-8'], desc:'Build a fully autonomous Arduino robot that drives around and avoids obstacles using an ultrasonic sensor. This is real robotics engineering!', diff:'★★★☆',
      parts:['1× Arduino Uno','1× L298N Motor Driver Module','2× DC motors with wheels','1× HC-SR04 Ultrasonic Sensor','1× 9V battery + connector','1× Servo motor (SG90)','1× Robot chassis','Breadboard and jumper wires'],
      steps:[
        {num:1,color:'#10b981',title:'Understand the Ultrasonic Sensor',desc:'The HC-SR04 sends out sound waves at 40,000 Hz. They bounce off obstacles and come back. We measure the TIME it takes to return. Distance = Speed × Time. Speed of sound = 343 m/s.',tip:'🦇 FUN FACT: Bats use EXACTLY this technique to navigate in the dark — echolocation! Your robot is doing the same thing.'},
        {num:2,color:'#3b82f6',title:'Understanding the L298N Motor Driver',desc:'Arduino pins can only provide 40mA — not enough to power motors (which need 200-600mA). The L298N amplifies the small Arduino signal to drive the big motor. IN1/IN2 = motor 1 direction, IN3/IN4 = motor 2, ENA/ENB = speed (PWM).',tip:'⚡ IMPORTANT: The L298N needs its own power supply (not the Arduino 5V pin). Use the 9V battery connected to the L298N 12V and GND terminals.'},
        {num:3,color:'#f59e0b',title:'Wire Everything Together',desc:'L298N: IN1→Pin4, IN2→Pin5, IN3→Pin6, IN4→Pin7, ENA→Pin9, ENB→Pin10. HC-SR04: VCC→5V, GND→GND, Trig→Pin12, Echo→Pin11. Servo: Signal→Pin3, VCC→5V, GND→GND.',tip:'🔴 SAFETY: Always double-check polarity (+ and -) before connecting power. Wrong polarity can damage components. Teacher should verify wiring before students power on.'},
        {num:4,color:'#a855f7',title:'Program Obstacle Avoidance',desc:'The logic: 1) Measure distance ahead. 2) If distance < 25cm — STOP. 3) Use servo to scan left and right. 4) Turn toward the side with MORE space. 5) Drive forward again. This is the fundamental sense-think-act robot control loop!',tip:'🤖 ROBOT THINKING: This sense-think-act loop is the same logic used in a Mars Rover! Students are implementing real robotics concepts.'},
        {num:5,color:'#ef4444',title:'Test, Debug and Improve',desc:'Test in an open space first. Common issues: robot turns wrong way (swap motor wires), ignores obstacles (check sensor wiring), jerky movement (adjust delays). Debugging is a critical skill!',tip:'🔬 DEBUGGING METHOD: Test ONE component at a time. Does the sensor work? (Print readings to Serial Monitor). Do motors work? (Test without sensor code). Isolation is key!'},
      ],
      code:'#include <Servo.h>\nServo myServo;\nint IN1=4,IN2=5,IN3=6,IN4=7,ENA=9,ENB=10;\nint trigPin=12,echoPin=11;\n\nlong measureDistance() {\n  digitalWrite(trigPin,LOW); delayMicroseconds(2);\n  digitalWrite(trigPin,HIGH); delayMicroseconds(10);\n  digitalWrite(trigPin,LOW);\n  return pulseIn(echoPin,HIGH) * 0.034 / 2;\n}\n\nvoid moveForward() {\n  digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW);\n  digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW);\n  analogWrite(ENA,180);analogWrite(ENB,180);\n}\nvoid stopMotors() {\n  digitalWrite(IN1,LOW);digitalWrite(IN2,LOW);\n  digitalWrite(IN3,LOW);digitalWrite(IN4,LOW);\n}\n\nvoid setup() {\n  myServo.attach(3); myServo.write(90);\n  pinMode(IN1,OUTPUT);pinMode(IN2,OUTPUT);\n  pinMode(IN3,OUTPUT);pinMode(IN4,OUTPUT);\n  pinMode(trigPin,OUTPUT);pinMode(echoPin,INPUT);\n}\n\nvoid loop() {\n  long dist = measureDistance();\n  if(dist > 25) { moveForward(); }\n  else {\n    stopMotors();\n    myServo.write(0); delay(500);\n    long leftDist = measureDistance();\n    myServo.write(180); delay(500);\n    long rightDist = measureDistance();\n    myServo.write(90); delay(300);\n    if(rightDist > leftDist) {\n      // Turn right\n      digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW);\n      digitalWrite(IN3,LOW);digitalWrite(IN4,HIGH);\n    } else {\n      // Turn left\n      digitalWrite(IN1,LOW);digitalWrite(IN2,HIGH);\n      digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW);\n    }\n    delay(500); stopMotors();\n  }\n}' },
    { id:'rp5', emoji:'📏', color:'#10b981', name:'Line Following Robot', tags:['Arduino','IR Sensors','PWM','Grade 6-8'], desc:'Build a robot that follows a black line on a white surface. Same technology used in warehouse robots and automated factories!', diff:'★★★☆',
      parts:['1× Arduino Uno','1× L298N Motor Driver','2× DC motors + wheels','2× IR sensor modules (TCRT5000)','1× Chassis/base plate','9V battery','Black electrical tape','White cardboard or floor'],
      steps:[
        {num:1,color:'#10b981',title:'How IR Sensors Work',desc:'IR sensors send out invisible infrared light. WHITE surfaces REFLECT most light back — sensor reads LOW. BLACK surfaces ABSORB most light — sensor reads HIGH. Two sensors under the robot tell us if we are on or off the line.',tip:'🔦 DEMONSTRATE: Shine a phone torch on black paper vs white paper. Black absorbs more, white reflects more. Same principle with infrared!'},
        {num:2,color:'#3b82f6',title:'Build the Track First',desc:'Before building the robot, create the test track! Use black electrical tape on white cardboard to make a smooth oval with gentle curves. Make the track at least 5cm wide.',tip:'🛣️ TRACK TIPS: Avoid sharp 90-degree turns for beginners. Make the oval big (at least 1m × 0.5m). Use matte surfaces — shiny surfaces confuse IR sensors.'},
        {num:3,color:'#f59e0b',title:'Mount Sensors Under the Robot',desc:'Attach the two IR sensors to the FRONT BOTTOM of the robot, about 2-3cm apart, pointing DOWN at the floor. When the robot is centred on the line, both sensors are on white. They flip when the robot drifts off.',tip:'📐 MOUNTING HEIGHT: Mount sensors 3-5mm above the floor. Too high = cannot detect line. Too low = scrapes floor. Use the adjustable potentiometer on the sensor to fine-tune sensitivity.'},
        {num:4,color:'#a855f7',title:'Program the Line Following Logic',desc:'Four sensor states: Both WHITE → go forward. Left BLACK, right white → turn left. Right BLACK, left white → turn right. Both BLACK → go forward. This simple if-else logic makes the robot self-correcting!',tip:'🧠 CONTROL THEORY: This is a basic feedback control system. The robot continuously corrects itself based on sensor feedback. Self-driving cars use much more complex versions of this same idea!'},
        {num:5,color:'#ef4444',title:'Tune and Race!',desc:'Adjust motor speeds until the robot follows the line smoothly. Increase speed gradually. Challenge: who can build the fastest line follower? Engineering is iterative — test, adjust, test again!',tip:'🏆 COMPETITION IDEA: Organise a line-following race! Real robotics competitions like WRO (World Robot Olympiad) have exactly this challenge.'},
      ],
      code:'// Line Following Robot\nint leftSensor=2, rightSensor=3;\nint IN1=4,IN2=5,IN3=6,IN4=7,ENA=9,ENB=10;\n\nvoid setup() {\n  pinMode(leftSensor,INPUT);\n  pinMode(rightSensor,INPUT);\n  pinMode(IN1,OUTPUT);pinMode(IN2,OUTPUT);\n  pinMode(IN3,OUTPUT);pinMode(IN4,OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  int L = digitalRead(leftSensor);\n  int R = digitalRead(rightSensor);\n  \n  if(L==LOW && R==LOW) {\n    // Both on white — drive straight\n    analogWrite(ENA,150); analogWrite(ENB,150);\n    digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW);\n    digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW);\n  } else if(L==HIGH && R==LOW) {\n    // Drifted right — turn left\n    analogWrite(ENA,80); analogWrite(ENB,150);\n    digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW);\n    digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW);\n  } else if(L==LOW && R==HIGH) {\n    // Drifted left — turn right\n    analogWrite(ENA,150); analogWrite(ENB,80);\n    digitalWrite(IN1,HIGH);digitalWrite(IN2,LOW);\n    digitalWrite(IN3,HIGH);digitalWrite(IN4,LOW);\n  }\n}' },
  ],
  advanced: [
    { id:'rp6', emoji:'🦾', color:'#f59e0b', name:'Robotic Arm with Servo Control', tags:['Arduino','Servo Motors','Potentiometer','Grade 8-9'], desc:'Build a 3-joint robotic arm controlled by potentiometers. The foundation of industrial robot arms!', diff:'★★★★',
      parts:['1× Arduino Uno','3× SG90 Servo motors','3× 10kΩ Potentiometers','1× External 5V power supply (at least 2A)','Cardboard or 3D-printed arm links','Screws and standoffs','Breadboard and wires'],
      steps:[
        {num:1,color:'#10b981',title:'Degrees of Freedom (DOF)',desc:'A robot arm\'s "degrees of freedom" is how many independent ways it can move. Human arm: 7 DOF. Our project: 3 DOF (base rotation, elbow, wrist). Industrial arms typically have 6 DOF to reach any point in 3D space.',tip:'🤖 DEMONSTRATE: Ask students to pick up a pen with only their elbow joint (1 DOF). Impossible! With shoulder too (2 DOF). Getting better. All three joints (3 DOF). This shows WHY DOF matters!'},
        {num:2,color:'#3b82f6',title:'Build the Arm Structure',desc:'Design: BASE (rotates 0-180°) → LOWER ARM (tilts 0-180°) → UPPER ARM (tilts 0-90°). Mount Servo 1 at base, Servo 2 at shoulder, Servo 3 at elbow. Use cardboard or 3D-printed brackets.',tip:'📐 DESIGN TIP: Keep arm segments short at first (10-15cm each). Longer arms create more torque on motors — small servos struggle.'},
        {num:3,color:'#f59e0b',title:'Potentiometer Control',desc:'A potentiometer is a variable resistor — turn it and resistance changes from 0 to 10kΩ. Arduino reads this as 0-1023 on analogRead(). We map this to 0-180° for servo position. This is how PlayStation joysticks work!',tip:'🎮 REAL WORLD: Every joystick and analog controller uses potentiometers! The Arduino analogRead() samples the voltage divider.'},
        {num:4,color:'#a855f7',title:'Implement Smooth Motion',desc:'Instead of jumping directly to a position, move in small steps — 1 degree at a time with a small delay. This prevents jerky motion and protects gears from sudden stress.',tip:'⚙️ ENGINEERING: Smooth acceleration and deceleration (trapezoidal velocity profile) is standard in industrial robotics. Your students are learning real control engineering!'},
        {num:5,color:'#ef4444',title:'Record and Replay Movements',desc:'Add arrays to store arm positions as you move it. When finished, play back the sequence automatically. This is exactly how welding robots are programmed in car factories!',tip:'🏭 FACTORY INSIGHT: This "teach and repeat" programming is used in 90% of factory robots worldwide. Students who understand this can get real robotics engineering jobs!'},
      ],
      code:'#include <Servo.h>\nServo s1, s2, s3;\nint p1=A0,p2=A1,p3=A2;\nint a1=90,a2=90,a3=90;\n\nvoid setup() {\n  s1.attach(9); s2.attach(10); s3.attach(11);\n  s1.write(90); s2.write(90); s3.write(90);\n  delay(1000); Serial.begin(9600);\n}\n\nvoid moveSmooth(Servo &s, int &cur, int target) {\n  if(cur < target) for(int i=cur;i<=target;i++){s.write(i);delay(15);}\n  else for(int i=cur;i>=target;i--){s.write(i);delay(15);}\n  cur = target;\n}\n\nvoid loop() {\n  int t1=map(analogRead(p1),0,1023,0,180);\n  int t2=map(analogRead(p2),0,1023,0,180);\n  int t3=map(analogRead(p3),0,1023,0,90);\n  if(abs(t1-a1)>2) moveSmooth(s1,a1,t1);\n  if(abs(t2-a2)>2) moveSmooth(s2,a2,t2);\n  if(abs(t3-a3)>2) moveSmooth(s3,a3,t3);\n}' },
  ],
  pro: [
    { id:'rp7', emoji:'🧠', color:'#a855f7', name:'AI Vision Robot — Object Detector', tags:['Raspberry Pi','OpenCV','Python','JHS 3+'], desc:'Build a robot that uses a camera and AI to identify objects and colours, then drives toward or away from them. Real computer vision and machine learning!', diff:'★★★★',
      parts:['1× Raspberry Pi 4 (or Pi Zero 2W)','1× Pi Camera Module v2','1× Robot chassis with 2 DC motors','1× L298N Motor Driver','USB power bank (5V, 2.4A)','MicroSD card (32GB)','Pi GPIO header and wires'],
      steps:[
        {num:1,color:'#10b981',title:'Raspberry Pi vs Arduino',desc:'Arduino is a MICROCONTROLLER — simple, runs one program, no operating system. Raspberry Pi is a MINI COMPUTER — runs Linux, can multitask, has WiFi, can process camera images with Python. For AI vision, we need Pi.',tip:'🧠 ANALOGY: Arduino is like a specialist worker — does one thing very well. Raspberry Pi is like a manager with a laptop — handles complex decisions and coordinates many tasks.'},
        {num:2,color:'#3b82f6',title:'Set Up OpenCV on Raspberry Pi',desc:'OpenCV (Open Source Computer Vision) is a library for processing images. Install: sudo apt update && sudo apt install python3-opencv. OpenCV can detect edges, colours, faces, objects, and motion in real-time.',tip:'💻 FOR TEACHERS: Set up one Pi as a demo if you do not have a class set. Screen-share via VNC to show computer vision working. Students can try the code without individual hardware.'},
        {num:3,color:'#f59e0b',title:'Colour Detection Program',desc:'OpenCV works in HSV (Hue, Saturation, Value) colour space for easier colour detection. To detect red: create lower and upper HSV range, create a "mask" where red pixels = white and others = black. Count white pixels — if enough, the robot "sees" red!',tip:'🎨 HSV vs RGB: HSV is MUCH better for colour detection because lighting changes value but keeps hue similar. HSV separates colour (Hue) from brightness (Value).'},
        {num:4,color:'#a855f7',title:'Connect Vision to Movement',desc:'Divide the camera image into three vertical zones: left, centre, right. If detected object is in left zone → turn left. If centre → drive forward. If right → turn right. This is called visual servoing!',tip:'🚗 SELF-DRIVING LINK: Tesla Autopilot and many self-driving cars use the same concept! Camera sees lane markings → decides turn/straight.'},
        {num:5,color:'#ef4444',title:'Add Object Classification with TensorFlow Lite',desc:'TensorFlow Lite can run a pre-trained model on Pi to identify objects (person, bottle, phone, dog). Download MobileNet SSD model → run inference on each camera frame → get class name + confidence. Now your robot says "I see a person with 87% confidence!"',tip:'🌍 CAREER LINK: Edge AI (running AI on small devices without internet) is the fastest-growing field in tech. Embedded AI engineers are highly sought in robotics, autonomous vehicles, and IoT.'},
      ],
      code:'import cv2\nimport numpy as np\nimport RPi.GPIO as GPIO\nimport time\n\nIN1,IN2,IN3,IN4 = 17,18,22,23\nENA,ENB = 24,25\nGPIO.setmode(GPIO.BCM)\nfor pin in [IN1,IN2,IN3,IN4,ENA,ENB]:\n    GPIO.setup(pin,GPIO.OUT)\npwmA=GPIO.PWM(ENA,100); pwmB=GPIO.PWM(ENB,100)\npwmA.start(0); pwmB.start(0)\n\ndef drive(left,right):\n    GPIO.output(IN1,GPIO.HIGH if left>0 else GPIO.LOW)\n    GPIO.output(IN2,GPIO.LOW if left>0 else GPIO.HIGH)\n    GPIO.output(IN3,GPIO.HIGH if right>0 else GPIO.LOW)\n    GPIO.output(IN4,GPIO.LOW if right>0 else GPIO.HIGH)\n    pwmA.ChangeDutyCycle(abs(left))\n    pwmB.ChangeDutyCycle(abs(right))\n\ncap = cv2.VideoCapture(0)\nwhile True:\n    ret,frame = cap.read()\n    if not ret: break\n    hsv = cv2.cvtColor(frame,cv2.COLOR_BGR2HSV)\n    lower_red=np.array([0,120,70])\n    upper_red=np.array([10,255,255])\n    mask=cv2.inRange(hsv,lower_red,upper_red)\n    h,w = frame.shape[:2]\n    lz=np.sum(mask[:,:w//3])\n    mz=np.sum(mask[:,w//3:2*w//3])\n    rz=np.sum(mask[:,2*w//3:])\n    if mz>10000: drive(60,60)\n    elif lz>5000: drive(30,70)\n    elif rz>5000: drive(70,30)\n    else: drive(40,-40)\n    time.sleep(0.05)' },
  ],
};

const LEVEL_DATA: Record<Level, {label:string;color:string;bg:string;icon:string;desc:string;grade:string}> = {
  beginner:     {label:'Beginner',     color:'#10b981',icon:'🌱',bg:'from-green-500 to-emerald-600',   desc:'Perfect for starters',          grade:'Grade 1–4'},
  intermediate: {label:'Intermediate', color:'#3b82f6',icon:'⚡',bg:'from-blue-500 to-cyan-600',      desc:'Building real skills',           grade:'Grade 5–7'},
  advanced:     {label:'Advanced',     color:'#f59e0b',icon:'🔥',bg:'from-amber-500 to-orange-600',   desc:'Challenge yourself',             grade:'Grade 8–9'},
  pro:          {label:'Pro / Expert', color:'#ef4444',icon:'💎',bg:'from-red-500 to-rose-600',       desc:'Professional level',             grade:'JHS 3+'},
};

const MODE_DATA = {
  coding:   {title:'Computer Programming Arena', icon:'💻', subtitle:'Code your way to the top', color:'#06b6d4', musicCat:'coding'  as const},
  robotics: {title:'Robotics Engineering Arena',  icon:'🤖', subtitle:'Build the future with robots', color:'#a855f7', musicCat:'robotics' as const},
};

export default function CodingArena({ onBack, mode }: Props) {
  const [phase,       setPhase]       = useState<Phase>('setup');
  const [level,       setLevel]       = useState<Level>('beginner');
  const [questions,   setQuestions]   = useState<Question[]>([]);
  const [qIndex,      setQIndex]      = useState(0);
  const [selected,    setSelected]    = useState<number|null>(null);
  const [showResult,  setShowResult]  = useState(false);
  const [score,       setScore]       = useState(0);
  const [xp,          setXp]          = useState(0);
  const [correct,     setCorrect]     = useState(0);
  const [combo,       setCombo]       = useState(0);
  const [bestCombo,   setBestCombo]   = useState(0);
  const [timeLeft,    setTimeLeft]    = useState(30);
  const [badges,      setBadges]      = useState<string[]>([]);
  const [showParticle,setShowParticle]= useState(false);
  const [newBadge,    setNewBadge]    = useState<string|null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);

  // Learn tab state
  const [mainTab,     setMainTab]     = useState<MainTab>('learn');
  const [learnSec,    setLearnSec]    = useState<LearnSection>('lessons');
  const [learnLevel,  setLearnLevel]  = useState<Level>('beginner');
  const [openLesson,  setOpenLesson]  = useState<string|null>(null);
  const [openProject, setOpenProject] = useState<string|null>(null);

  const mData  = MODE_DATA[mode];
  const lData  = LEVEL_DATA[level];
  const bank   = mode === 'coding' ? CODING_QUESTIONS : ROBOTICS_QUESTIONS;
  const curQ   = questions[qIndex];

  useEffect(() => {
    soundEngine.startBgMusic(mData.musicCat);
    return () => soundEngine.stopBgMusic();
  }, []);

  useEffect(() => {
    if (phase !== 'playing' || showResult) return;
    if (timeLeft <= 0) { handleSelect(-1); return; }
    if (timeLeft <= 5) soundEngine.timerTick();
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, phase, showResult]);

  const startGame = () => {
    const pool = [...bank[level]].sort(() => Math.random() - 0.5);
    setQuestions(pool);
    setQIndex(0); setScore(0); setXp(0); setCorrect(0);
    setCombo(0); setBestCombo(0); setBadges([]);
    setSelected(null); setShowResult(false);
    setPhase('playing');
    setTimeLeft(30);
    soundEngine.click();
  };

  const handleSelect = (idx: number) => {
    if (showResult) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setSelected(idx);
    setShowResult(true);
    const isCorrect = idx === curQ.correct;
    if (isCorrect) {
      soundEngine.codeSuccess();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setBestCombo(b => Math.max(b, newCombo));
      if (newCombo >= 3) soundEngine.combo(newCombo);
      if (newCombo >= 5) { soundEngine.hype(); setShowParticle(true); setTimeout(() => setShowParticle(false), 900); }
      const pts = curQ.xp * (newCombo >= 5 ? 2 : newCombo >= 3 ? 1.5 : 1);
      setScore(s => s + Math.floor(pts));
      setXp(x => x + curQ.xp);
      setCorrect(c => c + 1);
      if (curQ.badge) {
        setBadges(b => [...b, curQ.badge!]);
        setNewBadge(curQ.badge!);
        soundEngine.achievementUnlock();
        setTimeout(() => setNewBadge(null), 2500);
      }
    } else {
      soundEngine.wrong();
      setCombo(0);
    }
    setTimeout(() => {
      if (qIndex >= questions.length - 1) {
        setPhase('results');
        soundEngine.startBgMusic('victory');
        soundEngine.victory();
      } else {
        setQIndex(i => i + 1);
        setSelected(null);
        setShowResult(false);
        setTimeLeft(30);
      }
    }, isCorrect ? 2000 : 2500);
  };

  const COLORS = ['#E21B3C','#1368CE','#26890C','#FFA602'];
  const ICONS  = ['▲','◆','●','■'];
  const acc    = questions.length > 0 ? Math.round((correct / Math.min(qIndex + 1, questions.length)) * 100) : 0;


  // ── LEARN TAB HELPERS ──
  const learnLessons = mode === 'coding' ? CODING_LESSONS[learnLevel] : [];
  const learnProjects = mode === 'robotics' ? ROBOTICS_PROJECTS[learnLevel] : [];

  // ── SETUP / LEARN ──
  if (phase === 'setup') return (
    <div className="min-h-screen bg-[#070b18] overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">← Back</button>
          <MusicPlayer category={mData.musicCat} compact />
        </div>
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">{mData.icon}</div>
          <h1 className="text-2xl font-black text-white mb-1" style={{textShadow:`0 0 30px ${mData.color}60`}}>{mData.title}</h1>
          <p className="text-white/40 text-sm">{mData.subtitle}</p>
        </div>

        {/* Main Tabs */}
        <div className="flex gap-2 mb-5 bg-white/5 rounded-2xl p-1.5">
          {(['learn','quiz'] as MainTab[]).map(t => (
            <button key={t} onClick={() => setMainTab(t)}
              className={`flex-1 py-2.5 rounded-xl font-black text-sm transition-all ${mainTab===t ? 'bg-white/12 text-white' : 'text-white/35 hover:text-white/60'}`}>
              {t === 'learn' ? '📚 Learn First' : '🎮 Quiz'}
            </button>
          ))}
        </div>

        {/* ── LEARN TAB ── */}
        {mainTab === 'learn' && (<>
          {mode === 'robotics' && (
            <div className="flex gap-2 mb-4">
              {(['lessons','projects'] as LearnSection[]).map(s => (
                <button key={s} onClick={() => setLearnSec(s)}
                  className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all border ${learnSec===s ? 'text-white border-white/20 bg-white/10' : 'text-white/35 border-white/6 hover:text-white/60'}`}>
                  {s === 'lessons' ? '📖 Theory' : '🔧 Projects'}
                </button>
              ))}
            </div>
          )}
          <div className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">Choose Level</div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(Object.entries(LEVEL_DATA) as [Level, typeof LEVEL_DATA[Level]][]).map(([lvl, ld]) => (
              <button key={lvl} onClick={() => { setLearnLevel(lvl); setOpenLesson(null); setOpenProject(null); }}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${learnLevel===lvl ? 'scale-[1.02]' : 'opacity-55 hover:opacity-80'}`}
                style={{ borderColor: learnLevel===lvl ? ld.color : ld.color+'25', background: learnLevel===lvl ? ld.color+'15' : ld.color+'06' }}>
                <span className="text-xl">{ld.icon}</span>
                <div><div className="text-white font-black text-xs">{ld.label}</div><div className="text-white/35 text-xs">{ld.grade}</div></div>
              </button>
            ))}
          </div>

          {/* CODING LESSONS */}
          {mode === 'coding' && (
            <div className="space-y-2">
              {learnLessons.map((lesson, idx) => {
                const ld = LEVEL_DATA[learnLevel];
                const isOpen = openLesson === lesson.id;
                const gradients = [
                  'from-purple-600/20 to-indigo-600/20','from-blue-600/20 to-cyan-600/20',
                  'from-green-600/20 to-emerald-600/20','from-orange-600/20 to-amber-600/20',
                  'from-pink-600/20 to-rose-600/20','from-teal-600/20 to-cyan-600/20',
                ];
                const grad = gradients[idx % gradients.length];
                return (
                  <div key={lesson.id} className="rounded-2xl overflow-hidden shadow-lg border border-white/10 transition-all hover:border-white/20"
                    style={{background:'linear-gradient(135deg,#13132a,#1a1a35)'}}>
                    {/* Card Header */}
                    <button onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                      className={`w-full text-left transition-all bg-gradient-to-r ${grad} hover:brightness-110`}>
                      <div className="flex items-center gap-4 p-4">
                        {/* Number badge */}
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg"
                          style={{background:ld.color,boxShadow:`0 4px 14px ${ld.color}50`}}>
                          {idx+1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/15 text-white/60">{lesson.tag}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:ld.color+'30',color:ld.color}}>{ld.label}</span>
                          </div>
                          <div className="text-white font-black text-base">{lesson.title}</div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen?'bg-white/20 rotate-90':'bg-white/8'}`}>
                          <span className="text-white/60 text-lg leading-none">›</span>
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-5 space-y-4 border-t border-white/8">
                        {/* Explanation */}
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/8">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">📖</span>
                            <span className="text-white font-black text-sm">What is it?</span>
                          </div>
                          <p className="text-white/75 text-sm leading-relaxed">{lesson.explain}</p>
                        </div>

                        {/* Analogy card */}
                        <div className="rounded-2xl p-4 border-l-4" style={{background:'#f59e0b12',borderColor:'#f59e0b'}}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">💡</span>
                            <span className="text-amber-300 font-black text-sm">Real-World Analogy</span>
                          </div>
                          <p className="text-amber-100/70 text-sm leading-relaxed">{lesson.analogy}</p>
                        </div>

                        {/* Concepts grid */}
                        {lesson.concepts && lesson.concepts.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg">🧩</span>
                              <span className="text-white font-black text-sm">Key Concepts</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {lesson.concepts.map((con, ci) => (
                                <div key={ci} className="bg-white/5 hover:bg-white/8 border border-white/8 rounded-xl p-3 transition-all">
                                  <div className="text-2xl mb-2">{con.emoji}</div>
                                  <div className="text-white font-black text-xs mb-1">{con.name}</div>
                                  <div className="text-white/50 text-xs leading-snug">{con.desc}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Code block */}
                        {lesson.code && (
                          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a35] border-b border-white/8">
                              <div className="flex gap-1.5 items-center">
                                <div className="w-3 h-3 rounded-full bg-red-500"/>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                                <div className="w-3 h-3 rounded-full bg-green-500"/>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-white/30 text-xs font-mono">{lesson.tag}</span>
                                <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full">💻 Code</span>
                              </div>
                            </div>
                            <div className="bg-[#0d1117] p-4 overflow-x-auto">
                              <pre className="font-mono text-sm leading-relaxed text-green-300 whitespace-pre-wrap">{lesson.code}</pre>
                            </div>
                          </div>
                        )}

                        {/* Output */}
                        {lesson.output && (
                          <div className="rounded-2xl overflow-hidden border border-green-500/20">
                            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-900/30 border-b border-green-500/15">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                              <span className="text-green-400 text-xs font-black">▶ OUTPUT</span>
                            </div>
                            <div className="bg-[#0a1a0a] p-4">
                              <pre className="text-green-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">{lesson.output}</pre>
                            </div>
                          </div>
                        )}

                        {/* CTA button */}
                        <button onClick={() => setMainTab('quiz')}
                          className="w-full py-3 rounded-xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                          style={{background:`linear-gradient(135deg,${ld.color},${ld.color}90)`,boxShadow:`0 4px 14px ${ld.color}40`}}>
                          🎮 Test Your Knowledge — Take the Quiz!
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ROBOTICS PROJECTS */}
          {mode === 'robotics' && learnSec === 'projects' && (
            <div className="space-y-3">
              {learnProjects.map(project => {
                const isOpen = openProject === project.id;
                return (
                  <div key={project.id} className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
                    <button onClick={() => setOpenProject(isOpen ? null : project.id)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/5 transition-all">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                        style={{ background: project.color+'15', border: `2px solid ${project.color}30` }}>{project.emoji}</div>
                      <div className="flex-1">
                        <div className="text-white font-black text-sm mb-1">{project.name}</div>
                        <div className="flex gap-1 flex-wrap mb-1">
                          {project.tags.map(t => (
                            <span key={t} className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: project.color+'18', color: project.color }}>{t}</span>
                          ))}
                          <span className="text-xs text-white/30 font-bold">{project.diff}</span>
                        </div>
                        <div className="text-white/40 text-xs leading-snug">{project.desc}</div>
                      </div>
                      <span className="text-white/30 text-xl flex-shrink-0" style={{ transform: isOpen ? 'rotate(90deg)' : '' }}>›</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 border-t border-white/8 pt-3 space-y-3">
                        <div className="bg-white/5 rounded-xl p-3">
                          <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-2">🛒 Parts You Need</div>
                          {project.parts.map((part, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/65 py-1 border-b border-white/5 last:border-0">
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />{part}
                            </div>
                          ))}
                        </div>
                        <div className="text-white font-black text-sm mb-2">📋 Step-by-Step Build Guide</div>
                        <div className="space-y-3">
                          {project.steps.map((step, si) => (
                            <div key={si} className="flex gap-3">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5"
                                style={{ background: step.color+'22', color: step.color, border: `1.5px solid ${step.color}50` }}>{step.num}</div>
                              <div className="flex-1">
                                <div className="text-white font-black text-xs mb-1">{step.title}</div>
                                <div className="text-white/55 text-xs leading-relaxed mb-1.5">{step.desc}</div>
                                <div className="bg-amber-500/8 border border-amber-500/18 rounded-lg px-2.5 py-1.5 text-amber-300/80 text-xs leading-relaxed">{step.tip}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-2 bg-white/4 border-b border-white/6">
                            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/></div>
                            <span className="text-white/30 text-xs font-bold uppercase">Code</span>
                          </div>
                          <pre className="p-3 font-mono text-xs text-green-300 overflow-x-auto leading-relaxed">{project.code}</pre>
                        </div>
                        <button onClick={() => setMainTab('quiz')}
                          className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all hover:bg-white/10"
                          style={{ borderColor: mData.color+'50', color: mData.color }}>Test your knowledge → Quiz</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ROBOTICS THEORY — level specific */}
          {mode === 'robotics' && learnSec === 'lessons' && (() => {
            const theoryByLevel: Record<Level, {icon:string;title:string;body:string;analogy:string}[]> = {
              beginner: [
                {icon:'🤖',title:'What is a Robot?',body:'A robot is a machine that can perform tasks automatically, programmed by humans. All robots have three core parts: SENSORS (perceive the world), a BRAIN (microcontroller/computer that decides), and ACTUATORS (motors/servos that take action). These three always work together.',analogy:'🏫 ANALOGY: A robot is like a person — it has eyes and ears (sensors), a brain (computer), and arms and legs (motors). The key difference? You have to write the instructions for the robot brain!'},
                {icon:'📡',title:'Sensors — The Robot Senses',body:'Sensors detect the environment. Ultrasonic sensors measure distance (like bat echolocation). IR sensors detect infrared light (used for line following). Touch sensors detect physical contact. Light sensors measure brightness. Temperature sensors measure heat.',analogy:'🔦 TEACHER TIP: Ask students "What senses do humans have?" Then map each to a robot sensor: Sight → camera. Hearing → microphone. Touch → touch sensor. Balance → gyroscope.'},
                {icon:'⚙️',title:'Actuators — Making Things Move',body:'Actuators convert electricity into movement. DC Motors spin continuously and are used for wheels. Servo Motors rotate to precise angles and are used for robot arms and steering. Every time a robot moves, waves, or spins — an actuator is doing the work.',analogy:'💪 MUSCLE ANALOGY: If sensors are the senses and the microcontroller is the brain, actuators are the muscles. Without actuators, a robot can think but cannot act!'},
                {icon:'🧠',title:'Microcontrollers — The Robot Brain',body:'A microcontroller is a tiny computer on a single chip. Arduino Uno is the most popular beginner board — simple, affordable, with a huge community. It reads sensor inputs, runs your code, and controls outputs like motors and LEDs.',analogy:'📱 ANALOGY: A Raspberry Pi is like a very small smartphone without a screen. An Arduino is like a much simpler microchip, similar to what is inside a washing machine or microwave.'},
                {icon:'⚡',title:'Power and Circuits — Basics',body:'All robot components need electricity. Current flows from + (positive) to − (GND/negative). Voltage (V) is the electrical pressure that pushes current through the circuit. Resistors limit current to protect components. Always use a resistor with an LED or it will burn out instantly!',analogy:'🌊 WATER ANALOGY: Electricity is like water in pipes. Voltage = water pressure. Current = flow rate. A resistor = a narrow pipe section that slows flow. This analogy works perfectly for beginners!'},
              ],
              intermediate: [
                {icon:'📻',title:'PWM — Controlling Speed and Brightness',body:'PWM (Pulse Width Modulation) controls average power by rapidly switching a signal ON and OFF. A 50% duty cycle means ON half the time. Higher duty cycle = more average power = faster motor or brighter LED. Arduino uses analogWrite(pin, 0–255) for PWM output.',analogy:'💡 DIMMER SWITCH ANALOGY: A light dimmer switches current on and off so fast you cannot see it flicker — the bulb just appears dimmer. Your motor controller does exactly the same thing, controlling speed without wasting energy as heat.'},
                {icon:'🔌',title:'The L298N Motor Driver — Why We Need It',body:'Arduino Uno pins can only supply 40mA of current — not enough for a DC motor (which needs 200–600mA). The L298N H-Bridge motor driver amplifies: the Arduino sends a small control signal and the L298N delivers the full current from the battery to the motors. IN1/IN2 control direction; ENA controls speed via PWM.',analogy:'🏗️ FOREMAN ANALOGY: The Arduino is a foreman giving orders. The L298N is the construction crew doing heavy lifting. The foreman cannot carry bricks himself — he directs workers who have the muscle (current) for the job.'},
                {icon:'📐',title:'Servo Motors — Precise Angle Control',body:'Unlike DC motors which spin continuously, servo motors rotate to a specific angle (0–180 degrees) and hold that position using built-in feedback. Arduino controls them with the Servo library: servo.write(90) moves to centre. Ideal for robot arms, steering, and grippers.',analogy:'🎯 CLOCKHAND ANALOGY: A DC motor is like a spinning wheel that keeps going. A servo is like a clock hand that you can command to point exactly at 3 o\'clock, then 9 o\'clock. Precision on demand!'},
                {icon:'📏',title:'IR Sensors — The Line Following Principle',body:'IR sensors emit invisible infrared light and measure reflection. White surfaces reflect most IR back → sensor output is LOW. Black surfaces absorb IR → sensor output is HIGH. Two sensors under a robot detect whether it has drifted left or right of a line — enabling self-correcting navigation.',analogy:'🏃 TIGHTROPE ANALOGY: Imagine walking a tightrope blindfolded but with two fingers touching the rope. If your left finger slips off, you step left. If your right finger slips off, you step right. The two IR sensors are exactly those two fingers!'},
                {icon:'🔁',title:'Encoders — Measuring Motor Rotation',body:'An encoder attached to a motor shaft counts how many times the shaft rotates or fractions of a rotation. This tells the microcontroller exactly how far a wheel has turned, enabling precise distance control. Essential for dead-reckoning navigation and any task requiring exact movement.',analogy:'🚗 ODOMETER ANALOGY: Your car odometer counts wheel rotations to show how far you have travelled. A motor encoder does exactly the same thing — but sends that data to a computer in real time for precise control.'},
              ],
              advanced: [
                {icon:'🎯',title:'PID Control — The Core of Precision',body:'PID (Proportional-Integral-Derivative) is a feedback control algorithm used in almost every precise robot. P corrects based on current error. I corrects accumulated past error (eliminates steady-state offset). D reacts to rate of change (dampens oscillation). Tuning Kp, Ki, and Kd to achieve smooth accurate response is a core robotics engineering skill.',analogy:'🚗 DRIVING SPEED ANALOGY: P = press harder when slower than target speed. I = slowly increase pressure if consistently slightly slow. D = ease off when accelerating quickly toward target. All three working together give smooth, accurate speed control — exactly like a skilled driver.'},
                {icon:'🗺️',title:'SLAM — Simultaneous Localisation and Mapping',body:'SLAM allows a robot to build a map of an unknown environment while tracking its own location within that map. It uses sensor data (lidar, cameras, IMU) and algorithms like EKF or Particle Filters to estimate position and update the map continuously. Used in self-driving cars, robot vacuum cleaners, and Mars rovers.',analogy:'🏠 DARK ROOM ANALOGY: Imagine entering a completely dark unfamiliar room with only a torch. As you sweep the torch, you build a mental map of walls and furniture, while tracking where you walked. SLAM does this with sensor data and mathematics — simultaneously and continuously.'},
                {icon:'🦾',title:'Degrees of Freedom and Inverse Kinematics',body:'DOF = the number of independent ways a robot can move. A 6-DOF arm can reach any point in 3D space with any orientation. Inverse Kinematics (IK) answers: given a target position for the gripper, what should each joint angle be? It is the mathematical inverse of forward kinematics and is essential for precise robot arm control.',analogy:'🖐️ YOUR ARM: Your arm has 7 DOF. When you reach for a cup, your brain solves inverse kinematics instantly — you do not consciously calculate each joint angle, yet your hand arrives exactly where you want it. Robot IK algorithms do this same computation mathematically.'},
                {icon:'👁️',title:'Computer Vision — Giving Robots Eyes',body:'Computer vision lets robots interpret visual information from cameras. OpenCV is the most widely used library, supporting colour detection (HSV masking), edge detection (Canny filter), object detection (YOLO, SSD), and pose estimation. Convolutional Neural Networks (CNNs) power modern vision systems on devices from phones to industrial cameras.',analogy:'🧠 LEARNING TO SEE: A human infant spends years learning to recognise objects. Computer vision shortcuts this by training on millions of labelled images. Show the algorithm 50,000 images labelled "dog" and it learns the visual pattern — just like a child, but in hours not years.'},
                {icon:'🤖',title:'ROS — Robot Operating System',body:'ROS is an open-source middleware framework for building robot software. It provides a publish-subscribe communication system (nodes, topics, messages), hardware abstraction, a rich package ecosystem, 3D simulation via Gazebo, and visualisation via RViz. ROS2 is the current version with real-time support and improved security. Used in research labs and industry worldwide.',analogy:'🏢 OFFICE NETWORK ANALOGY: ROS is like an office network. Each robot function (camera, motor controller, planner) is a separate computer (node). They share information through labelled noticeboards (topics). The network lets them all collaborate without being directly wired to each other.'},
              ],
              pro: [
                {icon:'📊',title:'Kalman Filters and State Estimation',body:'A Kalman Filter optimally fuses noisy sensor measurements with a mathematical system model to estimate the true state. It alternates between Predict (use model to project forward) and Update (correct with sensor measurement, weighted by relative noise). EKF handles nonlinear systems. Used in GPS receivers, drone stabilisation, and autonomous vehicles.',analogy:'🌦️ WEATHER FORECAST ANALOGY: A model predicts tomorrow\'s temperature (predict step). You then measure actual temperature (update step). If measurement differs from prediction, you correct the model weighted by how much you trust each source. Kalman does this mathematically optimally, every millisecond.'},
                {icon:'🧠',title:'Deep Learning for Robotics — CNNs and Edge AI',body:'CNNs process images by learning spatial feature hierarchies automatically through training. For robotics: object detection (YOLOv8), semantic segmentation (DeepLab), depth estimation (MonoDepth), and grasping prediction (GraspNet). TensorFlow Lite and ONNX Runtime run these models on edge devices like Raspberry Pi and Jetson Nano without cloud connectivity.',analogy:'🔬 EXPERT VISION ANALOGY: A junior scientist sees a cell slide and sees shapes and colours. A trained expert sees organelles, cell type, and disease markers. CNN training compresses years of expert learning into mathematical weights learned from millions of labelled examples.'},
                {icon:'🏆',title:'Reinforcement Learning in Robotics',body:'RL trains an agent (robot) to maximise cumulative reward through trial and error in an environment. Key concepts: State (current observation), Action (what the robot does), Reward (signal for good or bad outcome), Policy (mapping states to actions). PPO, SAC, and TD3 work for continuous action spaces. Sim-to-Real transfer trains in simulation (Isaac Sim, Gazebo) then deploys on real hardware.',analogy:'🐶 DOG TRAINING ANALOGY: You do not write a rule for every dog behaviour — you reward good actions. The dog learns which actions lead to treats. RL does exactly this, but the "dog" is a neural network and the "treats" are reward signals. OpenAI used RL to train robot hands to solve Rubik\'s cubes.'},
                {icon:'🌳',title:'Behaviour Trees and Robot Decision Making',body:'Behaviour Trees (BTs) provide a modular, hierarchical structure for robot decision-making. Node types: Sequence (all children must succeed), Selector (first successful child wins), Parallel (run children simultaneously), and Leaf actions or conditions. BTs are more scalable and debuggable than finite state machines for complex multi-step robot behaviour.',analogy:'🗺️ MILITARY MISSION ANALOGY: A mission plan is a behaviour tree. Sequence: navigate, then secure, then extract. Selector: if front door is open use it, else try back door, else break window. Parallel: drive toward target while simultaneously scanning for threats. BTs make complex plans readable, modifiable, and reusable.'},
                {icon:'🛣️',title:'Path Planning — A*, RRT, and Motion Planning',body:'Path planning computes a collision-free trajectory from start to goal. A* search on a grid is optimal but slow in high-dimensional spaces. RRT (Rapidly-exploring Random Tree) samples space randomly to build a tree efficiently. RRT* adds asymptotic optimality. For robot arms: OMPL (Open Motion Planning Library). For mobile robots: Nav2 in ROS2 with global and local planners.',analogy:'📍 GPS ANALOGY: GPS navigation solves path planning for you every day — finding the shortest route avoiding blocked roads and replanning if you go wrong. Robot path planners do the same thing, but the "roads" are continuous 3D space and the "wrong turns" are potential collisions with the environment.'},
              ],
            };
            const items = theoryByLevel[learnLevel] || theoryByLevel.beginner;
            return (
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-white/10 shadow-lg"
                    style={{background:'linear-gradient(135deg,#13132a,#1a1a35)'}}>
                    {/* Card header */}
                    <div className="flex items-center gap-3 p-4 border-b border-white/8"
                      style={{background:'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(99,102,241,0.1))'}}>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-white font-black text-sm">{item.title}</div>
                        <div className="text-purple-300/60 text-xs">Concept {i+1} of {items.length}</div>
                      </div>
                      <div className="ml-auto text-purple-400/40 text-xs font-bold">📚 Theory</div>
                    </div>
                    {/* Body */}
                    <div className="p-4 space-y-3">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/6">
                        <p className="text-white/75 text-sm leading-relaxed">{item.body}</p>
                      </div>
                      <div className="rounded-xl p-3 border-l-4" style={{background:'#f59e0b10',borderColor:'#f59e0b'}}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-base">💡</span>
                          <span className="text-amber-300 font-black text-xs">Real-World Analogy</span>
                        </div>
                        <p className="text-amber-100/65 text-xs leading-relaxed">{item.analogy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </>)}

        {/* ── QUIZ TAB ── */}
        {mainTab === 'quiz' && (<>
          <div className="space-y-3 mb-5">
            <label className="text-white/40 text-xs font-bold tracking-widest uppercase block">Choose Your Level</label>
            {(Object.entries(LEVEL_DATA) as [Level, typeof LEVEL_DATA[Level]][]).map(([lvl, ld]) => (
              <button key={lvl} onClick={() => setLevel(lvl)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${level === lvl ? 'scale-[1.01]' : 'opacity-65 hover:opacity-90'}`}
                style={{ borderColor: level === lvl ? ld.color : ld.color + '30', background: level === lvl ? ld.color + '18' : ld.color + '06' }}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ld.bg} flex items-center justify-center text-2xl flex-shrink-0`}>{ld.icon}</div>
                <div className="flex-1"><div className="text-white font-black">{ld.label}</div><div className="text-white/45 text-xs">{ld.desc} · {ld.grade}</div></div>
                <div className="text-right"><div className="text-xs font-bold" style={{ color: ld.color }}>{bank[lvl].length} questions</div>{level === lvl && <div className="text-white/60 text-xs mt-0.5">✓ Selected</div>}</div>
              </button>
            ))}
          </div>
          <button onClick={startGame}
            className="w-full py-5 text-white font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
            style={{ background: `linear-gradient(135deg, ${mData.color}, ${lData.color})`, boxShadow: `0 8px 32px ${mData.color}40` }}>
            {mData.icon} Start {lData.label} Challenge!
          </button>
        </>)}
      </div>
    </div>
  );

  // ── RESULTS ──
  if (phase === 'results') {
    const grade = acc >= 90 ? 'S+' : acc >= 80 ? 'A' : acc >= 70 ? 'B' : acc >= 55 ? 'C' : 'D';
    const gradeColor = acc >= 90 ? '#ffd700' : acc >= 80 ? '#10b981' : acc >= 70 ? '#3b82f6' : acc >= 55 ? '#f59e0b' : '#ef4444';
    return (
      <div className="min-h-screen bg-[#070b18] flex flex-col items-center justify-center px-4 relative">
        <ParticleExplosion active={acc >= 70} count={60} colors={[mData.color,'#ffd700','#fff',lData.color]} />
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="text-7xl mb-3 animate-bounce">{acc >= 80 ? '🏆' : acc >= 60 ? '⭐' : '💪'}</div>
          <h2 className="text-4xl font-black text-white mb-1">Challenge Complete!</h2>
          <p className="text-white/40 mb-6">{mData.title} · {lData.label}</p>

          {/* Grade */}
          <div className="text-8xl font-black mb-6" style={{ color: gradeColor, textShadow: `0 0 40px ${gradeColor}60` }}>{grade}</div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { v: score.toLocaleString(), k: 'Score',    icon: '🎯' },
              { v: xp.toLocaleString(),   k: 'XP Earned', icon: '⭐' },
              { v: `${acc}%`,             k: 'Accuracy',  icon: '🎲' },
              { v: `${correct}/${questions.length}`, k: 'Correct', icon: '✅' },
              { v: `x${bestCombo}`,       k: 'Best Combo',icon: '🔥' },
              { v: badges.length,         k: 'Badges',    icon: '🏅' },
            ].map(s => (
              <div key={s.k} className="bg-white/5 border border-white/8 rounded-2xl p-3 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-white font-black text-lg">{s.v}</div>
                <div className="text-white/35 text-xs">{s.k}</div>
              </div>
            ))}
          </div>

          {/* Badges earned */}
          {badges.length > 0 && (
            <div className="bg-yellow-500/8 border border-yellow-500/20 rounded-2xl p-4 mb-5">
              <div className="text-yellow-400 text-xs font-bold mb-2">🏅 Badges Earned!</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {badges.map((b, i) => (
                  <span key={i} className="bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-xs font-bold px-3 py-1.5 rounded-full">{b}</span>
                ))}
              </div>
            </div>
          )}

          {/* Encouragement */}
          <div className="text-white/60 text-sm mb-6 font-medium">
            {acc >= 90 ? '🌟 Outstanding! You\'re a coding genius!' :
             acc >= 80 ? '⭐ Excellent work! Keep it up!' :
             acc >= 70 ? '👍 Good job! Practice makes perfect!' :
             acc >= 55 ? '💪 Keep going — you\'re improving!' :
             '🚀 Don\'t give up! Try again and you\'ll improve!'}
          </div>

          <div className="flex gap-3">
            <button onClick={startGame}
              className="flex-1 py-4 text-white font-black rounded-2xl hover:scale-[1.02] transition-all"
              style={{ background: `linear-gradient(135deg,${mData.color},${lData.color})` }}>
              🔄 Try Again
            </button>
            <button onClick={onBack}
              className="flex-1 py-4 bg-white/8 border border-white/12 text-white font-bold rounded-2xl hover:bg-white/14 transition-all">
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PLAYING ──
  if (!curQ) return null;
  const timerPct = (timeLeft / 30) * 100;
  const timerColor = timerPct > 60 ? '#10b981' : timerPct > 30 ? '#f59e0b' : '#ef4444';

  return (
    <div className="min-h-screen bg-[#070b18] flex flex-col">
      {showParticle && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <ParticleExplosion active x={50} y={35} count={35} colors={[mData.color, lData.color, '#fff', '#ffd700']} onComplete={() => setShowParticle(false)} />
        </div>
      )}
      {newBadge && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-yellow-500/90 text-black font-black px-5 py-3 rounded-2xl shadow-xl animate-bounce">
          🏅 Badge Unlocked: {newBadge}
        </div>
      )}

      {/* Header */}
      <div className="bg-black/50 border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => { soundEngine.stopBgMusic(); onBack(); }}
            className="text-white/40 hover:text-white text-xs px-3 py-1.5 bg-white/8 rounded-lg transition-colors">✕ Quit</button>
          <span className="text-2xl">{mData.icon}</span>
          <div>
            <div className="text-white font-bold text-xs leading-none">{lData.label}</div>
            <div className="text-white/35 text-xs">Q {qIndex + 1}/{questions.length}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-white font-black text-sm">{score.toLocaleString()}</div>
            <div className="text-white/30 text-xs">Score</div>
          </div>
          {combo >= 2 && <div className="text-yellow-400 font-black text-sm animate-pulse">🔥{combo}x</div>}
          <MusicPlayer category={mData.musicCat} compact />
        </div>
      </div>

      {/* Progress + timer */}
      <div className="px-4 py-2 bg-black/25">
        <div className="flex gap-0.5 mb-2">
          {questions.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i < qIndex ? 'bg-purple-500' : i === qIndex ? 'bg-yellow-400' : 'bg-white/10'}`} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle cx="16" cy="16" r="13" fill="none" stroke={timerColor} strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 13}`}
                strokeDashoffset={`${2 * Math.PI * 13 * (1 - timerPct / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-xs">{timeLeft}</span>
            </div>
          </div>
          <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${timerPct}%`, background: timerColor, transition: 'width 1s linear' }} />
          </div>
          <span className="text-white/30 text-xs">{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-4 pb-4 pt-3 overflow-y-auto">
        {/* Question card */}
        <div className={`rounded-3xl p-5 mb-4 border-2 transition-all ${showResult && selected === curQ.correct ? 'border-green-400/60 bg-green-400/8' : showResult && selected !== curQ.correct ? 'border-red-400/60 bg-red-400/8' : 'border-white/10 bg-white/4'}`}
          style={{ borderColor: !showResult ? mData.color + '30' : undefined }}>
          <div className="text-white/40 text-xs font-bold mb-2 flex items-center gap-1.5">
            <span>{mData.icon}</span>
            <span>{lData.label} Level</span>
            {curQ.xp && <span className="ml-auto text-yellow-400/70">+{curQ.xp} XP</span>}
          </div>
          <p className="text-white font-bold text-lg leading-snug mb-3">{curQ.question}</p>
          {curQ.code && (
            <div className="bg-black/60 border border-white/12 rounded-xl p-3 font-mono text-sm text-green-400 mb-3 overflow-x-auto">
              <pre>{curQ.code}</pre>
            </div>
          )}
          {showResult && (
            <div className={`mt-2 p-3 rounded-xl text-sm ${selected === curQ.correct ? 'bg-green-400/12 text-green-300' : 'bg-orange-400/12 text-orange-300'}`}>
              <span className="font-bold">{selected === curQ.correct ? '✓ Correct! ' : '✗ Not quite. '}</span>
              {curQ.explanation}
            </div>
          )}
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {curQ.options.map((opt, i) => {
            const isCorrectOpt = i === curQ.correct;
            const isSelected   = selected === i;
            const dim = showResult && !isCorrectOpt && !isSelected;
            let bg = COLORS[i];
            if (showResult && isCorrectOpt) bg = '#10b981';
            if (showResult && isSelected && !isCorrectOpt) bg = '#6b7280';
            return (
              <button key={i} onClick={() => handleSelect(i)} disabled={showResult}
                className={`relative p-4 rounded-2xl flex items-start gap-2.5 text-left text-white font-semibold text-sm transition-all active:scale-95 disabled:cursor-default min-h-[68px] ${!showResult ? 'hover:brightness-110 hover:scale-[1.02]' : ''} ${dim ? 'opacity-35' : ''}`}
                style={{ background: bg, boxShadow: !showResult ? `0 4px 18px ${COLORS[i]}50` : isCorrectOpt && showResult ? '0 0 20px #10b98170' : undefined }}>
                <span className="text-2xl opacity-80 flex-shrink-0 mt-0.5">{ICONS[i]}</span>
                <span className="leading-tight">{opt}</span>
                {showResult && isCorrectOpt && <span className="ml-auto text-xl flex-shrink-0">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
