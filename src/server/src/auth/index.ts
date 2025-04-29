import { getCookie, setCookie } from "hono/cookie";
import type { Context } from "hono";
import { getConnInfo } from "hono/bun";
import { createUser } from "../database/queries/user.ts";

async function createCookie(context: Context) {
  const info = getConnInfo(context).remote.address;
  if (!info) return false;
  const uuid = Bun.randomUUIDv7();
  //TODO: associate ip with cookie in database
  await createUser(uuid);
  setCookie(context, "user_Id", uuid);
}

export async function auth(context: Context) {
  const cookie = getCookie(context, "user_Id");
  if (!cookie) {
    await createCookie(context);
  }
  return true;
}
