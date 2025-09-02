export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  image: string | null;
  mark: number;
}

export interface QuizData {
  id: string;
  title: string;
  totalMarks: number;
  totalQuestions: number;
  timeInMinutes: number;
  questions: Question[];
}

export interface QuizState {
  quizData: QuizData | null;
  currentQuestionIndex: number;
  userAnswers: string[];
  score: number;
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
  timeRemaining: number;
}

export interface QuizContextType {
  state: QuizState;
  fetchQuestions: () => Promise<void>;
  selectAnswer: (answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;
  startTimer: () => void;
}