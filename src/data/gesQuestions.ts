// GES New Curriculum — Complete Question Bank
// Based on official GES curriculum structure, WAEC-style questions
// Grades 1–9 (Basic 1–9), all core subjects

export interface GESQuestion {
  id: string;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  grade: number; // 1-9
  subject: string;
  strand: string;
  subStrand: string;
  points: number;
  timeLimit: number;
}

export interface GESSubStrand { name: string; questions: GESQuestion[]; }
export interface GESStrand    { name: string; icon: string; color: string; subStrands: GESSubStrand[]; }
export interface GESSubject   { name: string; icon: string; color: string; coverColor: string; strands: GESStrand[]; }

// ─────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────
let _id = 0;
function q(
  text: string, options: string[], correct: number, explanation: string,
  difficulty: 'beginner'|'intermediate'|'advanced', grade: number,
  subject: string, strand: string, subStrand: string
): GESQuestion {
  _id++;
  const pts = difficulty === 'beginner' ? 100 : difficulty === 'intermediate' ? 200 : 300;
  const time = difficulty === 'beginner' ? 15 : difficulty === 'intermediate' ? 25 : 35;
  return { id: `ges-${_id}`, text, options, correct, explanation, difficulty, grade, subject, strand, subStrand, points: pts, timeLimit: time };
}

// ─────────────────────────────────────────────────────────────
// 1. MATHEMATICS
// ─────────────────────────────────────────────────────────────
const M = 'Mathematics';
const MATHS: GESSubject = {
  name: M, icon: '🔢', color: '#3b82f6', coverColor: 'from-blue-600 to-indigo-700',
  strands: [
    {
      name: 'Number', icon: '🔢', color: '#3b82f6',
      subStrands: [
        {
          name: 'Counting',
          questions: [
            q('What comes after 19?','20,18,21,15'.split(','),0,'After 19 comes 20. We count: 17,18,19,20.','beginner',1,M,'Number','Counting'),
            q('Count backwards from 10. What comes after 8?','9,7,6,5'.split(','),1,'When counting backwards: 10,9,8,7. So after 8 comes 7.','beginner',1,M,'Number','Counting'),
            q('How many tens are in 70?','6,7,8,5'.split(','),1,'70 = 7 groups of 10. So there are 7 tens.','beginner',2,M,'Number','Counting'),
            q('What is the next even number after 14?','13,15,16,17'.split(','),2,'Even numbers: 10,12,14,16. The next even number after 14 is 16.','beginner',2,M,'Number','Counting'),
            q('What is the next odd number after 21?','22,23,24,20'.split(','),1,'Odd numbers: 19,21,23. The next odd number after 21 is 23.','beginner',2,M,'Number','Counting'),
            q('How many hundreds are in 500?','4,5,6,3'.split(','),1,'500 = 5 × 100. There are 5 hundreds in 500.','beginner',3,M,'Number','Counting'),
            q('Count by 5s: 5, 10, 15, ___','18,20,25,22'.split(','),1,'Counting by 5s: 5,10,15,20. The next is 20.','beginner',2,M,'Number','Counting'),
            q('Count by 3s: 3, 6, 9, ___','10,12,13,11'.split(','),1,'Counting by 3s: 3,6,9,12.','beginner',2,M,'Number','Counting'),
            q('What is the greatest number you can make with digits 3, 7, 1?','137,317,731,173'.split(','),2,'To make the greatest number, put the largest digit first: 7,3,1 → 731.','intermediate',3,M,'Number','Counting'),
            q('Round 347 to the nearest ten.','340,350,300,360'.split(','),0,'The ones digit is 7 (≥5), so round up: 347 → 350. Wait — the tens digit is 4, ones is 7: round up to 350.','intermediate',4,M,'Number','Counting'),
            q('Round 2,456 to the nearest hundred.','2,400,2,500,2,000,2,460'.split(','),1,'The tens digit is 5, so round up. 2,456 → 2,500.','intermediate',4,M,'Number','Counting'),
            q('What is the place value of 6 in 3,642?','Ones,Tens,Hundreds,Thousands'.split(','),2,'In 3,642: 3=thousands, 6=hundreds, 4=tens, 2=ones. So 6 is in the hundreds place.','beginner',3,M,'Number','Counting'),
            q('Write 4,000 + 300 + 20 + 7 as one number.','4,032,4,327,4,237,43,027'.split(','),1,'Expanded form: 4000+300+20+7 = 4,327.','beginner',3,M,'Number','Counting'),
            q('What is the value of 5 in 25,436?','5,50,500,5000'.split(','),3,'In 25,436: the 5 is in the thousands place. Value = 5 × 1,000 = 5,000.','intermediate',5,M,'Number','Counting'),
          ]
        },
        {
          name: 'Operations',
          questions: [
            q('What is 45 + 37?','72,82,73,80'.split(','),1,'45 + 37: 5+7=12 (write 2 carry 1). 4+3+1=8. Answer: 82.','beginner',2,M,'Number','Operations'),
            q('What is 93 − 48?','45,55,35,44'.split(','),0,'93 − 48: 13−8=5, 8−4=4 (after borrowing). Answer: 45.','beginner',2,M,'Number','Operations'),
            q('What is 7 × 8?','54,56,63,48'.split(','),1,'7 × 8 = 56. (7×8 is a core times table fact.)','beginner',3,M,'Number','Operations'),
            q('What is 63 ÷ 9?','6,7,8,9'.split(','),1,'63 ÷ 9 = 7 because 9 × 7 = 63.','beginner',3,M,'Number','Operations'),
            q('What is 12 × 12?','124,136,144,148'.split(','),2,'12 × 12 = 144. (12×10=120, 12×2=24, 120+24=144)','intermediate',4,M,'Number','Operations'),
            q('What is 245 + 378?','513,623,623,623'.split(','),1,'245 + 378: ones:5+8=13(carry1), tens:4+7+1=12(carry1), hundreds:2+3+1=6. Answer: 623.','intermediate',4,M,'Number','Operations'),
            q('What is 504 − 267?','237,247,267,233'.split(','),0,'504 − 267 = 237. (Borrow from hundreds: 104−67=37, then 4−2=2 → 237)','intermediate',4,M,'Number','Operations'),
            q('What is 34 × 25?','750,850,650,800'.split(','),1,'34 × 25: 34×20=680, 34×5=170. 680+170=850.','intermediate',5,M,'Number','Operations'),
            q('What is 576 ÷ 8?','62,72,82,92'.split(','),1,'576 ÷ 8 = 72. (8×70=560, 576−560=16, 16÷8=2. Total: 72)','intermediate',5,M,'Number','Operations'),
            q('What is the LCM of 4 and 6?','8,12,24,6'.split(','),1,'Multiples of 4: 4,8,12. Multiples of 6: 6,12. LCM = 12.','intermediate',6,M,'Number','Operations'),
            q('What is the HCF of 12 and 18?','3,6,9,12'.split(','),1,'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. HCF = 6.','intermediate',6,M,'Number','Operations'),
            q('What is 3² + 4²?','25,14,7,49'.split(','),0,'3² = 9, 4² = 16. 9 + 16 = 25.','intermediate',6,M,'Number','Operations'),
            q('What is √144?','11,12,13,14'.split(','),1,'√144 = 12 because 12 × 12 = 144.','intermediate',7,M,'Number','Operations'),
            q('Evaluate: 2³ × 3²','48,72,36,54'.split(','),1,'2³ = 8, 3² = 9. 8 × 9 = 72.','advanced',8,M,'Number','Operations'),
            q('What is 1,024 ÷ 32?','28,32,36,24'.split(','),1,'1024 ÷ 32 = 32. (32 × 32 = 1024)','advanced',8,M,'Number','Operations'),
          ]
        },
        {
          name: 'Fractions',
          questions: [
            q('What fraction of this shape is shaded if 1 out of 4 parts is shaded?','1/2,1/4,1/3,2/4'.split(','),1,'1 shaded out of 4 total parts = 1/4.','beginner',2,M,'Number','Fractions'),
            q('What is ½ of 20?','8,10,12,5'.split(','),1,'½ of 20 = 20 ÷ 2 = 10.','beginner',2,M,'Number','Fractions'),
            q('Which fraction is equivalent to 2/4?','1/3,1/2,2/3,3/4'.split(','),1,'2/4 = 1/2. Divide top and bottom by 2.','beginner',3,M,'Number','Fractions'),
            q('What is 1/3 + 1/3?','1/6,2/6,2/3,1/3'.split(','),2,'Same denominators: 1/3 + 1/3 = 2/3.','beginner',3,M,'Number','Fractions'),
            q('What is 3/4 of 24?','12,16,18,20'.split(','),2,'3/4 of 24 = (24÷4)×3 = 6×3 = 18.','intermediate',4,M,'Number','Fractions'),
            q('Arrange in ascending order: 3/4, 1/2, 1/4','3/4,1/2,1/4|1/4,1/2,3/4|1/2,1/4,3/4|1/4,3/4,1/2'.split('|'),1,'Convert: 1/4=0.25, 1/2=0.5, 3/4=0.75. Ascending: 1/4, 1/2, 3/4.','intermediate',4,M,'Number','Fractions'),
            q('Simplify 12/16 to its lowest terms.','3/4,6/8,4/5,2/3'.split(','),0,'GCD of 12 and 16 is 4. 12÷4=3, 16÷4=4. So 12/16 = 3/4.','intermediate',4,M,'Number','Fractions'),
            q('What is 2/3 + 3/4?','5/7,17/12,5/12,11/12'.split(','),1,'LCD = 12. 2/3=8/12, 3/4=9/12. 8/12+9/12 = 17/12 = 1 5/12.','intermediate',5,M,'Number','Fractions'),
            q('What is 5/6 − 1/4?','4/2,7/12,4/6,2/3'.split(','),1,'LCD = 12. 5/6=10/12, 1/4=3/12. 10/12−3/12 = 7/12.','intermediate',5,M,'Number','Fractions'),
            q('What is 2/3 × 3/5?','5/8,6/15,2/5,6/8'.split(','),2,'Multiply numerators: 2×3=6. Multiply denominators: 3×5=15. 6/15 = 2/5.','intermediate',5,M,'Number','Fractions'),
            q('What is 3/4 ÷ 1/2?','3/8,3/2,6/4,1/2'.split(','),1,'Dividing by a fraction: multiply by its reciprocal. 3/4 × 2/1 = 6/4 = 3/2 = 1½.','intermediate',6,M,'Number','Fractions'),
            q('Convert 7/4 to a mixed number.','1¾,2¼,1¼,2¾'.split(','),0,'7÷4 = 1 remainder 3. So 7/4 = 1¾.','intermediate',5,M,'Number','Fractions'),
            q('Convert 2⅗ to an improper fraction.','11/5,13/5,12/5,10/5'.split(','),1,'2⅗: (2×5)+3 = 13. Answer: 13/5.','intermediate',6,M,'Number','Fractions'),
          ]
        },
        {
          name: 'Decimals and Percentages',
          questions: [
            q('Write 0.5 as a fraction.','1/4,1/2,1/5,1/3'.split(','),1,'0.5 = 5/10 = 1/2.','beginner',4,M,'Number','Decimals and Percentages'),
            q('What is 0.3 + 0.7?','0.10,1.0,0.37,10'.split(','),1,'0.3 + 0.7 = 1.0.','beginner',4,M,'Number','Decimals and Percentages'),
            q('What is 25% of 80?','15,20,25,10'.split(','),1,'25% = 1/4. 80 ÷ 4 = 20.','intermediate',5,M,'Number','Decimals and Percentages'),
            q('Express 3/5 as a percentage.','35%,50%,60%,65%'.split(','),2,'3/5 × 100% = 60%.','intermediate',5,M,'Number','Decimals and Percentages'),
            q('Express 0.65 as a percentage.','6.5%,65%,650%,0.65%'.split(','),1,'Multiply by 100: 0.65 × 100 = 65%.','intermediate',5,M,'Number','Decimals and Percentages'),
            q('A shirt costs GH₵120. There is a 15% discount. Find the discount.','GH₵15,GH₵18,GH₵20,GH₵12'.split(','),1,'15% of 120 = (15/100) × 120 = 18. Discount = GH₵18.','intermediate',6,M,'Number','Decimals and Percentages'),
            q('What is 0.4 × 0.3?','1.2,0.12,0.012,12'.split(','),1,'0.4 × 0.3: 4×3=12. 2 decimal places: 0.12.','intermediate',6,M,'Number','Decimals and Percentages'),
            q('A student scored 45 out of 60. What percentage is this?','65%,70%,75%,80%'.split(','),2,'(45/60) × 100 = 75%.','intermediate',6,M,'Number','Decimals and Percentages'),
            q('Increase GH₵200 by 10%.','GH₵210,GH₵220,GH₵240,GH₵180'.split(','),1,'10% of 200 = 20. 200 + 20 = GH₵220.','intermediate',6,M,'Number','Decimals and Percentages'),
            q('What is 12.5% as a fraction in lowest terms?','1/8,1/4,1/6,1/5'.split(','),0,'12.5% = 12.5/100 = 1/8.','advanced',7,M,'Number','Decimals and Percentages'),
            q('A profit of GH₵60 is made on an item costing GH₵240. Find the % profit.','20%,25%,30%,15%'.split(','),1,'% profit = (60/240) × 100 = 25%.','advanced',8,M,'Number','Decimals and Percentages'),
          ]
        },
        {
          name: 'Ratio and Proportion',
          questions: [
            q('Simplify the ratio 10:15.','5:10,2:3,1:2,3:5'.split(','),1,'GCD of 10 and 15 is 5. 10÷5:15÷5 = 2:3.','intermediate',5,M,'Number','Ratio and Proportion'),
            q('Divide GH₵90 in the ratio 2:1.','GH₵45 and GH₵45,GH₵60 and GH₵30,GH₵30 and GH₵60,GH₵50 and GH₵40'.split(','),1,'Total parts = 3. Each part = 90÷3 = 30. Shares: 2×30=60, 1×30=30.','intermediate',6,M,'Number','Ratio and Proportion'),
            q('If 3 pens cost GH₵12, how much do 7 pens cost?','GH₵24,GH₵28,GH₵32,GH₵21'.split(','),1,'Cost per pen = 12÷3 = GH₵4. 7 pens = 7×4 = GH₵28.','intermediate',5,M,'Number','Ratio and Proportion'),
            q('A car travels 240 km in 4 hours. How far does it travel in 7 hours?','360 km,400 km,420 km,380 km'.split(','),2,'Speed = 240÷4 = 60 km/h. In 7 hours: 60×7 = 420 km.','intermediate',6,M,'Number','Ratio and Proportion'),
            q('The ratio of boys to girls in a class is 3:2. If there are 30 students, how many are girls?','10,12,15,18'.split(','),1,'Total parts = 5. Girls = (2/5) × 30 = 12.','intermediate',6,M,'Number','Ratio and Proportion'),
            q('If x is directly proportional to y and x=6 when y=18, find x when y=30.','8,10,12,15'.split(','),1,'x/y = 6/18 = 1/3. When y=30: x = 30/3 = 10.','advanced',8,M,'Number','Ratio and Proportion'),
          ]
        },
        {
          name: 'Integers and Directed Numbers',
          questions: [
            q('What is −3 + 7?','−4,4,10,−10'.split(','),1,'On the number line: start at −3, move 7 right → 4.','intermediate',6,M,'Number','Integers and Directed Numbers'),
            q('What is −5 − 2?','−3,7,−7,3'.split(','),2,'−5 − 2 = −7. Moving further left on the number line.','intermediate',6,M,'Number','Integers and Directed Numbers'),
            q('What is (−4) × (−3)?','−12,7,12,−7'.split(','),2,'Negative × Negative = Positive. (−4)(−3) = +12.','intermediate',7,M,'Number','Integers and Directed Numbers'),
            q('What is (−15) ÷ 3?','5,−5,−45,45'.split(','),1,'Negative ÷ Positive = Negative. −15 ÷ 3 = −5.','intermediate',7,M,'Number','Integers and Directed Numbers'),
            q('The temperature was −4°C. It rose by 9°C. What is the new temperature?','−13°C,5°C,−5°C,13°C'.split(','),1,'−4 + 9 = 5°C.','intermediate',6,M,'Number','Integers and Directed Numbers'),
            q('Arrange in order: −3, 0, −7, 2, −1','−7,−3,−1,0,2|0,−1,−3,−7,2|2,0,−1,−3,−7|−1,−3,−7,0,2'.split('|'),0,'Negative numbers are less than 0. Further left = smaller. Order: −7,−3,−1,0,2.','intermediate',7,M,'Number','Integers and Directed Numbers'),
            q('What is the absolute value of −8?','−8,0,8,−1/8'.split(','),2,'Absolute value is the distance from 0. |−8| = 8.','intermediate',7,M,'Number','Integers and Directed Numbers'),
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
            q('What comes next: 2, 4, 6, 8, ___?','9,10,11,12'.split(','),1,'Add 2 each time: 2,4,6,8,10.','beginner',2,M,'Algebra','Patterns and Sequences'),
            q('What comes next: 1, 3, 5, 7, ___?','8,9,10,11'.split(','),1,'Odd numbers: add 2 each time. 7+2=9.','beginner',2,M,'Algebra','Patterns and Sequences'),
            q('Find the next term: 2, 6, 18, 54, ___','108,162,72,216'.split(','),1,'Multiply by 3 each time: 54×3=162.','intermediate',5,M,'Algebra','Patterns and Sequences'),
            q('What is the 8th term of: 3, 6, 9, 12, ...?','21,24,27,18'.split(','),1,'Formula: 3n. When n=8: 3×8=24.','intermediate',6,M,'Algebra','Patterns and Sequences'),
            q('Find the next: 1, 4, 9, 16, 25, ___','30,36,35,42'.split(','),1,'Perfect squares: 1²,2²,3²,4²,5²,6²=36.','intermediate',5,M,'Algebra','Patterns and Sequences'),
            q('The nth term of a sequence is 2n+1. What is the 10th term?','19,21,23,25'.split(','),1,'2(10)+1 = 20+1 = 21.','intermediate',7,M,'Algebra','Patterns and Sequences'),
          ]
        },
        {
          name: 'Variables and Equations',
          questions: [
            q('Solve: x + 8 = 15','x=5,x=7,x=23,x=6'.split(','),1,'x = 15 − 8 = 7.','beginner',4,M,'Algebra','Variables and Equations'),
            q('Solve: 4y = 28','y=4,y=7,y=8,y=6'.split(','),1,'y = 28 ÷ 4 = 7.','beginner',5,M,'Algebra','Variables and Equations'),
            q('Solve: 3x − 5 = 10','x=3,x=5,x=4,x=6'.split(','),1,'3x = 15, x = 5.','intermediate',6,M,'Algebra','Variables and Equations'),
            q('Solve: 2x + 3 = x + 7','x=2,x=4,x=3,x=5'.split(','),1,'2x − x = 7 − 3, x = 4.','intermediate',7,M,'Algebra','Variables and Equations'),
            q('If 5a − 2 = 3a + 6, find a.','a=2,a=4,a=6,a=3'.split(','),1,'2a = 8, a = 4.','intermediate',7,M,'Algebra','Variables and Equations'),
            q('Expand: 3(2x + 5)','6x+5,6x+15,5x+15,6x+8'.split(','),1,'3×2x = 6x, 3×5 = 15. Answer: 6x+15.','intermediate',7,M,'Algebra','Variables and Equations'),
            q('Factorise: 6x + 9','3(2x+3),6(x+9),2(3x+9),9(x+3)'.split(','),0,'HCF of 6 and 9 is 3. 6x+9 = 3(2x+3).','intermediate',7,M,'Algebra','Variables and Equations'),
            q('Solve the inequality: 2x + 1 > 7','x>2,x>3,x>4,x>1'.split(','),1,'2x > 6, x > 3.','advanced',8,M,'Algebra','Variables and Equations'),
            q('Solve simultaneously: x+y=10, x−y=4','x=7,y=3|x=6,y=4|x=8,y=2|x=5,y=5'.split('|'),0,'Add: 2x=14, x=7. Then y=10−7=3.','advanced',9,M,'Algebra','Variables and Equations'),
          ]
        },
        {
          name: 'Indices and Logarithms',
          questions: [
            q('What is 2⁴?','8,16,32,12'.split(','),1,'2⁴ = 2×2×2×2 = 16.','intermediate',7,M,'Algebra','Indices and Logarithms'),
            q('Simplify: 3² × 3³','3⁵,3⁶,9⁵,6³'.split(','),0,'Same base: add powers. 3^(2+3) = 3⁵.','intermediate',7,M,'Algebra','Indices and Logarithms'),
            q('What is 5⁰?','0,1,5,25'.split(','),1,'Any number to the power 0 = 1.','intermediate',7,M,'Algebra','Indices and Logarithms'),
            q('Simplify: (2³)²','2⁵,2⁶,4⁶,2⁸'.split(','),1,'Power of a power: multiply. 2^(3×2) = 2⁶ = 64.','advanced',8,M,'Algebra','Indices and Logarithms'),
            q('What is 2⁻³?','−8,1/8,−1/8,8'.split(','),1,'Negative exponent: 2⁻³ = 1/2³ = 1/8.','advanced',8,M,'Algebra','Indices and Logarithms'),
            q('Simplify: 6⁴ ÷ 6²','6²,6⁶,6⁸,36²'.split(','),0,'Same base division: subtract powers. 6^(4−2) = 6².','intermediate',8,M,'Algebra','Indices and Logarithms'),
          ]
        },
        {
          name: 'Quadratic Equations',
          questions: [
            q('Solve: x² = 25','x=5 only,x=−5 only,x=5 or x=−5,x=±25'.split(','),2,'x² = 25 → x = ±√25 = ±5.','intermediate',9,M,'Algebra','Quadratic Equations'),
            q('Solve: x² − 7x + 12 = 0','x=3,x=4|x=−3,x=−4|x=3,x=−4|x=−3,x=4'.split('|'),0,'Factorise: (x−3)(x−4)=0. x=3 or x=4.','advanced',9,M,'Algebra','Quadratic Equations'),
            q('Solve: x² − x − 6 = 0','x=2,x=−3|x=−2,x=3|x=3,x=−2|x=3,x=2'.split('|'),1,'(x−3)(x+2)=0. x=3 or x=−2.','advanced',9,M,'Algebra','Quadratic Equations'),
            q('Which values satisfy x² − 4 = 0?','x=2 only,x=−2 only,x=±2,x=±4'.split(','),2,'x² = 4 → x = ±2.','advanced',9,M,'Algebra','Quadratic Equations'),
          ]
        },
      ]
    },
    {
      name: 'Geometry', icon: '📏', color: '#10b981',
      subStrands: [
        {
          name: 'Shapes',
          questions: [
            q('How many sides does a triangle have?','2,3,4,5'.split(','),1,'A triangle has 3 sides and 3 angles.','beginner',1,M,'Geometry','Shapes'),
            q('How many sides does a hexagon have?','5,6,7,8'.split(','),1,'Hexagon: hex = 6 in Greek. 6 sides.','beginner',3,M,'Geometry','Shapes'),
            q('What is the sum of angles in a triangle?','90°,180°,270°,360°'.split(','),1,'The interior angles of any triangle sum to 180°.','beginner',4,M,'Geometry','Shapes'),
            q('What type of triangle has all sides equal?','Isosceles,Scalene,Equilateral,Right-angled'.split(','),2,'Equilateral: all 3 sides equal, all angles = 60°.','beginner',4,M,'Geometry','Shapes'),
            q('What type of angle is 90°?','Acute,Right angle,Obtuse,Reflex'.split(','),1,'A right angle is exactly 90°.','beginner',3,M,'Geometry','Shapes'),
            q('What is the sum of interior angles of a quadrilateral?','180°,270°,360°,450°'.split(','),2,'All quadrilaterals have interior angles summing to 360°.','intermediate',5,M,'Geometry','Shapes'),
            q('A regular polygon has all sides and all angles equal. Which is a regular polygon?','Rectangle,Rhombus,Equilateral triangle,Scalene triangle'.split(','),2,'An equilateral triangle has all equal sides and angles (60° each).','intermediate',5,M,'Geometry','Shapes'),
            q('How many vertices does a cube have?','4,6,8,12'.split(','),2,'A cube has 8 corners (vertices).','beginner',4,M,'Geometry','Shapes'),
            q('What is the sum of angles in a pentagon?','360°,450°,540°,720°'.split(','),2,'Sum = (n−2)×180° = (5−2)×180° = 540°.','advanced',8,M,'Geometry','Shapes'),
          ]
        },
        {
          name: 'Perimeter and Area',
          questions: [
            q('A rectangle is 8cm long and 5cm wide. What is its perimeter?','26cm,40cm,13cm,30cm'.split(','),0,'Perimeter = 2(l+w) = 2(8+5) = 2×13 = 26cm.','beginner',3,M,'Geometry','Perimeter and Area'),
            q('A square has side 7cm. What is its area?','28cm²,49cm²,14cm²,21cm²'.split(','),1,'Area = side² = 7² = 49cm².','beginner',4,M,'Geometry','Perimeter and Area'),
            q('A triangle has base 10cm and height 8cm. Find its area.','80cm²,18cm²,40cm²,20cm²'.split(','),2,'Area = ½ × base × height = ½ × 10 × 8 = 40cm².','intermediate',5,M,'Geometry','Perimeter and Area'),
            q('Find the area of a circle with radius 7cm. (π=22/7)','154cm²,44cm²,142cm²,132cm²'.split(','),0,'Area = πr² = (22/7) × 49 = 154cm².','intermediate',7,M,'Geometry','Perimeter and Area'),
            q('Find the circumference of a circle with diameter 14cm. (π=22/7)','44cm,88cm,22cm,66cm'.split(','),0,'C = πd = (22/7) × 14 = 44cm.','intermediate',7,M,'Geometry','Perimeter and Area'),
            q('A rectangular field is 25m by 12m. What is its area?','74m²,300m²,150m²,264m²'.split(','),1,'Area = l × w = 25 × 12 = 300m².','intermediate',5,M,'Geometry','Perimeter and Area'),
            q('Find the area of a trapezium with parallel sides 8cm and 5cm, height 4cm.','26cm²,30cm²,52cm²,13cm²'.split(','),0,'Area = ½(a+b)×h = ½(8+5)×4 = ½×13×4 = 26cm².','advanced',8,M,'Geometry','Perimeter and Area'),
          ]
        },
        {
          name: 'Pythagoras Theorem',
          questions: [
            q('In a right triangle with legs 3cm and 4cm, find the hypotenuse.','5cm,6cm,7cm,8cm'.split(','),0,'3²+4²=c². 9+16=25. c=5cm. The 3-4-5 triangle!','intermediate',8,M,'Geometry','Pythagoras Theorem'),
            q('Find the missing side: hypotenuse=13cm, one leg=5cm.','8cm,10cm,12cm,11cm'.split(','),2,'5²+b²=13². 25+b²=169. b²=144. b=12cm.','intermediate',8,M,'Geometry','Pythagoras Theorem'),
            q('Is a triangle with sides 6, 8, 10 a right triangle?','Yes,No,Cannot tell,Only if angles given'.split(','),0,'6²+8²=36+64=100=10². Yes, it satisfies Pythagoras.','advanced',9,M,'Geometry','Pythagoras Theorem'),
            q('A ladder 5m long leans against a wall. The foot is 3m from the wall. How high up the wall does it reach?','2m,3m,4m,5m'.split(','),2,'h²+3²=5². h²=25−9=16. h=4m.','advanced',9,M,'Geometry','Pythagoras Theorem'),
          ]
        },
        {
          name: 'Volume',
          questions: [
            q('What is the volume of a cube with side 3cm?','9cm³,18cm³,27cm³,12cm³'.split(','),2,'Volume = side³ = 3³ = 27cm³.','intermediate',6,M,'Geometry','Volume'),
            q('Find the volume of a cuboid 5cm × 4cm × 3cm.','12cm³,60cm³,47cm³,120cm³'.split(','),1,'Volume = l×w×h = 5×4×3 = 60cm³.','intermediate',6,M,'Geometry','Volume'),
            q('What is the volume of a cylinder with radius 7cm and height 10cm? (π=22/7)','1,540cm³,154cm³,440cm³,770cm³'.split(','),0,'V = πr²h = (22/7)×49×10 = 1,540cm³.','advanced',9,M,'Geometry','Volume'),
          ]
        },
      ]
    },
    {
      name: 'Measurement', icon: '📏', color: '#f59e0b',
      subStrands: [
        {
          name: 'Length Mass and Capacity',
          questions: [
            q('How many centimetres are in 1 metre?','10,100,1000,50'.split(','),1,'1 metre = 100 centimetres.','beginner',2,M,'Measurement','Length Mass and Capacity'),
            q('How many metres are in 1 kilometre?','10,100,1000,500'.split(','),2,'1 kilometre = 1,000 metres.','beginner',3,M,'Measurement','Length Mass and Capacity'),
            q('Convert 3.5kg to grams.','350g,3500g,35g,35000g'.split(','),1,'1kg = 1,000g. 3.5kg = 3,500g.','beginner',3,M,'Measurement','Length Mass and Capacity'),
            q('How many millilitres are in 2.5 litres?','250ml,25ml,2500ml,250ml'.split(','),2,'1 litre = 1,000ml. 2.5 litres = 2,500ml.','intermediate',4,M,'Measurement','Length Mass and Capacity'),
            q('A rope is 4.8m long. It is cut into pieces of 60cm each. How many pieces are made?','6,7,8,9'.split(','),2,'4.8m = 480cm. 480 ÷ 60 = 8 pieces.','intermediate',5,M,'Measurement','Length Mass and Capacity'),
          ]
        },
        {
          name: 'Time',
          questions: [
            q('How many minutes are in 1 hour?','30,60,100,90'.split(','),1,'1 hour = 60 minutes.','beginner',1,M,'Measurement','Time'),
            q('How many days are in a leap year?','360,365,366,364'.split(','),2,'A leap year has 366 days (February has 29 days).','beginner',3,M,'Measurement','Time'),
            q('A journey starts at 9:30am and ends at 2:15pm. How long is it?','4h 15min,4h 45min,5h 15min,3h 45min'.split(','),1,'From 9:30 to 2:15: 9:30→2:30 = 5hrs, minus 15min = 4h 45min.','intermediate',5,M,'Measurement','Time'),
            q('Change 3 hours 45 minutes to minutes.','215 min,225 min,235 min,200 min'.split(','),1,'3×60 + 45 = 180 + 45 = 225 minutes.','intermediate',5,M,'Measurement','Time'),
          ]
        },
        {
          name: 'Money',
          questions: [
            q('How many pesewas make 1 Ghana cedi?','10,50,100,200'.split(','),2,'1 Ghana cedi (GH₵1) = 100 pesewas (Gp).','beginner',2,M,'Measurement','Money'),
            q('Kwame has GH₵5. He buys bread for GH₵2.50. How much change does he get?','GH₵2.00,GH₵2.50,GH₵3.00,GH₵1.50'.split(','),1,'GH₵5.00 − GH₵2.50 = GH₵2.50.','beginner',3,M,'Measurement','Money'),
            q('If you earn GH₵450 per week, how much is that per month (4 weeks)?','GH₵1600,GH₵1800,GH₵1500,GH₵2000'.split(','),1,'GH₵450 × 4 = GH₵1,800.','intermediate',5,M,'Measurement','Money'),
          ]
        },
      ]
    },
    {
      name: 'Statistics', icon: '📊', color: '#ef4444',
      subStrands: [
        {
          name: 'Data Collection and Representation',
          questions: [
            q('What type of graph uses bars to show data?','Pie chart,Bar chart,Line graph,Pictogram'.split(','),1,'A bar chart uses rectangular bars to represent data.','beginner',3,M,'Statistics','Data Collection and Representation'),
            q('Which chart shows parts of a whole as slices?','Bar chart,Line graph,Pie chart,Histogram'.split(','),2,'A pie chart divides a circle into sectors showing proportions.','beginner',4,M,'Statistics','Data Collection and Representation'),
            q('The scores are: 5,7,3,8,7,5,7. What is the mode?','5,7,3,8'.split(','),1,'Mode = most frequent value. 7 appears 3 times. Mode = 7.','intermediate',5,M,'Statistics','Data Collection and Representation'),
            q('Find the mean of: 10, 20, 30, 40, 50.','25,30,35,40'.split(','),1,'Mean = sum÷count = 150÷5 = 30.','intermediate',5,M,'Statistics','Data Collection and Representation'),
            q('Find the median of: 4, 1, 7, 2, 9','4,7,2,9'.split(','),0,'Arrange: 1,2,4,7,9. Middle value (3rd) = 4.','intermediate',6,M,'Statistics','Data Collection and Representation'),
            q('Find the range of: 3, 8, 1, 12, 5','11,9,13,7'.split(','),0,'Range = max − min = 12 − 1 = 11.','intermediate',6,M,'Statistics','Data Collection and Representation'),
          ]
        },
        {
          name: 'Probability',
          questions: [
            q('A fair coin is tossed. What is P(head)?','1,0,1/2,1/4'.split(','),2,'A coin has 2 equally likely outcomes. P(head) = 1/2.','beginner',6,M,'Statistics','Probability'),
            q('A die is rolled. What is P(even number)?','1/6,2/6,3/6,4/6'.split(','),2,'Even: 2,4,6 → 3 outcomes. P = 3/6 = 1/2.','intermediate',7,M,'Statistics','Probability'),
            q('A bag has 3 red, 4 blue balls. P(blue) = ?','3/7,4/7,1/2,4/3'.split(','),1,'P(blue) = 4/(3+4) = 4/7.','intermediate',7,M,'Statistics','Probability'),
            q('What is the probability of an impossible event?','1,0,1/2,Cannot tell'.split(','),1,'An impossible event has probability 0.','beginner',6,M,'Statistics','Probability'),
            q('A number is chosen from 1–10. P(prime number) = ?','3/10,4/10,5/10,6/10'.split(','),1,'Primes from 1–10: 2,3,5,7 = 4 primes. P = 4/10.','advanced',8,M,'Statistics','Probability'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 2. SCIENCE
// ─────────────────────────────────────────────────────────────
const S = 'Science';
const SCIENCE: GESSubject = {
  name: S, icon: '🔬', color: '#10b981', coverColor: 'from-green-600 to-teal-700',
  strands: [
    {
      name: 'Living Things and Life Processes', icon: '🌱', color: '#10b981',
      subStrands: [
        {
          name: 'Cells',
          questions: [
            q('What is the basic unit of life?','Tissue,Organ,Cell,Atom'.split(','),2,'The cell is the smallest unit of life. All living things are made of cells.','beginner',5,S,'Living Things and Life Processes','Cells'),
            q('Which organelle controls the activities of the cell?','Cytoplasm,Cell membrane,Nucleus,Mitochondria'.split(','),2,'The nucleus contains DNA and controls cell activities.','intermediate',6,S,'Living Things and Life Processes','Cells'),
            q('Which organelle is known as the powerhouse of the cell?','Nucleus,Mitochondria,Ribosome,Vacuole'.split(','),1,'Mitochondria produce ATP (energy) through cellular respiration.','intermediate',7,S,'Living Things and Life Processes','Cells'),
            q('What is the difference between plant and animal cells?','Plant cells have no nucleus,Plant cells have cell wall and chloroplasts,Animal cells have chloroplasts,No difference'.split(','),1,'Plant cells have a cell wall, chloroplasts, and a large vacuole. Animal cells do not.','intermediate',7,S,'Living Things and Life Processes','Cells'),
            q('What is the function of chloroplasts?','Respiration,Protein synthesis,Photosynthesis,Storage'.split(','),2,'Chloroplasts contain chlorophyll and carry out photosynthesis.','intermediate',7,S,'Living Things and Life Processes','Cells'),
          ]
        },
        {
          name: 'Human Body Systems',
          questions: [
            q('Which organ pumps blood around the body?','Lungs,Liver,Heart,Kidney'.split(','),2,'The heart is a muscular pump that circulates blood through arteries and veins.','beginner',4,S,'Living Things and Life Processes','Human Body Systems'),
            q('What is the function of the lungs?','Pump blood,Filter blood,Gas exchange (oxygen/CO₂),Digest food'.split(','),2,'Lungs absorb oxygen from air and expel carbon dioxide during breathing.','beginner',4,S,'Living Things and Life Processes','Human Body Systems'),
            q('Which organ filters waste from the blood?','Liver,Kidneys,Stomach,Pancreas'.split(','),1,'Kidneys filter blood to remove urea and excess water, producing urine.','intermediate',5,S,'Living Things and Life Processes','Human Body Systems'),
            q('What is the function of the small intestine?','Absorb water,Store food,Absorb digested nutrients,Produce bile'.split(','),2,'The small intestine absorbs digested food nutrients into the bloodstream.','intermediate',6,S,'Living Things and Life Processes','Human Body Systems'),
            q('How many bones are in the adult human body?','106,206,306,406'.split(','),1,'The adult human skeleton has 206 bones.','intermediate',6,S,'Living Things and Life Processes','Human Body Systems'),
            q('Which vitamin is essential for strong bones and teeth?','Vitamin A,Vitamin C,Vitamin D,Vitamin B'.split(','),2,'Vitamin D helps absorb calcium, essential for bone and teeth formation.','intermediate',5,S,'Living Things and Life Processes','Human Body Systems'),
            q('What is malaria caused by?','Virus,Bacterium,Plasmodium parasite,Fungus'.split(','),2,'Malaria is caused by Plasmodium, transmitted by the female Anopheles mosquito.','intermediate',5,S,'Living Things and Life Processes','Human Body Systems'),
            q('Which disease is caused by Vitamin C deficiency?','Rickets,Scurvy,Anaemia,Goitre'.split(','),1,'Scurvy causes swollen gums and fatigue. Prevented by eating citrus fruits.','intermediate',6,S,'Living Things and Life Processes','Human Body Systems'),
            q('What type of blood vessel carries blood AWAY from the heart?','Veins,Arteries,Capillaries,Lymph vessels'.split(','),1,'Arteries carry oxygenated blood away from the heart (except pulmonary artery).','advanced',8,S,'Living Things and Life Processes','Human Body Systems'),
          ]
        },
        {
          name: 'Plants',
          questions: [
            q('What do plants need to make food by photosynthesis?','Water only,Sunlight only,Sunlight + water + CO₂,Soil + water only'.split(','),2,'Photosynthesis: sunlight + water + CO₂ → glucose + oxygen.','beginner',3,S,'Living Things and Life Processes','Plants'),
            q('What gas do plants release during photosynthesis?','Carbon dioxide,Nitrogen,Oxygen,Hydrogen'.split(','),2,'Plants produce oxygen as a byproduct of photosynthesis.','beginner',3,S,'Living Things and Life Processes','Plants'),
            q('What is the function of roots?','Make food,Produce seeds,Absorb water and minerals,Carry out photosynthesis'.split(','),2,'Roots anchor the plant and absorb water and dissolved minerals from soil.','beginner',3,S,'Living Things and Life Processes','Plants'),
            q('Which part of the flower contains pollen?','Carpel,Petal,Anther,Sepal'.split(','),2,'The anther is part of the stamen (male part) and produces pollen grains.','intermediate',6,S,'Living Things and Life Processes','Plants'),
            q('What is pollination?','Fertilisation of egg,Transfer of pollen from anther to stigma,Growth of seed,Germination'.split(','),1,'Pollination is the transfer of pollen from the anther to the stigma of a flower.','intermediate',6,S,'Living Things and Life Processes','Plants'),
            q('What is germination?','Pollination of flower,A seed starting to grow into a plant,Making food,Losing leaves'.split(','),1,'Germination is when a seed begins to sprout and grow into a new plant.','beginner',4,S,'Living Things and Life Processes','Plants'),
          ]
        },
        {
          name: 'Animals',
          questions: [
            q('Which animal is a mammal?','Eagle,Crocodile,Whale,Tilapia'.split(','),2,'Mammals are warm-blooded, breathe air, have hair, and feed young with milk. Whales are mammals.','intermediate',4,S,'Living Things and Life Processes','Animals'),
            q('What do amphibians need to survive?','Only land,Only water,Both land and water,Neither'.split(','),2,'Amphibians (frogs, toads) live in both water and on land, and breathe through skin and lungs.','intermediate',5,S,'Living Things and Life Processes','Animals'),
            q('Which is an invertebrate?','Dog,Fish,Earthworm,Frog'.split(','),2,'Invertebrates have no backbone. Earthworms, insects, and snails are invertebrates.','beginner',4,S,'Living Things and Life Processes','Animals'),
            q('What is the main diet of a herbivore?','Meat only,Plants only,Both meat and plants,Insects only'.split(','),1,'Herbivores eat only plants. Examples: cow, rabbit, elephant.','beginner',3,S,'Living Things and Life Processes','Animals'),
          ]
        },
      ]
    },
    {
      name: 'Materials and Matter', icon: '⚗️', color: '#3b82f6',
      subStrands: [
        {
          name: 'States of Matter',
          questions: [
            q('What are the three states of matter?','Hot, warm, cold,Solid, liquid, gas,Big, medium, small,Hard, soft, smooth'.split(','),1,'Matter exists as solid (fixed shape & volume), liquid (fixed volume), or gas (no fixed shape/volume).','beginner',2,S,'Materials and Matter','States of Matter'),
            q('At what temperature does water boil (at sea level)?','50°C,80°C,100°C,120°C'.split(','),2,'Water boils and turns to steam at 100°C at standard atmospheric pressure.','beginner',3,S,'Materials and Matter','States of Matter'),
            q('At what temperature does water freeze?','0°C,4°C,−10°C,10°C'.split(','),0,'Water freezes (turns to ice) at 0°C (32°F).','beginner',3,S,'Materials and Matter','States of Matter'),
            q('What is evaporation?','Liquid turning to solid,Gas turning to liquid,Liquid turning to gas,Solid turning to liquid'.split(','),2,'Evaporation is the change of state from liquid to gas, usually at the surface.','beginner',4,S,'Materials and Matter','States of Matter'),
            q('What is condensation?','Liquid → gas,Gas → liquid,Solid → liquid,Liquid → solid'.split(','),1,'Condensation is gas cooling down to form liquid (e.g., water droplets on a cold glass).','beginner',4,S,'Materials and Matter','States of Matter'),
            q('What happens to most materials when heated?','They contract,They expand,Nothing changes,They change colour'.split(','),1,'Most materials expand when heated because particles move faster and spread apart.','intermediate',5,S,'Materials and Matter','States of Matter'),
          ]
        },
        {
          name: 'Mixtures and Solutions',
          questions: [
            q('Which of these is a mixture?','Pure water,Table salt (NaCl),Air,Gold'.split(','),2,'Air is a mixture of gases: ~78% nitrogen, ~21% oxygen, and traces of others.','intermediate',5,S,'Materials and Matter','Mixtures and Solutions'),
            q('What method is used to separate sand from water?','Evaporation,Filtration,Distillation,Decantation'.split(','),1,'Filtration separates an insoluble solid (sand) from a liquid using a filter.','intermediate',5,S,'Materials and Matter','Mixtures and Solutions'),
            q('What method separates salt from salt water?','Filtration,Distillation,Evaporation,Sieving'.split(','),2,'Evaporation boils away the water, leaving the salt behind.','intermediate',5,S,'Materials and Matter','Mixtures and Solutions'),
            q('What is a solute?','The liquid that dissolves a substance,The substance that is dissolved,The resulting mixture,The substance that does not dissolve'.split(','),1,'The solute is the substance dissolved in a solvent to form a solution.','intermediate',6,S,'Materials and Matter','Mixtures and Solutions'),
          ]
        },
      ]
    },
    {
      name: 'Energy', icon: '⚡', color: '#f59e0b',
      subStrands: [
        {
          name: 'Forms of Energy',
          questions: [
            q('What form of energy does the sun provide to Earth?','Electrical only,Light and heat energy,Sound energy,Chemical energy'.split(','),1,'The sun radiates light (electromagnetic) and heat (infrared) energy.','beginner',3,S,'Energy','Forms of Energy'),
            q('Which of these is a renewable energy source?','Coal,Petroleum,Solar energy,Natural gas'.split(','),2,'Solar energy from the sun cannot be exhausted. Fossil fuels are finite.','intermediate',5,S,'Energy','Forms of Energy'),
            q('What does a solar panel convert sunlight into?','Sound energy,Electrical energy,Chemical energy,Mechanical energy'.split(','),1,'Solar panels use photovoltaic cells to convert light directly into electricity.','intermediate',6,S,'Energy','Forms of Energy'),
            q('What energy transformation occurs in a torch (flashlight)?','Light → chemical,Chemical → light + heat,Electrical → chemical,Heat → light'.split(','),1,'Battery (chemical energy) → electrical energy → light + heat energy.','intermediate',6,S,'Energy','Forms of Energy'),
            q('Which is a non-renewable energy source?','Wind,Hydroelectric,Coal,Solar'.split(','),2,'Coal is a fossil fuel formed over millions of years. Once used, it cannot be quickly replenished.','intermediate',6,S,'Energy','Forms of Energy'),
          ]
        },
        {
          name: 'Forces and Motion',
          questions: [
            q('What force pulls objects towards the Earth?','Magnetism,Friction,Gravity,Tension'.split(','),2,'Gravity is the attractive force between masses. It keeps us on the ground.','beginner',3,S,'Energy','Forces and Motion'),
            q('What is the unit of force?','Kilogram,Metre,Newton,Joule'.split(','),2,'Force is measured in Newtons (N), named after Sir Isaac Newton.','beginner',5,S,'Energy','Forces and Motion'),
            q('What is friction?','A pulling force,A force opposing motion between surfaces,A pushing force,The force of gravity'.split(','),1,'Friction is a force that opposes motion when two surfaces rub together.','intermediate',5,S,'Energy','Forces and Motion'),
            q('A car travels 150km in 3 hours. What is its average speed?','45 km/h,50 km/h,55 km/h,60 km/h'.split(','),1,'Speed = Distance ÷ Time = 150 ÷ 3 = 50 km/h.','intermediate',7,S,'Energy','Forces and Motion'),
            q('What happens to friction when surfaces are smoother?','Increases,Decreases,Stays the same,Becomes zero'.split(','),1,'Smoother surfaces have less friction because there is less resistance between them.','beginner',5,S,'Energy','Forces and Motion'),
          ]
        },
      ]
    },
    {
      name: 'Earth and Space', icon: '🌍', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Solar System',
          questions: [
            q('How many planets are in our solar system?','7,8,9,10'.split(','),1,'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.','beginner',4,S,'Earth and Space','Solar System'),
            q('Which planet is closest to the Sun?','Venus,Earth,Mercury,Mars'.split(','),2,'Mercury is the innermost and closest planet to the Sun.','beginner',4,S,'Earth and Space','Solar System'),
            q('Which is the largest planet in our solar system?','Saturn,Neptune,Jupiter,Uranus'.split(','),2,'Jupiter is the largest planet, with a mass greater than all other planets combined.','intermediate',5,S,'Earth and Space','Solar System'),
            q('What causes day and night on Earth?','Revolution around the Sun,Rotation on its own axis,The Moon blocking sunlight,Seasons'.split(','),1,'Earth rotates (spins) on its axis once every 24 hours, causing day and night.','beginner',4,S,'Earth and Space','Solar System'),
            q('How long does Earth take to orbit the Sun?','24 hours,365.25 days,30 days,28 days'.split(','),1,'Earth completes one revolution around the Sun in approximately 365.25 days (1 year).','beginner',4,S,'Earth and Space','Solar System'),
          ]
        },
        {
          name: 'Weather and Climate',
          questions: [
            q('What instrument is used to measure temperature?','Barometer,Thermometer,Anemometer,Rain gauge'.split(','),1,'A thermometer measures temperature in degrees Celsius (°C) or Fahrenheit (°F).','beginner',3,S,'Earth and Space','Weather and Climate'),
            q('What instrument measures rainfall?','Barometer,Thermometer,Rain gauge,Hygrometer'.split(','),2,'A rain gauge (pluviometer) collects and measures the amount of rainfall.','beginner',4,S,'Earth and Space','Weather and Climate'),
            q('What is the difference between weather and climate?','No difference,Weather is long-term, climate is daily,Weather is daily conditions, climate is long-term average,Climate is only about temperature'.split(','),2,'Weather = short-term atmospheric conditions. Climate = average weather patterns over 30+ years.','intermediate',6,S,'Earth and Space','Weather and Climate'),
            q('What causes the seasons on Earth?','Distance from the Sun,The tilt of Earth\'s axis as it orbits the Sun,Speed of rotation,Moon\'s gravity'.split(','),1,'Earth\'s 23.5° axial tilt means different hemispheres receive more sunlight at different times of year.','advanced',8,S,'Earth and Space','Weather and Climate'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 3. ENGLISH LANGUAGE
// ─────────────────────────────────────────────────────────────
const E = 'English Language';
const ENGLISH: GESSubject = {
  name: E, icon: '📝', color: '#f59e0b', coverColor: 'from-yellow-500 to-orange-600',
  strands: [
    {
      name: 'Reading and Writing', icon: '📖', color: '#f59e0b',
      subStrands: [
        {
          name: 'Grammar',
          questions: [
            q('What is a noun?','A doing word,A describing word,A naming word,A joining word'.split(','),2,'A noun names a person, place, animal or thing. E.g. Accra, book, dog, Kofi.','beginner',2,E,'Reading and Writing','Grammar'),
            q('What is a verb?','A naming word,An action or doing word,A describing word,A connecting word'.split(','),1,'A verb shows action or state. E.g. run, eat, jump, is, are.','beginner',2,E,'Reading and Writing','Grammar'),
            q('What is an adjective?','A doing word,A naming word,A describing word,A joining word'.split(','),2,'Adjectives describe nouns. E.g. big, red, happy, beautiful.','beginner',3,E,'Reading and Writing','Grammar'),
            q('Choose the correct word: "She ___ to school every day."','go,goes,going,gone'.split(','),1,'With he/she/it, add -s or -es. "She goes" is correct (simple present).','beginner',3,E,'Reading and Writing','Grammar'),
            q('What is the plural of "child"?','Childs,Childes,Children,Childies'.split(','),2,'"Children" is the irregular plural of "child". Not "childs".','beginner',2,E,'Reading and Writing','Grammar'),
            q('Which sentence is in the past tense?','I am eating,I will eat,I ate,I eat every day'.split(','),2,'"Ate" is past tense of "eat". It describes a completed action.','beginner',3,E,'Reading and Writing','Grammar'),
            q('Identify the adverb: "She ran quickly to school."','She,ran,quickly,school'.split(','),2,'Adverbs modify verbs. "Quickly" describes how she ran.','intermediate',4,E,'Reading and Writing','Grammar'),
            q('Which is the correct passive voice of "Kofi kicked the ball"?','The ball kicked Kofi,The ball was kicked by Kofi,Kofi was kicked by the ball,Kofi is kicking the ball'.split(','),1,'Passive: subject receives action. Ball (object) becomes subject. "The ball was kicked by Kofi."','advanced',8,E,'Reading and Writing','Grammar'),
            q('Which sentence uses the correct apostrophe?','The dogs bone,The dog\'s bone,The dogs\' bone,The dogs\'s bone'.split(','),1,'"The dog\'s bone" — apostrophe + s shows possession (belonging to one dog).','intermediate',5,E,'Reading and Writing','Grammar'),
            q('What is the correct comparative form of "good"?','Gooder,More good,Better,Best'.split(','),2,'"Good" has irregular comparative: good → better → best.','intermediate',5,E,'Reading and Writing','Grammar'),
            q('Identify the conjunction: "I was tired, but I finished my work."','tired,but,finished,work'.split(','),1,'Conjunctions join clauses. "But" shows contrast between the two ideas.','intermediate',5,E,'Reading and Writing','Grammar'),
            q('What type of pronoun is "themselves"?','Personal,Possessive,Reflexive,Demonstrative'.split(','),2,'Reflexive pronouns end in -self/-selves and refer back to the subject.','advanced',7,E,'Reading and Writing','Grammar'),
          ]
        },
        {
          name: 'Vocabulary',
          questions: [
            q('What is a synonym for "happy"?','Sad,Angry,Joyful,Tired'.split(','),2,'Synonyms have similar meanings. "Joyful" and "happy" both mean feeling pleasure.','beginner',3,E,'Reading and Writing','Vocabulary'),
            q('What is the antonym (opposite) of "ancient"?','Old,Modern,Historic,Past'.split(','),1,'Antonyms are opposites. Ancient = very old; Modern = new/current.','intermediate',4,E,'Reading and Writing','Vocabulary'),
            q('What does the prefix "un-" mean in "unhappy"?','Very,Not,Again,Before'.split(','),1,'"Un-" means not. Unhappy = not happy. Undo = not done.','beginner',3,E,'Reading and Writing','Vocabulary'),
            q('What does "benevolent" mean?','Cruel,Kind and generous,Lazy,Angry'.split(','),1,'"Benevolent" means kind-hearted and generous. Bene = good (Latin).','advanced',8,E,'Reading and Writing','Vocabulary'),
            q('The word "aqua" means:','Fire,Earth,Water,Air'.split(','),2,'"Aqua" is Latin for water. E.g. aquarium, aquatic.','intermediate',6,E,'Reading and Writing','Vocabulary'),
            q('What does the suffix "-tion" do to a word?','Makes it an adjective,Makes it an adverb,Turns a verb into a noun,Makes it a verb'.split(','),2,'-tion turns verbs into nouns: educate → education, act → action.','intermediate',6,E,'Reading and Writing','Vocabulary'),
            q('Which pair are homophones?','Their and there,Big and small,Run and walked,Happy and sad'.split(','),0,'Homophones sound the same but have different meanings: "their" and "there".','intermediate',5,E,'Reading and Writing','Vocabulary'),
          ]
        },
        {
          name: 'Comprehension',
          questions: [
            q('What is the main idea of a passage?','The last sentence,The most important point the author makes,The title only,The first sentence only'.split(','),1,'The main idea is the central message or point the author communicates throughout the passage.','intermediate',5,E,'Reading and Writing','Comprehension'),
            q('What does "infer" mean in reading?','Read aloud,Make a conclusion based on evidence in the text,Copy a sentence,Underline words'.split(','),1,'Inference = using clues from the text to draw conclusions not directly stated.','intermediate',6,E,'Reading and Writing','Comprehension'),
            q('What is a simile?','Giving human qualities to non-human things,Comparing two things using "like" or "as",An exaggerated statement,A word that imitates a sound'.split(','),1,'Simile uses "like" or "as". E.g. "She is as brave as a lion."','intermediate',6,E,'Reading and Writing','Comprehension'),
            q('What is a metaphor?','Comparing using "like" or "as",A direct comparison without "like" or "as",An exaggeration,A repeated consonant sound'.split(','),1,'Metaphor directly states one thing IS another. E.g. "Life is a journey."','advanced',7,E,'Reading and Writing','Comprehension'),
            q('What is onomatopoeia?','Repetition of a sound,A word that sounds like what it describes,Comparing two things,Exaggeration'.split(','),1,'Onomatopoeia: words that imitate sounds. E.g. buzz, splash, hiss, moo.','intermediate',6,E,'Reading and Writing','Comprehension'),
          ]
        },
      ]
    },
    {
      name: 'Oral Language', icon: '🗣️', color: '#ef4444',
      subStrands: [
        {
          name: 'Oral Communication',
          questions: [
            q('What does "enunciate" mean in speech?','Speak very fast,Speak clearly and distinctly,Speak quietly,Speak in a foreign language'.split(','),1,'Enunciation means pronouncing words clearly so listeners understand.','intermediate',5,E,'Oral Language','Oral Communication'),
            q('What is the purpose of a topic sentence in a paragraph?','Conclude the paragraph,Introduce the main idea of the paragraph,Give an example,Ask a question'.split(','),1,'The topic sentence states the main idea of a paragraph, usually at the start.','intermediate',6,E,'Oral Language','Oral Communication'),
            q('Which of these best describes "formal language"?','Language with slang,Language used in official or professional settings,Language among close friends,Text message language'.split(','),1,'Formal language is used in school, official letters, speeches, and professional settings.','intermediate',7,E,'Oral Language','Oral Communication'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 4. SOCIAL STUDIES / OWOP
// ─────────────────────────────────────────────────────────────
const SS = 'Social Studies';
const SOCIAL: GESSubject = {
  name: SS, icon: '🌍', color: '#8b5cf6', coverColor: 'from-purple-600 to-violet-700',
  strands: [
    {
      name: 'My Country Ghana', icon: '🇬🇭', color: '#10b981',
      subStrands: [
        {
          name: 'Geography of Ghana',
          questions: [
            q('What is the capital city of Ghana?','Kumasi,Tamale,Accra,Cape Coast'.split(','),2,'Accra is the capital and largest city of Ghana, located in the Greater Accra Region.','beginner',1,SS,'My Country Ghana','Geography of Ghana'),
            q('Which ocean borders Ghana to the south?','Indian Ocean,Atlantic Ocean,Pacific Ocean,Arctic Ocean'.split(','),1,'Ghana is bordered to the south by the Gulf of Guinea, part of the Atlantic Ocean.','beginner',2,SS,'My Country Ghana','Geography of Ghana'),
            q('Which river is the largest in Ghana?','Pra,Ankobra,Volta,Tano'.split(','),2,'The Volta River and Lake Volta form Ghana\'s largest river system.','beginner',3,SS,'My Country Ghana','Geography of Ghana'),
            q('How many regions does Ghana have?','10,12,14,16'.split(','),3,'Ghana has 16 regions as of 2019, after 6 new regions were created.','intermediate',5,SS,'My Country Ghana','Geography of Ghana'),
            q('Which country borders Ghana to the north?','Togo,Ivory Coast,Burkina Faso,Benin'.split(','),2,'Burkina Faso borders Ghana to the north.','intermediate',4,SS,'My Country Ghana','Geography of Ghana'),
            q('Which country is east of Ghana?','Ivory Coast,Burkina Faso,Togo,Benin'.split(','),2,'Togo borders Ghana to the east.','intermediate',4,SS,'My Country Ghana','Geography of Ghana'),
            q('Which country is west of Ghana?','Togo,Burkina Faso,Ivory Coast (Côte d\'Ivoire),Nigeria'.split(','),2,'Ivory Coast (Côte d\'Ivoire) borders Ghana to the west.','intermediate',4,SS,'My Country Ghana','Geography of Ghana'),
            q('What is the second largest city in Ghana?','Accra,Tamale,Kumasi,Cape Coast'.split(','),2,'Kumasi in the Ashanti Region is Ghana\'s second largest city and cultural capital.','beginner',3,SS,'My Country Ghana','Geography of Ghana'),
          ]
        },
        {
          name: 'Governance and Democracy',
          questions: [
            q('In what year did Ghana gain independence?','1955,1957,1960,1963'.split(','),1,'Ghana gained independence from Britain on 6th March 1957 — first sub-Saharan African nation.','beginner',3,SS,'My Country Ghana','Governance and Democracy'),
            q('Who was Ghana\'s first President?','Kofi Busia,J.J. Rawlings,Kwame Nkrumah,John Kufuor'.split(','),2,'Dr. Kwame Nkrumah became Ghana\'s first President on 1st July 1960.','beginner',4,SS,'My Country Ghana','Governance and Democracy'),
            q('What type of government does Ghana practice?','Monarchy,Military rule,Constitutional democracy,Dictatorship'.split(','),2,'Ghana practices constitutional democracy with free elections and rule of law.','intermediate',5,SS,'My Country Ghana','Governance and Democracy'),
            q('How often are presidential elections held in Ghana?','Every 3 years,Every 4 years,Every 5 years,Every 6 years'.split(','),1,'Presidential and parliamentary elections are held every 4 years.','intermediate',5,SS,'My Country Ghana','Governance and Democracy'),
            q('What was Ghana called during British colonial rule?','Gold Fields,Silver Coast,Gold Coast,Ivory Coast'.split(','),2,'Ghana was called the "Gold Coast" by British colonisers due to its gold deposits.','beginner',4,SS,'My Country Ghana','Governance and Democracy'),
            q('Who are the "Big Six" of Ghana\'s independence?','Six soldiers,Six politicians who fought for independence,Six kings,Six regions'.split(','),1,'The Big Six (including Nkrumah and Danquah) were arrested in 1948 for leading the independence struggle.','intermediate',6,SS,'My Country Ghana','Governance and Democracy'),
          ]
        },
        {
          name: 'Ghanaian Culture and Traditions',
          questions: [
            q('What symbol is on the centre of the Ghana flag?','A star,A black star,A crescent moon,A cross'.split(','),1,'The black star represents African freedom and unity.','beginner',2,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
            q('What do the three colours of the Ghana flag represent?','Blood, gold, forests|Unknown|Past, present, future|Three regions'.split('|'),0,'Red = blood of independence heroes, Gold = mineral wealth, Green = forests/natural resources.','intermediate',4,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
            q('Kente cloth is traditionally woven by which groups?','Ga and Fante,Ewe and Asante,Dagomba and Gonja,Krobo and Bulsa'.split(','),1,'Kente is traditionally woven by the Asante (Ashanti) and Ewe peoples.','intermediate',5,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
            q('What is "Homowo"?','A Ghanaian dance,A harvest festival celebrated by the Ga people,An Asante ceremony,A type of food'.split(','),1,'Homowo is a harvest festival celebrated by the Ga people of Greater Accra.','intermediate',5,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
            q('What is "Akwasidae"?','A type of kente,A Ghanaian meal,An important Asante ceremony held every 40 days,A river in Ghana'.split(','),2,'Akwasidae is an important Asante ceremony where the Asantehene meets his people.','advanced',7,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
          ]
        },
      ]
    },
    {
      name: 'Environment and Resources', icon: '🌿', color: '#10b981',
      subStrands: [
        {
          name: 'Natural Resources',
          questions: [
            q('Which mineral is Ghana famous for producing?','Diamonds,Coal,Gold,Iron ore'.split(','),2,'Ghana is one of Africa\'s largest gold producers, hence the name "Gold Coast".','beginner',3,SS,'Environment and Resources','Natural Resources'),
            q('What is Ghana\'s main cash crop?','Coffee,Cocoa,Cotton,Rubber'.split(','),1,'Ghana is one of the world\'s largest cocoa producers. Cocoa is a major export.','beginner',3,SS,'Environment and Resources','Natural Resources'),
            q('What is the main purpose of the Akosombo Dam?','Irrigation,Hydroelectric power generation,Water supply,Fishing only'.split(','),1,'The Akosombo Dam (built 1961–65) generates hydroelectric power for Ghana and neighbouring countries.','intermediate',6,SS,'Environment and Resources','Natural Resources'),
            q('Which of these is a non-renewable resource?','Forest timber,Fish,Crude oil,Solar energy'.split(','),2,'Crude oil (petroleum) is a fossil fuel — once used, it cannot be replenished quickly.','intermediate',6,SS,'Environment and Resources','Natural Resources'),
          ]
        },
      ]
    },
    {
      name: 'Personal and Social Development', icon: '👥', color: '#f59e0b',
      subStrands: [
        {
          name: 'Self and Family',
          questions: [
            q('What is a nuclear family?','Extended family,Father, mother and their children,Only grandparents and grandchildren,A very large family'.split(','),1,'A nuclear family consists of parents (father and mother) and their children.','beginner',1,SS,'Personal and Social Development','Self and Family'),
            q('What is an extended family?','Mother and father only,Father, mother and children only,Nuclear family plus grandparents, aunts, uncles and cousins,Unrelated people'.split(','),2,'An extended family includes the nuclear family plus other relatives.','beginner',2,SS,'Personal and Social Development','Self and Family'),
            q('Which of these is a right of a child according to the UN Convention on the Rights of the Child?','Right to vote,Right to education,Right to work,Right to own property'.split(','),1,'The UN Convention on the Rights of the Child includes the right to education, healthcare, and protection.','intermediate',5,SS,'Personal and Social Development','Self and Family'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 5. RME
// ─────────────────────────────────────────────────────────────
const R = 'RME';
const RME: GESSubject = {
  name: R, icon: '🕊️', color: '#f59e0b', coverColor: 'from-amber-500 to-yellow-600',
  strands: [
    {
      name: 'Religious Knowledge', icon: '🙏', color: '#f59e0b',
      subStrands: [
        {
          name: 'Christianity',
          questions: [
            q('What is the holy book of Christianity?','Quran,Torah,Bible,Vedas'.split(','),2,'The Bible is the holy scripture of Christianity.','beginner',1,R,'Religious Knowledge','Christianity'),
            q('How many books are in the Bible?','60,66,70,72'.split(','),1,'The Protestant Bible has 66 books: 39 Old Testament, 27 New Testament.','intermediate',4,R,'Religious Knowledge','Christianity'),
            q('Where was Jesus born?','Jerusalem,Nazareth,Bethlehem,Galilee'.split(','),2,'Jesus was born in Bethlehem, as written in Matthew 2 and Luke 2.','beginner',3,R,'Religious Knowledge','Christianity'),
            q('What do Christians celebrate at Christmas?','Death of Jesus,Resurrection of Jesus,Birth of Jesus,Baptism of Jesus'.split(','),2,'Christmas (25th December) celebrates the birth of Jesus Christ.','beginner',2,R,'Religious Knowledge','Christianity'),
            q('What is Easter about in Christianity?','Birth of Jesus,Baptism of Jesus,Death and resurrection of Jesus,Jesus feeding 5,000'.split(','),2,'Easter celebrates the crucifixion and resurrection of Jesus Christ.','intermediate',4,R,'Religious Knowledge','Christianity'),
          ]
        },
        {
          name: 'Islam',
          questions: [
            q('What is the holy book of Islam?','Bible,Torah,Quran,Vedas'.split(','),2,'The Quran is the holy scripture of Islam, believed to be revealed to Prophet Muhammad.','beginner',2,R,'Religious Knowledge','Islam'),
            q('How many times a day do Muslims pray (Salah)?','3,4,5,7'.split(','),2,'Muslims pray 5 times daily: Fajr, Dhuhr, Asr, Maghrib, Isha.','beginner',3,R,'Religious Knowledge','Islam'),
            q('What is the holy city of Islam?','Jerusalem,Cairo,Mecca,Medina'.split(','),2,'Mecca (in Saudi Arabia) is the holiest city in Islam, birthplace of Prophet Muhammad.','intermediate',4,R,'Religious Knowledge','Islam'),
            q('What is the Islamic month of fasting called?','Eid,Ramadan,Hajj,Zakat'.split(','),1,'Ramadan is the 9th month of the Islamic calendar, during which Muslims fast from dawn to sunset.','intermediate',4,R,'Religious Knowledge','Islam'),
            q('What are the Five Pillars of Islam?','Prayer, fasting, charity, pilgrimage, belief|Quran, mosque, Mecca, Muhammad, Allah|5 prayers only|Shahada, Salah, Zakat, Sawm, Hajj'.split('|'),3,'The Five Pillars: Shahada (declaration), Salah (prayer), Zakat (charity), Sawm (fasting), Hajj (pilgrimage).','advanced',7,R,'Religious Knowledge','Islam'),
          ]
        },
        {
          name: 'African Traditional Religion',
          questions: [
            q('In Akan traditional religion, what is the Supreme Being called?','Allah,Jehovah,Onyame (Nyame),Ogun'.split(','),2,'Onyame (Nyame) is the Akan name for the Supreme God — all-knowing, all-powerful creator.','intermediate',4,R,'Religious Knowledge','African Traditional Religion'),
            q('What are "libations" in African Traditional Religion?','A type of food,Pouring of liquid as an offering to ancestors,A religious dance,A drumming ceremony'.split(','),1,'Libations involve pouring water, alcohol or other liquid on the ground to honour and communicate with ancestors.','intermediate',5,R,'Religious Knowledge','African Traditional Religion'),
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
            q('What does "integrity" mean?','Being rich,Being honest and doing right even when unobserved,Being popular,Being strong physically'.split(','),1,'Integrity is being honest and having strong moral principles at all times.','beginner',4,R,'Moral Values','Values and Character'),
            q('What does "compassion" mean?','Feeling happy only for yourself,Feeling and showing concern for others who suffer,Ignoring other people\'s problems,Being selfish'.split(','),1,'Compassion is empathy in action — feeling concern and wanting to help those who suffer.','beginner',4,R,'Moral Values','Values and Character'),
            q('Which of these demonstrates responsibility?','Leaving litter everywhere,Blaming others,Completing your homework on time,Doing only what you like'.split(','),2,'Responsibility means fulfilling your duties and obligations, like completing schoolwork.','beginner',3,R,'Moral Values','Values and Character'),
            q('What is "tolerance" in social behaviour?','Accepting only people like you,Refusing to help others,Respecting differences in others (culture, religion, opinion),Fighting with people who differ from you'.split(','),2,'Tolerance means accepting and respecting people who are different from you.','intermediate',5,R,'Moral Values','Values and Character'),
            q('Why is honesty important?','It makes you popular,It builds trust and strong relationships,It always earns money,It is only important in school'.split(','),1,'Honesty builds trust, which is the foundation of all strong relationships and communities.','intermediate',4,R,'Moral Values','Values and Character'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 6. HISTORY
// ─────────────────────────────────────────────────────────────
const H = 'History';
const HISTORY: GESSubject = {
  name: H, icon: '🏛️', color: '#ef4444', coverColor: 'from-red-600 to-rose-700',
  strands: [
    {
      name: 'Ghanaian History', icon: '🇬🇭', color: '#f59e0b',
      subStrands: [
        {
          name: 'Pre-Colonial Kingdoms',
          questions: [
            q('The Ancient Ghana Empire was famous for trading which two things?','Oil and timber,Gold and salt,Diamonds and ivory,Cotton and spices'.split(','),1,'The Ghana Empire controlled trans-Saharan trade in gold (from forests) and salt (from Sahara).','intermediate',5,H,'Ghanaian History','Pre-Colonial Kingdoms'),
            q('Where was the Ancient Ghana Empire actually located?','Present-day Ghana,Nigeria,Parts of present-day Mali and Mauritania,Senegal'.split(','),2,'Despite the same name, the Ancient Ghana Empire was in modern-day southeastern Mauritania and western Mali.','advanced',7,H,'Ghanaian History','Pre-Colonial Kingdoms'),
            q('Which kingdom was known as the Ashanti Empire?','A small kingdom in northern Ghana,A powerful kingdom centered at Kumasi,A coastal fishing community,A kingdom in Togo'.split(','),1,'The Ashanti (Asante) Empire was centered at Kumasi and was one of the most powerful states in West Africa.','intermediate',5,H,'Ghanaian History','Pre-Colonial Kingdoms'),
            q('What is the Okyeame\'s role in Ghanaian tradition?','A warrior,A spokesman/linguist for a chief,A farmer,A priest'.split(','),1,'The Okyeame serves as the spokesperson for a chief, conveying messages with wisdom.','intermediate',6,H,'Ghanaian History','Pre-Colonial Kingdoms'),
          ]
        },
        {
          name: 'Colonial Period',
          questions: [
            q('What was Ghana called during British rule?','Silver Coast,Gold Coast,Ivory Coast,Bronze Coast'.split(','),1,'Ghana was called the "Gold Coast" by British colonizers due to its abundant gold.','beginner',4,H,'Ghanaian History','Colonial Period'),
            q('When did Ghana gain independence?','March 6, 1957,July 1, 1960,August 15, 1955,January 1, 1963'.split(','),0,'Ghana achieved independence on 6th March 1957, with Nkrumah declaring "Ghana is free forever!"','intermediate',5,H,'Ghanaian History','Colonial Period'),
            q('Which European country colonised Ghana?','France,Portugal,Germany,Britain (United Kingdom)'.split(','),3,'Britain colonised the Gold Coast (Ghana) from the late 1800s until independence in 1957.','beginner',4,H,'Ghanaian History','Colonial Period'),
            q('What significant event happened on 28th February 1948 in Ghana\'s history?','Independence declaration,Christiansborg Castle shooting/Accra riots,First election,First census'.split(','),1,'On 28th Feb 1948, British police shot and killed ex-servicemen at Christiansborg Castle, sparking major riots.','advanced',8,H,'Ghanaian History','Colonial Period'),
          ]
        },
        {
          name: 'Post-Independence',
          questions: [
            q('Who gave the famous "Seek ye first the political kingdom" speech?','J.B. Danquah,J.J. Rawlings,Kwame Nkrumah,Hilla Limann'.split(','),2,'Kwame Nkrumah used this phrase to urge Africans to pursue political independence first.','intermediate',6,H,'Ghanaian History','Post-Independence'),
            q('What does "PNDC" stand for in Ghana\'s political history?','Provisional National Democratic Congress,Provisional National Defence Council,People\'s National Democratic Council,People\'s New Democratic Committee'.split(','),1,'PNDC = Provisional National Defence Council — the military government led by J.J. Rawlings from 1981–1993.','advanced',9,H,'Ghanaian History','Post-Independence'),
            q('When did Ghana return to constitutional (democratic) rule most recently?','1979,1993,2000,1969'.split(','),1,'Ghana returned to multi-party constitutional democracy in January 1993 with the Fourth Republic.','advanced',9,H,'Ghanaian History','Post-Independence'),
          ]
        },
      ]
    },
    {
      name: 'The Slave Trade', icon: '⛓️', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Transatlantic Slave Trade',
          questions: [
            q('Where were enslaved Africans mainly taken during the transatlantic slave trade?','Europe,Asia,The Americas,Australia'.split(','),2,'The transatlantic slave trade forcibly transported Africans to work in the Americas (16th–19th centuries).','intermediate',6,H,'The Slave Trade','Transatlantic Slave Trade'),
            q('Which castle in Ghana was a major holding point for enslaved Africans?','Fort Victoria,Cape Coast Castle,Fort Amsterdam,Fort William'.split(','),1,'Cape Coast Castle (and Elmina Castle) were major slave trade depots. Now UNESCO World Heritage Sites.','intermediate',6,H,'The Slave Trade','Transatlantic Slave Trade'),
            q('What was the "Door of No Return"?','A famous Ghanaian door,The entrance to Cape Coast Castle from which slaves were shipped never to return,A type of Ghanaian door,The exit of a palace'.split(','),1,'The "Door of No Return" at Cape Coast Castle was the door through which enslaved Africans were loaded onto ships, never to see Africa again.','intermediate',7,H,'The Slave Trade','Transatlantic Slave Trade'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 7. COMPUTING / ICT
// ─────────────────────────────────────────────────────────────
const C = 'Computing';
const COMPUTING: GESSubject = {
  name: C, icon: '💻', color: '#06b6d4', coverColor: 'from-cyan-500 to-blue-600',
  strands: [
    {
      name: 'Computer Fundamentals', icon: '🖥️', color: '#06b6d4',
      subStrands: [
        {
          name: 'Hardware and Software',
          questions: [
            q('Which is an INPUT device?','Monitor,Printer,Keyboard,Speaker'.split(','),2,'Input devices send data INTO the computer. Keyboard types/inputs data.','beginner',4,C,'Computer Fundamentals','Hardware and Software'),
            q('Which is an OUTPUT device?','Mouse,Keyboard,Monitor,Scanner'.split(','),2,'Output devices receive processed data FROM the computer. A monitor displays results.','beginner',4,C,'Computer Fundamentals','Hardware and Software'),
            q('What does CPU stand for?','Central Program Unit,Computer Processing Unit,Central Processing Unit,Computer Power Unit'.split(','),2,'CPU = Central Processing Unit — the brain of the computer.','beginner',4,C,'Computer Fundamentals','Hardware and Software'),
            q('What is RAM used for?','Permanent storage of data,Temporary working memory while computer is on,Printing documents,Connecting to internet'.split(','),1,'RAM (Random Access Memory) temporarily stores data being currently used. It clears when powered off.','intermediate',5,C,'Computer Fundamentals','Hardware and Software'),
            q('What is the function of a hard disk drive (HDD)?','Process data,Display images,Permanently store data,Send emails'.split(','),2,'The hard disk permanently stores all files, programs and the operating system.','intermediate',5,C,'Computer Fundamentals','Hardware and Software'),
            q('Which of these is software?','Keyboard,Hard drive,Microsoft Word,Monitor'.split(','),2,'Software = programs and applications. Microsoft Word is software. Hardware is physical.','beginner',4,C,'Computer Fundamentals','Hardware and Software'),
            q('What is an operating system?','A type of game,Software that manages computer hardware and software resources,A type of printer,A website'.split(','),1,'Operating system (OS) = the main software managing all computer operations. E.g. Windows, Mac, Linux.','intermediate',6,C,'Computer Fundamentals','Hardware and Software'),
            q('What is the function of a router?','Store large amounts of data,Print documents,Connect devices to a network and internet,Play videos'.split(','),2,'A router directs network data packets, connecting devices to each other and the internet.','intermediate',7,C,'Computer Fundamentals','Hardware and Software'),
          ]
        },
        {
          name: 'Internet and Safety',
          questions: [
            q('What does "WWW" stand for?','World Wide Website,World Wide Web,Wide World Web,World Web Window'.split(','),1,'WWW = World Wide Web — interconnected system of websites accessible via the internet.','beginner',4,C,'Computer Fundamentals','Internet and Safety'),
            q('What is a strong password?','Your name,123456,A mix of uppercase, lowercase, numbers and symbols,Your birthday'.split(','),2,'Strong passwords use upper/lowercase letters, numbers and special characters (@,#,!).','beginner',5,C,'Computer Fundamentals','Internet and Safety'),
            q('What is cyberbullying?','Playing games too much,Bullying someone using digital technology or online platforms,A computer virus,Spending time on social media'.split(','),1,'Cyberbullying uses technology to harass, threaten, or humiliate someone online.','intermediate',6,C,'Computer Fundamentals','Internet and Safety'),
            q('What does "phishing" mean in cybersecurity?','A fishing website,Tricking people into giving personal/financial information through fake emails or websites,A type of software,Computer gaming'.split(','),1,'Phishing uses fake emails, messages or websites to trick users into revealing passwords or bank details.','advanced',8,C,'Computer Fundamentals','Internet and Safety'),
            q('What is a firewall?','A type of computer virus,Software/hardware that monitors and controls network traffic to block threats,A password manager,A type of router'.split(','),1,'A firewall is a security system that monitors incoming and outgoing network traffic, blocking unauthorized access.','advanced',8,C,'Computer Fundamentals','Internet and Safety'),
          ]
        },
      ]
    },
    {
      name: 'Software Applications', icon: '📱', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Word Processing',
          questions: [
            q('Which keyboard shortcut is used to SAVE a document?','Ctrl+S,Ctrl+P,Ctrl+C,Ctrl+Z'.split(','),0,'Ctrl+S saves the current document in most applications.','beginner',4,C,'Software Applications','Word Processing'),
            q('Which keyboard shortcut is used to COPY text?','Ctrl+V,Ctrl+X,Ctrl+C,Ctrl+A'.split(','),2,'Ctrl+C copies selected text or items to the clipboard.','beginner',4,C,'Software Applications','Word Processing'),
            q('What does Ctrl+Z do?','Redo,Undo the last action,Save,Print'.split(','),1,'Ctrl+Z undoes the last action — very useful when you make a mistake!','beginner',4,C,'Software Applications','Word Processing'),
            q('What is the function of "Ctrl+P"?','Paste text,Print the document,Copy text,Undo action'.split(','),1,'Ctrl+P opens the print dialog to print the current document.','beginner',5,C,'Software Applications','Word Processing'),
            q('In a spreadsheet, what is a "cell"?','A type of virus,A prison,The intersection of a row and a column,A type of chart'.split(','),2,'In spreadsheets (like Excel), a cell is where a row and column intersect. It holds data.','intermediate',6,C,'Software Applications','Word Processing'),
          ]
        },
      ]
    },
    {
      name: 'Programming', icon: '👨‍💻', color: '#10b981',
      subStrands: [
        {
          name: 'Algorithms and Problem Solving',
          questions: [
            q('What is an algorithm?','A type of computer,A step-by-step set of instructions to solve a problem,A programming language,A storage device'.split(','),1,'An algorithm is a sequence of precise steps that solve a problem. Recipes and directions are everyday algorithms.','beginner',5,C,'Programming','Algorithms and Problem Solving'),
            q('What does a loop do in programming?','Stops the program,Repeats a block of instructions multiple times,Stores data,Connects to the internet'.split(','),1,'A loop repeats code multiple times, avoiding repetition. E.g. for loops, while loops.','beginner',6,C,'Programming','Algorithms and Problem Solving'),
            q('What is a "bug" in programming?','A type of computer virus,An error or mistake in a program,A feature,A type of loop'.split(','),1,'A bug is an error in code that causes unexpected behavior. Debugging = finding and fixing bugs.','beginner',5,C,'Programming','Algorithms and Problem Solving'),
            q('In Scratch, what category contains "move 10 steps"?','Looks,Sound,Motion,Control'.split(','),2,'In Scratch, motion blocks (move, turn, glide) are in the Motion category (blue blocks).','beginner',5,C,'Programming','Algorithms and Problem Solving'),
            q('What is pseudocode?','A secret code,A written description of a program\'s steps in plain language,A programming language,Binary code'.split(','),1,'Pseudocode describes an algorithm in plain language (not a specific programming language).','intermediate',7,C,'Programming','Algorithms and Problem Solving'),
            q('What does "if-else" do in programming?','Repeats code,Makes a decision — runs different code based on a condition,Stops the program,Prints output'.split(','),1,'If-else is a conditional statement: if condition is true → do this, else → do that.','intermediate',7,C,'Programming','Algorithms and Problem Solving'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 8. FRENCH
// ─────────────────────────────────────────────────────────────
const FR = 'French';
const FRENCH: GESSubject = {
  name: FR, icon: '🇫🇷', color: '#3b82f6', coverColor: 'from-blue-500 to-indigo-600',
  strands: [
    {
      name: 'Listening and Speaking', icon: '🗣️', color: '#3b82f6',
      subStrands: [
        {
          name: 'Oral French',
          questions: [
            q('How do you say "Hello" in French?','Bonjour,Au revoir,Merci,S\'il vous plaît'.split(','),0,'"Bonjour" means Hello/Good day in French. "Au revoir" = Goodbye.','beginner',4,FR,'Listening and Speaking','Oral French'),
            q('How do you say "Thank you" in French?','Bonjour,Au revoir,Merci,Excusez-moi'.split(','),2,'"Merci" means Thank you in French. "Merci beaucoup" = Thank you very much.','beginner',4,FR,'Listening and Speaking','Oral French'),
            q('How do you say "My name is Kofi" in French?','Je suis Kofi,Je m\'appelle Kofi,Mon ami est Kofi,J\'ai Kofi'.split(','),1,'"Je m\'appelle..." = My name is... (literally "I call myself...")','beginner',4,FR,'Listening and Speaking','Oral French'),
            q('How do you say "I am fine" in French?','Je suis malade,Ça va bien,Je ne sais pas,Au revoir'.split(','),1,'"Ça va bien" means I am fine / Things are going well.','beginner',4,FR,'Listening and Speaking','Oral French'),
            q('How do you say "Goodbye" in French?','Bonjour,Merci,Au revoir,S\'il vous plaît'.split(','),2,'"Au revoir" means Goodbye (literally "Until we see each other again").','beginner',4,FR,'Listening and Speaking','Oral French'),
          ]
        },
      ]
    },
    {
      name: 'Language Use', icon: '📚', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Vocabulary',
          questions: [
            q('What does "un livre" mean in English?','A pen,A book,A bag,A table'.split(','),1,'"Un livre" = a book in French. "Une stylo" = a pen.','beginner',4,FR,'Language Use','Vocabulary'),
            q('What is "rouge" in English?','Blue,Green,Red,Yellow'.split(','),2,'"Rouge" = red in French. The other colours: bleu=blue, vert=green, jaune=yellow.','beginner',4,FR,'Language Use','Vocabulary'),
            q('Count to 5 in French: un, deux, trois, quatre, ___','cinq,six,sept,huit'.split(','),0,'French numbers: 1=un, 2=deux, 3=trois, 4=quatre, 5=cinq.','beginner',4,FR,'Language Use','Vocabulary'),
            q('What does "l\'école" mean?','The house,The school,The market,The church'.split(','),1,'"L\'école" = the school in French.','beginner',5,FR,'Language Use','Vocabulary'),
            q('What does "J\'aime" mean?','I hate,I want,I like/love,I have'.split(','),2,'"J\'aime" = I like/I love. "J\'aime le football" = I like football.','intermediate',5,FR,'Language Use','Vocabulary'),
            q('What is "manger" in English?','To drink,To sleep,To eat,To run'.split(','),2,'"Manger" = to eat in French. "Je mange" = I eat.','intermediate',5,FR,'Language Use','Vocabulary'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// 9. CAREER TECHNOLOGY
// ─────────────────────────────────────────────────────────────
const CT = 'Career Technology';
const CAREER_TECH: GESSubject = {
  name: CT, icon: '🔧', color: '#f59e0b', coverColor: 'from-orange-500 to-amber-600',
  strands: [
    {
      name: 'Technical Skills', icon: '🔨', color: '#f59e0b',
      subStrands: [
        {
          name: 'Agriculture',
          questions: [
            q('What is the process of turning plant and food waste into fertiliser called?','Irrigation,Composting,Weeding,Ploughing'.split(','),1,'Composting breaks down organic waste into nutrient-rich fertiliser for plants.','beginner',7,CT,'Technical Skills','Agriculture'),
            q('What is crop rotation?','Planting the same crop every year,Growing different crops in the same field in different seasons,Using machines to plant crops,Watering crops regularly'.split(','),1,'Crop rotation grows different crops in sequence to improve soil health and reduce pests.','intermediate',7,CT,'Technical Skills','Agriculture'),
            q('Which type of farming uses chemicals and machinery for large-scale production?','Subsistence farming,Organic farming,Commercial farming,Traditional farming'.split(','),2,'Commercial farming uses modern machinery, chemicals, and large land areas for profit.','intermediate',8,CT,'Technical Skills','Agriculture'),
            q('What is irrigation?','Removing weeds,Adding fertilizer,Artificial supply of water to crops,Harvesting crops'.split(','),2,'Irrigation is the artificial watering of farmland to help crops grow, especially in dry areas.','intermediate',7,CT,'Technical Skills','Agriculture'),
          ]
        },
        {
          name: 'Electronics',
          questions: [
            q('What does an electric circuit need to work?','Only a battery,A complete path for current to flow through,Only a bulb,Only wires'.split(','),1,'A complete circuit requires a power source, conductors (wires), and a complete path for current.','intermediate',7,CT,'Technical Skills','Electronics'),
            q('What is the function of a resistor in a circuit?','Increase voltage,Store charge,Limit or control electrical current,Generate electricity'.split(','),2,'A resistor limits the flow of electrical current, protecting components from too much current.','advanced',8,CT,'Technical Skills','Electronics'),
            q('What is a conductor?','A material that does not allow electricity to flow,A material that allows electricity to flow easily,A type of switch,A type of battery'.split(','),1,'Conductors (copper, aluminium) allow electric current to flow freely through them.','intermediate',7,CT,'Technical Skills','Electronics'),
            q('What is an insulator?','A material that conducts electricity well,A material that does not allow electricity to flow,A type of battery,A component that stores energy'.split(','),1,'Insulators (rubber, plastic, glass) prevent electricity from flowing through them.','intermediate',7,CT,'Technical Skills','Electronics'),
          ]
        },
      ]
    },
    {
      name: 'Career Guidance', icon: '🎯', color: '#10b981',
      subStrands: [
        {
          name: 'Job Exploration',
          questions: [
            q('What is an entrepreneur?','Someone who only works for the government,A person who starts and runs their own business,A type of employee,Someone who works in a bank only'.split(','),1,'An entrepreneur creates, manages, and takes risk for a business venture.','intermediate',7,CT,'Career Guidance','Job Exploration'),
            q('What does "STEM" stand for in education and careers?','Sports, Technology, English, Music,Science, Technology, Engineering, Mathematics,Social, Technology, Economics, Media,Science, Teaching, English, Management'.split(','),1,'STEM = Science, Technology, Engineering, Mathematics — key fields in modern career paths.','intermediate',8,CT,'Career Guidance','Job Exploration'),
            q('What is a CV (curriculum vitae)?','A type of exam,A document summarising your education, skills and work experience,A school report,A job advertisement'.split(','),1,'A CV (resume) is a formal document listing your education, skills and experience for job applications.','intermediate',8,CT,'Career Guidance','Job Exploration'),
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
  MATHS, SCIENCE, ENGLISH, SOCIAL, RME, HISTORY, COMPUTING, FRENCH, CAREER_TECH
];

/** Get all questions matching filters */
export function getGESQuestions(filters: {
  subject?: string; strand?: string; subStrand?: string;
  grade?: number; difficulty?: string;
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

/** Convert GES questions to Quiz format for the game */
export function gesQuestionsToQuiz(
  questions: GESQuestion[], title: string,
  subject: string, grade: string, coverColor: string, icon: string
) {
  return {
    id: 'ges-' + Date.now(),
    title, subject, grade, coverColor, icon,
    description: `GES Curriculum — ${subject} — ${grade}`,
    playCount: 0, createdAt: new Date().toISOString(),
    questions: questions.map(q => ({
      id: q.id, text: q.text, type: 'multiple-choice' as const,
      timeLimit: q.timeLimit, points: q.points, explanation: q.explanation,
      answers: q.options.map((opt, i) => ({
        id: `${q.id}-a${i}`, text: opt,
        isCorrect: i === q.correct,
        color: ['#E21B3C','#1368CE','#26890C','#FFA602'][i],
        icon:  ['▲','◆','●','★'][i],
      }))
    }))
  };
}

// ─────────────────────────────────────────────────────────────
// ADDITIONAL MATHEMATICS QUESTIONS (to reach 100+)
// ─────────────────────────────────────────────────────────────
// These are added via a patch function at the bottom

const MATHS_EXTRA: GESQuestion[] = [
  q('What is 9 × 9?','72,81,90,63'.split(','),1,'9 × 9 = 81. Times tables: 9×1=9...9×9=81.','beginner',3,M,'Number','Operations'),
  q('What is 144 ÷ 12?','11,12,13,14'.split(','),1,'144 ÷ 12 = 12. (12 × 12 = 144)','intermediate',5,M,'Number','Operations'),
  q('What is 15% of 200?','25,30,35,40'.split(','),1,'15% of 200 = (15/100)×200 = 30.','intermediate',6,M,'Number','Decimals and Percentages'),
  q('What is 2/5 + 3/10?','5/15,7/10,1/2,5/10'.split(','),1,'2/5=4/10. 4/10+3/10=7/10.','intermediate',5,M,'Number','Fractions'),
  q('Simplify 18/24.','3/4,2/3,9/12,6/8'.split(','),0,'GCF=6. 18/24=3/4.','intermediate',5,M,'Number','Fractions'),
  q('What is 4³?','12,32,64,48'.split(','),2,'4³=4×4×4=16×4=64.','intermediate',7,M,'Algebra','Indices and Logarithms'),
  q('Solve: 5x = 45','x=7,x=8,x=9,x=10'.split(','),2,'x=45÷5=9.','beginner',5,M,'Algebra','Variables and Equations'),
  q('What is the perimeter of a regular pentagon with side 6cm?','24cm,30cm,36cm,18cm'.split(','),1,'5 sides × 6cm = 30cm.','intermediate',5,M,'Geometry','Perimeter and Area'),
  q('Find the area of a parallelogram with base 8cm and height 5cm.','13cm²,40cm²,26cm²,80cm²'.split(','),1,'Area=base×height=8×5=40cm².','intermediate',7,M,'Geometry','Perimeter and Area'),
  q('What is the surface area of a cube with side 4cm?','48cm²,64cm²,96cm²,24cm²'.split(','),2,'Surface area=6×side²=6×16=96cm².','advanced',8,M,'Geometry','Volume'),
  q('What is 1000ml in litres?','0.1L,10L,1L,100L'.split(','),2,'1000ml=1 litre.','beginner',3,M,'Measurement','Length Mass and Capacity'),
  q('How many seconds are in one minute?','30,60,100,120'.split(','),1,'60 seconds = 1 minute.','beginner',1,M,'Measurement','Time'),
  q('A train leaves at 8:45am and arrives at 11:20am. How long is the journey?','2h 25min,2h 35min,3h 25min,3h 35min'.split(','),1,'8:45→11:20: 8:45→11:45=3hrs, minus 25min=2h35min.','intermediate',6,M,'Measurement','Time'),
  q('What is the median of: 11,3,7,15,9?','7,9,11,3'.split(','),1,'Arranged: 3,7,9,11,15. Middle=9.','intermediate',6,M,'Statistics','Data Collection and Representation'),
  q('What is the mean of 4,6,8,10,12?','7,8,9,10'.split(','),1,'Sum=40, Count=5. Mean=40÷5=8.','intermediate',5,M,'Statistics','Data Collection and Representation'),
  q('P(certain event) = ?','0,1/2,1,Cannot tell'.split(','),2,'A certain event always happens. P=1.','beginner',6,M,'Statistics','Probability'),
  q('What is 3/8 as a decimal?','0.38,0.375,3.8,0.3'.split(','),1,'3÷8=0.375.','intermediate',6,M,'Number','Decimals and Percentages'),
  q('What is 45% as a fraction in lowest terms?','45/100,9/20,4/5,1/2'.split(','),1,'45/100=9/20 (divide by 5).','intermediate',6,M,'Number','Decimals and Percentages'),
  q('What is −8 + (−4)?','4,−4,12,−12'.split(','),3,'−8+(−4)=−8−4=−12.','intermediate',7,M,'Number','Integers and Directed Numbers'),
  q('Simplify: 5x − 2x + 3x','6x,8x,4x,10x'.split(','),0,'5x−2x+3x=(5−2+3)x=6x.','beginner',6,M,'Algebra','Variables and Equations'),
  q('What is the gradient of the line y=3x+2?','2,3,5,1'.split(','),1,'In y=mx+c, m is the gradient. Here m=3.','advanced',9,M,'Algebra','Variables and Equations'),
  q('Two angles of a triangle are 60° and 80°. Find the third.','30°,40°,50°,60°'.split(','),1,'Third angle=180°−60°−80°=40°.','beginner',4,M,'Geometry','Shapes'),
  q('What type of angle is 135°?','Acute,Right,Obtuse,Reflex'.split(','),2,'Obtuse angles are between 90° and 180°.','beginner',4,M,'Geometry','Shapes'),
  q('An exterior angle of a regular hexagon is?','45°,60°,72°,90°'.split(','),1,'Exterior angle=360°÷6=60°.','advanced',8,M,'Geometry','Shapes'),
  q('What is the value of π (pi) approximately?','2.71,3.14,3.41,3.17'.split(','),1,'π≈3.14159... commonly approximated as 3.14 or 22/7.','intermediate',6,M,'Geometry','Perimeter and Area'),
  q('A rectangle has area 48cm² and length 8cm. Find the width.','4cm,5cm,6cm,7cm'.split(','),2,'Width=Area÷length=48÷8=6cm.','intermediate',5,M,'Geometry','Perimeter and Area'),
  q('Convert 3/4 to a decimal.','0.25,0.5,0.75,0.34'.split(','),2,'3÷4=0.75.','beginner',4,M,'Number','Decimals and Percentages'),
  q('What is 0.1 × 0.1?','0.1,0.01,0.001,1'.split(','),1,'0.1×0.1=0.01. (1×1=1, 2 decimal places → 0.01)','intermediate',5,M,'Number','Decimals and Percentages'),
  q('Solve: 2(x+3)=14','x=3,x=4,x=5,x=6'.split(','),2,'2x+6=14, 2x=8, x=4. Wait: 2×4+6=14. x=4.','intermediate',7,M,'Algebra','Variables and Equations'),
  q('What is the nth term of 5,10,15,20,...?','n+5,5n,5n+1,n+4'.split(','),1,'Each term is 5×n. When n=1:5, n=2:10. nth term=5n.','intermediate',7,M,'Algebra','Patterns and Sequences'),
  q('Find x: x/4 = 7','x=3,x=11,x=28,x=7'.split(','),2,'x=7×4=28.','intermediate',5,M,'Algebra','Variables and Equations'),
  q('A bicycle wheel has radius 35cm. How far does it travel in one revolution? (π=22/7)','110cm,200cm,220cm,250cm'.split(','),2,'Circumference=2πr=2×(22/7)×35=220cm.','advanced',8,M,'Geometry','Perimeter and Area'),
  q('What is the probability of rolling a 6 on a fair die?','1/3,1/4,1/6,1/2'.split(','),2,'P(6)=1/6. One favourable out of 6 possible outcomes.','beginner',6,M,'Statistics','Probability'),
  q('A bag has 5 red, 3 blue, 2 green balls. P(green)?','1/10,2/10,3/10,5/10'.split(','),1,'P(green)=2/10=1/5.','intermediate',7,M,'Statistics','Probability'),
  q('What is 20% of 350?','60,70,80,90'.split(','),1,'20% of 350=(20/100)×350=70.','intermediate',5,M,'Number','Decimals and Percentages'),
  q('If a:b=3:4 and a=12, find b.','14,16,18,20'.split(','),1,'a/b=3/4. 12/b=3/4. b=16.','intermediate',7,M,'Number','Ratio and Proportion'),
  q('The bearing of B from A is 060°. What is the back bearing?','120°,180°,240°,300°'.split(','),2,'Back bearing=060°+180°=240°.','advanced',9,M,'Geometry','Shapes'),
  q('What is 5! (5 factorial)?','20,60,100,120'.split(','),3,'5!=5×4×3×2×1=120.','advanced',9,M,'Algebra','Indices and Logarithms'),
  q('Expand (x+3)(x+2).','x²+5x+6,x²+6x+5,x²+5x+5,x²+6x+6'.split(','),0,'(x+3)(x+2)=x²+2x+3x+6=x²+5x+6.','advanced',9,M,'Algebra','Quadratic Equations'),
  q('Solve: x² + 5x + 6 = 0','x=2,x=3|x=−2,x=−3|x=2,x=−3|x=−2,x=3'.split('|'),1,'(x+2)(x+3)=0. x=−2 or x=−3.','advanced',9,M,'Algebra','Quadratic Equations'),
  q('What is tan 45°?','0,1/2,√3,1'.split(','),3,'tan 45°=1. (opposite/adjacent in a right triangle)','advanced',9,M,'Geometry','Shapes'),
  q('Simple interest on GH₵500 at 8% for 2 years?','GH₵40,GH₵60,GH₵80,GH₵100'.split(','),2,'SI=PRT/100=500×8×2/100=GH₵80.','intermediate',8,M,'Number','Ratio and Proportion'),
];

// ─────────────────────────────────────────────────────────────
// ADDITIONAL SCIENCE QUESTIONS
// ─────────────────────────────────────────────────────────────
const SCIENCE_EXTRA: GESQuestion[] = [
  q('What is the chemical formula of common salt?','NaOH,NaCl,KCl,MgCl'.split(','),1,'Common salt is sodium chloride: Na (sodium) + Cl (chlorine) = NaCl.','intermediate',6,S,'Materials and Matter','Mixtures and Solutions'),
  q('What gas makes up most of our atmosphere?','Oxygen,Carbon dioxide,Nitrogen,Hydrogen'.split(','),2,'Nitrogen makes up ~78% of the atmosphere. Oxygen is ~21%.','intermediate',5,S,'Earth and Space','Weather and Climate'),
  q('What is the process of water vapour turning into water droplets called?','Evaporation,Condensation,Precipitation,Transpiration'.split(','),1,'Condensation: water vapour cools → liquid water. Seen on cold glasses.','beginner',4,S,'Materials and Matter','States of Matter'),
  q('What is osmosis?','Movement of solute particles,Movement of water through a semi-permeable membrane,Evaporation,Digestion'.split(','),1,'Osmosis: water moves from dilute to concentrated solution through a semi-permeable membrane.','advanced',8,S,'Living Things and Life Processes','Cells'),
  q('What is the main function of red blood cells?','Fight infection,Carry oxygen,Clot blood,Produce hormones'.split(','),1,'Red blood cells (erythrocytes) contain haemoglobin which carries oxygen to body tissues.','intermediate',7,S,'Living Things and Life Processes','Human Body Systems'),
  q('Which planet is known as the Red Planet?','Jupiter,Mars,Venus,Saturn'.split(','),1,'Mars appears red due to iron oxide (rust) on its surface.','beginner',4,S,'Earth and Space','Solar System'),
  q('What is the speed of light?','300,000 km/s,3,000 km/s,30,000 km/s,3,000,000 km/s'.split(','),0,'Light travels at approximately 300,000 km/s (3×10⁸ m/s) in a vacuum.','advanced',9,S,'Energy','Forms of Energy'),
  q('What is a food web?','A single food chain,A network of interconnected food chains,A spider\'s food,A type of fishing net'.split(','),1,'A food web shows multiple interconnected food chains in an ecosystem.','intermediate',6,S,'Living Things and Life Processes','Animals'),
  q('Which gas is essential for respiration?','Nitrogen,Carbon dioxide,Oxygen,Hydrogen'.split(','),2,'Oxygen is needed by cells for aerobic respiration to produce energy.','beginner',4,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is the unit of electric current?','Volt,Watt,Ampere,Ohm'.split(','),2,'Electric current is measured in Amperes (A), named after André-Marie Ampère.','intermediate',7,S,'Energy','Forces and Motion'),
  q('What law states: For every action there is an equal and opposite reaction?','Newton\'s 1st Law,Newton\'s 2nd Law,Newton\'s 3rd Law,Ohm\'s Law'.split(','),2,'Newton\'s Third Law: action and reaction are equal in magnitude but opposite in direction.','advanced',9,S,'Energy','Forces and Motion'),
  q('What is the function of white blood cells?','Carry oxygen,Fight infection and disease,Carry nutrients,Clot blood'.split(','),1,'White blood cells (leucocytes) are part of the immune system — they fight bacteria and viruses.','intermediate',6,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is photosynthesis?','Animals making food,Plants using sunlight to make food from CO₂ and water,Animals breathing,Plants breathing'.split(','),1,'Photosynthesis: 6CO₂+6H₂O+light→C₆H₁₂O₆+6O₂.','beginner',4,S,'Living Things and Life Processes','Plants'),
  q('What is the powerhouse of the cell?','Nucleus,Ribosome,Mitochondria,Vacuole'.split(','),2,'Mitochondria produce ATP (energy) through cellular respiration.','intermediate',7,S,'Living Things and Life Processes','Cells'),
  q('What instrument measures atmospheric pressure?','Thermometer,Barometer,Anemometer,Hygrometer'.split(','),1,'A barometer measures atmospheric pressure. Invented by Torricelli.','intermediate',7,S,'Earth and Space','Weather and Climate'),
  q('Which type of rock is formed from cooled magma?','Sedimentary,Metamorphic,Igneous,Limestone'.split(','),2,'Igneous rocks form when magma (molten rock) cools and solidifies.','intermediate',7,S,'Earth and Space','Weather and Climate'),
  q('What is Newton\'s 1st Law of Motion?','F=ma,Every action has equal reaction,Objects remain at rest or uniform motion unless acted on by force,Energy cannot be created or destroyed'.split(','),2,'Newton\'s 1st Law (Inertia): objects resist changes in their state of motion.','advanced',9,S,'Energy','Forces and Motion'),
  q('What is the pH of pure water?','3,7,11,14'.split(','),1,'Pure water has a pH of 7 — it is neutral (neither acidic nor alkaline).','intermediate',7,S,'Materials and Matter','Mixtures and Solutions'),
  q('Which vitamin is found in citrus fruits and prevents scurvy?','Vitamin A,Vitamin B,Vitamin C,Vitamin D'.split(','),2,'Vitamin C (ascorbic acid) is found in oranges, lemons, mangoes. Deficiency causes scurvy.','beginner',5,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is the function of the stomach?','Absorb nutrients,Store and digest food with acids and enzymes,Produce bile,Filter blood'.split(','),1,'The stomach mixes food with hydrochloric acid and enzymes to begin protein digestion.','intermediate',6,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is an ecosystem?','A type of animal,A community of living organisms and their physical environment,A food chain,A biome'.split(','),1,'An ecosystem includes all living organisms (biotic) and non-living factors (abiotic) in an area.','intermediate',7,S,'Living Things and Life Processes','Animals'),
  q('What does a compass needle point to?','True North,Magnetic North,South,East'.split(','),1,'A compass needle points to magnetic north due to Earth\'s magnetic field.','beginner',4,S,'Earth and Space','Solar System'),
  q('What is biodiversity?','The number of plants only,The variety of life (species, genes, ecosystems) in an area,A type of farming,A type of pollution'.split(','),1,'Biodiversity = the variety of all life forms in an area, including plants, animals, fungi and microbes.','advanced',8,S,'Living Things and Life Processes','Animals'),
  q('What is the ozone layer?','A layer of ocean water,A layer of O₃ in the stratosphere protecting Earth from UV rays,A type of cloud,A layer of soil'.split(','),1,'The ozone (O₃) layer in the stratosphere absorbs harmful ultraviolet radiation from the sun.','advanced',8,S,'Earth and Space','Weather and Climate'),
  q('What is the boiling point of water in Kelvin?','273K,373K,100K,473K'.split(','),1,'0°C=273K. Boiling point=100°C=100+273=373K.','advanced',9,S,'Materials and Matter','States of Matter'),
  q('What is genetic material called?','RNA only,DNA,Protein,Lipids'.split(','),1,'DNA (deoxyribonucleic acid) carries genetic information in chromosomes in the nucleus.','advanced',9,S,'Living Things and Life Processes','Cells'),
  q('What is the process by which organisms produce offspring?','Respiration,Reproduction,Photosynthesis,Digestion'.split(','),1,'Reproduction is the biological process by which organisms produce new individuals of the same species.','beginner',4,S,'Living Things and Life Processes','Plants'),
  q('Sound travels fastest through which medium?','Vacuum,Air,Water,Steel'.split(','),3,'Sound travels fastest through solids (steel ~5,100m/s) > liquids > gases. Cannot travel through vacuum.','advanced',8,S,'Energy','Forms of Energy'),
  q('What is the acceleration due to gravity on Earth?','5m/s²,9.8m/s²,12m/s²,15m/s²'.split(','),1,'g = 9.8 m/s² (approximately 10 m/s² for easy calculations).','advanced',9,S,'Energy','Forces and Motion'),
  q('Which blood type is the universal donor?','A,B,AB,O'.split(','),3,'Blood type O negative is the universal donor — it can be given to anyone.','advanced',9,S,'Living Things and Life Processes','Human Body Systems'),
];

// ─────────────────────────────────────────────────────────────
// ADDITIONAL ENGLISH QUESTIONS
// ─────────────────────────────────────────────────────────────
const ENGLISH_EXTRA: GESQuestion[] = [
  q('Which of the following is a proper noun?','Book,City,Accra,School'.split(','),2,'Proper nouns name specific people, places, or things and begin with capital letters. Accra is a specific city.','beginner',3,E,'Reading and Writing','Grammar'),
  q('What is the past tense of "run"?','Runned,Runs,Ran,Running'.split(','),2,'Run has an irregular past tense: run → ran.','beginner',3,E,'Reading and Writing','Grammar'),
  q('What is the future tense of "I eat"?','I ate,I am eating,I will eat,I have eaten'.split(','),2,'Future tense uses "will" + verb: I will eat.','beginner',3,E,'Reading and Writing','Grammar'),
  q('What punctuation mark ends a question?','Full stop,Comma,Question mark,Exclamation mark'.split(','),2,'Questions end with a question mark (?).','beginner',2,E,'Reading and Writing','Grammar'),
  q('Which word is an adjective in: "The tall girl ran quickly"?','girl,ran,tall,quickly'.split(','),2,'"Tall" describes the noun (girl) → it is an adjective.','beginner',3,E,'Reading and Writing','Grammar'),
  q('What is the comparative of "big"?','More big,Biggest,Bigger,Biger'.split(','),2,'One-syllable adjectives: add -er for comparative. big → bigger.','intermediate',4,E,'Reading and Writing','Grammar'),
  q('What is the superlative of "beautiful"?','More beautiful,Beautifulest,Beautifuller,Most beautiful'.split(','),3,'Long adjectives use most/least. beautiful → most beautiful.','intermediate',5,E,'Reading and Writing','Grammar'),
  q('Identify the preposition: "The book is on the table."','book,is,on,table'.split(','),2,'Prepositions show position/relationship. "On" shows where the book is relative to the table.','intermediate',4,E,'Reading and Writing','Grammar'),
  q('What does "etc." stand for?','End the chapter,Et cetera (and so on),Extra text continues,Every thing complete'.split(','),1,'Etc. = et cetera (Latin) meaning "and other things" or "and so on".','intermediate',5,E,'Reading and Writing','Vocabulary'),
  q('What is alliteration?','Words that rhyme,Repetition of the same consonant sound at the start of nearby words,A very long word,A type of poem'.split(','),1,'Alliteration: "Peter Piper picked a peck of pickled peppers." Repeating the "p" sound.','intermediate',6,E,'Reading and Writing','Comprehension'),
  q('What is the meaning of "commence"?','Finish,Begin/Start,Continue,Delay'.split(','),1,'"Commence" is a formal word meaning to begin or start.','advanced',7,E,'Reading and Writing','Vocabulary'),
  q('What is a clause?','A type of punctuation,A group of words containing a subject and verb,A paragraph,A type of poem'.split(','),1,'A clause contains a subject and a predicate (verb). E.g. "She reads" is a clause.','intermediate',6,E,'Reading and Writing','Grammar'),
  q('Which sentence is correct?','Their going there,They\'re going their,They\'re going there,Their going they\'re'.split(','),2,'They\'re=they are (contraction). There=a place. "They\'re going there" is correct.','intermediate',6,E,'Reading and Writing','Grammar'),
  q('What is the meaning of "aquatic"?','Related to fire,Related to water,Related to land,Related to air'.split(','),1,'"Aquatic" means relating to water. E.g. aquatic animals live in water.','intermediate',5,E,'Reading and Writing','Vocabulary'),
  q('What is hyperbole?','A factual statement,An extreme exaggeration for effect,A word that sounds like what it describes,A comparison using like/as'.split(','),1,'Hyperbole is exaggeration: "I\'ve told you a million times!" is hyperbole.','advanced',7,E,'Reading and Writing','Comprehension'),
  q('What is the plural of "ox"?','Oxes,Oxen,Ox\'s,Ox'.split(','),1,'"Oxen" is the irregular plural of "ox". Like child/children.','intermediate',5,E,'Reading and Writing','Grammar'),
  q('What is a subordinate clause?','A main clause,A clause that cannot stand alone and depends on a main clause,A type of noun,A complete sentence'.split(','),1,'A subordinate clause adds information but cannot stand alone: "...because she was tired."','advanced',8,E,'Reading and Writing','Grammar'),
  q('Which word is a conjunction in: "I wanted to go, but it rained."?','wanted,but,rained,it'.split(','),1,'"But" is a coordinating conjunction joining two independent clauses.','intermediate',5,E,'Reading and Writing','Grammar'),
  q('What does "ambiguous" mean?','Clear and precise,Having more than one possible meaning,Very long,Very short'.split(','),1,'"Ambiguous" means unclear or having multiple interpretations.','advanced',8,E,'Reading and Writing','Vocabulary'),
  q('What is the passive form of "The chef cooked the meal"?','The meal cooked the chef,The meal was cooked by the chef,The chef is cooking the meal,The meal has been cooking'.split(','),1,'Passive: object becomes subject. "The meal was cooked by the chef."','advanced',8,E,'Reading and Writing','Grammar'),
  q('What is personification?','Comparing two things using "like",Giving human qualities to non-human things,An extreme exaggeration,Repeating consonant sounds'.split(','),1,'Personification: "The sun smiled down on us." The sun is given the human ability to smile.','intermediate',6,E,'Reading and Writing','Comprehension'),
  q('What is the meaning of "diligent"?','Lazy,Hardworking and careful,Rude,Clever'.split(','),1,'"Diligent" means hardworking, careful, and thorough in one\'s work.','intermediate',6,E,'Reading and Writing','Vocabulary'),
  q('What is a topic sentence?','The last sentence of a paragraph,The sentence that introduces the main idea of a paragraph,A question sentence,A very long sentence'.split(','),1,'The topic sentence states the main idea of a paragraph — usually the first sentence.','intermediate',6,E,'Oral Language','Oral Communication'),
  q('What does the prefix "mis-" mean in "misunderstand"?','Again,Too much,Wrongly,Before'.split(','),2,'"Mis-" means wrongly or badly. Misunderstand = to understand wrongly.','intermediate',5,E,'Reading and Writing','Vocabulary'),
  q('Choose the correct sentence:','He don\'t like it,He doesn\'t like it,He didn\'t likes it,He doesn\'t likes it'.split(','),1,'With he/she/it, use "doesn\'t" (does not) in negative present tense.','intermediate',5,E,'Reading and Writing','Grammar'),
  q('What type of sentence is "Close the door!"?','Declarative,Interrogative,Exclamatory,Imperative'.split(','),3,'Imperative sentences give commands or instructions. "Close the door!" is a command.','intermediate',5,E,'Reading and Writing','Grammar'),
  q('What is an antecedent in grammar?','A type of verb,The noun that a pronoun refers to,A type of adjective,A punctuation mark'.split(','),1,'Antecedent: the noun that a pronoun replaces. In "Kofi forgot his book", Kofi is the antecedent of "his".','advanced',9,E,'Reading and Writing','Grammar'),
  q('What does "e.g." stand for?','English grammar,Exempli gratia (for example),Every grade,Example given'.split(','),1,'"e.g." = exempli gratia (Latin) meaning "for example".','intermediate',6,E,'Reading and Writing','Vocabulary'),
  q('Identify the type of phrase: "running very fast"','Noun phrase,Adjective phrase,Verb phrase,Adverb phrase'.split(','),2,'A verb phrase = main verb + modifiers. "Running very fast" is a verb phrase.','advanced',8,E,'Reading and Writing','Grammar'),
  q('What is direct speech?','Reported speech,The exact words spoken by someone in quotation marks,A type of poem,A formal letter'.split(','),1,'Direct speech uses quotation marks: Kofi said, "I am hungry."','intermediate',6,E,'Reading and Writing','Grammar'),
];

// ─────────────────────────────────────────────────────────────
// TWI (GHANAIAN LANGUAGE)
// ─────────────────────────────────────────────────────────────
const TW = 'Twi';
const TWI: GESSubject = {
  name: TW, icon: '🇬🇭', color: '#dc2626', coverColor: 'from-red-600 to-amber-600',
  strands: [
    {
      name: 'Listening and Speaking', icon: '🗣️', color: '#dc2626',
      subStrands: [
        {
          name: 'Oral Communication',
          questions: [
            q('How do you greet someone in the morning in Twi?','Maakye,Maaha,Maadwo,Mema wo akye'.split(','),0,'"Maakye" is the Twi greeting for "Good morning". Maaha=Good afternoon, Maadwo=Good evening.','beginner',1,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "Good afternoon" in Twi?','Maakye,Maaha,Maadwo,Mema wo akye'.split(','),1,'"Maaha" means Good afternoon in Twi.','beginner',1,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "Good evening" in Twi?','Maakye,Maaha,Maadwo,Mema wo da yie'.split(','),2,'"Maadwo" means Good evening in Twi.','beginner',1,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "Thank you" in Twi?','Yɛda wo ase,Meda wo ase,Afehyia pa,Akwaaba'.split(','),1,'"Meda wo ase" means Thank you (I thank you). "Yɛda wo ase" = We thank you.','beginner',2,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "Welcome" in Twi?','Yɛda wo ase,Meda wo ase,Afehyia pa,Akwaaba'.split(','),3,'"Akwaaba" means Welcome in Twi (and many Ghanaian languages).','beginner',1,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "How are you?" in Twi?','Wo ho te sɛn?,Wo din de sɛn?,Wo fi he?,Yɛda wo ase'.split(','),0,'"Wo ho te sɛn?" means "How are you?" (How is your body?)','beginner',2,TW,'Listening and Speaking','Oral Communication'),
            q('What is the Twi response to "Wo ho te sɛn?" (How are you?)?','Maakye,Meda wo ase,Me ho ye,Akwaaba'.split(','),2,'"Me ho ye" means "I am fine" (My body is good).','beginner',2,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "My name is..." in Twi?','Me din de...,Wo din de...,Me fi...,Me kɔ...'.split(','),0,'"Me din de..." means "My name is..." ("My name is..." = Me din de Kofi)','beginner',2,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "Goodbye" in Twi?','Akwaaba,Nante yie,Maakye,Meda wo ase'.split(','),1,'"Nante yie" means Goodbye/Go well in Twi.','beginner',2,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "I love you" in Twi?','Me pe wo,Me dɔ wo,Me da wo ase,Akwaaba'.split(','),1,'"Me dɔ wo" means I love you in Twi.','beginner',3,TW,'Listening and Speaking','Oral Communication'),
            q('What does "Medaase" mean?','Good morning,Welcome,Thank you very much,Goodbye'.split(','),2,'"Medaase" is an expression of deep gratitude meaning "Thank you" (more emphatic than Meda wo ase).','beginner',3,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "Please" in Twi?','Mepa wo kyɛw,Meda wo ase,Akwaaba,Nante yie'.split(','),0,'"Mepa wo kyɛw" means Please in Twi (literally "I beg you").','beginner',3,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "I am going to school" in Twi?','Me kɔ sukuu,Me ba sukuu,Me wɔ sukuu,Me fi sukuu'.split(','),0,'"Me kɔ sukuu" = I am going to school. (kɔ = go, sukuu = school)','intermediate',4,TW,'Listening and Speaking','Oral Communication'),
            q('What does "Bra ha" mean in Twi?','Go away,Come here,Sit down,Stand up'.split(','),1,'"Bra ha" means "Come here" in Twi. (bra = come, ha = here)','beginner',3,TW,'Listening and Speaking','Oral Communication'),
            q('How do you say "I am hungry" in Twi?','Me dɔ aduan,Kɔm de me,Me tumi adidi,Me ani agye'.split(','),1,'"Kɔm de me" means I am hungry (hunger has me).','beginner',4,TW,'Listening and Speaking','Oral Communication'),
          ]
        },
        {
          name: 'Storytelling and Folktales',
          questions: [
            q('What character is most famous in Akan folktales?','Lion,Kweku Ananse (the spider),Elephant,Rabbit'.split(','),1,'Kweku Ananse (Anansi the spider) is the most famous trickster character in Akan/Ghanaian folktales.','beginner',3,TW,'Listening and Speaking','Storytelling and Folktales'),
            q('What is the Twi word for folktale/story?','Nnwonkoro,Anansesem,Asɛm,Kyerɛɛ'.split(','),1,'"Anansesem" (Ananse stories) is the Akan word for traditional folktales, originally featuring Anansi the spider.','beginner',3,TW,'Listening and Speaking','Storytelling and Folktales'),
            q('What phrase is traditionally used to begin an Anansesem (story)?','Maakye,Akwaaba,Ananse Kokuroko,Yɛn ara yɛn asase ni'.split(','),2,'Traditional Akan storytelling begins with announcing the character. Ananse stories often start by naming Ananse.','intermediate',5,TW,'Listening and Speaking','Storytelling and Folktales'),
            q('What is the main lesson Ananse stories typically teach?','How to farm,Moral lessons about wisdom, greed, and consequences,How to cook,History of Ghana'.split(','),1,'Ananse stories are moral tales teaching wisdom, the consequences of greed, and using cleverness responsibly.','intermediate',4,TW,'Listening and Speaking','Storytelling and Folktales'),
          ]
        },
      ]
    },
    {
      name: 'Reading and Writing', icon: '📖', color: '#f59e0b',
      subStrands: [
        {
          name: 'Twi Alphabet and Phonics',
          questions: [
            q('Twi uses some special characters. Which of these is a Twi vowel not found in English?','a,e,ɛ,i'.split(','),2,'Twi uses "ɛ" (open e sound as in "bed") which is not in the standard English alphabet.','intermediate',4,TW,'Reading and Writing','Twi Alphabet and Phonics'),
            q('Which of these is a Twi special character?','q,x,ɔ,z'.split(','),2,'"ɔ" (open o) is a special Twi/Akan vowel representing a sound between "o" and "aw".','intermediate',4,TW,'Reading and Writing','Twi Alphabet and Phonics'),
            q('What sound does "ky" make in Twi?','k-y sound,ch sound,kw sound,gy sound'.split(','),1,'In Twi, "ky" represents a "ch"-like sound. E.g. "Kyerɛ" (teach/show).','intermediate',5,TW,'Reading and Writing','Twi Alphabet and Phonics'),
          ]
        },
        {
          name: 'Vocabulary',
          questions: [
            q('What is "sukuu" in English?','Market,Church,School,House'.split(','),2,'"Sukuu" = school in Twi (borrowed from English "school").','beginner',2,TW,'Reading and Writing','Vocabulary'),
            q('What is "fie" in Twi?','School,Market,Church,House/Home'.split(','),3,'"Fie" means home or house in Twi. "Me fi" = I am from (my home).','beginner',2,TW,'Reading and Writing','Vocabulary'),
            q('What is "aduan" in English?','Water,Food,Book,Cloth'.split(','),1,'"Aduan" means food in Twi.','beginner',2,TW,'Reading and Writing','Vocabulary'),
            q('What is "nsuo" in Twi?','Fire,Water,Earth,Air'.split(','),1,'"Nsuo" means water in Twi.','beginner',2,TW,'Reading and Writing','Vocabulary'),
            q('What is "papa" in Twi?','Mother,Father/good,Sister,Brother'.split(','),1,'"Papa" means father (also means good/nice) in Twi. Context determines meaning.','beginner',2,TW,'Reading and Writing','Vocabulary'),
            q('What is "maame" in Twi?','Father,Brother,Mother,Sister'.split(','),2,'"Maame" means mother in Twi.','beginner',2,TW,'Reading and Writing','Vocabulary'),
            q('What is "onipa" in English?','Animal,Person/human being,Plant,Thing'.split(','),1,'"Onipa" means person or human being in Twi.','beginner',3,TW,'Reading and Writing','Vocabulary'),
            q('What does "Ɔda" mean in Twi?','She/He is eating,She/He is sleeping,She/He is going,She/He is coming'.split(','),1,'"Ɔda" means he/she is sleeping (lying down) in Twi.','intermediate',4,TW,'Reading and Writing','Vocabulary'),
            q('What is "owuo" in English?','Birth,Sleep,Death,Dream'.split(','),2,'"Owuo" means death in Twi. "Owuo atwedee obaako nfo" is a famous Akan proverb.','intermediate',5,TW,'Reading and Writing','Vocabulary'),
            q('What is "sunsum" in Twi?','Body,Spirit/Soul,Mind,Heart'.split(','),1,'"Sunsum" means spirit or soul in Akan belief. It is a core concept in Akan spirituality.','advanced',6,TW,'Reading and Writing','Vocabulary'),
            q('Count to 5 in Twi: baako, mmienu, mmiɛnsa, ___','nkron,enum,nsia,nson'.split(','),1,'Twi numbers: 1=baako, 2=mmienu, 3=mmiɛnsa, 4=ɛnan, 5=enum.','beginner',3,TW,'Reading and Writing','Vocabulary'),
            q('What is "ɛnan" in English?','3,4,5,6'.split(','),1,'"Ɛnan" is the number 4 in Twi.','beginner',3,TW,'Reading and Writing','Vocabulary'),
            q('What does "Akwaaba" truly mean?','Goodbye,Thank you,Welcome (you are welcome to come),I love you'.split(','),2,'"Akwaaba" literally means "You are welcome to come" — the universal Ghanaian welcome.','beginner',2,TW,'Reading and Writing','Vocabulary'),
          ]
        },
      ]
    },
    {
      name: 'Language Use', icon: '📚', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Proverbs and Idioms',
          questions: [
            q('What does the Akan proverb "Onipa na ohia onipa" mean?','A person is better than money,A person needs a person (no one is self-sufficient),A person is strong,People cause problems'.split(','),1,'"Onipa na ohia onipa" = A person needs other people. It emphasises community and interdependence.','intermediate',5,TW,'Language Use','Proverbs and Idioms'),
            q('"Oyerebi bi, na wanya bi" means:','He who has a wife has trouble,He who seeks something will find it,He has nothing,He found water'.split(','),1,'This Akan proverb means: He who seeks (something) will find (it). Persistence pays off.','intermediate',5,TW,'Language Use','Proverbs and Idioms'),
            q('What is an Akan "Mmebusem"?','A type of drum,A proverb or wise saying,A folktale,A festival'.split(','),1,'"Mmebusem" is the Akan word for proverbs — traditional wise sayings encoding cultural wisdom.','intermediate',6,TW,'Language Use','Proverbs and Idioms'),
            q('"Woforo dua pa a, na yepia wo" means:','When you climb a good tree, you are helped up|When you fall, no one helps|Good trees are tall|Climbing is dangerous'.split('|'),0,'This proverb means: When you pursue a worthy/noble goal, people will help and support you.','advanced',7,TW,'Language Use','Proverbs and Idioms'),
            q('What does "Owuo atwedee obaako nfo" mean?','Death is painful,Death\'s ladder is not climbed by just one person (death comes to all),Only the old die,The young cannot die'.split(','),1,'This famous Akan proverb means death comes to everyone — no one is exempt from death.','advanced',7,TW,'Language Use','Proverbs and Idioms'),
            q('The Akan symbol "Sankofa" (bird looking back) represents:','Going forward only,Learning from the past to build the future,Forgetting history,Looking for enemies'.split(','),1,'"Sankofa" (from "sɛ wo were fi na wosankofa a yenkyi") means it is not wrong to go back for what you forgot — learn from your past.','advanced',7,TW,'Language Use','Proverbs and Idioms'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// CREATIVE ARTS
// ─────────────────────────────────────────────────────────────
const CA = 'Creative Arts';
const CREATIVE_ARTS: GESSubject = {
  name: CA, icon: '🎨', color: '#ec4899', coverColor: 'from-pink-500 to-purple-600',
  strands: [
    {
      name: 'Visual Arts', icon: '🖼️', color: '#ec4899',
      subStrands: [
        {
          name: 'Drawing and Colour',
          questions: [
            q('What are the three primary colours?','Red, green, blue,Red, yellow, blue,Red, orange, purple,Green, purple, orange'.split(','),1,'Primary colours: Red, Yellow, Blue. They cannot be made by mixing other colours.','beginner',1,CA,'Visual Arts','Drawing and Colour'),
            q('What do you get when you mix red and blue?','Green,Orange,Purple,Brown'.split(','),2,'Red + Blue = Purple (a secondary colour).','beginner',2,CA,'Visual Arts','Drawing and Colour'),
            q('What do you get when you mix red and yellow?','Green,Orange,Purple,Pink'.split(','),1,'Red + Yellow = Orange.','beginner',2,CA,'Visual Arts','Drawing and Colour'),
            q('What do you get when you mix blue and yellow?','Red,Green,Orange,Purple'.split(','),1,'Blue + Yellow = Green.','beginner',2,CA,'Visual Arts','Drawing and Colour'),
            q('What are secondary colours?','Red, yellow, blue,Orange, green, purple,Black and white,Red and blue only'.split(','),1,'Secondary colours are made by mixing two primary colours: Orange, Green, Purple.','beginner',3,CA,'Visual Arts','Drawing and Colour'),
            q('What is a "warm colour"?','Blue, green, purple,Red, orange, yellow,Black and white,Brown and grey'.split(','),1,'Warm colours (red, orange, yellow) evoke warmth, energy, and excitement.','intermediate',4,CA,'Visual Arts','Drawing and Colour'),
            q('What is a "cool colour"?','Red, orange, yellow,Blue, green, purple,Gold and silver,Brown and black'.split(','),1,'Cool colours (blue, green, purple) evoke calm, peace, and coldness.','intermediate',4,CA,'Visual Arts','Drawing and Colour'),
            q('What are complementary colours?','Colours that are similar,Colours opposite each other on the colour wheel,Dark and light shades,Warm colours only'.split(','),1,'Complementary colours are opposite on the colour wheel: red/green, blue/orange, yellow/purple.','intermediate',5,CA,'Visual Arts','Drawing and Colour'),
            q('What is the technique of creating texture by rubbing a pencil over paper on a textured surface?','Stippling,Hatching,Frottage,Scumbling'.split(','),2,'Frottage: place paper over texture, rub with pencil to transfer the texture pattern.','intermediate',6,CA,'Visual Arts','Drawing and Colour'),
            q('What type of lines create a feeling of movement in art?','Horizontal lines,Vertical lines,Diagonal/curved lines,Dotted lines'.split(','),2,'Diagonal and curved lines suggest movement, action, and energy in artworks.','intermediate',5,CA,'Visual Arts','Drawing and Colour'),
            q('What is "perspective" in art?','A type of paint,Showing depth and distance on a flat surface,Using only dark colours,Drawing circles'.split(','),1,'Perspective techniques make flat drawings appear three-dimensional with depth and distance.','intermediate',6,CA,'Visual Arts','Drawing and Colour'),
          ]
        },
        {
          name: 'Ghanaian Art and Craft',
          questions: [
            q('What traditional Ghanaian craft uses clay to make pots and vessels?','Weaving,Pottery,Batik,Embroidery'.split(','),1,'Pottery is the craft of shaping clay into pots, bowls and vessels, common in many Ghanaian communities.','beginner',3,CA,'Visual Arts','Ghanaian Art and Craft'),
            q('What is "Adinkra"?','A type of dance,A type of drum,Akan symbols with meanings, used in cloth and art,A type of food'.split(','),2,'Adinkra are visual symbols created by the Akan, each with a distinct meaning. Used on cloth and in art.','intermediate',5,CA,'Visual Arts','Ghanaian Art and Craft'),
            q('What Adinkra symbol represents the importance of learning from the past?','Gye Nyame,Sankofa,Dwennimmen,Nyame Dua'.split(','),1,'Sankofa (bird looking backward) means "go back and fetch it" — learning from the past.','intermediate',5,CA,'Visual Arts','Ghanaian Art and Craft'),
            q('What does the "Gye Nyame" Adinkra symbol represent?','Love,The supremacy of God,Courage,Wisdom'.split(','),1,'"Gye Nyame" means "Except God" — representing the omnipotence and supremacy of God.','intermediate',5,CA,'Visual Arts','Ghanaian Art and Craft'),
            q('What is kente traditionally made of?','Wool,Cotton only,Silk or cotton strips woven together,Synthetic fibres'.split(','),2,'Traditional kente cloth is woven from silk or cotton in narrow strips sewn together.','intermediate',5,CA,'Visual Arts','Ghanaian Art and Craft'),
            q('What is "batik"?','A type of weaving,A traditional drum,A fabric dyeing technique using wax to create patterns,A type of pottery'.split(','),2,'Batik is a wax-resist dyeing technique: apply wax to cloth, dye it, remove wax to reveal pattern.','intermediate',6,CA,'Visual Arts','Ghanaian Art and Craft'),
            q('What material is commonly used to make beads in Ghana?','Wood only,Glass, clay, seeds and stone,Plastic only,Metal only'.split(','),1,'Ghanaian beads are made from glass (powder glass beads), clay, seeds, stone, and other materials.','beginner',4,CA,'Visual Arts','Ghanaian Art and Craft'),
          ]
        },
      ]
    },
    {
      name: 'Performing Arts', icon: '🎭', color: '#8b5cf6',
      subStrands: [
        {
          name: 'Music',
          questions: [
            q('What does "rhythm" mean in music?','The speed of music,The pattern of beats and sounds in music,The loudness of music,The type of instrument'.split(','),1,'Rhythm is the pattern of beats — the regular pulse and timing of sounds in music.','beginner',2,CA,'Performing Arts','Music'),
            q('What is "tempo" in music?','The rhythm pattern,The speed (fast or slow) of music,The volume,The melody'.split(','),1,'Tempo is how fast or slow music is played. Fast tempo = lively, slow tempo = calm.','intermediate',4,CA,'Performing Arts','Music'),
            q('Which of these is a traditional Ghanaian instrument?','Guitar,Piano,Fontomfrom (state drum),Violin'.split(','),2,'The Fontomfrom is a set of royal/state drums used in Asante ceremonies.','intermediate',5,CA,'Performing Arts','Music'),
            q('What is the "Atumpan" drum used for?','Dancing only,Communication and ceremonial use in Akan society,Cooking,Building'.split(','),1,'The Atumpan (talking drum) is used to communicate, send messages, and accompany ceremonies.','intermediate',5,CA,'Performing Arts','Music'),
            q('What is a "xylophone" called in northern Ghana?','Atumpan,Gyil (Gyile),Kpanlogo,Donno'.split(','),1,'The Gyil (or Gyile) is the xylophone of the Dagara and Lobi peoples of northern Ghana.','intermediate',6,CA,'Performing Arts','Music'),
            q('What does "pitch" mean in music?','How loud a sound is,How high or low a musical note is,The speed of music,The type of instrument'.split(','),1,'Pitch describes whether a note sounds high (like a flute) or low (like a drum bass).','intermediate',5,CA,'Performing Arts','Music'),
            q('What is a "melody"?','A single beat,A sequence of musical notes that form a recognisable tune,Only the bass notes,The volume pattern'.split(','),1,'A melody is a sequence of notes that form a tune — what you sing or hum.','beginner',4,CA,'Performing Arts','Music'),
            q('What are the musical notes in ascending order?','Do, Re, Mi, Fa, Sol, La, Ti,La, Sol, Fa, Mi, Re, Do, Ti,Do, Mi, Re, Fa, Sol, La, Ti,Ti, La, Sol, Fa, Mi, Re, Do'.split(','),0,'The solfège scale: Do-Re-Mi-Fa-Sol-La-Ti-Do (ascending). Used worldwide for singing.','intermediate',5,CA,'Performing Arts','Music'),
          ]
        },
        {
          name: 'Dance',
          questions: [
            q('Which Ghanaian dance is associated with the Akan people of the Ashanti Region?','Agbadza,Adowa,Kpanlogo,Baamaaya'.split(','),1,'Adowa is a popular Asante dance performed at funerals and celebrations using graceful hand movements.','intermediate',5,CA,'Performing Arts','Dance'),
            q('Which dance is associated with the Ewe people?','Adowa,Kpanlogo,Agbadza,Fontomfrom'.split(','),2,'Agbadza is a recreational dance of the Ewe people of the Volta Region.','intermediate',5,CA,'Performing Arts','Dance'),
            q('Which dance is traditionally performed by the Ga people?','Adowa,Agbadza,Kpanlogo,Baamaaya'.split(','),2,'Kpanlogo is a recreational youth dance originating from the Ga people of Greater Accra.','intermediate',5,CA,'Performing Arts','Dance'),
            q('Which dance is associated with the people of the Northern Region?','Adowa,Agbadza,Kpanlogo,Baamaaya'.split(','),3,'Baamaaya is an acrobatic dance of the Dagbon people, performed with fast spinning movements.','intermediate',6,CA,'Performing Arts','Dance'),
            q('What is the purpose of traditional dance in Ghanaian culture?','Entertainment only,Accompanies ceremonies, celebrations, funerals, and passes cultural values,Sport only,School activity only'.split(','),1,'Traditional dance communicates cultural values, marks life events (birth, death, harvest) and maintains heritage.','intermediate',5,CA,'Performing Arts','Dance'),
          ]
        },
        {
          name: 'Drama',
          questions: [
            q('What is a "protagonist" in drama?','The villain,The main character/hero of a story,A minor character,The narrator'.split(','),1,'The protagonist is the main character around whom the story revolves.','intermediate',6,CA,'Performing Arts','Drama'),
            q('What is an "antagonist" in drama?','The hero,The character who opposes the protagonist,The narrator,A minor character'.split(','),1,'The antagonist opposes or creates conflict for the protagonist (hero). Often the villain.','intermediate',6,CA,'Performing Arts','Drama'),
            q('What does "improvisation" mean in drama?','Performing a rehearsed script,Creating and performing without prior preparation or a script,A type of dance,Writing a play'.split(','),1,'Improvisation = creating performance spontaneously without a script. Key drama skill.','intermediate',6,CA,'Performing Arts','Drama'),
            q('What is "mime"?','Singing without music,Performing using body movement and expression without words or sound,A type of painting,A written play'.split(','),1,'Mime is silent performance using body language, facial expressions and gestures to communicate.','intermediate',5,CA,'Performing Arts','Drama'),
            q('What is the "setting" of a play?','The costumes worn,Where and when the story takes place,The main character,The plot ending'.split(','),1,'Setting = the time and place in which the story is set. It creates context for the action.','intermediate',6,CA,'Performing Arts','Drama'),
          ]
        },
      ]
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// ADDITIONAL HISTORY QUESTIONS
// ─────────────────────────────────────────────────────────────
const HISTORY_EXTRA: GESQuestion[] = [
  q('Which empire rose to power after the Ghana Empire declined?','Songhai Empire,Mali Empire,Oyo Empire,Benin Empire'.split(','),1,'The Mali Empire rose to dominance in West Africa after the decline of the Ghana Empire (~13th century).','advanced',7,H,'Ghanaian History','Pre-Colonial Kingdoms'),
  q('Who founded the Asante (Ashanti) Empire?','Osei Tutu I,Yaa Asantewaa,Oti Akenten,Opoku Ware I'.split(','),0,'Osei Tutu I (reigned c.1701–1717) unified the Asante clans and founded the Asante Empire.','advanced',8,H,'Ghanaian History','Pre-Colonial Kingdoms'),
  q('What is the "Golden Stool" (Sika Dwa) in Asante tradition?','A golden chair for the king,The sacred symbol of Asante nationhood and the soul of the Asante people,A place to store gold,A trophy for warriors'.split(','),1,'The Golden Stool is believed to contain the sunsum (soul) of the Asante nation. It descended from heaven.','advanced',7,H,'Ghanaian History','Pre-Colonial Kingdoms'),
  q('Who was Yaa Asantewaa?','A Ghanaian president,An Asante queen mother who led the War of the Golden Stool (1900) against the British,A Ga chief,A colonial governor'.split(','),1,'Yaa Asantewaa was the Asante queen mother of Ejisu who led the last major resistance against British colonisation in 1900.','intermediate',6,H,'Ghanaian History','Pre-Colonial Kingdoms'),
  q('What was the "War of the Golden Stool" (1900)?','A civil war between Asante clans,The Asante revolt against British demand to sit on the Golden Stool,A war over gold mining,A religious war'.split(','),1,'The British Governor demanded the Golden Stool as a seat. Yaa Asantewaa led the Asante to resist this humiliation.','advanced',8,H,'Ghanaian History','Pre-Colonial Kingdoms'),
  q('When was the Elmina Castle built and by whom?','1441 by British,1482 by Portuguese,1600 by Dutch,1750 by French'.split(','),1,'Elmina Castle (São Jorge da Mina) was built by the Portuguese in 1482 — the first European structure in sub-Saharan Africa.','advanced',8,H,'The Slave Trade','Transatlantic Slave Trade'),
  q('What does "UGCC" stand for in Ghana\'s history?','United Government of Coastal Communities,United Gold Coast Convention,United Ghana Cultural Committee,Upper Ghana Civil Council'.split(','),1,'UGCC = United Gold Coast Convention, founded in 1947 by J.B. Danquah to push for self-governance.','advanced',8,H,'Ghanaian History','Post-Independence'),
  q('What was the "Convention People\'s Party" (CPP)?','A cultural organization,The political party founded by Kwame Nkrumah that led Ghana to independence,A colonial organization,A student group'.split(','),1,'Nkrumah founded the CPP in 1949 after breaking from UGCC. The CPP won the 1951 election.','advanced',8,H,'Ghanaian History','Post-Independence'),
  q('What significant event occurred on March 6, 1957?','Ghana became a republic,Ghana gained independence from Britain,The first election,The founding of the OAU'.split(','),1,'March 6, 1957: Ghana declared independence. Nkrumah announced "Ghana, your beloved country, is free forever!"','intermediate',5,H,'Ghanaian History','Post-Independence'),
  q('What is the "Organisation of African Unity" (OAU) now called?','African Development Bank,African Union,ECOWAS,NEPAD'.split(','),1,'The OAU (founded 1963) was renamed the African Union (AU) in 2002.','advanced',9,H,'Ghanaian History','Post-Independence'),
  q('Who overthrew Nkrumah in 1966?','The people of Ghana,The National Liberation Council (military coup),The British government,UGCC members'.split(','),1,'The NLC (National Liberation Council) overthrew Nkrumah on 24th Feb 1966 while he was visiting Hanoi.','advanced',9,H,'Ghanaian History','Post-Independence'),
  q('What year did Ghana become a Republic (with its own head of state)?','1957,1960,1965,1969'.split(','),1,'Ghana became a Republic on 1st July 1960, with Nkrumah becoming the first President.','intermediate',6,H,'Ghanaian History','Post-Independence'),
  q('What is ECOWAS?','East Community of West African States,Economic Community of West African States,Education Council of West Africa,Eastern Coalition of West African Schools'.split(','),1,'ECOWAS = Economic Community of West African States, founded 1975 to promote trade and cooperation in West Africa.','intermediate',7,H,'Ghanaian History','Post-Independence'),
  q('The first African country to gain independence in the 20th century was:','Nigeria,Ghana,Senegal,Liberia'.split(','),1,'Ghana (1957) was the first sub-Saharan African country to achieve independence from colonial rule in the 20th century.','intermediate',6,H,'Ghanaian History','Post-Independence'),
  q('What was the main purpose of the Berlin Conference of 1884-85?','To promote trade,To divide Africa among European powers,To discuss abolition of slavery,To promote Christianity'.split(','),1,'The Berlin Conference allowed European powers to partition and colonise Africa without African representation.','advanced',9,H,'The Slave Trade','Transatlantic Slave Trade'),
];

// ─────────────────────────────────────────────────────────────
// PATCH: Add extra questions to existing subjects
// ─────────────────────────────────────────────────────────────
function patchSubject(subject: GESSubject, extras: GESQuestion[]): void {
  for (const eq of extras) {
    let added = false;
    for (const strand of subject.strands) {
      if (strand.name === eq.strand) {
        for (const ss of strand.subStrands) {
          if (ss.name === eq.subStrand) {
            ss.questions.push(eq);
            added = true;
            break;
          }
        }
      }
      if (added) break;
    }
    if (!added) {
      // Find any matching strand and add to first substrand
      for (const strand of subject.strands) {
        if (strand.name === eq.strand) {
          if (strand.subStrands.length > 0) {
            strand.subStrands[0].questions.push(eq);
          }
          added = true;
          break;
        }
      }
    }
  }
}

// Apply patches
patchSubject(MATHS,   MATHS_EXTRA);
patchSubject(SCIENCE, SCIENCE_EXTRA);
patchSubject(ENGLISH, ENGLISH_EXTRA);

// Add extra history questions
for (const eq of HISTORY_EXTRA) {
  for (const strand of HISTORY.strands) {
    if (strand.name === eq.strand) {
      for (const ss of strand.subStrands) {
        if (ss.name === eq.subStrand) { ss.questions.push(eq); break; }
      }
    }
  }
}

// Add new subjects
GES_SUBJECTS.push(TWI, CREATIVE_ARTS);

// ─────────────────────────────────────────────────────────────
// MASSIVE EXPANSION — 700+ total questions
// ─────────────────────────────────────────────────────────────

const EXTRA_MATHS: GESQuestion[] = [
  q('What is 6 × 7?','40,42,45,48'.split(','),1,'6 × 7 = 42. Core times table.','beginner',3,M,'Number','Operations'),
  q('What is 8 × 9?','63,72,81,56'.split(','),1,'8 × 9 = 72.','beginner',3,M,'Number','Operations'),
  q('What is 11 × 12?','122,132,142,112'.split(','),1,'11 × 12 = 132.','intermediate',4,M,'Number','Operations'),
  q('What is 132 ÷ 11?','11,12,13,14'.split(','),1,'132 ÷ 11 = 12.','intermediate',4,M,'Number','Operations'),
  q('What is 25² ?','525,625,725,425'.split(','),1,'25² = 25 × 25 = 625.','intermediate',7,M,'Number','Operations'),
  q('What is √169?','11,13,15,17'.split(','),1,'13 × 13 = 169. √169 = 13.','intermediate',7,M,'Number','Operations'),
  q('What is √225?','13,15,17,11'.split(','),1,'15 × 15 = 225. √225 = 15.','intermediate',7,M,'Number','Operations'),
  q('Evaluate: 50 − 3 × 8','184,26,2,200'.split(','),1,'BODMAS: multiply first. 3×8=24. 50−24=26.','intermediate',6,M,'Number','Operations'),
  q('Evaluate: (4 + 6) × 3','22,30,42,18'.split(','),1,'Brackets first: 4+6=10. Then 10×3=30.','beginner',4,M,'Number','Operations'),
  q('What is 1/5 of 75?','12,15,18,20'.split(','),1,'75 ÷ 5 = 15.','beginner',4,M,'Number','Fractions'),
  q('What is 7/8 − 3/8?','4/8,1/2,3/4,5/8'.split(','),1,'Same denominator: 7/8−3/8=4/8=1/2.','intermediate',5,M,'Number','Fractions'),
  q('What is 1½ + 2¾?','3¾,4¼,4¾,3¼'.split(','),1,'1½=6/4, 2¾=11/4. Sum=17/4=4¼.','intermediate',6,M,'Number','Fractions'),
  q('Express 5/8 as a decimal.','0.58,0.625,0.5,0.65'.split(','),1,'5÷8=0.625.','intermediate',6,M,'Number','Decimals and Percentages'),
  q('What is 40% of 250?','80,90,100,110'.split(','),1,'40/100 × 250 = 100.','intermediate',6,M,'Number','Decimals and Percentages'),
  q('Find 12½% of 400.','40,50,55,60'.split(','),1,'12.5/100 × 400 = 50.','advanced',8,M,'Number','Decimals and Percentages'),
  q('If 8 workers complete a job in 6 days, how long for 12 workers?','3 days,4 days,5 days,6 days'.split(','),1,'Inverse proportion: 8×6=48. 48÷12=4 days.','advanced',8,M,'Number','Ratio and Proportion'),
  q('Divide 140 in the ratio 3:4.','60 and 80,80 and 60,70 and 70,50 and 90'.split(','),0,'Total=7. 3/7×140=60, 4/7×140=80.','intermediate',7,M,'Number','Ratio and Proportion'),
  q('What is 5 − (−3)?','2,8,−2,−8'.split(','),1,'5−(−3)=5+3=8.','intermediate',7,M,'Number','Integers and Directed Numbers'),
  q('What is (−6) + (−4)?','2,10,−2,−10'.split(','),3,'−6+(−4)=−10.','intermediate',6,M,'Number','Integers and Directed Numbers'),
  q('What is (−2)³?','6,8,−8,−6'.split(','),2,'(−2)³=(−2)×(−2)×(−2)=4×(−2)=−8.','advanced',8,M,'Algebra','Indices and Logarithms'),
  q('Simplify: 4x + 2y − x + 3y','3x+5y,5x+5y,3x−y,5x−5y'.split(','),0,'4x−x=3x, 2y+3y=5y. Answer: 3x+5y.','intermediate',6,M,'Algebra','Variables and Equations'),
  q('If y=3x−1 and x=4, find y.','10,11,12,13'.split(','),1,'y=3(4)−1=12−1=11.','intermediate',7,M,'Algebra','Variables and Equations'),
  q('What is the gradient of y=−2x+5?','5,2,−2,−5'.split(','),2,'In y=mx+c, gradient m=−2.','advanced',9,M,'Algebra','Variables and Equations'),
  q('Solve: x/3 + 2 = 5','x=6,x=7,x=8,x=9'.split(','),3,'x/3=3, x=9.','intermediate',7,M,'Algebra','Variables and Equations'),
  q('The sum of two numbers is 20 and their difference is 4. Find the larger number.','10,12,14,16'.split(','),1,'x+y=20, x−y=4. 2x=24, x=12.','intermediate',8,M,'Algebra','Variables and Equations'),
  q('Factorise: x²−9','(x+3)(x+3),(x−3)(x+3),(x−9)(x+1),(x+9)(x−1)'.split(','),1,'Difference of two squares: x²−9=(x−3)(x+3).','advanced',9,M,'Algebra','Quadratic Equations'),
  q('What is the nth term of 4,7,10,13,...?','3n+1,4n,3n+4,n+3'.split(','),0,'Starts at 4, increases by 3. nth term=3n+1. Check: n=1:4✓, n=2:7✓.','intermediate',7,M,'Algebra','Patterns and Sequences'),
  q('Find the sum of interior angles of a hexagon.','540°,600°,720°,810°'.split(','),2,'Sum=(n−2)×180°=(6−2)×180°=4×180°=720°.','advanced',8,M,'Geometry','Shapes'),
  q('A circle has diameter 10cm. Find its area. (π≈3.14)','31.4cm²,78.5cm²,314cm²,15.7cm²'.split(','),1,'r=5cm. Area=πr²=3.14×25=78.5cm².','intermediate',7,M,'Geometry','Perimeter and Area'),
  q('What is the volume of a cuboid 6cm×5cm×4cm?','60cm³,120cm³,90cm³,100cm³'.split(','),1,'V=l×w×h=6×5×4=120cm³.','intermediate',6,M,'Geometry','Volume'),
  q('A ladder 10m long rests against a wall. The base is 6m from the wall. How high does it reach?','6m,7m,8m,9m'.split(','),2,'h²+6²=10². h²=100−36=64. h=8m.','advanced',9,M,'Geometry','Pythagoras Theorem'),
  q('Convert 270° to radians.','3π/2,2π,π,π/2'.split(','),0,'270°=270×π/180=3π/2 radians.','advanced',9,M,'Geometry','Shapes'),
  q('What is the mode of: 3,5,3,7,5,3,8?','5,3,7,8'.split(','),1,'3 appears 3 times — most frequent. Mode=3.','beginner',5,M,'Statistics','Data Collection and Representation'),
  q('If P(A)=0.3, what is P(not A)?','0.3,0.7,0.6,0.4'.split(','),1,'P(not A)=1−P(A)=1−0.3=0.7.','intermediate',8,M,'Statistics','Probability'),
  q('Two dice are rolled. P(sum=7)?','4/36,5/36,6/36,7/36'.split(','),2,'Pairs summing to 7: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1)=6. P=6/36=1/6.','advanced',9,M,'Statistics','Probability'),
  q('What is compound interest on GH₵1000 at 10% for 2 years?','GH₵200,GH₵210,GH₵220,GH₵250'.split(','),1,'Year1:1000×0.1=100→1100. Year2:1100×0.1=110. Total interest=210.','advanced',9,M,'Number','Ratio and Proportion'),
  q('Solve: |x| = 5','x=5 only,x=−5 only,x=5 or x=−5,x=0'.split(','),2,'|x|=5 means x=+5 or x=−5.','intermediate',8,M,'Number','Integers and Directed Numbers'),
  q('What is 0.001 as a fraction?','1/10,1/100,1/1000,1/10000'.split(','),2,'0.001=1/1000 (three decimal places).','beginner',5,M,'Number','Decimals and Percentages'),
  q('A shopkeeper buys an item for GH₵80 and sells for GH₵100. Find the % profit.','15%,20%,25%,30%'.split(','),2,'Profit=20. % profit=(20/80)×100=25%.','intermediate',8,M,'Number','Ratio and Proportion'),
  q('What is the mean of the first 5 natural numbers?','2,3,4,5'.split(','),1,'1+2+3+4+5=15. Mean=15÷5=3.','beginner',5,M,'Statistics','Data Collection and Representation'),
];

const EXTRA_SCIENCE: GESQuestion[] = [
  q('What is the formula for calculating speed?','Speed=Time÷Distance,Speed=Distance÷Time,Speed=Distance×Time,Speed=Mass÷Volume'.split(','),1,'Speed=Distance÷Time. Units: km/h or m/s.','intermediate',7,S,'Energy','Forces and Motion'),
  q('What is the chemical symbol for gold?','Go,Gd,Au,Ag'.split(','),2,'Gold\'s symbol is Au from Latin "Aurum". Silver=Ag (Argentum).','intermediate',7,S,'Materials and Matter','Mixtures and Solutions'),
  q('What is the chemical symbol for iron?','Ir,In,Fe,Fo'.split(','),2,'Iron\'s symbol is Fe from Latin "Ferrum".','intermediate',6,S,'Materials and Matter','Mixtures and Solutions'),
  q('Which gas is produced during photosynthesis that we breathe?','Carbon dioxide,Nitrogen,Oxygen,Hydrogen'.split(','),2,'Plants produce oxygen (O₂) as a byproduct of photosynthesis.','beginner',4,S,'Living Things and Life Processes','Plants'),
  q('What is the largest organ of the human body?','Heart,Brain,Liver,Skin'.split(','),3,'The skin is the largest organ, covering the entire body and protecting it.','intermediate',5,S,'Living Things and Life Processes','Human Body Systems'),
  q('How many chambers does the human heart have?','2,3,4,5'.split(','),2,'The heart has 4 chambers: right/left atrium and right/left ventricle.','intermediate',6,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is the role of the liver?','Pump blood,Filter blood, produce bile, store glycogen,Produce insulin,Absorb nutrients'.split(','),1,'The liver: produces bile, detoxifies blood, stores glycogen, produces proteins.','advanced',8,S,'Living Things and Life Processes','Human Body Systems'),
  q('What type of joint allows rotation in all directions?','Hinge joint,Ball and socket joint,Pivot joint,Gliding joint'.split(','),1,'Ball and socket joints (shoulder, hip) allow movement in all directions.','advanced',8,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is the function of platelets in blood?','Carry oxygen,Fight infection,Clot blood to stop bleeding,Carry nutrients'.split(','),2,'Platelets (thrombocytes) help form clots to stop bleeding when you cut yourself.','intermediate',7,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is the process of water moving from the soil through a plant and evaporating from leaves?','Photosynthesis,Respiration,Transpiration,Osmosis'.split(','),2,'Transpiration: water absorbed by roots → moves up stem → evaporates from leaf stomata.','advanced',8,S,'Living Things and Life Processes','Plants'),
  q('What are stomata?','Roots of a plant,Tiny openings on leaves for gas exchange,Seeds,Flowers'.split(','),1,'Stomata are tiny pores on leaves that open/close to allow CO₂ in and O₂/water vapour out.','intermediate',7,S,'Living Things and Life Processes','Plants'),
  q('What is the relationship called when both organisms benefit?','Parasitism,Commensalism,Mutualism,Predation'.split(','),2,'Mutualism: both species benefit. E.g. bees pollinate flowers and get nectar.','advanced',8,S,'Living Things and Life Processes','Animals'),
  q('What is a parasite?','An organism that makes its own food,An organism that lives on/in a host and harms it,An organism that eats both plants and animals,A decomposer'.split(','),1,'A parasite lives at the expense of its host. E.g. tapeworm, malaria parasite.','intermediate',7,S,'Living Things and Life Processes','Animals'),
  q('What is the greenhouse effect?','Plants growing in greenhouses,Trapping of heat in the atmosphere by greenhouse gases,A type of farming,Ozone layer depletion'.split(','),1,'Greenhouse gases (CO₂, methane) trap heat in Earth\'s atmosphere, causing warming.','advanced',8,S,'Earth and Space','Weather and Climate'),
  q('Which planet has rings around it?','Mars,Jupiter,Saturn,Venus'.split(','),2,'Saturn has the most prominent ring system, made of ice and rock particles.','beginner',5,S,'Earth and Space','Solar System'),
  q('What is a lunar eclipse?','Moon blocks the sun,Earth\'s shadow falls on the Moon,Sun disappears,Stars align'.split(','),1,'Lunar eclipse: Earth comes between the Sun and Moon, casting shadow on the Moon.','intermediate',7,S,'Earth and Space','Solar System'),
  q('What causes a solar eclipse?','Earth blocks the Sun,Moon comes between Earth and Sun, blocking sunlight,Stars block sunlight,Clouds block sunlight'.split(','),1,'Solar eclipse: Moon passes between Earth and Sun, blocking sunlight temporarily.','intermediate',6,S,'Earth and Space','Solar System'),
  q('What is the name of our galaxy?','Andromeda,Milky Way,Solar System,Orion'.split(','),1,'Our solar system is part of the Milky Way galaxy — a spiral galaxy.','intermediate',6,S,'Earth and Space','Solar System'),
  q('What is a "fulcrum"?','A type of force,The pivot point of a lever,A unit of energy,A type of machine'.split(','),1,'The fulcrum is the fixed pivot point around which a lever rotates.','intermediate',7,S,'Energy','Forces and Motion'),
  q('What law states F=ma?','Newton\'s 1st Law,Newton\'s 2nd Law,Newton\'s 3rd Law,Ohm\'s Law'.split(','),1,'Newton\'s 2nd Law: Force = mass × acceleration (F=ma).','advanced',9,S,'Energy','Forces and Motion'),
  q('What type of energy is stored in food?','Kinetic energy,Chemical energy,Sound energy,Nuclear energy'.split(','),1,'Food contains chemical energy stored in molecular bonds, released during respiration.','intermediate',6,S,'Energy','Forms of Energy'),
  q('What is an electromagnet?','A permanent magnet,A magnet created by electric current through a coil,A natural rock magnet,A type of battery'.split(','),1,'Electromagnets are temporary magnets created when electric current flows through a coil of wire.','intermediate',7,S,'Energy','Forms of Energy'),
  q('What is the function of the pancreas?','Pump blood,Produce insulin to regulate blood sugar, and digestive enzymes,Filter waste,Store bile'.split(','),1,'The pancreas produces insulin (blood sugar regulation) and digestive enzymes.','advanced',8,S,'Living Things and Life Processes','Human Body Systems'),
  q('What is the difference between a physical and chemical change?','No difference,Physical=change in appearance, Chemical=new substance formed,Physical=permanent, Chemical=reversible,They are the same'.split(','),1,'Physical change: no new substance (e.g. melting ice). Chemical change: new substance formed (e.g. burning).','intermediate',7,S,'Materials and Matter','Mixtures and Solutions'),
  q('What is an acid?','A substance with pH>7,A substance with pH=7,A substance with pH<7,A substance that is sweet'.split(','),2,'Acids have pH below 7. Examples: lemon juice (pH 2), vinegar (pH 3).','intermediate',7,S,'Materials and Matter','Mixtures and Solutions'),
  q('What colour does litmus paper turn in an acid?','Blue,Purple,Red,Green'.split(','),2,'Litmus paper turns RED in acids and BLUE in alkalis.','intermediate',6,S,'Materials and Matter','Mixtures and Solutions'),
  q('What is an alkali?','A substance with pH<7,A substance with pH=7,A substance with pH>7,All liquids'.split(','),2,'Alkalis (bases) have pH above 7. Examples: soap (pH 9), bleach (pH 12).','intermediate',7,S,'Materials and Matter','Mixtures and Solutions'),
  q('What is the unit of electrical resistance?','Volt,Ampere,Ohm,Watt'.split(','),2,'Resistance is measured in Ohms (Ω), named after Georg Simon Ohm.','advanced',9,S,'Energy','Forms of Energy'),
  q('What is Ohm\'s Law?','V=IR,F=ma,P=IV,E=mc²'.split(','),0,'Ohm\'s Law: Voltage=Current×Resistance (V=IR).','advanced',9,S,'Energy','Forms of Energy'),
  q('What type of reproduction requires only one parent?','Sexual reproduction,Asexual reproduction,Pollination,Fertilisation'.split(','),1,'Asexual reproduction uses one parent. Examples: budding (yeast), binary fission (bacteria).','intermediate',7,S,'Living Things and Life Processes','Plants'),
];

const EXTRA_ENGLISH: GESQuestion[] = [
  q('What is the plural of "mouse"?','Mouses,Mices,Mice,Mouse'.split(','),2,'"Mice" is the irregular plural of "mouse".','beginner',3,E,'Reading and Writing','Grammar'),
  q('What is the plural of "tooth"?','Tooths,Teethes,Teeths,Teeth'.split(','),3,'"Teeth" is the irregular plural of "tooth".','beginner',3,E,'Reading and Writing','Grammar'),
  q('Choose the correct sentence:','I seen him,I have seen him,I has seen him,I seed him'.split(','),1,'Present perfect: have/has + past participle. "I have seen him" is correct.','intermediate',6,E,'Reading and Writing','Grammar'),
  q('What is the meaning of "nocturnal"?','Active during the day,Active during the night,Very fast,Very slow'.split(','),1,'"Nocturnal" means active at night. E.g. bats and owls are nocturnal animals.','intermediate',5,E,'Reading and Writing','Vocabulary'),
  q('What is the meaning of "predator"?','An animal that is hunted,An animal that hunts and eats other animals,A type of plant,A very large animal'.split(','),1,'A predator hunts and kills prey for food. E.g. lion, eagle, shark.','intermediate',5,E,'Reading and Writing','Vocabulary'),
  q('What does "transparent" mean?','Cannot be seen through,Can be seen through,Very colourful,Very heavy'.split(','),1,'"Transparent" means allowing light to pass through so objects can be clearly seen.','beginner',4,E,'Reading and Writing','Vocabulary'),
  q('What is an "autobiography"?','A book about cars,The story of a person\'s life written by themselves,A story written by someone else,A type of poem'.split(','),1,'An autobiography is a self-written account of one\'s own life.','intermediate',6,E,'Reading and Writing','Comprehension'),
  q('What is a "biography"?','A story written by the subject,A life story written by someone else about another person,A type of poem,A scientific report'.split(','),1,'A biography is a life story written by another person about someone else.','intermediate',6,E,'Reading and Writing','Comprehension'),
  q('What is the purpose of a "conclusion" in an essay?','Introduce the topic,Provide evidence,Summarise the main points and give a final thought,Ask questions'.split(','),2,'A conclusion summarises the essay\'s main points and provides a final perspective.','intermediate',7,E,'Reading and Writing','Comprehension'),
  q('What type of writing tries to convince the reader of a point of view?','Narrative,Descriptive,Persuasive,Informative'.split(','),2,'Persuasive writing uses arguments and evidence to convince the reader to agree with a viewpoint.','intermediate',7,E,'Reading and Writing','Comprehension'),
  q('What is the difference between "affect" and "effect"?','No difference,Affect=usually a verb (to influence), Effect=usually a noun (the result),Affect=noun, Effect=verb,They are synonyms'.split(','),1,'"Affect" is usually a verb: "Rain affects crops." "Effect" is usually a noun: "The effect was good."','advanced',8,E,'Reading and Writing','Vocabulary'),
  q('What is a "prefix"?','A word added at the end,A word added at the beginning of a root word,A type of verb,A punctuation mark'.split(','),1,'A prefix is added BEFORE a root word to change its meaning. E.g. un- in unhappy.','beginner',4,E,'Reading and Writing','Vocabulary'),
  q('What is a "suffix"?','Added at the start of a word,Added at the end of a root word to change meaning or form,A type of noun,A punctuation mark'.split(','),1,'A suffix is added AFTER a root word. E.g. -tion in education, -ly in quickly.','beginner',5,E,'Reading and Writing','Vocabulary'),
  q('What does "frequently" mean?','Never,Rarely,Often/many times,Once'.split(','),2,'"Frequently" means happening often or many times.','intermediate',5,E,'Reading and Writing','Vocabulary'),
  q('Identify the type of sentence: "What time does the school open?"','Declarative,Imperative,Interrogative,Exclamatory'.split(','),2,'Interrogative sentences ask questions. They end with a question mark.','beginner',3,E,'Reading and Writing','Grammar'),
  q('Identify the type of sentence: "What a wonderful day!"','Declarative,Imperative,Interrogative,Exclamatory'.split(','),3,'Exclamatory sentences express strong emotion. They end with an exclamation mark.','beginner',4,E,'Reading and Writing','Grammar'),
  q('Which word correctly completes: "Neither the boys nor their teacher ___ present."','were,was,are,have been'.split(','),1,'With "neither...nor", the verb agrees with the subject nearest to it (teacher=singular). "was" is correct.','advanced',8,E,'Reading and Writing','Grammar'),
  q('What is the gerund in: "Swimming is good exercise"?','is,good,Swimming,exercise'.split(','),2,'A gerund is a verb ending in -ing used as a noun. "Swimming" is the subject (noun) of this sentence.','advanced',8,E,'Reading and Writing','Grammar'),
  q('What does "albeit" mean?','Therefore,Although,However,Because'.split(','),1,'"Albeit" is a formal word meaning "although" or "even though".','advanced',9,E,'Reading and Writing','Vocabulary'),
  q('Which is correct: "There are less/fewer students today"?','Less students,Fewer students,Least students,Much students'.split(','),1,'"Fewer" is used with countable nouns (students). "Less" is used with uncountable nouns (water).','advanced',8,E,'Reading and Writing','Grammar'),
];

const EXTRA_SOCIAL: GESQuestion[] = [
  q('What does Ghana\'s motto "Freedom and Justice" mean?','Ghana is free,Ghana values liberty and fairness for all citizens,Ghana has a good army,Ghana is rich'.split(','),1,'Ghana\'s national motto emphasises the values of freedom and justice for all people.','beginner',4,SS,'My Country Ghana','Governance and Democracy'),
  q('What is the national anthem of Ghana?','God Save the King,Star Spangled Banner,God Bless Our Homeland Ghana,Ghana the Great'.split(','),2,'Ghana\'s national anthem is "God Bless Our Homeland Ghana".','beginner',3,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
  q('What is Ghana\'s currency?','Naira,Dollar,Ghana Cedi,Franc'.split(','),2,'Ghana\'s currency is the Ghana Cedi (GH₵), introduced in 2007.','beginner',2,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
  q('What percentage of Ghana\'s land is used for agriculture?','10%,25%,40%,57%'.split(','),2,'About 40% of Ghana\'s land area is used for agriculture, making it crucial to the economy.','intermediate',6,SS,'Environment and Resources','Natural Resources'),
  q('Which sea is on the southern coast of Ghana?','Red Sea,Gulf of Guinea,Indian Ocean,Caribbean Sea'.split(','),1,'The Gulf of Guinea (part of the Atlantic Ocean) borders Ghana\'s southern coast.','beginner',3,SS,'My Country Ghana','Geography of Ghana'),
  q('What are the three main branches of government in Ghana?','President, Parliament, Courts,Executive, Legislative, Judiciary,Police, Army, Navy,Cabinet, Senate, Courts'.split(','),1,'Ghana has three branches: Executive (President), Legislative (Parliament), Judiciary (Courts).','intermediate',6,SS,'My Country Ghana','Governance and Democracy'),
  q('What is the Parliament of Ghana?','The President\'s office,The law-making body of Ghana,The army headquarters,The supreme court'.split(','),1,'Parliament is Ghana\'s legislative body, comprising 275 elected Members of Parliament (MPs).','intermediate',5,SS,'My Country Ghana','Governance and Democracy'),
  q('What is the role of the judiciary in Ghana?','Make laws,Enforce laws,Interpret laws and settle disputes,Collect taxes'.split(','),2,'The judiciary interprets the constitution and laws, and settles legal disputes.','intermediate',6,SS,'My Country Ghana','Governance and Democracy'),
  q('Which tribe is the largest in Ghana?','Ewe,Ga,Akan,Dagomba'.split(','),2,'The Akan people (including Asante, Fante, Akuapem) form the largest ethnic group in Ghana.','intermediate',5,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
  q('What is "chieftaincy" in Ghana?','A type of school,The traditional system of leadership by chiefs,A political party,A type of farm'.split(','),1,'Chieftaincy is Ghana\'s traditional governance system where chiefs lead their communities.','intermediate',5,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
  q('What is "Panafest"?','A food festival,Pan African Historical Theatre Festival held in Ghana,A sports competition,A music festival only'.split(','),1,'PANAFEST (Pan African Historical Theatre Festival) is a biennial festival in Ghana celebrating African heritage.','advanced',7,SS,'My Country Ghana','Ghanaian Culture and Traditions'),
  q('What is deforestation?','Planting more trees,The clearing/removal of forests,Forest conservation,A type of farming'.split(','),1,'Deforestation is the large-scale removal of forests, often for agriculture or timber, harming ecosystems.','intermediate',6,SS,'Environment and Resources','Natural Resources'),
  q('What is sustainable development?','Development that destroys resources,Development meeting present needs without compromising future generations\'ability to meet their needs,Fast development,Development using only technology'.split(','),1,'Sustainable development balances economic growth, social welfare, and environmental protection.','advanced',8,SS,'Environment and Resources','Natural Resources'),
  q('Which of the following is a human right?','The right to steal,The right to education,The right to harm others,The right to ignore laws'.split(','),1,'Education is a fundamental human right recognised by the UN Convention on the Rights of the Child.','beginner',4,SS,'Personal and Social Development','Self and Family'),
  q('What does "census" mean?','A type of election,An official count of a population,A government tax,A type of festival'.split(','),1,'A census is an official survey counting all people living in a country, collecting demographic data.','intermediate',6,SS,'My Country Ghana','Governance and Democracy'),
  q('What is migration?','Planting crops,The movement of people from one place to another,A type of weather,A government policy'.split(','),1,'Migration is the movement of people from one region/country to another, either voluntarily or forced.','intermediate',6,SS,'Environment and Resources','Natural Resources'),
  q('What is urbanisation?','Growth of rural areas,The process of people moving from rural to urban (city) areas,Building new roads,Planting more trees'.split(','),1,'Urbanisation: increasing proportion of population living in cities due to rural-to-urban migration.','intermediate',7,SS,'Environment and Resources','Natural Resources'),
];

const EXTRA_RME: GESQuestion[] = [
  q('What is the Golden Rule found in most religions?','Treat others as you wish to be treated yourself,Only help your family,Be the strongest person,Collect as much wealth as possible'.split(','),0,'The Golden Rule: "Do unto others as you would have them do unto you" — found in Christianity, Islam, and other faiths.','beginner',4,R,'Moral Values','Values and Character'),
  q('What is "empathy"?','Feeling sorry for yourself,Understanding and sharing the feelings of another person,Ignoring others,Being selfish'.split(','),1,'Empathy is the ability to understand and share the feelings of others — "putting yourself in their shoes".','intermediate',5,R,'Moral Values','Values and Character'),
  q('What does the Bible verse "Love your neighbour as yourself" teach?','Only love family,Care for and respect all people around you,Love only people from your religion,Only love close friends'.split(','),1,'This teaching encourages treating everyone — regardless of background — with care, respect and kindness.','beginner',3,R,'Religious Knowledge','Christianity'),
  q('What is "Zakat" in Islam?','Prayer,Fasting,Compulsory charity (giving 2.5% of wealth to the poor),Pilgrimage to Mecca'.split(','),2,'Zakat is one of the Five Pillars of Islam — giving 2.5% of one\'s annual savings to those in need.','intermediate',6,R,'Religious Knowledge','Islam'),
  q('What is "Hajj" in Islam?','Daily prayer,Fasting in Ramadan,Pilgrimage to Mecca (required once in a lifetime),Giving to the poor'.split(','),2,'Hajj is the annual pilgrimage to Mecca that every able Muslim must perform at least once.','intermediate',6,R,'Religious Knowledge','Islam'),
  q('What are the Ten Commandments?','Ten prayers,Ten rules given by God to Moses on Mount Sinai,Ten chapters of the Bible,Ten disciples of Jesus'.split(','),1,'God gave Moses the Ten Commandments on Mount Sinai — rules for moral and religious conduct.','intermediate',5,R,'Religious Knowledge','Christianity'),
  q('What is a mosque?','A Christian church,A place of worship for Muslims,A Jewish temple,A Hindu temple'.split(','),1,'A mosque (masjid) is a place of worship for Muslims where they perform Salah (prayer).','beginner',3,R,'Religious Knowledge','Islam'),
  q('What is a church?','A Muslim place of worship,A place of worship for Christians,A Jewish synagogue,A Buddhist temple'.split(','),1,'A church is a place of worship and community for Christians.','beginner',2,R,'Religious Knowledge','Christianity'),
  q('What does "Eid al-Fitr" celebrate?','Birth of Prophet Muhammad,End of the Ramadan fast,Hajj pilgrimage,New Year'.split(','),1,'Eid al-Fitr is the "Festival of Breaking the Fast" celebrated at the end of Ramadan.','intermediate',5,R,'Religious Knowledge','Islam'),
  q('What does "peer pressure" mean?','Pressure from teachers,Influence from friends/peers to do something,Pressure from parents,School work pressure'.split(','),1,'Peer pressure is when friends or people your age influence you to behave in certain ways.','intermediate',5,R,'Moral Values','Values and Character'),
  q('What is "abstinence" as a moral value?','Eating less,Choosing to refrain from something, especially harmful behaviours,Spending more money,Being very active'.split(','),1,'Abstinence means voluntarily refraining from certain behaviours — especially harmful or inappropriate ones.','intermediate',6,R,'Moral Values','Values and Character'),
  q('What is meant by "stewardship" in religion?','Being a leader,Responsible care and management of resources entrusted to us by God,Collecting money,Building churches'.split(','),1,'Stewardship: managing God\'s creation (earth, resources) responsibly for the benefit of all.','advanced',7,R,'Moral Values','Values and Character'),
];

const EXTRA_COMPUTING: GESQuestion[] = [
  q('What does "URL" stand for?','Universal Resource Link,Uniform Resource Locator,Universal Remote Location,United Resource Language'.split(','),1,'URL=Uniform Resource Locator — the address of a webpage, e.g. https://www.google.com.','intermediate',6,C,'Computer Fundamentals','Internet and Safety'),
  q('What does "HTML" stand for?','High Text Machine Language,HyperText Markup Language,Hyper Transfer Markup Language,High Transfer Machine Language'.split(','),1,'HTML=HyperText Markup Language — the standard language for creating webpages.','intermediate',7,C,'Computer Fundamentals','Internet and Safety'),
  q('What is a "browser"?','A type of virus,Software used to access and view websites on the internet,A type of keyboard,A file storage system'.split(','),1,'A browser (Chrome, Firefox, Edge) is software that allows you to access and navigate the World Wide Web.','beginner',5,C,'Computer Fundamentals','Internet and Safety'),
  q('What does "Wi-Fi" allow you to do?','Type faster,Connect to the internet wirelessly,Store more data,Print documents'.split(','),1,'Wi-Fi (Wireless Fidelity) allows devices to connect to the internet without physical cables.','beginner',5,C,'Computer Fundamentals','Internet and Safety'),
  q('What is "Bluetooth"?','A type of virus,A wireless technology for short-range data exchange between devices,A social media platform,A programming language'.split(','),1,'Bluetooth is a short-range wireless technology for connecting devices like phones, speakers, headphones.','intermediate',6,C,'Computer Fundamentals','Internet and Safety'),
  q('What is a "database"?','A type of virus,An organised collection of structured data,A programming language,A type of hardware'.split(','),1,'A database is an organised, structured collection of data stored electronically, e.g. school records.','intermediate',7,C,'Computer Fundamentals','Hardware and Software'),
  q('What does "GUI" stand for?','General User Input,Graphical User Interface,Global Utility Interface,Group User Information'.split(','),1,'GUI=Graphical User Interface — the visual way users interact with computers through icons and windows.','intermediate',7,C,'Computer Fundamentals','Hardware and Software'),
  q('What is "cloud computing"?','Computing using cloud shapes,Storing and accessing data and programs over the internet instead of locally,A type of weather app,Computing outdoors'.split(','),1,'Cloud computing uses remote servers on the internet to store, manage and process data.','advanced',8,C,'Computer Fundamentals','Hardware and Software'),
  q('What is "malware"?','Good software,Malicious software designed to harm computers or steal data,A type of hardware,A programming concept'.split(','),1,'Malware (malicious software) includes viruses, ransomware, spyware designed to damage or unauthorised access systems.','advanced',8,C,'Computer Fundamentals','Internet and Safety'),
  q('What does "Ctrl+A" do?','Copy,Paste,Select all,Undo'.split(','),2,'Ctrl+A selects ALL content in the current document or window.','beginner',5,C,'Software Applications','Word Processing'),
  q('In a spreadsheet, what is a "formula"?','A type of chart,A mathematical expression used to calculate values in cells,A type of table,A column heading'.split(','),1,'Spreadsheet formulas (starting with =) perform calculations. E.g. =SUM(A1:A5) adds values in A1 to A5.','intermediate',7,C,'Software Applications','Word Processing'),
  q('What is "binary code"?','A code with many digits,A number system using only 0s and 1s that computers use,A type of encryption,A programming language'.split(','),1,'Binary (base-2) uses only 0 and 1. All computer data is ultimately stored as binary.','advanced',8,C,'Programming','Algorithms and Problem Solving'),
  q('What is "debugging" in programming?','Writing new code,Finding and fixing errors (bugs) in a program,Deleting old programs,Testing a program for the first time'.split(','),1,'Debugging is the process of finding, analysing and fixing errors in computer programs.','intermediate',7,C,'Programming','Algorithms and Problem Solving'),
  q('What is a "variable" in programming?','A type of loop,A named storage location that holds a value,A type of function,An error in code'.split(','),1,'A variable stores data that can change. E.g. score=0 (score is the variable holding value 0).','intermediate',6,C,'Programming','Algorithms and Problem Solving'),
  q('What does "input" mean in computing?','Data that comes out of a computer,Data that goes INTO a computer,The process of calculation,Displaying results'.split(','),0,'Input is data entered into a computer. Output is data produced by a computer.','beginner',4,C,'Computer Fundamentals','Hardware and Software'),
];

const EXTRA_TWI: GESQuestion[] = [
  q('How do you say "I am going home" in Twi?','Me kɔ fie,Me ba fie,Me wɔ fie,Me fi fie'.split(','),0,'"Me kɔ fie" = I am going home. (kɔ=go, fie=home)','intermediate',4,TW,'Reading and Writing','Vocabulary'),
  q('What is "aduane" in English?','Water,Cloth,Food,Book'.split(','),2,'"Aduane" (also "aduan") means food in Twi.','beginner',2,TW,'Reading and Writing','Vocabulary'),
  q('How do you count to 10 in Twi? What comes after "enum" (5)?','baako,nsia,ɛnan,mmienu'.split(','),1,'Twi numbers: 1=baako, 2=mmienu, 3=mmiɛnsa, 4=ɛnan, 5=enum, 6=nsia.','beginner',3,TW,'Reading and Writing','Vocabulary'),
  q('What is "ewiem" in English?','Sky/heaven,Earth,Water,Fire'.split(','),0,'"Ewiem" means sky or heaven in Twi.','intermediate',5,TW,'Reading and Writing','Vocabulary'),
  q('What does "Me wɔ Ghana" mean?','I am from Ghana,I love Ghana,I am going to Ghana,Ghana is beautiful'.split(','),0,'"Me wɔ Ghana" = I am in Ghana / I am from Ghana.','intermediate',4,TW,'Reading and Writing','Vocabulary'),
  q('What is "akokᴐ" in English?','Cow,Goat,Chicken,Dog'.split(','),2,'"Akokᴐ" means chicken/fowl in Twi.','beginner',3,TW,'Reading and Writing','Vocabulary'),
  q('What is "krataa" in English?','Pen,Paper/book/letter,Bag,Chair'.split(','),1,'"Krataa" means paper, book or letter in Twi.','beginner',3,TW,'Reading and Writing','Vocabulary'),
  q('What is "abrofosem" (Twi for "English language")?','French,English,Mathematics,Science'.split(','),1,'"Abrofosem" literally means "the language of Europeans/English people" referring to English language.','intermediate',5,TW,'Reading and Writing','Vocabulary'),
  q('How do you say "I don\'t understand" in Twi?','Me nnim,Me ntε,Me ntie,Me mfa'.split(','),1,'"Me ntε" means I don\'t understand in Twi.','intermediate',5,TW,'Listening and Speaking','Oral Communication'),
  q('What does "Onyame nhyira wo" mean?','Good morning,God bless you,Thank you,Goodbye'.split(','),1,'"Onyame nhyira wo" = God bless you. (Onyame=God, nhyira=bless, wo=you)','intermediate',5,TW,'Listening and Speaking','Oral Communication'),
  q('What is "nnawotwe" in English?','Day,Week,Month,Year'.split(','),1,'"Nnawotwe" means a week (7 days) in Twi.','intermediate',5,TW,'Reading and Writing','Vocabulary'),
  q('How do you say "today" in Twi?','Nnora,Ɛnnɛ,Ɔkyena,Awia'.split(','),1,'"Ɛnnɛ" means today. Nnora=yesterday, Ɔkyena=tomorrow.','intermediate',4,TW,'Reading and Writing','Vocabulary'),
  q('What does "Ɔkyena" mean?','Yesterday,Today,Tomorrow,Last week'.split(','),2,'"Ɔkyena" means tomorrow in Twi.','beginner',4,TW,'Reading and Writing','Vocabulary'),
  q('What is "nnora" in English?','Today,Yesterday,Tomorrow,Last year'.split(','),1,'"Nnora" means yesterday in Twi.','beginner',4,TW,'Reading and Writing','Vocabulary'),
  q('How do you say "The food is good" in Twi?','Aduan no ye fe,Aduan no ye,Aduan no yɛ,Aduan no yɛ dɛ'.split(','),3,'"Aduan no yɛ dɛ" = The food is good/delicious. (dɛ=sweet/delicious)','intermediate',5,TW,'Reading and Writing','Vocabulary'),
  q('What does the Twi phrase "obra ye ntɛm" mean?','Life is long,Life is fast/short (life passes quickly),Life is good,Life is hard'.split(','),1,'"Obra ye ntɛm" — life passes quickly, meaning we should use our time wisely.','advanced',7,TW,'Language Use','Proverbs and Idioms'),
];

const EXTRA_CREATIVE: GESQuestion[] = [
  q('What are the three dimensions (3D) in art?','Height, width, depth,Height, weight, colour,Shape, size, colour,Line, texture, pattern'.split(','),0,'3D art has height, width and depth — it exists in physical space, unlike 2D art (flat).','intermediate',5,CA,'Visual Arts','Drawing and Colour'),
  q('What is "symmetry" in art?','Only one colour,When both sides of an image are mirror images of each other,A type of painting,Using only circles'.split(','),1,'Symmetry: when a shape/design is identical on both sides of a dividing line. E.g. butterfly wings.','beginner',4,CA,'Visual Arts','Drawing and Colour'),
  q('What is "proportion" in art?','The colour of objects,The relative size of different parts in a composition,The texture of a surface,The type of paint used'.split(','),1,'Proportion describes the size relationship between different elements in an artwork.','intermediate',6,CA,'Visual Arts','Drawing and Colour'),
  q('What is a "collage"?','A type of dance,Artwork made by sticking various materials (paper, fabric, photos) onto a surface,A type of music,A poetry style'.split(','),1,'A collage assembles different materials — magazine clippings, fabric, photos — to create an artwork.','beginner',4,CA,'Visual Arts','Ghanaian Art and Craft'),
  q('What is "weaving"?','Melting materials together,Interlacing threads/strips to create cloth or baskets,A type of painting,Drawing patterns'.split(','),1,'Weaving interlaces horizontal and vertical threads/strips to create cloth (like kente) or baskets.','beginner',4,CA,'Visual Arts','Ghanaian Art and Craft'),
  q('What type of art is "sculpture"?','2D art on flat surface,3D art created by shaping materials like clay, stone or wood,A type of painting,Digital art'.split(','),1,'Sculpture is three-dimensional art created by carving, modelling or assembling materials.','beginner',5,CA,'Visual Arts','Ghanaian Art and Craft'),
  q('What are "earth colours"?','Bright neon colours,Colours derived from natural minerals: ochre, sienna, umber,Only black and white,Primary colours only'.split(','),1,'Earth colours (ochre, sienna, raw umber) come from natural mineral pigments — warm, muted tones.','advanced',7,CA,'Visual Arts','Drawing and Colour'),
  q('What is "mosaic" art?','A type of dance,Artwork made of small pieces of glass, stone or tile,A painting technique,A printing technique'.split(','),1,'Mosaics create images using small coloured pieces (tesserae) of glass, stone, or ceramic tiles.','intermediate',6,CA,'Visual Arts','Ghanaian Art and Craft'),
  q('What is the "Sankofa" bird a symbol of?','Danger,Looking back to learn from the past to build the future,Victory,Sadness'.split(','),1,'Sankofa (looking backward) = learn from the past. "Se wo were fi na wosankofa a yenkyi."','intermediate',5,CA,'Visual Arts','Ghanaian Art and Craft'),
  q('What does "Dwennimmen" Adinkra symbol represent?','Wisdom and learning,Strength with humility (ram\'s horns),God\'s protection,Love'.split(','),1,'"Dwennimmen" (ram\'s horns) symbolises strength combined with humility and wisdom.','advanced',7,CA,'Visual Arts','Ghanaian Art and Craft'),
  q('What is "harmony" in music?','Playing only one note,Different notes played together to create a pleasing sound,The speed of music,The loudness of music'.split(','),1,'Harmony is when two or more different notes are played/sung at the same time to create a pleasing sound.','intermediate',6,CA,'Performing Arts','Music'),
  q('What is a "chorus" in a song?','The first verse,The repeated section of a song with the main message,The ending,The introduction'.split(','),1,'The chorus is the repeated section of a song that usually contains the main theme/message.','beginner',4,CA,'Performing Arts','Music'),
  q('What is "dynamics" in music?','The speed of music,The variation in loudness (loud and soft) in music,The rhythm pattern,The type of instrument'.split(','),1,'Dynamics refers to the variation in volume — forte (loud), piano (soft), crescendo (getting louder).','intermediate',6,CA,'Performing Arts','Music'),
  q('What does "forte" mean in music?','Play softly,Play loudly,Play fast,Play slowly'.split(','),1,'"Forte" (f) means loud in musical notation. "Piano" (p) means soft.','intermediate',6,CA,'Performing Arts','Music'),
  q('What is "improvisation" in music?','Only following a written score,Creating and performing music spontaneously without preparation,A type of instrument,A music theory concept'.split(','),1,'Musical improvisation is creating music in the moment without preparation — key in jazz and traditional African music.','intermediate',7,CA,'Performing Arts','Music'),
];

const EXTRA_HISTORY2: GESQuestion[] = [
  q('What is "colonialism"?','A type of farming,When a powerful country takes control of another territory and its people,A type of trade,A religious movement'.split(','),1,'Colonialism: a powerful nation extends control over other territories, exploiting their resources and people.','intermediate',7,H,'Ghanaian History','Colonial Period'),
  q('What did Ghana gain from the Akosombo Dam?','Gold mining,Cheap hydroelectric power for industrialisation,Better roads,More farmland'.split(','),1,'The Akosombo Dam (completed 1965) provided hydroelectric power crucial for Ghana\'s industrialisation under Nkrumah.','advanced',8,H,'Ghanaian History','Post-Independence'),
  q('What is the "Fourth Republic" of Ghana?','Ghana\'s first government,The current constitutional government of Ghana established in 1993,A military regime,A colonial government'.split(','),1,'Ghana\'s Fourth Republic began in January 1993, restoring multiparty democracy after years of military rule.','advanced',9,H,'Ghanaian History','Post-Independence'),
  q('What is the significance of the Christiansborg Castle (Osu Castle) in Ghana?','It is a shopping centre,It was the seat of government and a former slave trading post,It is a museum only,It is a school'.split(','),1,'Christiansborg Castle (Osu Castle) in Accra was a slave fort, colonial headquarters, and Ghana\'s seat of government.','advanced',8,H,'The Slave Trade','Transatlantic Slave Trade'),
  q('What was the "Triangle Trade"?','A trade route between three African countries,Trade between Europe, Africa, and the Americas: goods→Africa, slaves→Americas, raw materials→Europe,A trade route for gold only,A modern shipping route'.split(','),1,'The Triangle Trade: Europeans brought goods to Africa, traded for enslaved Africans sent to Americas, brought back raw materials.','advanced',8,H,'The Slave Trade','Transatlantic Slave Trade'),
  q('What major change did the 1992 Constitution bring to Ghana?','Military rule,Multi-party democracy, free elections, and protection of human rights,One-party system,End of chieftaincy'.split(','),1,'The 1992 Constitution established Ghana\'s Fourth Republic with multi-party democracy, separation of powers, and guaranteed rights.','advanced',9,H,'Ghanaian History','Post-Independence'),
  q('Who is considered the "father of African nationalism"?','Nelson Mandela,Jomo Kenyatta,Kwame Nkrumah,Julius Nyerere'.split(','),2,'Kwame Nkrumah championed pan-Africanism and was instrumental in the formation of the OAU.','advanced',9,H,'Ghanaian History','Post-Independence'),
  q('What was the "Scramble for Africa"?','African athletes competing,The rapid colonisation of Africa by European powers 1880s–1914,Trading among African nations,A civil war in Africa'.split(','),1,'The Scramble for Africa: European powers rapidly colonised almost all of Africa between 1880–1914, mainly after the Berlin Conference.','advanced',9,H,'The Slave Trade','Transatlantic Slave Trade'),
];

// Apply all extras
const allExtras: [GESSubject, GESQuestion[]][] = [
  [MATHS, EXTRA_MATHS],
  [SCIENCE, EXTRA_SCIENCE],
  [ENGLISH, EXTRA_ENGLISH],
  [SOCIAL, EXTRA_SOCIAL],
  [RME, EXTRA_RME],
  [COMPUTING, EXTRA_COMPUTING],
  [TWI, EXTRA_TWI],
  [CREATIVE_ARTS, EXTRA_CREATIVE],
  [HISTORY, EXTRA_HISTORY2],
];

for (const [subj, extras] of allExtras) {
  patchSubject(subj, extras);
}
