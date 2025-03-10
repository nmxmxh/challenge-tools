import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  /* background-color: #f9fafb; */
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled(motion.div)`
  width: 90%;
  height: 100%;
  position: relative;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  z-index: 10;
  transform-style: preserve-3d;
`;

const CardFace = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Front = styled(CardFace)`
  height: 100%;
  width: 100%;
`;

const Back = styled(CardFace)`
  transform: rotateY(180deg);
  height: 100%;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  width: 100px;
  height: 50px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid white;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.5);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 1);
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlashcardView = ({ flashcards }: any) => {
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = flashcards[current];
  const answerText = card.options[["A", "B", "C", "D"].indexOf(card.answer)];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrent((prev) => Math.min(prev + 1, flashcards.length - 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Container>
      <CardWrapper>
        <AnimatePresence mode="wait">
          <Card
            key={current}
            animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1 }}
            initial={{ opacity: 0, rotateY: isFlipped ? 180 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            <Front>
              <p>{card.question}</p>
            </Front>

            <Back>
              <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>{answerText}</p>
            </Back>
          </Card>
        </AnimatePresence>
      </CardWrapper>

      <ButtonGroup>
        <NavButton onClick={handlePrev} disabled={current === 0}>
          Previous
        </NavButton>
        <NavButton onClick={handleNext} disabled={current === flashcards.length - 1}>
          Next
        </NavButton>
      </ButtonGroup>
    </Container>
  );
};

export default FlashcardView;
