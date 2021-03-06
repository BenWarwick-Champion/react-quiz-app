import React, { useState } from 'react';
import { fetchQuizQuestions, QuestionState } from './API';
// Components
import QuestionCard from './components/QuestionCard';
// Styles
import { GlobalStyle, SelectionWrapper, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

export interface AnswerObject {
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
  const [gameOver, setGameOver] = useState(true);


  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const difficulty = document.querySelector<HTMLSelectElement>('#difficulty')!.value;
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty,
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore(prev => prev + 1);
      };
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    };
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    };
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
        <Wrapper>
          <SelectionWrapper>
            <label htmlFor="difficulty">Difficulty: </label>
            <select name="difficulty" id="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </SelectionWrapper>
          <button className="start" onClick={startTrivia}>Start Quiz</button>
        </Wrapper> : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver ? <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> : null}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?
        <button className="next" onClick={nextQuestion}>Next Question</button> : null}
    </Wrapper>
    </>
  )
}

export default App;
