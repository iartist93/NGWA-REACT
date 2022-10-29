import { useState } from 'react';
import './App.css';
import Practie from './Pratice';
import Rank from './Rank';

function App() {
  const [showRankScreen, setShowRankScreen] = useState(false);

  const onFinalAnswer = () => {
    setShowRankScreen(true);
  };

  const onRetry = () => {
    setShowRankScreen(false);
  };

  return (
    <div className='App'>
      {!showRankScreen && <Practie onFinalAnswer={onFinalAnswer} />}
      {showRankScreen && <Rank onRetry={onRetry} />}
    </div>
  );
}

export default App;
