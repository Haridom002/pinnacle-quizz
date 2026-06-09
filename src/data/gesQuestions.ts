// GES New Curriculum Question Bank
// Based on WAEC-style questions, Grade 1–9, all core subjects
// Organised by: subject → strand → sub-strand → grade → questions

export interface GESQuestion {
  id: string;
  text: string;
  options: string[];
  correct: number; // index
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  grade: number; // 1-9
  subject: string;
  strand: string;
  subStrand: string;
  points: number;
  timeLimit: number; // seconds
}

export interface GESSubStrand {
  name: string;
  questions: GESQuestion[];
}

export interface GESStrand {
  name: string;
  icon: string;
  color: string;
  subStrands: GESSubStrand[];
}

export interface GESSubject {
  name: string;
  icon: string;
  color: string;
  coverColor: string;
  strands: GESStrand[];
}

// ─────────────────────────────────────────────────────────────
// MATHEMATICS
// ─────────────────────────────────────────────────────────────
const MATHEMATICS: GESSubject = {
  name: 'Mathematics', icon: '🔢', color: '#3b82f6',
  coverColor: 'from-blue-600 to-indigo-700',
  strands: [
    {
      name: 'Number', icon: '🔢', color: '#3b82f6',
      subStrands: [
        {
          name: 'Counting and Numerals',
          questions: [
            { id:'m-c-1', text:'What comes after 9?', options:['8','10','11','7'], correct:1, explanation:'After 9 comes 10. We move to the tens.', difficulty:'beginner', grade:1, subject:'Mathematics', strand:'Number', subStrand:'Counting and Numerals', points:100, timeLimit:15 },
            { id:'m-c-2', text:'How many tens are in 50?', options:['4','5','6','3'], correct:1, explanation:'50 = 5 × 10, so there are 5 tens in 50.', difficulty:'beginner', grade:2, subject:'Mathematics', strand:'Number', subStrand:'Counting and Numerals', points:100, timeLimit:15 },
            { id:'m-c-3', text:'What is the place value of 4 in 347?', options:['Ones','Tens','Hundreds','Thousands'], correct:1, explanation:'In 347, the digit 4 is in the tens place, meaning 4 × 10 = 40.', difficulty:'beginner', grade:3, subject:'Mathematics', strand:'Number', subStrand:'Counting and Numerals', points:100, timeLimit:20 },
            { id:'m-c-4', text:'What is 3,456 rounded to the nearest hundred?', options:['3,400','3,500','3,000','3,460'], correct:1, explanation:'The tens digit is 5, so we round up. 3,456 → 3,500.', difficulty:'intermediate', grade:4, subject:'Mathematics', strand:'Number', subStrand:'Counting and Numerals', points:150, timeLimit:25 },
          ]
        },
        {
          name: 'Fractions',
          questions: [
            { id:'m-f-1', text:'What is ½ of 12?', options:['4','6','8','3'], correct:1, explanation:'½ of 12 = 12 ÷ 2 = 6', difficulty:'beginner', grade:2, subject:'Mathematics', strand:'Number', subStrand:'Fractions', points:100, timeLimit:20 },
            { id:'m-f-2', text:'Which fraction is equivalent to 2/4?', options:['1/3','1/2','3/4','2/3'], correct:1, explanation:'2/4 = 1/2. Divide both numerator and denominator by 2.', difficulty:'beginner', grade:3, subject:'Mathematics', strand:'Number', subStrand:'Fractions', points:100, timeLimit:20 },
            { id:'m-f-3', text:'What is 3/4 + 1/4?', options:['4/8','1/2','1 whole','4/4'], correct:2, explanation:'3/4 + 1/4 = 4/4 = 1 whole.', difficulty:'beginner', grade:3, subject:'Mathematics', strand:'Number', subStrand:'Fractions', points:100, timeLimit:20 },
            { id:'m-f-4', text:'What is 2/3 of 18?', options:['9','12','6','15'], correct:1, explanation:'2/3 of 18 = (18 ÷ 3) × 2 = 6 × 2 = 12.', difficulty:'intermediate', grade:4, subject:'Mathematics', strand:'Number', subStrand:'Fractions', points:150, timeLimit:25 },
            { id:'m-f-5', text:'Arrange in ascending order: 1/2, 1/4, 3/4', options:['1/2, 1/4, 3/4','1/4, 1/2, 3/4','3/4, 1/2, 1/4','1/4, 3/4, 1/2'], correct:1, explanation:'Converting: 1/4=0.25, 1/2=0.5, 3/4=0.75. Ascending: 1/4, 1/2, 3/4.', difficulty:'intermediate', grade:4, subject:'Mathematics', strand:'Number', subStrand:'Fractions', points:150, timeLimit:25 },
            { id:'m-f-6', text:'What is 3/5 × 10?', options:['5','6','8','4'], correct:1, explanation:'3/5 × 10 = (3 × 10) ÷ 5 = 30 ÷ 5 = 6.', difficulty:'intermediate', grade:5, subject:'Mathematics', strand:'Number', subStrand:'Fractions', points:150, timeLimit:25 },
            { id:'m-f-7', text:'Convert 0.75 to a fraction in its lowest terms.', options:['75/100','3/4','7/10','15/20'], correct:1, explanation:'0.75 = 75/100 = 3/4 (dividing by 25).', difficulty:'intermediate', grade:5, subject:'Mathematics', strand:'Number', subStrand:'Fractions', points:150, timeLimit:30 },
          ]
        },
        {
          name: 'Decimals and Percentages',
          questions: [
            { id:'m-d-1', text:'What is 25% of 80?', options:['15','20','25','10'], correct:1, explanation:'25% = 25/100 = 1/4. So 1/4 × 80 = 20.', difficulty:'intermediate', grade:5, subject:'Mathematics', strand:'Number', subStrand:'Decimals and Percentages', points:150, timeLimit:25 },
            { id:'m-d-2', text:'Express 3/5 as a percentage.', options:['35%','50%','60%','65%'], correct:2, explanation:'3/5 × 100% = 300/5 = 60%.', difficulty:'intermediate', grade:5, subject:'Mathematics', strand:'Number', subStrand:'Decimals and Percentages', points:150, timeLimit:25 },
            { id:'m-d-3', text:'A shirt costs GH₵80. If there is a 10% discount, what is the new price?', options:['GH₵70','GH₵72','GH₵68','GH₵75'], correct:1, explanation:'10% of 80 = 8. New price = 80 − 8 = GH₵72.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Number', subStrand:'Decimals and Percentages', points:200, timeLimit:30 },
            { id:'m-d-4', text:'What is 0.3 × 0.4?', options:['1.2','0.12','0.012','12'], correct:1, explanation:'0.3 × 0.4 = 12/100 = 0.12. Count 2 decimal places.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Number', subStrand:'Decimals and Percentages', points:150, timeLimit:25 },
          ]
        },
        {
          name: 'Integers and Directed Numbers',
          questions: [
            { id:'m-i-1', text:'What is −3 + 5?', options:['−8','2','8','−2'], correct:1, explanation:'Starting at −3, move 5 steps right on the number line: −3 + 5 = 2.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Number', subStrand:'Integers and Directed Numbers', points:150, timeLimit:20 },
            { id:'m-i-2', text:'What is −4 × −3?', options:['−12','7','12','−7'], correct:2, explanation:'Negative × Negative = Positive. (−4) × (−3) = +12.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Number', subStrand:'Integers and Directed Numbers', points:200, timeLimit:20 },
            { id:'m-i-3', text:'Simplify: −8 ÷ 2', options:['4','−4','−16','16'], correct:1, explanation:'−8 ÷ 2 = −4. Negative ÷ Positive = Negative.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Number', subStrand:'Integers and Directed Numbers', points:150, timeLimit:20 },
          ]
        },
        {
          name: 'Ratio and Proportion',
          questions: [
            { id:'m-r-1', text:'Simplify the ratio 12:18.', options:['6:9','4:6','2:3','3:2'], correct:2, explanation:'GCD of 12 and 18 is 6. 12÷6 : 18÷6 = 2:3.', difficulty:'intermediate', grade:5, subject:'Mathematics', strand:'Number', subStrand:'Ratio and Proportion', points:150, timeLimit:25 },
            { id:'m-r-2', text:'Divide GH₵120 in the ratio 1:3.', options:['GH₵30 and GH₵90','GH₵40 and GH₵80','GH₵60 and GH₵60','GH₵20 and GH₵100'], correct:0, explanation:'Total parts = 1+3 = 4. Each part = 120÷4 = 30. Shares: 1×30=30, 3×30=90.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Number', subStrand:'Ratio and Proportion', points:200, timeLimit:30 },
            { id:'m-r-3', text:'If 5 books cost GH₵25, how much do 8 books cost?', options:['GH₵35','GH₵40','GH₵45','GH₵32'], correct:1, explanation:'Cost per book = 25÷5 = GH₵5. 8 books = 8×5 = GH₵40.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Number', subStrand:'Ratio and Proportion', points:200, timeLimit:30 },
          ]
        },
      ]
    },
    {
      name: 'Algebra', icon: '📐', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Patterns and Sequences',
          questions: [
            { id:'m-a-1', text:'What is the next number in: 2, 4, 6, 8, __?', options:['9','10','11','12'], correct:1, explanation:'This is an even number sequence. Each term increases by 2. Next = 10.', difficulty:'beginner', grade:3, subject:'Mathematics', strand:'Algebra', subStrand:'Patterns and Sequences', points:100, timeLimit:15 },
            { id:'m-a-2', text:'Find the next term: 1, 4, 9, 16, __?', options:['20','25','24','18'], correct:1, explanation:'These are perfect squares: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25.', difficulty:'intermediate', grade:5, subject:'Mathematics', strand:'Algebra', subStrand:'Patterns and Sequences', points:150, timeLimit:25 },
            { id:'m-a-3', text:'What is the 10th term of the sequence: 3, 6, 9, 12, ...?', options:['27','30','33','24'], correct:1, explanation:'The sequence is 3n. When n=10, term = 3×10 = 30.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Algebra', subStrand:'Patterns and Sequences', points:200, timeLimit:30 },
          ]
        },
        {
          name: 'Linear Equations',
          questions: [
            { id:'m-le-1', text:'Solve: x + 5 = 12', options:['x = 5','x = 7','x = 17','x = 6'], correct:1, explanation:'Subtract 5 from both sides: x = 12 − 5 = 7.', difficulty:'beginner', grade:5, subject:'Mathematics', strand:'Algebra', subStrand:'Linear Equations', points:100, timeLimit:20 },
            { id:'m-le-2', text:'Solve: 2x − 3 = 7', options:['x = 2','x = 5','x = 4','x = 3'], correct:1, explanation:'Add 3: 2x = 10. Divide by 2: x = 5.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Algebra', subStrand:'Linear Equations', points:150, timeLimit:25 },
            { id:'m-le-3', text:'Solve: 3x + 2 = 2x + 5', options:['x = 1','x = 3','x = 7','x = 2'], correct:1, explanation:'3x − 2x = 5 − 2. x = 3.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Algebra', subStrand:'Linear Equations', points:200, timeLimit:30 },
            { id:'m-le-4', text:'If 4y = 24, find y.', options:['4','6','8','5'], correct:1, explanation:'y = 24 ÷ 4 = 6.', difficulty:'beginner', grade:5, subject:'Mathematics', strand:'Algebra', subStrand:'Linear Equations', points:100, timeLimit:20 },
          ]
        },
        {
          name: 'Indices and Logarithms',
          questions: [
            { id:'m-ind-1', text:'Simplify: 2³ × 2²', options:['2⁵','4⁵','2⁶','2'], correct:0, explanation:'When multiplying same base, add exponents: 2³⁺² = 2⁵ = 32.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Algebra', subStrand:'Indices and Logarithms', points:200, timeLimit:25 },
            { id:'m-ind-2', text:'What is 3⁰?', options:['0','3','1','9'], correct:2, explanation:'Any number raised to the power 0 equals 1. 3⁰ = 1.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Algebra', subStrand:'Indices and Logarithms', points:150, timeLimit:20 },
            { id:'m-ind-3', text:'Simplify: (2²)³', options:['2⁵','2⁶','4³','2⁸'], correct:1, explanation:'Power of a power: multiply indices. (2²)³ = 2^(2×3) = 2⁶ = 64.', difficulty:'advanced', grade:8, subject:'Mathematics', strand:'Algebra', subStrand:'Indices and Logarithms', points:250, timeLimit:30 },
          ]
        },
        {
          name: 'Quadratic Equations',
          questions: [
            { id:'m-q-1', text:'Solve: x² − 5x + 6 = 0', options:['x=1,x=6','x=2,x=3','x=−2,x=−3','x=1,x=−6'], correct:1, explanation:'Factorise: (x−2)(x−3)=0. So x=2 or x=3.', difficulty:'advanced', grade:9, subject:'Mathematics', strand:'Algebra', subStrand:'Quadratic Equations', points:300, timeLimit:40 },
            { id:'m-q-2', text:'Which values satisfy x² = 9?', options:['x=3 only','x=−3 only','x=3 or x=−3','x=±9'], correct:2, explanation:'x² = 9 means x = +√9 or −√9 = 3 or −3.', difficulty:'intermediate', grade:9, subject:'Mathematics', strand:'Algebra', subStrand:'Quadratic Equations', points:250, timeLimit:30 },
          ]
        },
      ]
    },
    {
      name: 'Geometry and Measurement', icon: '📏', color: '#10b981',
      subStrands: [
        {
          name: 'Shapes and Properties',
          questions: [
            { id:'m-s-1', text:'How many sides does a hexagon have?', options:['5','6','7','8'], correct:1, explanation:'A hexagon has 6 sides. Hex = 6 in Greek.', difficulty:'beginner', grade:2, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Shapes and Properties', points:100, timeLimit:15 },
            { id:'m-s-2', text:'What is the sum of angles in a triangle?', options:['90°','360°','180°','270°'], correct:2, explanation:'The angles of any triangle always add up to 180°.', difficulty:'beginner', grade:4, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Shapes and Properties', points:100, timeLimit:15 },
            { id:'m-s-3', text:'A square has a side of 5cm. What is its perimeter?', options:['10cm','15cm','20cm','25cm'], correct:2, explanation:'Perimeter of square = 4 × side = 4 × 5 = 20cm.', difficulty:'beginner', grade:3, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Shapes and Properties', points:100, timeLimit:20 },
            { id:'m-s-4', text:'What is the area of a rectangle 8cm by 3cm?', options:['11cm²','22cm²','24cm²','20cm²'], correct:2, explanation:'Area = length × width = 8 × 3 = 24cm².', difficulty:'beginner', grade:4, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Shapes and Properties', points:100, timeLimit:20 },
            { id:'m-s-5', text:'What type of triangle has all sides equal?', options:['Isosceles','Scalene','Equilateral','Right-angled'], correct:2, explanation:'An equilateral triangle has all 3 sides and all 3 angles equal (60° each).', difficulty:'beginner', grade:4, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Shapes and Properties', points:100, timeLimit:15 },
          ]
        },
        {
          name: 'Area and Perimeter',
          questions: [
            { id:'m-ap-1', text:'What is the area of a circle with radius 7cm? (π = 22/7)', options:['44cm²','154cm²','142cm²','132cm²'], correct:1, explanation:'Area = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154cm².', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Area and Perimeter', points:200, timeLimit:35 },
            { id:'m-ap-2', text:'Find the circumference of a circle with diameter 14cm. (π = 22/7)', options:['44cm','88cm','22cm','66cm'], correct:0, explanation:'Circumference = πd = (22/7) × 14 = 22 × 2 = 44cm.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Area and Perimeter', points:200, timeLimit:30 },
            { id:'m-ap-3', text:'What is the area of a triangle with base 10cm and height 6cm?', options:['60cm²','30cm²','16cm²','20cm²'], correct:1, explanation:'Area of triangle = ½ × base × height = ½ × 10 × 6 = 30cm².', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Area and Perimeter', points:150, timeLimit:25 },
          ]
        },
        {
          name: 'Pythagoras Theorem',
          questions: [
            { id:'m-py-1', text:'In a right triangle, the two shorter sides are 3cm and 4cm. What is the hypotenuse?', options:['5cm','6cm','7cm','8cm'], correct:0, explanation:'a²+b²=c². 3²+4²=c². 9+16=25. c=√25=5cm. This is the famous 3-4-5 triangle!', difficulty:'intermediate', grade:8, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Pythagoras Theorem', points:250, timeLimit:35 },
            { id:'m-py-2', text:'Which set of numbers is a Pythagorean triple?', options:['2,3,4','5,12,13','4,6,8','3,5,7'], correct:1, explanation:'5²+12²=25+144=169=13². So 5,12,13 is a Pythagorean triple.', difficulty:'advanced', grade:8, subject:'Mathematics', strand:'Geometry and Measurement', subStrand:'Pythagoras Theorem', points:300, timeLimit:35 },
          ]
        },
      ]
    },
    {
      name: 'Statistics and Probability', icon: '📊', color: '#f59e0b',
      subStrands: [
        {
          name: 'Data Collection and Representation',
          questions: [
            { id:'m-st-1', text:'What type of chart is best for showing parts of a whole?', options:['Bar chart','Line graph','Pie chart','Scatter graph'], correct:2, explanation:'A pie chart divides a circle into sectors to show proportions of a whole.', difficulty:'beginner', grade:4, subject:'Mathematics', strand:'Statistics and Probability', subStrand:'Data Collection and Representation', points:100, timeLimit:15 },
            { id:'m-st-2', text:'The scores of 5 students are: 60, 70, 80, 90, 100. What is the mean?', options:['70','75','80','85'], correct:2, explanation:'Mean = (60+70+80+90+100) ÷ 5 = 400 ÷ 5 = 80.', difficulty:'intermediate', grade:5, subject:'Mathematics', strand:'Statistics and Probability', subStrand:'Data Collection and Representation', points:150, timeLimit:25 },
            { id:'m-st-3', text:'Find the median of: 3, 7, 2, 9, 5', options:['5','7','3','6'], correct:0, explanation:'Arrange in order: 2,3,5,7,9. Middle value (3rd of 5) = 5.', difficulty:'intermediate', grade:6, subject:'Mathematics', strand:'Statistics and Probability', subStrand:'Data Collection and Representation', points:150, timeLimit:25 },
          ]
        },
        {
          name: 'Probability',
          questions: [
            { id:'m-pr-1', text:'A bag has 3 red and 2 blue balls. What is the probability of picking red?', options:['2/5','3/2','3/5','1/5'], correct:2, explanation:'P(red) = 3/(3+2) = 3/5.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Statistics and Probability', subStrand:'Probability', points:200, timeLimit:25 },
            { id:'m-pr-2', text:'A fair coin is tossed. What is the probability of getting a head?', options:['1','0','1/2','1/4'], correct:2, explanation:'A fair coin has 2 equally likely outcomes: head or tail. P(head) = 1/2.', difficulty:'beginner', grade:6, subject:'Mathematics', strand:'Statistics and Probability', subStrand:'Probability', points:100, timeLimit:15 },
            { id:'m-pr-3', text:'A die is rolled. What is the probability of getting a number greater than 4?', options:['1/6','2/6','3/6','4/6'], correct:1, explanation:'Numbers > 4 on a die: 5 and 6. P = 2/6 = 1/3.', difficulty:'intermediate', grade:7, subject:'Mathematics', strand:'Statistics and Probability', subStrand:'Probability', points:200, timeLimit:25 },
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// SCIENCE
// ─────────────────────────────────────────────────────────────
const SCIENCE: GESSubject = {
  name: 'Science', icon: '🔬', color: '#10b981',
  coverColor: 'from-green-600 to-teal-700',
  strands: [
    {
      name: 'Life Science', icon: '🌱', color: '#10b981',
      subStrands: [
        {
          name: 'Living Things and Their Environment',
          questions: [
            { id:'s-l-1', text:'Which of these is NOT a living thing?', options:['Mushroom','Tree','Rock','Earthworm'], correct:2, explanation:'Rocks do not grow, reproduce, feed, or respond to stimuli. They are non-living.', difficulty:'beginner', grade:1, subject:'Science', strand:'Life Science', subStrand:'Living Things and Their Environment', points:100, timeLimit:15 },
            { id:'s-l-2', text:'What do plants need to make their own food?', options:['Water only','Sunlight only','Sunlight, water and carbon dioxide','Soil and water only'], correct:2, explanation:'Plants make food by photosynthesis, which needs sunlight, water (H₂O) and carbon dioxide (CO₂).', difficulty:'beginner', grade:3, subject:'Science', strand:'Life Science', subStrand:'Living Things and Their Environment', points:100, timeLimit:20 },
            { id:'s-l-3', text:'What is the process by which plants make their own food called?', options:['Respiration','Transpiration','Photosynthesis','Digestion'], correct:2, explanation:'Photosynthesis: light energy + CO₂ + water → glucose + oxygen.', difficulty:'intermediate', grade:4, subject:'Science', strand:'Life Science', subStrand:'Living Things and Their Environment', points:150, timeLimit:20 },
            { id:'s-l-4', text:'Which organ pumps blood around the human body?', options:['Lungs','Liver','Kidney','Heart'], correct:3, explanation:'The heart is a muscular pump that circulates blood through blood vessels to all body parts.', difficulty:'beginner', grade:4, subject:'Science', strand:'Life Science', subStrand:'Living Things and Their Environment', points:100, timeLimit:15 },
            { id:'s-l-5', text:'What is the function of the root in a plant?', options:['Makes food','Absorbs water and minerals','Produces seeds','Carries out photosynthesis'], correct:1, explanation:'Roots absorb water and dissolved minerals from the soil and anchor the plant.', difficulty:'beginner', grade:3, subject:'Science', strand:'Life Science', subStrand:'Living Things and Their Environment', points:100, timeLimit:20 },
          ]
        },
        {
          name: 'Human Body and Health',
          questions: [
            { id:'s-h-1', text:'How many bones does an adult human body have?', options:['106','206','306','406'], correct:1, explanation:'The adult human skeleton has 206 bones. Babies are born with about 270 bones that fuse as they grow.', difficulty:'intermediate', grade:5, subject:'Science', strand:'Life Science', subStrand:'Human Body and Health', points:150, timeLimit:20 },
            { id:'s-h-2', text:'Which vitamin is produced when skin is exposed to sunlight?', options:['Vitamin A','Vitamin B','Vitamin C','Vitamin D'], correct:3, explanation:'Sunlight triggers the skin to produce Vitamin D, which is important for strong bones and teeth.', difficulty:'intermediate', grade:6, subject:'Science', strand:'Life Science', subStrand:'Human Body and Health', points:150, timeLimit:20 },
            { id:'s-h-3', text:'Which disease is caused by a deficiency of Vitamin C?', options:['Rickets','Scurvy','Anaemia','Goitre'], correct:1, explanation:'Scurvy is caused by Vitamin C deficiency. Symptoms include swollen gums and fatigue. Citrus fruits prevent it.', difficulty:'intermediate', grade:6, subject:'Science', strand:'Life Science', subStrand:'Human Body and Health', points:200, timeLimit:25 },
            { id:'s-h-4', text:'What is malaria caused by?', options:['A virus','A bacterium','A protozoan (Plasmodium)','A fungus'], correct:2, explanation:'Malaria is caused by the Plasmodium parasite, transmitted by the female Anopheles mosquito.', difficulty:'intermediate', grade:5, subject:'Science', strand:'Life Science', subStrand:'Human Body and Health', points:150, timeLimit:20 },
          ]
        },
        {
          name: 'Ecology and Environment',
          questions: [
            { id:'s-e-1', text:'What is a food chain?', options:['A chain used in farming','The sequence showing how energy passes from one organism to another','A list of foods animals eat','The study of animals'], correct:1, explanation:'A food chain shows the transfer of energy through feeding relationships: producer → primary consumer → secondary consumer.', difficulty:'intermediate', grade:5, subject:'Science', strand:'Life Science', subStrand:'Ecology and Environment', points:150, timeLimit:25 },
            { id:'s-e-2', text:'Which of these is a producer in a food chain?', options:['Lion','Grasshopper','Grass','Eagle'], correct:2, explanation:'Producers (plants) make their own food through photosynthesis. Grass is a producer.', difficulty:'beginner', grade:4, subject:'Science', strand:'Life Science', subStrand:'Ecology and Environment', points:100, timeLimit:20 },
            { id:'s-e-3', text:'What is the main cause of ozone layer depletion?', options:['Carbon dioxide','Chlorofluorocarbons (CFCs)','Oxygen','Nitrogen'], correct:1, explanation:'CFCs from refrigerators and aerosols react with ozone (O₃) molecules and break them down.', difficulty:'advanced', grade:8, subject:'Science', strand:'Life Science', subStrand:'Ecology and Environment', points:250, timeLimit:25 },
          ]
        },
      ]
    },
    {
      name: 'Physical Science', icon: '⚗️', color: '#3b82f6',
      subStrands: [
        {
          name: 'Matter and Materials',
          questions: [
            { id:'s-m-1', text:'What are the three states of matter?', options:['Hot, warm, cold','Solid, liquid, gas','Big, medium, small','Hard, soft, smooth'], correct:1, explanation:'Matter exists in three main states: solid (fixed shape & volume), liquid (fixed volume, variable shape), gas (variable shape & volume).', difficulty:'beginner', grade:2, subject:'Science', strand:'Physical Science', subStrand:'Matter and Materials', points:100, timeLimit:15 },
            { id:'s-m-2', text:'What happens to water when it is heated to 100°C?', options:['It freezes','It evaporates (boils)','It melts','Nothing happens'], correct:1, explanation:'Water boils and turns to steam (water vapour) at 100°C at standard atmospheric pressure.', difficulty:'beginner', grade:3, subject:'Science', strand:'Physical Science', subStrand:'Matter and Materials', points:100, timeLimit:20 },
            { id:'s-m-3', text:'What is the chemical symbol for water?', options:['WA','HO','H₂O','W₂O'], correct:2, explanation:'Water is H₂O — 2 hydrogen atoms bonded to 1 oxygen atom.', difficulty:'beginner', grade:4, subject:'Science', strand:'Physical Science', subStrand:'Matter and Materials', points:100, timeLimit:15 },
            { id:'s-m-4', text:'Which of the following is a mixture?', options:['Pure water','Table salt','Air','Gold'], correct:2, explanation:'Air is a mixture of gases (mainly nitrogen ~78%, oxygen ~21%, and others). It is not a pure substance.', difficulty:'intermediate', grade:6, subject:'Science', strand:'Physical Science', subStrand:'Matter and Materials', points:150, timeLimit:20 },
          ]
        },
        {
          name: 'Forces and Motion',
          questions: [
            { id:'s-f-1', text:'What force pulls objects towards the Earth?', options:['Magnetism','Friction','Gravity','Tension'], correct:2, explanation:'Gravity is the attractive force between masses. Earth pulls all objects toward its centre.', difficulty:'beginner', grade:3, subject:'Science', strand:'Physical Science', subStrand:'Forces and Motion', points:100, timeLimit:15 },
            { id:'s-f-2', text:'What is the unit of force?', options:['Kilogram','Metre','Newton','Joule'], correct:2, explanation:'Force is measured in Newtons (N), named after Sir Isaac Newton.', difficulty:'beginner', grade:5, subject:'Science', strand:'Physical Science', subStrand:'Forces and Motion', points:100, timeLimit:15 },
            { id:'s-f-3', text:'A car travels 120km in 2 hours. What is its speed?', options:['240 km/h','60 km/h','60 m/s','240 m/s'], correct:1, explanation:'Speed = Distance ÷ Time = 120 ÷ 2 = 60 km/h.', difficulty:'intermediate', grade:7, subject:'Science', strand:'Physical Science', subStrand:'Forces and Motion', points:200, timeLimit:25 },
          ]
        },
        {
          name: 'Energy',
          questions: [
            { id:'s-en-1', text:'What form of energy does the sun provide?', options:['Electrical energy','Nuclear energy','Light and heat energy','Chemical energy'], correct:2, explanation:'The sun radiates light energy (visible light) and heat energy (infrared radiation) to the Earth.', difficulty:'beginner', grade:4, subject:'Science', strand:'Physical Science', subStrand:'Energy', points:100, timeLimit:15 },
            { id:'s-en-2', text:'Which of these is a renewable source of energy?', options:['Coal','Crude oil','Natural gas','Solar energy'], correct:3, explanation:'Solar energy from the sun is renewable — it cannot be exhausted. Coal, oil and gas are fossil fuels that will run out.', difficulty:'intermediate', grade:6, subject:'Science', strand:'Physical Science', subStrand:'Energy', points:150, timeLimit:20 },
            { id:'s-en-3', text:'What does a solar panel convert sunlight into?', options:['Sound energy','Electrical energy','Chemical energy','Mechanical energy'], correct:1, explanation:'Solar panels contain photovoltaic cells that convert light energy directly into electrical energy.', difficulty:'intermediate', grade:7, subject:'Science', strand:'Physical Science', subStrand:'Energy', points:200, timeLimit:20 },
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// ENGLISH LANGUAGE
// ─────────────────────────────────────────────────────────────
const ENGLISH: GESSubject = {
  name: 'English Language', icon: '📝', color: '#f59e0b',
  coverColor: 'from-yellow-500 to-orange-600',
  strands: [
    {
      name: 'Reading and Writing', icon: '📖', color: '#f59e0b',
      subStrands: [
        {
          name: 'Comprehension',
          questions: [
            { id:'e-c-1', text:'What is a noun?', options:['A doing word','A describing word','A naming word','A joining word'], correct:2, explanation:'A noun is a naming word — it names a person, place, animal or thing. E.g. Kofi, Accra, dog, book.', difficulty:'beginner', grade:2, subject:'English Language', strand:'Reading and Writing', subStrand:'Comprehension', points:100, timeLimit:15 },
            { id:'e-c-2', text:'What is the plural of "child"?', options:['Childs','Childes','Children','Childies'], correct:2, explanation:'"Child" has an irregular plural: "children". It does not follow the regular -s or -es rule.', difficulty:'beginner', grade:2, subject:'English Language', strand:'Reading and Writing', subStrand:'Comprehension', points:100, timeLimit:15 },
            { id:'e-c-3', text:'Choose the correct word: "She __ to school every day."', options:['go','goes','going','gone'], correct:1, explanation:'With third person singular (she/he/it), we add -s or -es. "She goes" is correct.', difficulty:'beginner', grade:3, subject:'English Language', strand:'Reading and Writing', subStrand:'Comprehension', points:100, timeLimit:20 },
            { id:'e-c-4', text:'What is the opposite of "ancient"?', options:['Old','Modern','Historic','Past'], correct:1, explanation:'The antonym (opposite) of ancient (very old) is modern (new/current).', difficulty:'intermediate', grade:5, subject:'English Language', strand:'Reading and Writing', subStrand:'Comprehension', points:150, timeLimit:20 },
          ]
        },
        {
          name: 'Grammar',
          questions: [
            { id:'e-g-1', text:'Which sentence is in the past tense?', options:['I am eating','I will eat','I ate the food','I eat every day'], correct:2, explanation:'"Ate" is the past tense of "eat". Past tense describes completed actions.', difficulty:'beginner', grade:3, subject:'English Language', strand:'Reading and Writing', subStrand:'Grammar', points:100, timeLimit:20 },
            { id:'e-g-2', text:'Identify the adjective: "The tall boy ran fast."', options:['tall','boy','ran','fast'], correct:0, explanation:'An adjective describes a noun. "Tall" describes the boy. "Fast" is an adverb (describes the verb ran).', difficulty:'beginner', grade:3, subject:'English Language', strand:'Reading and Writing', subStrand:'Grammar', points:100, timeLimit:20 },
            { id:'e-g-3', text:'Which is the correct use of "their", "there" and "they\'re"?', options:['"Their going there"','"They\'re going there"','"There going their"','"They\'re going their"'], correct:1, explanation:'"They\'re" = they are. "There" = a place. "Their" = belonging to them. "They\'re going there" is correct.', difficulty:'intermediate', grade:6, subject:'English Language', strand:'Reading and Writing', subStrand:'Grammar', points:200, timeLimit:25 },
            { id:'e-g-4', text:'What is the correct passive voice of "Kofi kicked the ball"?', options:['The ball was kicked by Kofi','Kofi was kicked by the ball','The ball kicked Kofi','Kofi is kicking the ball'], correct:0, explanation:'Passive voice: object becomes subject. "The ball was kicked by Kofi" — ball is now the subject.', difficulty:'advanced', grade:8, subject:'English Language', strand:'Reading and Writing', subStrand:'Grammar', points:250, timeLimit:30 },
          ]
        },
        {
          name: 'Vocabulary',
          questions: [
            { id:'e-v-1', text:'What does the word "benevolent" mean?', options:['Cruel','Kind and generous','Lazy','Angry'], correct:1, explanation:'"Benevolent" means kind, generous, and well-meaning. E.g. "a benevolent leader who helped the poor."', difficulty:'advanced', grade:8, subject:'English Language', strand:'Reading and Writing', subStrand:'Vocabulary', points:250, timeLimit:20 },
            { id:'e-v-2', text:'Which word is a synonym for "happy"?', options:['Sad','Angry','Joyful','Tired'], correct:2, explanation:'A synonym is a word with the same or similar meaning. Joyful and happy both mean feeling pleasure.', difficulty:'beginner', grade:4, subject:'English Language', strand:'Reading and Writing', subStrand:'Vocabulary', points:100, timeLimit:15 },
            { id:'e-v-3', text:'What is the meaning of the prefix "un-" in "unhappy"?', options:['Very','Not','Again','Before'], correct:1, explanation:'The prefix "un-" means not or the opposite of. Unhappy = not happy.', difficulty:'beginner', grade:4, subject:'English Language', strand:'Reading and Writing', subStrand:'Vocabulary', points:100, timeLimit:15 },
          ]
        },
      ]
    },
    {
      name: 'Oral Language', icon: '🗣️', color: '#ef4444',
      subStrands: [
        {
          name: 'Public Speaking and Presentation',
          questions: [
            { id:'e-o-1', text:'What should you do before giving a speech?', options:['Nothing','Practise and prepare notes','Read from a book only','Speak very quietly'], correct:1, explanation:'Good speakers practise, prepare notes or an outline, know their audience, and rehearse for confidence.', difficulty:'beginner', grade:5, subject:'English Language', strand:'Oral Language', subStrand:'Public Speaking and Presentation', points:100, timeLimit:20 },
            { id:'e-o-2', text:'What does "tone of voice" mean in communication?', options:['The volume only','How you dress','The way your voice sounds (pitch, speed, emotion)','Where you stand'], correct:2, explanation:'Tone of voice includes pitch (high/low), pace (speed), and emotion conveyed — it affects how the message is received.', difficulty:'intermediate', grade:6, subject:'English Language', strand:'Oral Language', subStrand:'Public Speaking and Presentation', points:150, timeLimit:20 },
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// SOCIAL STUDIES
// ─────────────────────────────────────────────────────────────
const SOCIAL_STUDIES: GESSubject = {
  name: 'Social Studies', icon: '🌍', color: '#8b5cf6',
  coverColor: 'from-purple-600 to-violet-700',
  strands: [
    {
      name: 'My Country Ghana', icon: '🇬🇭', color: '#10b981',
      subStrands: [
        {
          name: 'Geography of Ghana',
          questions: [
            { id:'ss-g-1', text:'What is the capital city of Ghana?', options:['Kumasi','Tamale','Accra','Cape Coast'], correct:2, explanation:'Accra is the capital and largest city of Ghana, located in the Greater Accra Region.', difficulty:'beginner', grade:1, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Geography of Ghana', points:100, timeLimit:10 },
            { id:'ss-g-2', text:'Which river is the largest in Ghana?', options:['Pra','Ankobra','Volta','Tano'], correct:2, explanation:'The Volta River (and Lake Volta) is the largest river system in Ghana, formed by the Akosombo Dam.', difficulty:'beginner', grade:3, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Geography of Ghana', points:100, timeLimit:15 },
            { id:'ss-g-3', text:'How many regions does Ghana currently have?', options:['10','12','14','16'], correct:3, explanation:'Ghana has 16 regions as of 2019 after six new regions were created from existing ones.', difficulty:'intermediate', grade:5, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Geography of Ghana', points:150, timeLimit:15 },
            { id:'ss-g-4', text:'Which country borders Ghana to the north?', options:['Togo','Ivory Coast','Burkina Faso','Benin'], correct:2, explanation:'Burkina Faso (formerly Upper Volta) borders Ghana to the north.', difficulty:'intermediate', grade:4, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Geography of Ghana', points:150, timeLimit:15 },
            { id:'ss-g-5', text:'Lake Volta is the world\'s largest man-made lake by what measure?', options:['Depth','Volume','Surface area','Length'], correct:2, explanation:'Lake Volta has the largest surface area of any man-made lake in the world, covering about 8,502 km².', difficulty:'advanced', grade:7, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Geography of Ghana', points:250, timeLimit:20 },
          ]
        },
        {
          name: 'Governance and Democracy',
          questions: [
            { id:'ss-gov-1', text:'In what year did Ghana gain independence?', options:['1955','1957','1960','1963'], correct:1, explanation:'Ghana gained independence from British rule on 6th March 1957, becoming the first sub-Saharan African country to do so.', difficulty:'beginner', grade:3, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Governance and Democracy', points:100, timeLimit:15 },
            { id:'ss-gov-2', text:'Who was Ghana\'s first President?', options:['Kofi Abrefa Busia','J.J. Rawlings','Kwame Nkrumah','John Agyekum Kufuor'], correct:2, explanation:'Dr. Kwame Nkrumah became Ghana\'s first President on 1st July 1960 when Ghana became a republic.', difficulty:'beginner', grade:4, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Governance and Democracy', points:100, timeLimit:15 },
            { id:'ss-gov-3', text:'What type of government does Ghana practice?', options:['Monarchy','Military rule','Constitutional democracy','Dictatorship'], correct:2, explanation:'Ghana practices constitutional democracy with free elections, rule of law, and separation of powers.', difficulty:'intermediate', grade:5, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Governance and Democracy', points:150, timeLimit:20 },
            { id:'ss-gov-4', text:'How often are presidential elections held in Ghana?', options:['Every 3 years','Every 4 years','Every 5 years','Every 6 years'], correct:1, explanation:'Presidential and parliamentary elections are held every 4 years in Ghana.', difficulty:'intermediate', grade:5, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Governance and Democracy', points:150, timeLimit:15 },
          ]
        },
        {
          name: 'Ghanaian Culture and Traditions',
          questions: [
            { id:'ss-c-1', text:'What is the national symbol on the Ghana flag\'s centre?', options:['A star','A black star','A crescent moon','A cross'], correct:1, explanation:'The black star on the Ghana flag represents African freedom. The flag has red, gold and green stripes.', difficulty:'beginner', grade:2, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Ghanaian Culture and Traditions', points:100, timeLimit:15 },
            { id:'ss-c-2', text:'Kente cloth is traditionally woven by which Ghanaian ethnic group?', options:['Ga','Ewe and Asante','Dagomba','Fante'], correct:1, explanation:'Kente cloth is traditionally woven by the Asante (Ashanti) and Ewe peoples of Ghana. Each pattern has meaning.', difficulty:'intermediate', grade:5, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Ghanaian Culture and Traditions', points:150, timeLimit:20 },
            { id:'ss-c-3', text:'What language is spoken by the most people in Ghana as a first language?', options:['Twi (Akan)','English','Hausa','Ewe'], correct:0, explanation:'Twi (an Akan language) is spoken by the most Ghanaians as a first language. English is the official language.', difficulty:'intermediate', grade:4, subject:'Social Studies', strand:'My Country Ghana', subStrand:'Ghanaian Culture and Traditions', points:150, timeLimit:15 },
          ]
        },
      ]
    },
    {
      name: 'Africa and the World', icon: '🌍', color: '#f59e0b',
      subStrands: [
        {
          name: 'History of Africa',
          questions: [
            { id:'ss-a-1', text:'Which was the largest empire in West Africa in the 13th–17th centuries?', options:['Ghana Empire','Songhai Empire','Mali Empire','Oyo Empire'], correct:1, explanation:'The Songhai Empire was the largest in West African history, covering much of the western Sahel at its peak.', difficulty:'advanced', grade:8, subject:'Social Studies', strand:'Africa and the World', subStrand:'History of Africa', points:250, timeLimit:25 },
            { id:'ss-a-2', text:'What is ECOWAS?', options:['A Ghanaian political party','Economic Community of West African States','Eastern Community of West African Schools','Education Council of West Africa'], correct:1, explanation:'ECOWAS (Economic Community of West African States) is a regional bloc of 15 West African countries promoting trade and cooperation.', difficulty:'intermediate', grade:7, subject:'Social Studies', strand:'Africa and the World', subStrand:'History of Africa', points:200, timeLimit:20 },
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// RME (Religious and Moral Education)
// ─────────────────────────────────────────────────────────────
const RME: GESSubject = {
  name: 'RME', icon: '🕊️', color: '#f59e0b',
  coverColor: 'from-amber-500 to-yellow-600',
  strands: [
    {
      name: 'Religious Beliefs', icon: '🙏', color: '#f59e0b',
      subStrands: [
        {
          name: 'Christianity',
          questions: [
            { id:'rme-c-1', text:'The Bible is divided into two main parts. What are they?', options:['Genesis and Revelation','Psalms and Proverbs','Old Testament and New Testament','Torah and Gospel'], correct:2, explanation:'The Bible has the Old Testament (before Jesus) and the New Testament (about Jesus and early church).', difficulty:'beginner', grade:2, subject:'RME', strand:'Religious Beliefs', subStrand:'Christianity', points:100, timeLimit:15 },
            { id:'rme-c-2', text:'How many books are in the Bible?', options:['60','66','70','72'], correct:1, explanation:'The Protestant Bible has 66 books: 39 in the Old Testament and 27 in the New Testament.', difficulty:'intermediate', grade:5, subject:'RME', strand:'Religious Beliefs', subStrand:'Christianity', points:150, timeLimit:15 },
          ]
        },
        {
          name: 'Islam',
          questions: [
            { id:'rme-i-1', text:'What is the holy book of Islam called?', options:['Bible','Torah','Quran','Vedas'], correct:2, explanation:'The Quran (Koran) is the holy scripture of Islam, believed to be the word of God revealed to Prophet Muhammad.', difficulty:'beginner', grade:3, subject:'RME', strand:'Religious Beliefs', subStrand:'Islam', points:100, timeLimit:15 },
            { id:'rme-i-2', text:'How many times a day do Muslims pray?', options:['3','4','5','7'], correct:2, explanation:'Muslims perform Salah (prayer) 5 times daily: Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset), Isha (night).', difficulty:'beginner', grade:3, subject:'RME', strand:'Religious Beliefs', subStrand:'Islam', points:100, timeLimit:15 },
          ]
        },
        {
          name: 'African Traditional Religion',
          questions: [
            { id:'rme-a-1', text:'In African Traditional Religion, what is the Supreme Being commonly called in Akan?', options:['Allah','Jehovah','Onyame (Nyame)','Ogun'], correct:2, explanation:'In Akan religion, Onyame (or Nyame) is the name for the Supreme Being — the all-powerful creator God.', difficulty:'intermediate', grade:4, subject:'RME', strand:'Religious Beliefs', subStrand:'African Traditional Religion', points:150, timeLimit:20 },
          ]
        },
      ]
    },
    {
      name: 'Moral Values', icon: '💚', color: '#10b981',
      subStrands: [
        {
          name: 'Values and Character',
          questions: [
            { id:'rme-v-1', text:'Which of these best describes integrity?', options:['Being very rich','Being honest and having strong moral principles','Being popular','Being physically strong'], correct:1, explanation:'Integrity means being honest, having strong moral principles, and doing the right thing even when no one is watching.', difficulty:'beginner', grade:4, subject:'RME', strand:'Moral Values', subStrand:'Values and Character', points:100, timeLimit:20 },
            { id:'rme-v-2', text:'What does "compassion" mean?', options:['Feeling happy for yourself','Feeling and showing sympathy for others','Being selfish','Ignoring others\' problems'], correct:1, explanation:'Compassion is empathy in action — feeling concern for others who are suffering and wanting to help them.', difficulty:'beginner', grade:4, subject:'RME', strand:'Moral Values', subStrand:'Values and Character', points:100, timeLimit:20 },
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────────────────────────
const HISTORY: GESSubject = {
  name: 'History', icon: '🏛️', color: '#ef4444',
  coverColor: 'from-red-600 to-rose-700',
  strands: [
    {
      name: 'Pre-Colonial Africa', icon: '🏺', color: '#f59e0b',
      subStrands: [
        {
          name: 'Ancient Ghana Empire',
          questions: [
            { id:'h-g-1', text:'The Ancient Ghana Empire was famous for trade in which two commodities?', options:['Oil and timber','Gold and salt','Diamonds and ivory','Cotton and spices'], correct:1, explanation:'The Ghana Empire (c. 300–1200 AD) controlled the trans-Saharan trade in gold (from the south) and salt (from the Sahara).', difficulty:'intermediate', grade:6, subject:'History', strand:'Pre-Colonial Africa', subStrand:'Ancient Ghana Empire', points:200, timeLimit:20 },
            { id:'h-g-2', text:'Where was the Ancient Ghana Empire located?', options:['Present-day Ghana','Present-day Nigeria','Parts of present-day Mali and Mauritania','Present-day Senegal'], correct:2, explanation:'Despite the same name, Ancient Ghana Empire was located in present-day southeastern Mauritania and western Mali — not modern Ghana.', difficulty:'advanced', grade:7, subject:'History', strand:'Pre-Colonial Africa', subStrand:'Ancient Ghana Empire', points:250, timeLimit:25 },
          ]
        },
        {
          name: 'The Slave Trade',
          questions: [
            { id:'h-s-1', text:'The transatlantic slave trade mainly transported enslaved Africans to which region?', options:['Europe','Asia','The Americas','Australia'], correct:2, explanation:'The transatlantic slave trade (16th–19th centuries) forcibly transported millions of Africans to work as slaves in the Americas.', difficulty:'intermediate', grade:7, subject:'History', strand:'Pre-Colonial Africa', subStrand:'The Slave Trade', points:200, timeLimit:20 },
            { id:'h-s-2', text:'Which Ghanaian fort was a major holding point for enslaved people?', options:['Fort Victoria','Cape Coast Castle','Fort Amsterdam','Christiansborg Castle'], correct:1, explanation:'Cape Coast Castle (and Elmina Castle) were major slave trade forts on Ghana\'s coast. Now UNESCO World Heritage Sites.', difficulty:'intermediate', grade:7, subject:'History', strand:'Pre-Colonial Africa', subStrand:'The Slave Trade', points:200, timeLimit:20 },
          ]
        },
      ]
    },
    {
      name: 'Colonial Period', icon: '🗺️', color: '#8b5cf6',
      subStrands: [
        {
          name: 'British Rule in Ghana',
          questions: [
            { id:'h-b-1', text:'What was Ghana called under British colonial rule?', options:['Gold Fields','Gold Land','Gold Coast','Goldland'], correct:2, explanation:'Ghana was called the "Gold Coast" by British colonizers due to the abundant gold found along its coastline.', difficulty:'beginner', grade:5, subject:'History', strand:'Colonial Period', subStrand:'British Rule in Ghana', points:100, timeLimit:15 },
            { id:'h-b-2', text:'Who led the Big Six that campaigned for Ghana\'s independence?', options:['J.B. Danquah only','Kwame Nkrumah only','The Big Six including Danquah, Nkrumah, Ofori Atta, Ako Adjei, Akufo, and Obetsebi Lamptey','The United Gold Coast Convention alone'], correct:2, explanation:'The Big Six were arrested in 1948: J.B. Danquah, Kwame Nkrumah, Ebenezer Ako Adjei, Edward Akufo-Addo, Emmanuel Obetsebi-Lamptey, and William Ofori-Atta.', difficulty:'advanced', grade:8, subject:'History', strand:'Colonial Period', subStrand:'British Rule in Ghana', points:300, timeLimit:30 },
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// COMPUTING / ICT
// ─────────────────────────────────────────────────────────────
const COMPUTING: GESSubject = {
  name: 'Computing', icon: '💻', color: '#06b6d4',
  coverColor: 'from-cyan-500 to-blue-600',
  strands: [
    {
      name: 'Computing Systems', icon: '🖥️', color: '#06b6d4',
      subStrands: [
        {
          name: 'Hardware and Software',
          questions: [
            { id:'ict-h-1', text:'Which of these is an INPUT device?', options:['Monitor','Printer','Keyboard','Speaker'], correct:2, explanation:'Input devices send data INTO a computer. A keyboard is used to type/input data. Output devices show results.', difficulty:'beginner', grade:3, subject:'Computing', strand:'Computing Systems', subStrand:'Hardware and Software', points:100, timeLimit:15 },
            { id:'ict-h-2', text:'What does CPU stand for?', options:['Central Program Unit','Computer Processing Unit','Central Processing Unit','Computer Power Unit'], correct:2, explanation:'CPU = Central Processing Unit — the "brain" of the computer that performs calculations and runs programs.', difficulty:'beginner', grade:4, subject:'Computing', strand:'Computing Systems', subStrand:'Hardware and Software', points:100, timeLimit:15 },
            { id:'ict-h-3', text:'What is RAM used for?', options:['Permanent storage','Temporary working memory','Printing documents','Connecting to internet'], correct:1, explanation:'RAM (Random Access Memory) is temporary memory the computer uses to run programs currently in use. It clears when powered off.', difficulty:'intermediate', grade:5, subject:'Computing', strand:'Computing Systems', subStrand:'Hardware and Software', points:150, timeLimit:20 },
            { id:'ict-h-4', text:'Which of these is an example of software?', options:['Keyboard','Hard drive','Microsoft Word','Monitor'], correct:2, explanation:'Software = programs and applications. Microsoft Word is software. Hardware = physical components you can touch.', difficulty:'beginner', grade:4, subject:'Computing', strand:'Computing Systems', subStrand:'Hardware and Software', points:100, timeLimit:15 },
            { id:'ict-h-5', text:'What is the function of a router?', options:['Stores data','Prints documents','Connects devices to the internet and networks','Plays videos'], correct:2, explanation:'A router directs network traffic, connecting devices to each other and to the internet.', difficulty:'intermediate', grade:7, subject:'Computing', strand:'Computing Systems', subStrand:'Hardware and Software', points:200, timeLimit:20 },
          ]
        },
        {
          name: 'Internet and Safety',
          questions: [
            { id:'ict-i-1', text:'What does "WWW" stand for?', options:['World Wide Website','World Wide Web','Wide World Web','World Web Wide'], correct:1, explanation:'WWW = World Wide Web — the system of interconnected websites and pages accessible via the internet.', difficulty:'beginner', grade:4, subject:'Computing', strand:'Computing Systems', subStrand:'Internet and Safety', points:100, timeLimit:15 },
            { id:'ict-i-2', text:'What is a strong password?', options:['Your name','123456','A mix of letters, numbers and symbols','Your birthday'], correct:2, explanation:'A strong password uses uppercase and lowercase letters, numbers, and special characters. Never use obvious information.', difficulty:'beginner', grade:5, subject:'Computing', strand:'Computing Systems', subStrand:'Internet and Safety', points:100, timeLimit:20 },
            { id:'ict-i-3', text:'What is cyberbullying?', options:['Playing video games too much','Bullying someone using digital technology','A type of computer virus','Spending too much time on social media'], correct:1, explanation:'Cyberbullying is using technology (social media, messages, online games) to harass, threaten, or embarrass someone.', difficulty:'intermediate', grade:6, subject:'Computing', strand:'Computing Systems', subStrand:'Internet and Safety', points:150, timeLimit:20 },
          ]
        },
      ]
    },
    {
      name: 'Programming', icon: '👨‍💻', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Algorithms and Problem Solving',
          questions: [
            { id:'ict-p-1', text:'What is an algorithm?', options:['A type of computer','A step-by-step set of instructions to solve a problem','A programming language','A storage device'], correct:1, explanation:'An algorithm is a precise sequence of instructions to solve a problem or complete a task. Recipes and directions are everyday algorithms.', difficulty:'beginner', grade:5, subject:'Computing', strand:'Programming', subStrand:'Algorithms and Problem Solving', points:100, timeLimit:20 },
            { id:'ict-p-2', text:'In Scratch, what category contains the "move 10 steps" block?', options:['Looks','Sound','Motion','Control'], correct:2, explanation:'In Scratch, movement blocks like "move 10 steps" and "turn" are in the Motion category (blue blocks).', difficulty:'beginner', grade:5, subject:'Computing', strand:'Programming', subStrand:'Algorithms and Problem Solving', points:100, timeLimit:20 },
            { id:'ict-p-3', text:'What does a loop do in programming?', options:['Stops the program','Repeats a set of instructions','Stores data','Connects to internet'], correct:1, explanation:'A loop repeats a block of code multiple times, saving you from writing the same code over and over.', difficulty:'beginner', grade:6, subject:'Computing', strand:'Programming', subStrand:'Algorithms and Problem Solving', points:150, timeLimit:20 },
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// MASTER LIST
// ─────────────────────────────────────────────────────────────
export const GES_SUBJECTS: GESSubject[] = [
  MATHEMATICS,
  SCIENCE,
  ENGLISH,
  SOCIAL_STUDIES,
  RME,
  HISTORY,
  COMPUTING,
];

/** Get all questions matching filters */
export function getGESQuestions(filters: {
  subject?: string;
  strand?: string;
  subStrand?: string;
  grade?: number;
  difficulty?: string;
}): GESQuestion[] {
  const all: GESQuestion[] = [];
  for (const subj of GES_SUBJECTS) {
    if (filters.subject && subj.name !== filters.subject) continue;
    for (const strand of subj.strands) {
      if (filters.strand && strand.name !== filters.strand) continue;
      for (const ss of strand.subStrands) {
        if (filters.subStrand && ss.name !== filters.subStrand) continue;
        for (const q of ss.questions) {
          if (filters.grade && q.grade !== filters.grade) continue;
          if (filters.difficulty && q.difficulty !== filters.difficulty) continue;
          all.push(q);
        }
      }
    }
  }
  return all;
}

/** Convert GES questions to Quiz format */
export function gesQuestionsToQuiz(
  questions: GESQuestion[],
  title: string,
  subject: string,
  grade: string,
  coverColor: string,
  icon: string
) {
  return {
    id: 'ges-' + Date.now(),
    title,
    description: `GES Curriculum — ${subject} — ${grade}`,
    subject,
    grade,
    coverColor,
    icon,
    playCount: 0,
    createdAt: new Date().toISOString(),
    questions: questions.map(q => ({
      id: q.id,
      text: q.text,
      type: 'multiple-choice' as const,
      timeLimit: q.timeLimit,
      points: q.points,
      explanation: q.explanation,
      answers: q.options.map((opt, i) => ({
        id: `${q.id}-a${i}`,
        text: opt,
        isCorrect: i === q.correct,
        color: ['#E21B3C','#1368CE','#26890C','#FFA602'][i],
        icon: ['▲','◆','●','★'][i],
      }))
    }))
  };
}
