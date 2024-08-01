import React, { useState } from "react";
import { questions } from "./questions"; // Import questions

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleOptionClick = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      if (currentQuestion === questions.length - 1) {
        setGameOver(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    return (
      <div>
        <h2>{question.question}</h2>
        <ul>
          {question.answers.map((answer, index) => (
            <li key={index}>
              <input
                type="radio"
                id={`answer-${index}`}
                name="answer"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => handleOptionClick(index)}
              />
              <label htmlFor={`answer-${index}`}>{answer}</label>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit}>Submit Answer</button>
      </div>
    );
  };

  const renderGameOver = () => {
    return (
      <div>
        <h2>Game Over!</h2>
        <p>
          Your final score is: {score} out of {questions.length}
        </p>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
      </div>
    );
  };

  return (
    <div className="quiz">{gameOver ? renderGameOver() : renderQuestion()}</div>
  );
};

export default Quiz;
