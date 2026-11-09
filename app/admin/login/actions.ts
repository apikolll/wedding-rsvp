"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
} from "@/lib/admin-auth";

export type LoginState = { error?: string; username?: string };

// On admin.<domain> the proxy maps "/" to /admin, so links drop the prefix
async function adminPath(path: string) {
  const host = (await headers()).get("host") ?? "";
  return host.startsWith("admin.") ? path || "/" : `/admin${path}`;
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { error: "Wrong username or password.", username };
  }

  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(await adminPath(""));
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect(await adminPath("/login"));
}
