
import { useQuiz } from '../hooks/useQuiz';
import { useEffect } from 'react';

export function QuestionCard() {
  const { state, selectAnswer, nextQuestion, previousQuestion, finishQuiz, startTimer } = useQuiz();
  const { quizData, currentQuestionIndex, userAnswers, timeRemaining } = state;
  
  const currentQuestion = quizData?.questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === (quizData?.questions.length || 0) - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  useEffect(() => {
    if (quizData && timeRemaining > 0) {
      startTimer();
    }
  }, [quizData]);

  const handleAnswerSelect = (answer: string) => {
    selectAnswer(answer);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const getProgressPercentage = () => {
    if (!quizData) return 0;
    return ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion || !quizData) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer and Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Progress Info */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold text-slate-700">
                  Question {currentQuestionIndex + 1} of {quizData.questions.length}
                </span>
                <span className="text-lg font-semibold text-slate-800">
                  {Math.round(getProgressPercentage())}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-slate-800 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-slate-800 rounded-lg px-6 py-3 text-center min-w-[120px]">
              <div className="text-sm text-slate-300 mb-1">Time Remaining</div>
              <div className={`text-2xl font-bold text-white ${timeRemaining <= 60 ? 'animate-pulse' : ''}`}>
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 leading-relaxed max-w-4xl mx-auto">
              {currentQuestion.question}
            </h2>
            {currentQuestion.image && (
              <div className="mt-6">
                <img 
                  src={currentQuestion.image} 
                  alt="Question" 
                  className="max-w-full h-auto rounded-lg shadow-sm mx-auto"
                />
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`group relative p-6 text-left rounded-lg border-2 transition-all duration-300 text-lg font-medium overflow-hidden ${
                  userAnswer === option
                    ? 'border-slate-800 bg-slate-50 text-slate-800 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-800'
                }`}
              >
                <div className="relative z-10 flex items-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white font-bold text-lg mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-slate-100/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                isFirstQuestion
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-600 hover:bg-slate-700 text-white shadow-sm hover:shadow-md'
              }`}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!userAnswer}
              className={`px-10 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 ${
                !userAnswer
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-white shadow-sm hover:shadow-md'
              }`}
            >
              {isLastQuestion ? (
                <>
                  Finish Quiz
                  <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              ) : (
                <>
                  Next
                  <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mt-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
            <div>
              <div className="text-2xl font-bold text-slate-800">{quizData.totalQuestions}</div>
              <div className="text-slate-500">Total Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{quizData.totalMarks}</div>
              <div className="text-slate-500">Total Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{quizData.timeInMinutes}</div>
              <div className="text-slate-500">Quiz Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}