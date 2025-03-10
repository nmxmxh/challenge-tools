/* eslint-disable @typescript-eslint/no-explicit-any */
// components/screens/QuizMode.js
import React, { useState } from "react";
import styled from "styled-components";

const QuizMode = ({ onBack, questions = [] }: any) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const question = questions[index];

  const handleSelect = (option: any) => {
    setSelected(option);
    if (option === question.correct) setScore(score + 1);
    setTimeout(() => {
      setSelected(null);
      setIndex((prev) => (prev + 1) % questions.length);
    }, 1000);
  };

  return (
    <Container>
      <BackButton onClick={onBack}>← Back</BackButton>
      <Score>Score: {score}</Score>
      <Question>{question.text}</Question>
      <Options>
        {question.options.map((opt: any) => (
          <Option
            key={opt}
            onClick={() => handleSelect(opt)}
            selected={selected === opt}
            correct={selected && opt === question.correct}
            wrong={selected && selected === opt && selected !== question.correct}
          >
            {opt}
          </Option>
        ))}
      </Options>
    </Container>
  );
};

export default QuizMode;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`;

const BackButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Score = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const Question = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
`;

const Options = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;
  max-width: 600px;
`;

const Option = styled.div<any>`
  background: ${({ correct, wrong }) => (correct ? "#4CAF50" : wrong ? "#FF5252" : "#fff")};
  color: ${({ correct, wrong }) => (correct || wrong ? "#fff" : "#333")};
  border: 2px solid #eee;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${({ correct, wrong }) => (correct || wrong ? "" : "rgba(0,0,0,0.05)")};
  }
`;
