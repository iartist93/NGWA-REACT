import { useEffect, useState } from 'react';
import AnswerButton from './AnswerButton';
import '../styles/practice.scss';
import axios from 'axios';

function Practie({ onFinalAnswer }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [canAnswer, setCanAnswer] = useState(true);
  const [isCorrect, setIsCorrect] = useState({ answers: '', correct: false });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchTestData = async () => {
      const res = await axios.get('/questions');
      console.log('res = ', res);
      const data = await res.data;

      if (res.status !== 200) {
        throw Error('Error in get questions');
      }

      setQuestions(data);
    };

    fetchTestData();
  }, []);

  useEffect(() => {
    console.log(currentIndex, questions.length - 1);
    if (questions.length === 0) return;

    if (currentIndex <= questions.length - 1) {
      setCanAnswer(true);
      setIsCorrect({ answers: '', correct: false });
      setCurrentQuestion(questions[currentIndex]);
    } else {
      const correctAnswers = answers.filter((answer) => answer === true).length;
      onFinalAnswer(correctAnswers, questions.length);
    }
  }, [currentIndex, questions]);

  const setCurrentAnswer = (answer) => {
    setProgress(Math.round(((currentIndex + 1) / questions.length) * 100));

    const correct = answer === questions[currentIndex].pos;

    setAnswers([...answers, correct]);
    setIsCorrect({ answer, correct });
    setCanAnswer(false);

    setTimeout(() => {
      onNextClicked();
    }, 500);
  };

  const onNextClicked = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const validAnswers = ['verb', 'noun', 'adverb', 'adjective'];

  return (
    <div className='practice'>
      <div className='practice-progress'>
        <p className='progress-value'>{progress}%</p>
        <div className='progress-bg'>
          <div className='progress-bar' style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {currentQuestion && (
        <div className='question'>
          <p className='question-title'>
            What is the correct category for this word?
          </p>

          <p className='question-word'>{currentQuestion.word}</p>
          <div className='question-answers'>
            {validAnswers.map((answer) => (
              <AnswerButton
                key={answer}
                name={answer}
                disabled={!canAnswer}
                correct={isCorrect.answer === answer ? isCorrect.correct : null}
                onClick={() => setCurrentAnswer(answer)}
              />
            ))}
          </div>
        </div>
      )}

      {/* <div className='pratice__actions'>
        <button
          className='next-btn'
          onClick={onNextClicked}
          disabled={canAnswer}
        >
          {currentIndex === questions.length - 1 ? 'FINISH' : 'NEXT'}
        </button>
      </div> */}
    </div>
  );
}

export default Practie;
