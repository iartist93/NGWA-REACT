import { useEffect, useState } from 'react';
import TestData from '../data/TestData.json';

import '../styles/practice.scss';

function Practie({ onFinalAnswer }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [canAnswer, setCanAnswer] = useState(true);

  useEffect(() => {
    setQuestions(TestData.wordList.filter((_, index) => index <= 3));
  }, []);

  useEffect(() => {
    setCurrentQuestion(questions[currentIndex]);
  }, [currentIndex, questions]);

  const setCurrentAnswer = (answer) => {
    if (answer === questions[currentIndex].pos) {
      setAnswers([...answers, true]);
    } else {
      setAnswers([...answers, false]);
    }

    setCanAnswer(false);
  };

  const onNextClicked = () => {
    if (currentIndex === questions.length - 1) {
      const correctAnswers = answers.filter((answer) => answer === true).length;
      onFinalAnswer(correctAnswers, questions.length);
    } else {
      setCurrentIndex(currentIndex + 1);
      setCanAnswer(true);
    }
  };

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
            <button
              className='answer-button verb'
              disabled={!canAnswer}
              onClick={() => setCurrentAnswer('verb')}
            >
              Verb
            </button>
            <button
              className='answer-button noun'
              disabled={!canAnswer}
              onClick={() => setCurrentAnswer('noun')}
            >
              Noun
            </button>
            <button
              className='answer-button adverb'
              disabled={!canAnswer}
              onClick={() => setCurrentAnswer('adverb')}
            >
              Adverb
            </button>
            <button
              className='answer-button adjective '
              disabled={!canAnswer}
              onClick={() => setCurrentAnswer('adjective')}
            >
              Adjective
            </button>
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
