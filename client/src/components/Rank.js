import { useEffect, useState } from 'react';
import TestData from '../data/TestData.json';
import axios from 'axios';

function Rank({ rankData, onRetry }) {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [scoresList, setScoreList] = useState([]);

  useEffect(() => {
    const score = (rankData.correctAnswers / rankData.totalQuestions) * 100;
    setScore(score);
    setScoreList(TestData.scoresList);

    const sendRankData = async () => {
      const res = await axios.post('/rank', { score });
      setRank(res.data.rank);
    };
    sendRankData();
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
