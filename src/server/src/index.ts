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
  selectMessagesFromChat,
} from "./database/queries/chat.ts";
import { sendMessage } from "./database/queries/message.ts";
import {
  type DatabaseChat,
  type DatabaseMessage,
  Sender,
} from "./types/database-types.ts";

const app = new Hono();
app.use(
  cors({
    origin: Bun.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(async (c, next) => {
  await auth(c, next);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("chat/:id", async (c) => {
  const id = c.req.param("id");
  const userId = getCookie(c, "user_Id");
  if (!userId) throw new HTTPException(401, { message: "Unauthorized" });
  const chat = (await selectChatById(Number(id)))[0] as DatabaseChat;
  if (chat.user !== userId)
    throw new HTTPException(403, {
      message: "You are not allowed to access this chat.",
    });
  const messages = (await selectMessagesFromChat(chat.id)) as DatabaseMessage[];
  return c.json({
    title: chat.title,
    messages,
  });
});
app.post("/message", async (c) => {
  const input = await c.req.text();
  const userId = getCookie(c, "user_Id");
  if (!userId) throw new HTTPException(401, { message: "Unauthorized" });
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
app.post("/message/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const input = await c.req.text();
  const userId = getCookie(c, "user_Id")!;
  const chat = (await selectChatById(id))[0] as DatabaseChat;
  console.log(chat);
  if (chat.user !== userId)
    throw new HTTPException(403, {
      message: "You are not allowed to access this chat.",
    });
  await sendMessage(Sender.User, id, input);
  const response = await generateContent(input);
  let text: string;
  return streamText(c, async (stream) => {
    for await (const chunk of response) {
      await stream.write(chunk.text!);
      text = text ? text + chunk.text! : chunk.text!;
    }
    await sendMessage(Sender.System, chat.id, text);
  });
});

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    // Get the custom response
    return error.getResponse();
  }
  return c.text(error.message);
});

export default app;
