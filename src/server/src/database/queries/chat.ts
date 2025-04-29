import { sql } from "bun";
import { Sender } from "../../types/database-types.ts";

export const createChat = async (title: string, userUUID: number) => {
  await sql`INSERT INTO chats (title, "user") VALUES (${title}, ${userUUID})`;
};
export const createChatWithMessage = async (
  title: string,
  userUUID: number,
  content: string,
) => {
  await sql.begin(async (tx) => {
    await tx`INSERT INTO chats (title, "user") VALUES (${title}, ${userUUID}) RETURNING id as chat_id`;
    await tx`INSERT INTO messages (content, sender, chat_id) VALUES (${content}, ${Sender.User})`;
  });
};
export const selectChat = async (chatId: number) => {
  await sql`SELECT * FROM chats WHERE id = ${chatId}`;
};
export const selectMessagesFromChat = async (chatId: number) => {
  await sql`SELECT * FROM messages WHERE chat_id = ${chatId} ORDER BY created_at`;
};
