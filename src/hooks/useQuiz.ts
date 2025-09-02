import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import type { QuizContextType } from '../types/quiz';

export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}