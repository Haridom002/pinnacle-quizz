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
