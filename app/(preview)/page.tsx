"use client";

import { useState } from "react";
import { styled } from "styled-components";

import FlashcardView from "@/components/organisms/flash-card";
import MatchGame from "@/components/organisms/matching";
import Upload from "@/components/organisms/upload";
import Quiz from "@/components/quiz";
import { useGenerateQuiz } from "@/lib/hooks/useGenerateQuiz";

export default function Home() {
  const [step, setStep] = useState("upload");
  const { handleFileChange, handleSubmitWithFiles, files, isLoading, questions } = useGenerateQuiz();
  return (
    <Style.Container>
      <section className="home-history">
        <div>
          <p>blah... / blah... / blah...</p>
        </div>
        <div>
          <button>blah</button>
          <button>..</button>
          <button>.</button>
        </div>
      </section>
      <h2>Multiple Learning Modes</h2>
      <div className="home-modes">
        {questions?.flash?.length >= 4 && <button onClick={() => setStep("flash")}>{questions.flash_title}</button>}
        {questions?.matching?.length >= 4 && (
          <button onClick={() => setStep("matching")}>{questions.matching_title}</button>
        )}
        {questions?.choice?.length >= 4 && <button onClick={() => setStep("quiz")}>{questions.choice_title}</button>}
      </div>
      <section className="home-main-content">
        {step === "upload" && (
          <Upload
            handleFileChange={handleFileChange}
            handleSubmitWithFiles={handleSubmitWithFiles}
            files={files}
            isLoading={isLoading}
          />
        )}
        {step === "flash" && <FlashcardView flashcards={questions.flash} />}
        {step === "matching" && <MatchGame matching={questions.matching} />}
        {step === "quiz" && <Quiz questions={questions.choice} />}
      </section>
    </Style.Container>
  );
}

const Style = {
  Container: styled.main`
    height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    section.home-main-content {
      height: 500px;
      width: 75%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
    }

    section.home-history {
      height: 45px;
      width: 75%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      p {
        color: grey;
      }

      button {
        height: 40px;
        padding: 0 15px;
        color: grey;
        border-radius: 4px;
        border: 2px solid grey;
        margin-left: 10px;
        cursor: not-allowed;
      }
    }

    h2 {
      width: 75%;
    }

    div.home-modes {
      height: 100px;
      width: 75%;
      display: flex;
      align-items: center;
      margin-top: 20px;

      button {
        width: 24%;
        height: 100%;
        display: flex;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        margin-right: 15px;
        text-align: center;
        justify-content: center;
        transition: background 0.25s linear;

        &:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }
      }
    }
  `,
};
