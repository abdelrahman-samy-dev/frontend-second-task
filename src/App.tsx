import { QuizProvider } from './context/QuizContext';
import { QuizApp } from './components/QuizApp';

function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}

export default App;