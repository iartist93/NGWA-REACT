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
      <p>Rank Page</p>
      <p>Score = {score}%</p>
      <p>Rank= {rank}</p>
      <button className='retry' onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default Rank;
