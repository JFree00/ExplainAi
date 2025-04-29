import { sql } from "bun";

export const createUser = async (userUUID: number) =>
  await sql`INSERT INTO users (id) VALUES (${userUUID})`;
export const selectUser = async (userUUID: number) =>
  await sql`SELECT * FROM users WHERE id = ${userUUID}`;
