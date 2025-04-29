import type { Sender } from "../../types/database-types.ts";
import { sql } from "bun";

export const sendMessage = async (
  sender: Sender,
  chat_Id: number,
  content: string,
) => {
  await sql`INSERT INTO messages (content, sender, chat_id) VALUES (${content}, ${sender}, ${chat_Id})`;
};
