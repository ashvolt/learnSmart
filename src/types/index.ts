export type QuestionCategory = 'verbal' | 'math' | 'spatial';

export type Question = {
  id: string;
  category: QuestionCategory;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type TestSession = {
  date: string; // ISO date string
  score: number;
  total: number;
  timeTaken: number; // seconds
  categoryBreakdown: Record<QuestionCategory, { correct: number; total: number }>;
};

export type RootStackParamList = {
  Home: undefined;
  DailyTest: undefined;
  Practice: { category?: QuestionCategory };
  Results: { session: TestSession };
  Progress: undefined;
  CategorySelect: undefined;
  Settings: undefined;
  Hints: undefined;
};
