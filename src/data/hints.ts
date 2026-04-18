export type HintCategory = 'verbal' | 'math' | 'spatial' | 'general';

export interface Hint {
  id: string;
  category: HintCategory;
  title: string;
  content: string;
  tips?: string[];
}

export const HINTS: Record<HintCategory, Hint[]> = {
  verbal: [
    {
      id: 'v-analogy',
      category: 'verbal',
      title: 'Solving Analogies',
      content: 'Analogies follow the pattern: A is to B as C is to ___. Find the relationship between A and B, then apply the same logic to C.',
      tips: [
        'Identify the relationship: is it synonym, opposite, part-to-whole, or function?',
        'Create a sentence: "A is a type of B" or "A does B"',
        'Apply that relationship to find the missing word',
        'Eliminate answer choices that don\'t fit',
      ],
    },
    {
      id: 'v-vocab',
      category: 'verbal',
      title: 'Vocabulary & Antonyms',
      content: 'For word meanings, think about context and root words. For antonyms, find the opposite meaning.',
      tips: [
        'Look for root words and prefixes (un-, dis-, pre-, etc.)',
        'Think of sentences using the word',
        'Eliminate words with similar meanings first',
        'For antonyms, the opposite must be exact, not just different',
      ],
    },
    {
      id: 'v-reading',
      category: 'verbal',
      title: 'Reading Comprehension',
      content: 'Read carefully and look for key words. Answer based on what the passage says, not what you assume.',
      tips: [
        'Read the question before diving deep into the passage',
        'Identify the main idea vs. supporting details',
        'Look for signal words: however, therefore, in conclusion',
        'Don\'t use outside knowledge; answer only from the text',
      ],
    },
  ],

  math: [
    {
      id: 'm-percent',
      category: 'math',
      title: 'Working with Percentages',
      content: 'To find X% of a number: multiply the number by X/100. To find what percent A is of B: (A/B) × 100.',
      tips: [
        '15% of 100 = 100 × 0.15 = 15',
        'To add 20% to a price: multiply by 1.20',
        'To subtract 20% from a price: multiply by 0.80',
        'Check your answer: does it make sense?',
      ],
    },
    {
      id: 'm-series',
      category: 'math',
      title: 'Number Series Patterns',
      content: 'Look for arithmetic sequences (add/subtract same number), geometric sequences (multiply/divide), or more complex patterns.',
      tips: [
        'Find the difference between consecutive numbers',
        'Check if the difference is consistent or changing',
        'Look for perfect squares, cubes, or powers of 2',
        'Calculate differences of differences for complex patterns',
      ],
    },
    {
      id: 'm-logic',
      category: 'math',
      title: 'Logical Reasoning',
      content: 'Test logic statements carefully. "All A are B" doesn\'t mean "All B are A". Draw diagrams if needed.',
      tips: [
        'Write statements as: If A then B (A→B)',
        'Remember: the converse is not always true',
        'Use Venn diagrams for set relationships',
        'Test edge cases: what if there\'s only one element?',
      ],
    },
  ],

  spatial: [
    {
      id: 's-rotation',
      category: 'spatial',
      title: 'Rotations & Perspectives',
      content: 'Imagine rotating the shape. Clockwise 90° means turning right. Visualize it step by step.',
      tips: [
        'Mark a distinctive feature on the shape to track rotation',
        'Rotate 90° at a time if the total rotation is large',
        'Flip positions: top becomes right, right becomes bottom, etc.',
        'Check: did the shape flip or just rotate?',
      ],
    },
    {
      id: 's-folding',
      category: 'spatial',
      title: 'Unfolding & Folding Nets',
      content: 'When a flat pattern folds into a 3D shape, opposite faces don\'t touch. Trace which faces will be adjacent.',
      tips: [
        'Identify which edges will connect when folded',
        'Remember: opposite faces in a cube never share an edge',
        'Trace the path from one face to another',
        'Visualize one fold at a time',
      ],
    },
    {
      id: 's-assembly',
      category: 'spatial',
      title: 'Shape Assembly',
      content: 'Pieces must fit together like a puzzle. Check sizes, angles, and orientations.',
      tips: [
        'Count the pieces and check if the answer has the same count',
        'Look for distinctive angles or curves that must match',
        'Mentally place one piece, then the next',
        'Eliminate answers that have pieces in impossible positions',
      ],
    },
  ],

  general: [
    {
      id: 'gen-time',
      category: 'general',
      title: 'Time Management',
      content: 'You have 15 minutes for 50 questions—about 18 seconds per question. Don\'t spend too long on one question.',
      tips: [
        'Aim to finish roughly by the 12-minute mark',
        'Skip hard questions and return if you have time',
        'Mark your best guess if unsure',
        'Every question is worth the same points',
      ],
    },
    {
      id: 'gen-strategy',
      category: 'general',
      title: 'Test Strategy',
      content: 'Start with questions you find easiest. Build confidence. Return to hard questions with a fresh mind.',
      tips: [
        'Do a quick scan for easy wins',
        'Mark challenging questions to revisit',
        'Don\'t overthink—your first instinct is often correct',
        'If stuck, eliminate obviously wrong answers',
      ],
    },
  ],
};

export function getHintsByCategory(category: HintCategory): Hint[] {
  return HINTS[category] || [];
}

export function getRandomHint(category?: HintCategory): Hint | null {
  const hints = category ? getHintsByCategory(category) : Object.values(HINTS).flat();
  if (!hints.length) return null;
  return hints[Math.floor(Math.random() * hints.length)];
}
