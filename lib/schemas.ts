import { z } from "zod";

export const questionSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths."
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe("The correct answer, where A is the first option, B is the second, and so on."),
});

export const flashSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe("A sentence with two long dashes to represent to missing central text."),
  answer: z.enum(["A"]).describe("The correct answer, which is A."),
});

export const matchingSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths."
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe("The correct answer, where A is the first option, B is the second, and so on."),
});

export const yesOrNoSchema = z.object({
  question: z.string().describe("A yes or no question derived from the document."),
  options: z
    .array(z.enum(["Yes", "No"]))
    .length(2)
    .describe("Two possible answers to the question: Yes and No."),
  answer: z.enum(["Yes", "No"]).describe("The correct answer to the question."),
});

export type Question = z.infer<typeof questionSchema>;

export const questionsSchema = z.array(questionSchema).length(4);
