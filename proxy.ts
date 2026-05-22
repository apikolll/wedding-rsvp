import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Skip API routes entirely — let them pass through as-is
  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // admin.yourdomain.com → /admin/...
  if (host.startsWith("admin.")) {
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
