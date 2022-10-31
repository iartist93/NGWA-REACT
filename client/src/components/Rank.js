import { useEffect, useState } from 'react';
import TestData from '../data/TestData.json';
import axios from 'axios';
import '../styles/rank.scss';

function Rank({ rankData, onRetry }) {
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [scoresList, setScoreList] = useState([]);

  useEffect(() => {
    const score = Math.round(
      (rankData.correctAnswers / rankData.totalQuestions) * 100
    );
    setScore(score);
    setScoreList(TestData.scoresList);

    const sendRankData = async () => {
      const res = await axios.post('/rank', { score });
      setRank(res.data.rank);
    };
    sendRankData();
  }, [rankData, score, scoresList]);

  return (
    <div className='rank-page'>
      <p className='rank-page-title'>Quiz is Completed!</p>

      <p>{JSON.stringify(rankData)}</p>

      <div className='results'>
        <div className='rank-page-result rank-page-score'>
          <p>Your Score</p>
          <p>{score}%</p>
        </div>
        <div className='rank-page-result rank-page-rank'>
          <p>Your Rank</p>
          <p>{rank}%</p>
        </div>
      </div>

      <button className='retry-btn' onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default Rank;
