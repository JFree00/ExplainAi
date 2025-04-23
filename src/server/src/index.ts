import { Hono } from "hono";
import { generateContent } from "./gemini";
import { streamText } from "hono/streaming";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.post("/chat", async (c) => {
  const input = await c.req.text();
  const response = await generateContent(input);
  return streamText(
    c,
    async (stream) => {
      for await (const chunk of response) {
        await stream.write(chunk.text!);
      }
    },
    async (error, stream) => {
      await stream.write(error.message);
    },
  );
});
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    // Get the custom response
    return error.getResponse();
  }
  return c.text(error.message);
});

export default app;
