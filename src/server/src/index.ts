import { Hono } from "hono";
import { generateContent } from "./gemini";
import { streamText } from "hono/streaming";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { auth } from "./auth";
import { getCookie } from "hono/cookie";
import {
  createChatWithMessage,
  selectChatById,
} from "./database/queries/chat.ts";
import { sendMessage } from "./database/queries/message.ts";
import { Sender } from "./types/database-types.ts";

const app = new Hono();
app.use(cors());
app.use(async (c, next) => {
  await auth(c);
  await next();
});

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
app.get("chat/:id", async (c) => {
  const id = c.req.param("id");
  const userId = getCookie(c, "user_Id")!;
  const chat = await selectChatById(Number(id));
  console.log(chat);
});
app.post("/message", async (c) => {
  const input = await c.req.text();
  const userId = getCookie(c, "user_Id")!;
  const chat = await createChatWithMessage("new chat", userId, input);
  const response = await generateContent(input);
  let text: string;
  return streamText(
    c,
    async (stream) => {
      for await (const chunk of response) {
        await stream.write(chunk.text!);
        text = text ? text + chunk.text! : chunk.text!;
      }
      await sendMessage(Sender.System, chat, text);
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
