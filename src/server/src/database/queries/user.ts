import { sql } from "bun";

export const createUser = async (userUUID: string) =>
  await sql`INSERT INTO users (id) VALUES (${userUUID})`;
export const selectUser = async (userUUID: string) =>
  await sql`SELECT * FROM users WHERE id = ${userUUID}`;
