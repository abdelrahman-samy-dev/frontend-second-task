import { createContext, useReducer, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { QuizContextType } from '../types/quiz';
import { initialState, quizReducer } from './quizReducer';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const timerRef = useRef<number | null>(null);
  const timeRemainingRef = useRef<number>(0);

  const fetchQuestions = async () => {
    try {
      console.log('🔍 Loading questions...');
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch('https://s3.vclasses.net/dev-alsamerre/quiz');

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      console.log('✅ Data loaded successfully:', data);

      dispatch({ type: 'SET_QUIZ_DATA', payload: data });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.error('❌ Error loading data:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const selectAnswer = (answer: string) => {
    dispatch({ type: 'SELECT_ANSWER', payload: answer });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const finishQuiz = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    dispatch({ type: 'FINISH_QUIZ' });
  };

  const resetQuiz = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    dispatch({ type: 'RESET_QUIZ' });
  };

  const startTimer = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Set the initial time from state
    timeRemainingRef.current = state.timeRemaining;
    console.log('⏰ Starting timer with:', timeRemainingRef.current, 'seconds');

    timerRef.current = setInterval(() => {
      timeRemainingRef.current -= 1;
      console.log('⏰ Timer tick:', timeRemainingRef.current, 'seconds remaining');
      
      if (timeRemainingRef.current > 0) {
        dispatch({ type: 'UPDATE_TIMER', payload: timeRemainingRef.current });
      } else {
        console.log('⏰ Time is up! Finishing quiz...');
        finishQuiz();
      }
    }, 1000);
  };

  // Update timeRemainingRef when state changes
  useEffect(() => {
    timeRemainingRef.current = state.timeRemaining;
  }, [state.timeRemaining]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const value: QuizContextType = {
    state,
    fetchQuestions,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetQuiz,
    startTimer,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext };