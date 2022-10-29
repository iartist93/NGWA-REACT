import { useEffect, useState } from 'react';
import TestData from '../data/TestData.json';
import axios from 'axios';

function Rank({ rankData, onRetry }) {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [scoresList, setScoreList] = useState([]);

  useEffect(() => {
    const sendRankData = async () => {
      await axios.post('/rank', { rankData });
    };
    sendRankData();
  }, []);

  useEffect(() => {
    setScore((rankData.correctAnswers / rankData.totalQuestions) * 100);
    setScoreList(TestData.scoresList);

    const filteredRanks = scoresList.filter((rank) => rank < score).length;
    const newRank = (filteredRanks / scoresList.length) * 100;
    const roundedRank = Math.round(newRank * 100) / 100;
    setRank(roundedRank);
  }, [rankData, score, scoresList]);

  return (
    <div>
      <h1>Rank Page</h1>
      <h2>Score = {score}%</h2>
      <h2>Rank= {rank}</h2>
      <button className='retry' onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default Rank;
