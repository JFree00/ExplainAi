import { afterEach, beforeAll, describe, expect, it } from "bun:test";
import app from "../index";
import { createChat, selectChatsByUser } from "../database/queries/chat.ts";

describe("Server", () => {
  let userId: string;
  let reqCookie: string;
  let chatId: number;
  beforeAll(async () => {
    await app.request("http://localhost:3000/");
  });
  afterEach(async () => {
    //delete user
  });
  it('responds with "Hello Hono!" for the root route', async () => {
    const res = await app.request("http://localhost:3000/");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
    const cookie = new Bun.Cookie(res.headers.getSetCookie()[0]);
    userId = cookie.value;
    reqCookie = cookie.serialize();
  });

  it("processes input for /chats endpoint", async () => {
    const testInput = "How are ai models trained?";
    const res = await app.request("http://localhost:3000/chats", {
      method: "POST",
      body: testInput,
    });
    expect(res.status).toBe(200);

    const responseText = await res.text();
    expect(responseText).toBeTruthy();
  }, 30000);

  it("processes input for /chats/:id/messages endpoint", async () => {
    await createChat("test", userId);
    chatId = (await selectChatsByUser(userId))[0].id;
    const url = `http://localhost:3000/chats/${chatId}/messages`;
    const res = await app.request(url, {
      method: "POST",
      body: "How are ai models trained?",
      headers: {
        Cookie: `${reqCookie}`,
      },
    });

    expect(res.status).toBe(200);
  });

  it("processes input for /chats/:id endpoint", async () => {
    await createChat("test", userId);
    chatId = (await selectChatsByUser(userId))[0].id;
    const url = `http://localhost:3000/chats/${chatId}`;
    const res = await app.request(url, {
      body: "How are ai models trained?",
      headers: {
        Cookie: `${reqCookie}`,
      },
    });

    expect(res.status).toBe(200);
  });
});
