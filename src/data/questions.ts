import { Question } from '../types';

// ─────────────────────────────────────────
//  VERBAL REASONING  (analogies, vocab, reading)
// ─────────────────────────────────────────
const verbalQuestions: Question[] = [
  {
    id: 'v1',
    category: 'verbal',
    text: 'LIBRARY is to BOOKS as MUSEUM is to:',
    options: ['Paintings', 'Artifacts', 'Buildings', 'Schools'],
    correctIndex: 1,
    explanation: 'A library contains books; a museum contains artifacts.',
  },
  {
    id: 'v2',
    category: 'verbal',
    text: 'Choose the word most opposite in meaning to BENEVOLENT:',
    options: ['Generous', 'Malicious', 'Peaceful', 'Brave'],
    correctIndex: 1,
    explanation: 'Benevolent means kind/generous; malicious is the opposite.',
  },
  {
    id: 'v3',
    category: 'verbal',
    text: 'PHYSICIAN is to PATIENT as TEACHER is to:',
    options: ['School', 'Subject', 'Student', 'Lesson'],
    correctIndex: 2,
    explanation: 'A physician serves a patient; a teacher serves a student.',
  },
  {
    id: 'v4',
    category: 'verbal',
    text: 'Choose the word closest in meaning to EPHEMERAL:',
    options: ['Eternal', 'Transient', 'Massive', 'Loud'],
    correctIndex: 1,
    explanation: 'Ephemeral means lasting for a very short time — transient.',
  },
  {
    id: 'v5',
    category: 'verbal',
    text: 'SCALES are to FISH as FEATHERS are to:',
    options: ['Wings', 'Birds', 'Fur', 'Sky'],
    correctIndex: 1,
    explanation: 'Scales cover fish; feathers cover birds.',
  },
  {
    id: 'v6',
    category: 'verbal',
    text: 'Select the word that best completes the analogy: AUTHOR is to NOVEL as COMPOSER is to:',
    options: ['Concert', 'Symphony', 'Instrument', 'Audience'],
    correctIndex: 1,
    explanation: 'An author creates a novel; a composer creates a symphony.',
  },
  {
    id: 'v7',
    category: 'verbal',
    text: 'Which word is the antonym of VERBOSE?',
    options: ['Talkative', 'Concise', 'Wordy', 'Expressive'],
    correctIndex: 1,
    explanation: 'Verbose means using too many words; concise is the opposite.',
  },
  {
    id: 'v8',
    category: 'verbal',
    text: 'DESERT is to OASIS as OCEAN is to:',
    options: ['Water', 'Island', 'Wave', 'Fish'],
    correctIndex: 1,
    explanation: 'An oasis is a refuge in a desert; an island is a refuge in an ocean.',
  },
  {
    id: 'v9',
    category: 'verbal',
    text: 'Choose the synonym of DILIGENT:',
    options: ['Lazy', 'Careless', 'Hardworking', 'Slow'],
    correctIndex: 2,
    explanation: 'Diligent means hardworking and persistent.',
  },
  {
    id: 'v10',
    category: 'verbal',
    text: 'GLOVE is to HAND as SOCK is to:',
    options: ['Shoe', 'Foot', 'Leg', 'Toe'],
    correctIndex: 1,
    explanation: 'A glove covers a hand; a sock covers a foot.',
  },
  {
    id: 'v11',
    category: 'verbal',
    text: 'OPAQUE is to TRANSPARENT as LOUD is to:',
    options: ['Noise', 'Quiet', 'Sound', 'Echo'],
    correctIndex: 1,
    explanation: 'Opaque and transparent are opposites; loud and quiet are opposites.',
  },
  {
    id: 'v12',
    category: 'verbal',
    text: 'Which word is most similar to CANDID?',
    options: ['Secretive', 'Frank', 'Polite', 'Shy'],
    correctIndex: 1,
    explanation: 'Candid means truthful and straightforward — frank.',
  },
  {
    id: 'v13',
    category: 'verbal',
    text: 'KNIFE is to CHEF as SCALPEL is to:',
    options: ['Patient', 'Hospital', 'Surgeon', 'Medicine'],
    correctIndex: 2,
    explanation: 'A knife is the tool of a chef; a scalpel is the tool of a surgeon.',
  },
  {
    id: 'v14',
    category: 'verbal',
    text: 'ABUNDANT is to SCARCE as ANCIENT is to:',
    options: ['Old', 'Modern', 'Historical', 'Rare'],
    correctIndex: 1,
    explanation: 'Abundant and scarce are opposites; ancient and modern are opposites.',
  },
  {
    id: 'v15',
    category: 'verbal',
    text: 'TALON is to EAGLE as HOOF is to:',
    options: ['Cow', 'Bird', 'Snake', 'Fish'],
    correctIndex: 0,
    explanation: 'Talons are eagle claws; hooves are found on cows (and horses).',
  },
  {
    id: 'v16',
    category: 'verbal',
    text: 'Which is the best synonym for ACRIMONY?',
    options: ['Bitterness', 'Joy', 'Surprise', 'Calm'],
    correctIndex: 0,
    explanation: 'Acrimony means bitterness or ill feeling.',
  },
  {
    id: 'v17',
    category: 'verbal',
    text: 'STETHOSCOPE is to DOCTOR as GAVEL is to:',
    options: ['Carpenter', 'Judge', 'Lawyer', 'Police'],
    correctIndex: 1,
    explanation: 'A stethoscope is a doctor\'s tool; a gavel is a judge\'s tool.',
  },
];

// ─────────────────────────────────────────
//  MATH & LOGIC
// ─────────────────────────────────────────
const mathQuestions: Question[] = [
  {
    id: 'm1',
    category: 'math',
    text: 'If a store sells 3 items for $7.50, how much would 9 items cost?',
    options: ['$20.00', '$22.50', '$21.00', '$25.00'],
    correctIndex: 1,
    explanation: '$7.50 ÷ 3 = $2.50 per item. 9 × $2.50 = $22.50.',
  },
  {
    id: 'm2',
    category: 'math',
    text: 'What comes next in the series? 2, 6, 18, 54, ___',
    options: ['108', '162', '216', '72'],
    correctIndex: 1,
    explanation: 'Each term is multiplied by 3: 54 × 3 = 162.',
  },
  {
    id: 'm3',
    category: 'math',
    text: 'A train travels 300 km in 4 hours. At the same speed, how far will it travel in 6 hours?',
    options: ['400 km', '450 km', '500 km', '350 km'],
    correctIndex: 1,
    explanation: 'Speed = 300/4 = 75 km/h. Distance = 75 × 6 = 450 km.',
  },
  {
    id: 'm4',
    category: 'math',
    text: 'If ALL dogs are animals and SOME animals are cats, which statement is definitely true?',
    options: [
      'Some dogs are cats',
      'All animals are dogs',
      'All dogs are animals',
      'No dogs are cats',
    ],
    correctIndex: 2,
    explanation: 'The first premise states directly: All dogs are animals.',
  },
  {
    id: 'm5',
    category: 'math',
    text: 'What is 15% of 240?',
    options: ['36', '34', '38', '32'],
    correctIndex: 0,
    explanation: '240 × 0.15 = 36.',
  },
  {
    id: 'm6',
    category: 'math',
    text: 'Series: 1, 4, 9, 16, 25, ___',
    options: ['30', '36', '35', '49'],
    correctIndex: 1,
    explanation: 'Perfect squares: 1², 2², 3², 4², 5², 6² = 36.',
  },
  {
    id: 'm7',
    category: 'math',
    text: 'A rectangle has a length of 12 and width of 8. What is its perimeter?',
    options: ['40', '96', '20', '48'],
    correctIndex: 0,
    explanation: 'Perimeter = 2(12 + 8) = 2 × 20 = 40.',
  },
  {
    id: 'm8',
    category: 'math',
    text: 'John is taller than Mary. Mary is taller than Sue. Who is the shortest?',
    options: ['John', 'Mary', 'Sue', 'Cannot determine'],
    correctIndex: 2,
    explanation: 'John > Mary > Sue, so Sue is shortest.',
  },
  {
    id: 'm9',
    category: 'math',
    text: 'If 5x = 35, what is 2x + 3?',
    options: ['14', '17', '10', '21'],
    correctIndex: 1,
    explanation: 'x = 7. 2(7) + 3 = 17.',
  },
  {
    id: 'm10',
    category: 'math',
    text: 'Series: 100, 50, 25, 12.5, ___',
    options: ['6', '6.25', '5', '10'],
    correctIndex: 1,
    explanation: 'Each term is divided by 2: 12.5 ÷ 2 = 6.25.',
  },
  {
    id: 'm11',
    category: 'math',
    text: 'A shirt costs $45 after a 10% discount. What was the original price?',
    options: ['$49.50', '$50.00', '$48.00', '$55.00'],
    correctIndex: 1,
    explanation: 'Original × 0.90 = 45 → Original = 45 / 0.90 = $50.00.',
  },
  {
    id: 'm12',
    category: 'math',
    text: 'If no A is B, and all C is B, which is true?',
    options: ['All A is C', 'No C is A', 'Some A is C', 'All B is C'],
    correctIndex: 1,
    explanation: 'If no A is B, and all C is B, then no C can be A.',
  },
  {
    id: 'm13',
    category: 'math',
    text: 'Series: 3, 7, 13, 21, 31, ___',
    options: ['41', '43', '45', '39'],
    correctIndex: 1,
    explanation: 'Differences: 4, 6, 8, 10, 12. Next: 31 + 12 = 43.',
  },
  {
    id: 'm14',
    category: 'math',
    text: 'If a worker completes a job in 8 hours, and another in 12 hours, how long do they take together?',
    options: ['4 hours', '4.8 hours', '5 hours', '10 hours'],
    correctIndex: 1,
    explanation: 'Combined rate = 1/8 + 1/12 = 5/24. Time = 24/5 = 4.8 hours.',
  },
  {
    id: 'm15',
    category: 'math',
    text: 'What is 3/4 of 5/6?',
    options: ['5/8', '8/10', '15/24', '1/2'],
    correctIndex: 0,
    explanation: '(3/4) × (5/6) = 15/24 = 5/8.',
  },
  {
    id: 'm16',
    category: 'math',
    text: 'Series: 2, 3, 5, 8, 13, ___',
    options: ['18', '20', '21', '22'],
    correctIndex: 2,
    explanation: 'Fibonacci sequence: 8 + 13 = 21.',
  },
  {
    id: 'm17',
    category: 'math',
    text: 'A car travels 60 mph for 2.5 hours. How far does it go?',
    options: ['120 miles', '150 miles', '140 miles', '180 miles'],
    correctIndex: 1,
    explanation: '60 × 2.5 = 150 miles.',
  },
];

// ─────────────────────────────────────────
//  SPATIAL REASONING
// ─────────────────────────────────────────
const spatialQuestions: Question[] = [
  {
    id: 's1',
    category: 'spatial',
    text: 'A cube has how many edges?',
    options: ['8', '10', '12', '6'],
    correctIndex: 2,
    explanation: 'A cube has 12 edges (4 per face × 3 sets of parallel faces).',
  },
  {
    id: 's2',
    category: 'spatial',
    text: 'If you fold a square piece of paper in half twice, then cut a small triangle from the folded corner, how many holes appear when unfolded?',
    options: ['1', '2', '4', '8'],
    correctIndex: 2,
    explanation: 'Folding twice creates 4 layers; one cut through the corner creates 4 holes.',
  },
  {
    id: 's3',
    category: 'spatial',
    text: 'A clock shows 3:00. What is the angle between the hour and minute hands?',
    options: ['60°', '90°', '120°', '45°'],
    correctIndex: 1,
    explanation: 'At 3:00, the hour hand points at 3 (90°) and the minute hand at 12 (0°). Angle = 90°.',
  },
  {
    id: 's4',
    category: 'spatial',
    text: 'How many faces does a triangular prism have?',
    options: ['4', '5', '6', '3'],
    correctIndex: 1,
    explanation: 'A triangular prism has 2 triangular faces + 3 rectangular faces = 5 faces.',
  },
  {
    id: 's5',
    category: 'spatial',
    text: 'If you rotate the letter "d" 180 degrees clockwise, what letter does it look like?',
    options: ['b', 'p', 'q', 'n'],
    correctIndex: 1,
    explanation: 'Rotating "d" 180° clockwise gives "p".',
  },
  {
    id: 's6',
    category: 'spatial',
    text: 'A box is 4m × 3m × 2m. What is its volume?',
    options: ['18 m³', '20 m³', '24 m³', '26 m³'],
    correctIndex: 2,
    explanation: 'Volume = 4 × 3 × 2 = 24 m³.',
  },
  {
    id: 's7',
    category: 'spatial',
    text: 'Which of the following cannot be the net of a cube?\nA) A cross of 6 squares\nB) A row of 6 squares\nC) An L-shape of 6 squares\nD) A T-shape of 6 squares',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 1,
    explanation: 'A straight row of 6 squares cannot fold into a cube.',
  },
  {
    id: 's8',
    category: 'spatial',
    text: 'If you look at a clock in a mirror, and it shows 4:00 in the mirror, what is the real time?',
    options: ['4:00', '8:00', '12:00', '7:00'],
    correctIndex: 1,
    explanation: 'A mirror reverses the image. 4:00 mirrored appears as 8:00.',
  },
  {
    id: 's9',
    category: 'spatial',
    text: 'How many sides does a pentagon have?',
    options: ['4', '6', '5', '7'],
    correctIndex: 2,
    explanation: 'A pentagon has 5 sides.',
  },
  {
    id: 's10',
    category: 'spatial',
    text: 'A dice has opposite faces summing to 7. If the top shows 3 and front shows 5, what is on the right face?',
    options: ['1', '2', '4', '6'],
    correctIndex: 2,
    explanation: 'Opposite pairs: 1-6, 2-5, 3-4. Top=3(opposite=4), front=5(opposite=2). Right must be 4.',
  },
  {
    id: 's11',
    category: 'spatial',
    text: 'Which 3D shape has only one face and no edges?',
    options: ['Sphere', 'Cube', 'Cylinder', 'Cone'],
    correctIndex: 0,
    explanation: 'A sphere has one continuous curved face and no edges.',
  },
  {
    id: 's12',
    category: 'spatial',
    text: 'How many right angles does a regular hexagon have?',
    options: ['0', '2', '4', '6'],
    correctIndex: 0,
    explanation: 'A regular hexagon has interior angles of 120° each — none are right angles.',
  },
  {
    id: 's13',
    category: 'spatial',
    text: 'If a square has area 81 cm², what is its perimeter?',
    options: ['18 cm', '36 cm', '27 cm', '40 cm'],
    correctIndex: 1,
    explanation: 'Side = √81 = 9 cm. Perimeter = 4 × 9 = 36 cm.',
  },
  {
    id: 's14',
    category: 'spatial',
    text: 'How many vertices does a rectangular prism (cuboid) have?',
    options: ['6', '8', '12', '4'],
    correctIndex: 1,
    explanation: 'A cuboid has 8 vertices (corners).',
  },
  {
    id: 's15',
    category: 'spatial',
    text: 'What is the minimum number of colors needed so no two adjacent regions of a standard map share a color?',
    options: ['2', '3', '4', '5'],
    correctIndex: 2,
    explanation: 'The four-color theorem: any map can be colored with at most 4 colors.',
  },
  {
    id: 's16',
    category: 'spatial',
    text: 'A cylinder has radius 3 and height 5. What is its volume? (π ≈ 3.14)',
    options: ['94.2', '141.3', '47.1', '282.6'],
    correctIndex: 0,
    explanation: 'Volume = π × r² × h = 3.14 × 9 × 5 ≈ 141.3... Wait: 3.14 × 9 = 28.26; × 5 = 141.3.',
  },
];

export const ALL_QUESTIONS: Question[] = [
  ...verbalQuestions,
  ...mathQuestions,
  ...spatialQuestions,
];

export const QUESTIONS_BY_CATEGORY = {
  verbal: verbalQuestions,
  math: mathQuestions,
  spatial: spatialQuestions,
};

/** Fisher-Yates shuffle algorithm - properly randomizes array */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Pick `count` random questions (optionally from one category) */
export function sampleQuestions(count: number, category?: 'verbal' | 'math' | 'spatial'): Question[] {
  const pool = category ? QUESTIONS_BY_CATEGORY[category] : ALL_QUESTIONS;
  const shuffled = fisherYatesShuffle(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/** Build a full CCAT-style 50-question test (balanced categories) with unique questions */
export function buildDailyTest(): Question[] {
  const verbal = sampleQuestions(17, 'verbal');
  const math = sampleQuestions(17, 'math');
  const spatial = sampleQuestions(16, 'spatial');
  const combined = fisherYatesShuffle([...verbal, ...math, ...spatial]);
  return combined;
}
