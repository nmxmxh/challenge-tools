// components/screens/ChoiceScreen.js
import React from "react";
import styled from "styled-components";

const modes = [
  { id: "flashcards", label: "Flashcards" },
  { id: "quiz", label: "Quiz Mode" },
  { id: "matching", label: "Matching Game" },
  { id: "yes-no", label: "Yes or No" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChoiceScreen = ({ onSelectMode }: any) => {
  return (
    <Container>
      <Title>Choose Your Learning Mode</Title>
      <CardGrid>
        {modes.map((mode) => (
          <ModeCard key={mode.id} onClick={() => onSelectMode(mode.id)}>
            <h3>{mode.label}</h3>
          </ModeCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default ChoiceScreen;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
`;

const ModeCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }
`;
