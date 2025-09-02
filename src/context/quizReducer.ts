import type { QuizState, QuizData } from '../types/quiz';

export const initialState: QuizState = {
  quizData: null,
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  isFinished: false,
  isLoading: false,
  error: null,
  timeRemaining: 0,
};

export type QuizAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_QUIZ_DATA'; payload: QuizData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SELECT_ANSWER'; payload: string }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'FINISH_QUIZ' }
  | { type: 'RESET_QUIZ' }
  | { type: 'UPDATE_TIMER'; payload: number };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_LOADING': {
      return { ...state, isLoading: action.payload };
    }

    case 'SET_QUIZ_DATA': {
      return {
        ...state,
        quizData: action.payload,
        userAnswers: new Array(action.payload.questions.length).fill(''),
        timeRemaining: action.payload.timeInMinutes * 60,
        error: null
      };
    }

    case 'SET_ERROR': {
      return { ...state, error: action.payload, isLoading: false };
    }

    case 'SELECT_ANSWER': {
      const newUserAnswers = [...state.userAnswers];
      newUserAnswers[state.currentQuestionIndex] = action.payload;
      return { ...state, userAnswers: newUserAnswers };
    }

    case 'NEXT_QUESTION': {
      if (state.quizData && state.currentQuestionIndex < state.quizData.questions.length - 1) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
      return state;
    }

    case 'PREVIOUS_QUESTION': {
      if (state.currentQuestionIndex > 0) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 };
      }
      return state;
    }

    case 'FINISH_QUIZ': {
      if (!state.quizData) return state;

      const finalScore = state.quizData.questions.reduce((score, question, index) => {
        if (state.userAnswers[index] === question.answer) {
          return score + question.mark;
        }
        return score;
      }, 0);

      return { ...state, score: finalScore, isFinished: true };
    }

    case 'RESET_QUIZ': {
      return {
        ...initialState,
        quizData: state.quizData,
        userAnswers: state.quizData ? new Array(state.quizData.questions.length).fill('') : [],
        timeRemaining: state.quizData ? state.quizData.timeInMinutes * 60 : 0,
      };
    }

    case 'UPDATE_TIMER': {
      return { ...state, timeRemaining: action.payload };
    }

    default:
      return state;
  }
}