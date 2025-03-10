import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

import { yesOrNoSchema } from "@/lib/schemas";

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
          "You are a teacher. Your job is to take a document, and create yes or no test (with 4 question) based on the content of the document. Each option should be roughly equal in length.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a yes or no choice test based on this document.",
          },
          {
            type: "file",
            data: firstFile,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
    schema: yesOrNoSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = yesOrNoSchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}
