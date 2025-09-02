
import { useQuiz } from '../hooks/useQuiz';

export function QuizResult() {
  const { state, resetQuiz } = useQuiz();
  const { score, quizData, userAnswers } = state;

  if (!quizData) return null;

  const totalQuestions = quizData.questions.length;
  const totalMarks = quizData.totalMarks;
  const percentage = Math.round((score / totalMarks) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return { message: 'Excellent! Outstanding performance', icon: 'star', color: 'text-green-600', bgColor: 'bg-green-500' };
    if (percentage >= 80) return { message: 'Very Good! Well done', icon: 'thumbs-up', color: 'text-blue-600', bgColor: 'bg-blue-500' };
    if (percentage >= 70) return { message: 'Good! You can improve more', icon: 'check-circle', color: 'text-yellow-600', bgColor: 'bg-yellow-500' };
    if (percentage >= 60) return { message: 'Acceptable, try again', icon: 'exclamation', color: 'text-orange-600', bgColor: 'bg-orange-500' };
    return { message: 'Need to review', icon: 'book-open', color: 'text-red-600', bgColor: 'bg-red-500' };
  };

  const scoreInfo = getScoreMessage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return (
          <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 'thumbs-up':
        return (
          <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        );
      case 'check-circle':
        return (
          <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'exclamation':
        return (
          <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'book-open':
        return (
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Result Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
          {/* Result Header */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              {getIcon(scoreInfo.icon)}
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Quiz Completed!</h1>
            <div className={`text-2xl font-semibold mb-6 ${scoreInfo.color}`}>
              {scoreInfo.message}
            </div>
          </div>

          {/* Score Display */}
          <div className={`${scoreInfo.bgColor} rounded-lg p-8 mb-8 text-white`}>
            <div className="text-6xl font-bold mb-2">{score}</div>
            <div className="text-xl opacity-90 mb-2">out of {totalMarks} points</div>
            <div className="text-3xl font-bold">{percentage}%</div>
            <div className="text-lg opacity-80 mt-2">You answered {totalQuestions} questions</div>
          </div>

          {/* Performance Bar */}
          <div className="bg-slate-100 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Performance Level</h3>
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full ${scoreInfo.bgColor} transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Answer Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {quizData.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.answer;

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${isCorrect
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-400 bg-red-50'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-700">
                        Question {index + 1}
                      </span>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        }`}>
                        {isCorrect ? (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Correct
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Wrong
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
                      {question.question}
                    </p>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold">Your Answer:</span>
                        <span className={`ml-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {userAnswer || 'No answer'}
                        </span>
                      </div>

                      {!isCorrect && (
                        <div className="text-xs text-green-600">
                          <span className="font-semibold">Correct Answer:</span>
                          <span className="ml-2">{question.answer}</span>
                        </div>
                      )}

                      <div className="text-xs text-slate-600">
                        <span className="font-semibold">Points:</span>
                        <span className="ml-2">{isCorrect ? question.mark : 0} of {question.mark}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={resetQuiz}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake Quiz
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>

        {/* Quiz Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mt-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-700">
            <div>
              <div className="text-2xl font-bold text-slate-800">{totalQuestions}</div>
              <div className="text-slate-500">Total Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{totalMarks}</div>
              <div className="text-slate-500">Total Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{score}</div>
              <div className="text-slate-500">Points Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{percentage}%</div>
              <div className="text-slate-500">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}