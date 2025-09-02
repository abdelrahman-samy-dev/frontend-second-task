
import { useQuiz } from '../hooks/useQuiz';

export function QuizStart() {
  const { fetchQuestions, state } = useQuiz();

  const handleStart = async () => {
    await fetchQuestions();
  };

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">An Error Occurred</h2>
          <p className="text-slate-600 mb-6">{state.error}</p>
          <button
            onClick={handleStart}
            className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Quiz App</h1>
          <p className="text-slate-600">Test your knowledge with diverse questions</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Welcome!</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              This quiz contains 10 diverse questions in general knowledge.
              <br />
              You have 30 minutes to answer all questions.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">10</div>
              <div className="text-xs text-slate-500">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">30</div>
              <div className="text-xs text-slate-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">11</div>
              <div className="text-xs text-slate-500">Points</div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Start Quiz
          </button>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-slate-400">
              Click the button above to start the quiz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}