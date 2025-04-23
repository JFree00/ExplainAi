import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({ apiKey: Bun.env.GEMINI_API_KEY });
export const geminiConfig = {
  model: "gemini-2.5-flash-preview-04-17",
  prompt:
    "Analyze the provided content (which could be text or an image) and explain its main subject, meaning, or purpose" +
    " in a clear and concise way.",
  systemPrompt:
    "You are a helpful AI assistant. Your purpose is to clearly and concisely explain text or images " +
    "provided by the user. Explain only the provided content. Do not speculate, add external information, or give " +
    "opinions. Stick strictly to describing or explaining what is present in the text or image. Do not offer any other" +
    " assistance",
};
export async function generateContent(content: string) {
  return await gemini.models.generateContentStream({
    model: geminiConfig.model,
    contents: content,
  });
}
