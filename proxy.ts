import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";

// Admin pages plus the APIs only the admin uses. Guests still submit RSVPs
// via POST /api/rsvp without logging in.
function needsAuth(request: NextRequest, isAdminHost: boolean) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/link")) return true;
  if (pathname.startsWith("/api/rsvp")) {
    return !(pathname === "/api/rsvp" && request.method === "POST");
  }

  // The login page itself stays public
  const adminPath = isAdminHost ? `/admin${pathname}` : pathname;
  if (adminPath === "/admin/login") return false;
  return adminPath === "/admin" || adminPath.startsWith("/admin/");
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isAdminHost = host.startsWith("admin.");
  const url = request.nextUrl.clone();

  if (
    needsAuth(request, isAdminHost) &&
    !(await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value))
  ) {
    if (url.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    url.pathname = isAdminHost ? "/login" : "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Skip API routes entirely — let them pass through as-is
  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // admin.yourdomain.com → /admin/...
  if (isAdminHost) {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static files, images, and favicon — only run on real pages
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
