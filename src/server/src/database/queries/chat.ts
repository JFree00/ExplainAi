import { sql } from "bun";
import { type DatabaseChat, Sender } from "../../types/database-types.ts";

export const createChat = async (title: string, userUUID: string) => {
  await sql`INSERT INTO chats (title, "user") VALUES (${title}, ${userUUID})`;
};
export const createChatWithMessage = async (
  title: string,
  userUUID: string,
  content: string,
): Promise<number> => {
  const result = await sql.begin(async (tx) => {
    const chatRows = await tx`INSERT INTO chats (title, "user")
                             VALUES (${title}, ${userUUID})
                             RETURNING id`;
    if (!chatRows || chatRows.length === 0 || !chatRows[0]?.id) {
      console.error("Failed to insert chat or retrieve ID:", chatRows);
      throw new Error("Failed to create chat entry.");
    }
    const chatId: number = chatRows[0].id;
    await tx`INSERT INTO messages (content, sender, chat_id)
             VALUES (${content}, ${Sender.User}, ${chatId})`;
    return chatId;
  });

  if (typeof result !== "number") {
    console.error("Transaction result is not a number:", result);
    throw new Error("Failed to obtain valid chat ID from transaction.");
  }

  return result;
};

export const selectChatById = async (chatId: number) => {
  return sql`SELECT *
             FROM chats
             WHERE id = ${chatId}`;
};
export const selectChatsByUser = async (userUUID: string) => {
  return sql`SELECT * FROM chats WHERE "user" = ${userUUID}` as Promise<
    DatabaseChat[] | []
  >;
};
export const selectMessagesFromChat = async (chatId: number) => {
  return sql`SELECT * FROM messages WHERE chat_id = ${chatId} ORDER BY created_at`;
};
