import { useEffect, useState } from 'react';
import TestData from '../data/TestData.json';
import AnswerButton from './AnswerButton';
import '../styles/practice.scss';

function Practie({ onFinalAnswer }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [canAnswer, setCanAnswer] = useState(true);
  const [isCorrect, setIsCorrect] = useState({
    answers: '',
    correct: false,
  });

  useEffect(() => {
    setQuestions(TestData.wordList.filter((_, index) => index <= 3));
  }, []);

  useEffect(() => {
    setCurrentQuestion(questions[currentIndex]);
  }, [currentIndex, questions]);

  const setCurrentAnswer = (answer) => {
    const correct = answer === questions[currentIndex].pos;
    setAnswers([...answers, correct]);
    setIsCorrect({
      answer,
      correct,
    });
    setCanAnswer(false);
  };

  const onNextClicked = () => {
    if (currentIndex === questions.length - 1) {
      const correctAnswers = answers.filter((answer) => answer === true).length;
      onFinalAnswer(correctAnswers, questions.length);
    } else {
      setCurrentIndex(currentIndex + 1);
      setCanAnswer(true);
      setIsCorrect({
        answers: '',
        correct: false,
      });
    }
  };

  const validAnswers = ['verb', 'noun', 'adverb', 'adjective'];

  return (
    <div>
      <div className='practice__progress'>
        <h1>
          {currentIndex} / {questions.length}
        </h1>
        <h1>{JSON.stringify(answers)}</h1>
      </div>
      {currentQuestion && (
        <div className='practice__question'>
          <h2 className='question__body'>{currentQuestion.word}</h2>
          <div className='question__answers'>
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

      <div className='pratice__actions'>
        <button
          className='next-btn'
          onClick={onNextClicked}
          disabled={canAnswer}
        >
          {currentIndex === questions.length - 1 ? 'FINISH' : 'NEXT'}
        </button>
      </div>
    </div>
  );
}

export default Practie;
