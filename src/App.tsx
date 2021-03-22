import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
// Components
import QuestionCard from './components/QuestionCard';


const TOTAL_QUESTIONS = 10;

interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  };

  const nextQuestion = () => {

  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={startTrivia}>Start Quiz</button>
      <p className="score">Score:</p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answer}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  )
}

export default App;
