import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import styled from "styled-components";

interface CardType {
  id: string;
  text: string;
  type: "question" | "answer";
}

const shuffleArray = (arr: any[]) => {
  return arr
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

function MatchGame({ matching }: { matching: any[] }) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Prepare shuffled cards on mount
  useEffect(() => {
    const questionCards: CardType[] = matching.map((item: any, idx: any) => ({
      id: `q-${idx}`,
      text: item.question,
      type: "question",
    }));

    const answerCards: CardType[] = matching.map((item: any, idx: any) => ({
      id: `a-${idx}`,
      text: item.answer,
      type: "answer",
    }));

    const shuffledCards = shuffleArray([...questionCards, ...answerCards]);
    setCards(shuffledCards);
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleCardClick = (card: CardType) => {
    if (selectedCards.find((c) => c.id === card.id)) return;

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;

      const firstIndex = parseInt(first.id.split("-")[1]);
      const secondIndex = parseInt(second.id.split("-")[1]);

      // Check for match: question and answer with same index
      const isMatch =
        (first.type === "question" && second.type === "answer" && firstIndex === secondIndex) ||
        (first.type === "answer" && second.type === "question" && firstIndex === secondIndex);

      if (isMatch) {
        setMatchedPairs((prev) => [...prev, first.id, second.id]);
      } else {
        // You can add a time penalty here if desired
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 800);
    }
  };

  const resetGame = () => {
    setMatchedPairs([]);
    setSelectedCards([]);
    setElapsedTime(0);
    const questionCards: CardType[] = matching.map((item: any, idx: any) => ({
      id: `q-${idx}`,
      text: item.question,
      type: "question",
    }));

    const answerCards: CardType[] = matching.map((item: any, idx: any) => ({
      id: `a-${idx}`,
      text: item.answer,
      type: "answer",
    }));

    const shuffledCards = shuffleArray([...questionCards, ...answerCards]);
    setCards(shuffledCards);
    setStartTime(Date.now());
  };

  const allMatched = matchedPairs.length === cards.length;

  return (
    <Style.Container className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Match Game</h1>
        <p className="text-lg text-gray-600">
          Match all the terms with their definitions as quickly as possible. Avoid incorrect matches. They add extra
          time!
        </p>
        <div className="mt-4 text-xl font-semibold">Time: {elapsedTime}s</div>
        {allMatched && (
          <div className="mt-4 text-green-500 font-bold">
            🎉 Well Done! You matched everything in {elapsedTime} seconds.
          </div>
        )}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const isSelected = selectedCards.find((c) => c.id === card.id);
          const isMatched = matchedPairs.includes(card.id);

          return (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                if (!isMatched && selectedCards.length < 2) handleCardClick(card);
              }}
            >
              <Card
                className={`cursor-pointer transition-all ease-in-out duration-300 ${
                  isMatched
                    ? "bg-green-200 text-green-900 border-green-400"
                    : isSelected
                      ? "bg-blue-100 border-blue-400"
                      : "bg-white hover:bg-gray-50"
                }`}
              >
                <CardContent className="p-4 min-h-[120px] flex items-center justify-center text-center">
                  <span className="text-sm font-medium">{card.text}</span>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 text-center">
        <Button onClick={resetGame}>Restart Game</Button>
      </div>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

export default MatchGame;
