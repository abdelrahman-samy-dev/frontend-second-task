
import { useQuiz } from '../hooks/useQuiz';
import { QuizStart } from './QuizStart';
import { QuestionCard } from './QuestionCard';
import { QuizResult } from './QuizResult';

export function QuizApp() {
  const { state } = useQuiz();
  const { quizData, isFinished, isLoading } = state;

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Loading Questions</h2>
          <p className="text-slate-500 text-sm">Please wait...</p>
        </div>
      </div>
    );
  }

  // Show start screen if no quiz data loaded yet
  if (!quizData && !isLoading) {
    return <QuizStart />;
  }

  // Show quiz questions
  if (quizData && !isFinished) {
    return <QuestionCard />;
  }

  // Show results
  if (isFinished) {
    return <QuizResult />;
  }

  // Fallback
  return <QuizStart />;
}