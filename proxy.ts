import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

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
