export type Mnemonic = {
  type: "mnemonic";
  title: string;
  content: string;
}

export type CommonMistakes = {
  type: "common-mistakes";
  title: string;
  items: { wrong: string; right: string }[];
}

export type FrequencyList = {
  type: "frequency-list";
  title: string;
  items: { label: string; frequency: number }[];
};

export type UseCases = {
  type: "use-cases";
  title: string;
  items: { icon: string; title: string; text: string }[];
}

export type SignalWords = {
  type: "signal-words";
  title: string;
  words: string[];
}

export type VocabGrid = {
  type: "vocab-grid";
  title:string;
  items: { term: string; type: string; meaning: string; example: string }[];
}

// New Type for Verb Table
export type VerbDefinition = {
  infinitive: string;
  simplePast: string;
  pastParticiple: string;
  spanish: string;
};

export type VerbTable = {
  type: "verb-table";
  title: string;
  irregularVerbs: VerbDefinition[];
  regularVerbs: VerbDefinition[];
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subtitle"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "example-pair";
      correct: { sentence: string; explanation?: string };
      incorrect: { sentence: string; explanation?: string };
    }
  | { type: "timeline"; longAction: string; shortAction: string; }
  | { type: "ai-generator" }
  | FrequencyList
  | Mnemonic
  | CommonMistakes
  | UseCases
  | SignalWords
  | VocabGrid
  | VerbTable; // Add new type here

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface GrammarSection {
  id: string;
  badge: string;
  title: string;
  tag: string;
  description: string;
  rule?: {
    name: string;
    explanation: string;
    formulas: string[];
  };
  content: ContentBlock[];
  quiz: QuizQuestion[];
}

// Types for Final Evaluation
export type QuestionType =
  | 'order-sentence'
  | 'multiple-choice'
  | 'identify-error'
  | 'matching';

export interface BaseFinalQuestion {
  id: string;
  section: string;
  points: number;
}

export interface OrderSentenceQuestion extends BaseFinalQuestion {
  type: 'order-sentence';
  prompt: string;
  words: string[];
  traps: string[];
  correctOrder: string[];
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseFinalQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface IdentifyErrorQuestion extends BaseFinalQuestion {
  type: 'identify-error';
  sentence: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface MatchingQuestion extends BaseFinalQuestion {
  type: 'matching';
  prompt: string;
  pairs: {
    id: string;
    sentence: string;
    correctDescriptionId: string;
  }[];
  descriptions: {
    id: string;
    text: string;
  }[];
  traps: string[];
}

export type FinalQuizQuestion =
  | OrderSentenceQuestion
  | MultipleChoiceQuestion
  | IdentifyErrorQuestion
  | MatchingQuestion;

export type FeedbackTier = {
  minScore: number;
  maxScore: number;
  title: string;
  message: string;
};

export interface FinalEvaluationContent {
  title: string;
  subtitle: string;
  level: string;
  time: string;
  totalPoints: number;
  questions: FinalQuizQuestion[];
  feedbackTiers: FeedbackTier[];
}
