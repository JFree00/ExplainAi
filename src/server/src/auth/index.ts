import { getCookie, setCookie } from "hono/cookie";
import type { Context, Next } from "hono";
import { createUser, selectUser } from "../database/queries/user.ts";
import { HTTPException } from "hono/http-exception";

async function createAndSetUserCookie(context: Context): Promise<string> {
  const uuid = Bun.randomUUIDv7();
  try {
    await createUser(uuid);

    setCookie(context, "user_Id", uuid, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    return uuid;
  } catch (dbError) {
    console.error("Failed to create user in database:", dbError);
    throw new HTTPException(500, {
      message: "Failed to initialize user session.",
    });
  }
}

export async function auth(context: Context, next: Next) {
  let userId = getCookie(context, "user_Id");

  if (!userId) {
    userId = await createAndSetUserCookie(context);
  } else {
    const userExists = await selectUser(userId);
    if (!userExists) throw new HTTPException(401, { message: "Unauthorized" });
  }

  context.set("user_Id", userId);

  await next();
}
