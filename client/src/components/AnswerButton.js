import '../styles/AnswerButton.scss';

function AnswerButton({ name, disabled, correct, onClick }) {
  return (
    <button
      className={`answer-button ${name} ${
        correct !== null && correct ? 'correct' : ''
      } 
      ${correct !== null && !correct ? 'wrong' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default AnswerButton;
