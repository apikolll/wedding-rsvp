// Admin session: a signed, expiring cookie. Uses Web Crypto so it works in
// both proxy.ts and server actions.

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "shafini";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "shahril";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

// Set ADMIN_SECRET in production; changing it (or the password) logs everyone out
const SECRET =
  process.env.ADMIN_SECRET ?? `${ADMIN_USERNAME}:${ADMIN_PASSWORD}:wedding`;

const encoder = new TextEncoder();

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(sig), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

export async function createSessionToken() {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  return `${expires}.${await sign(String(expires))}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;

  const expected = await sign(expires);
  // Constant-time compare
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}
