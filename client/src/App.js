import { useState } from 'react';
import './styles/App.scss';
import Practie from './components/Pratice';
import Rank from './components/Rank';

import logo from './assets/logo.svg';

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

  const onRetry = async () => {
    setShowRankScreen(false);
  };

  return (
    <div className='App'>
      <div className='app-header'>
        <img src={logo} alt='logo' className='app-header-logo' />
        <p className='app-header-title'>Part of Speech</p>
      </div>
      {!showRankScreen && <Practie onFinalAnswer={onFinalAnswer} />}
      {showRankScreen && <Rank rankData={rankData} onRetry={onRetry} />}
    </div>
  );
}

export default App;
