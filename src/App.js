import { useState } from 'react';
import './styles/App.css';
import Practie from './components/Pratice';
import Rank from './components/Rank';

function App() {
  const [showRankScreen, setShowRankScreen] = useState(false);
  const [rankData, setRankData] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
  });

  const onFinalAnswer = (correctAnswers, totalQuestions) => {
    setShowRankScreen(true);
    setRankData({
      correctAnswers,
      totalQuestions,
    });
  };

  const onRetry = () => {
    setShowRankScreen(false);
  };

  return (
    <div className='App'>
      {!showRankScreen && <Practie onFinalAnswer={onFinalAnswer} />}
      {showRankScreen && <Rank rankData={rankData} onRetry={onRetry} />}
    </div>
  );
}

export default App;
