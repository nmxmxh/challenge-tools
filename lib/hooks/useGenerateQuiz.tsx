/* eslint-disable @typescript-eslint/no-explicit-any */
import { experimental_useObject } from "ai/react";
import { useState } from "react";
import { toast } from "sonner";

import { generateFlashcardsTitle, generateMatchingTitle, generateQuizTitle } from "@/app/(preview)/actions";

import { questionsSchema } from "../schemas";

export function useGenerateQuiz() {
  const [files, setFiles] = useState<File[]>([]);
  const [questions, setQuestions] = useState<{
    choice: any[];
    flash: any[];
    yesNo: any[];
    matching: any[];
    choice_title: string;
    flash_title: string;
    yes_no_title: string;
    matching_title: string;
  }>({
    choice: [],
    flash: [],
    yesNo: [],
    matching: [],
    choice_title: "",
    flash_title: "",
    yes_no_title: "",
    matching_title: "",
  });

  const { submit, isLoading } = experimental_useObject({
    api: "/api/generate-quiz",
    schema: questionsSchema,
    initialValue: undefined,
    onError: (error) => {
      toast.error("Failed to generate quiz. Please try again.");
      console.error(error);
      // setFiles([]);
    },
    onFinish: ({ object }) => {
      setQuestions((prev) => ({ ...prev, choice: object ?? [] }));
    },
  });

  const { submit: flashSubmit } = experimental_useObject({
    api: "/api/generate-flashcards",
    schema: questionsSchema,
    onError: (error) => {
      toast.error("Failed to generate flashcards. Please try again.");
      console.error(error);
      // setFiles([]);
    },
    onFinish: ({ object }) => {
      setQuestions((prev) => ({ ...prev, flash: object ?? [] }));
    },
  });

  const { submit: matchingSubmit } = experimental_useObject({
    api: "/api/generate-matching",
    schema: questionsSchema,
    onError: (error) => {
      toast.error("Failed to generate matching. Please try again.");
      console.error(error);
      // setFiles([]);
    },
    onFinish: ({ object }) => {
      setQuestions((prev) => ({ ...prev, matching: object ?? [] }));
    },
  });

  const { submit: yesOrNoSubmit } = experimental_useObject({
    api: "/api/generate-yes-no",
    schema: questionsSchema,
    onError: (error) => {
      toast.error("Failed to generate yes or no. Please try again.");
      console.error(error);
      // setFiles([]);
    },
    onFinish: ({ object }) => {
      setQuestions((prev) => ({ ...prev, yesNo: object ?? [] }));
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024);
    console.log(validFiles);

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
    }

    setFiles(validFiles);
  };

  const encodeFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await encodeFileAsBase64(file),
      }))
    );

    submit({ files: encodedFiles });
    flashSubmit({ files: encodedFiles });
    yesOrNoSubmit({ files: encodedFiles });
    matchingSubmit({ files: encodedFiles });

    const generatedQuizTitle = await generateQuizTitle(encodedFiles[0].name);
    const generatedMatchingTitle = await generateMatchingTitle(encodedFiles[0].name);
    const generatedFlashcardTitle = await generateFlashcardsTitle(encodedFiles[0].name);

    setQuestions((prev) => ({
      ...prev,
      choice_title: generatedQuizTitle,
      matching_title: generatedMatchingTitle,
      flash_title: generatedFlashcardTitle,
    }));
  };

  return { handleFileChange, handleSubmitWithFiles, files, isLoading, questions };
}
