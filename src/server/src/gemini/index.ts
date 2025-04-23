import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({ apiKey: Bun.env.GEMINI_API_KEY });
export const geminiConfig = {
  model: "gemini-2.5-flash-preview-04-17",
  fallback: "gemini-2.0-flash", // also used for development
  prompt:
    "Analyze the provided content (which could be text or an image) and explain its main subject, meaning, or purpose" +
    " in a clear and concise way.",
  systemPrompt:
    "You are a helpful AI assistant. Your purpose is to clearly and concisely explain text or images " +
    "provided by the user. Do not speculate or give " +
    "opinions. When providing examples, keep them short and on relative.",
};
export async function generateContent(content: string) {
  return await gemini.models.generateContentStream({
    model:
      Bun.env.NODE_ENV === "development"
        ? geminiConfig.model
        : geminiConfig.fallback,
    contents: `${geminiConfig.prompt}\n${content}`,
    config: {
      systemInstruction: geminiConfig.systemPrompt,
    },
  });
}
