"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const generateQuizTitle = async (file: string) => {
  const result = await generateObject({
    model: google("gemini-1.5-flash"),
    schema: z.object({
      title: z
        .string()
        .describe("A max three word title for quiz learning mode based on the content of the file provided"),
    }),
    prompt:
      "Generate a title for a quiz based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return quiz.\n\n " +
      file,
  });
  return result.object.title;
};

export const generateFlashcardsTitle = async (file: string) => {
  const result = await generateObject({
    model: google("gemini-1.5-flash"),
    schema: z.object({
      title: z
        .string()
        .describe("A max three word title for flashcards learning mode based on the content of the file provided"),
    }),
    prompt:
      "Generate a title for a flashcards based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return quiz.\n\n " +
      file,
  });
  return result.object.title;
};

export const generateMatchingTitle = async (file: string) => {
  const result = await generateObject({
    model: google("gemini-1.5-flash"),
    schema: z.object({
      title: z
        .string()
        .describe("A max three word title for matching quiz learning mode based on the content of the file provided"),
    }),
    prompt:
      "Generate a title for a matching quiz based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return quiz.\n\n " +
      file,
  });
  return result.object.title;
};
