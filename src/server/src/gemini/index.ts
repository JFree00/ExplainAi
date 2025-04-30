import { GoogleGenAI } from "@google/genai";

export function createGeminiClient(apiKey = Bun.env.GEMINI_API_KEY) {
  return new GoogleGenAI({ apiKey });
}

const gemini = createGeminiClient();
export const geminiConfig = {
  model: "gemini-2.5-flash-preview-04-17",
  fallback: "gemini-2.0-flash", // also used for development
  prompt:
    "Analyze the provided content (which could be text or an image). First explain what the content could mean, refer to, or be referencing. After that," +
    "depending on the content, offer a summary, an answer, examples, or anything else applicable",
  systemPrompt:
    "You are a helpful AI assistant. Your purpose is to clearly and concisely explain text or images " +
    "provided by the user. Do not give " +
    "opinions.",
};
export async function generateContent(content: string) {
  return await gemini.models.generateContentStream({
    model:
      Bun.env.env === "development"
        ? geminiConfig.model
        : geminiConfig.fallback,
    contents: `${geminiConfig.prompt}:\n${content}`,
    config: {
      systemInstruction: geminiConfig.systemPrompt,
    },
  });
}
