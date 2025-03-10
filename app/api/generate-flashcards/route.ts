import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

import { flashSchema } from "@/lib/schemas";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { files } = await req.json();
  const firstFile = files[0].data;

  const result = streamObject({
    model: google("gemini-1.5-flash"),
    messages: [
      {
        role: "system",
        content:
          "You are a teacher. Your job is to take a document and create 4 flashcard-style quiz questions based on its content. Each question should be a sentence with two long dashes '— —' representing a missing word or concept. Provide exactly 4 answer options for each question, and specify the correct one by its letter (A, B, C, or D). Each option should be roughly equal in length.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create 4 flashcard questions based on this document. Each should have a blank represented by two long dashes '— —', four answer options, and indicate which option is correct by letter (A, B, C, or D).",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: flashSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = flashSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}
