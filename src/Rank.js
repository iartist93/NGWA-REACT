function Rank({ rankData, onRetry }) {
  return (
    <div>
      <h1>Rank Page</h1>
      <h2>{JSON.stringify(rankData)}</h2>
      <button className='retry' onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default Rank;
