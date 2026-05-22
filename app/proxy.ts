import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const url = req.nextUrl.clone();

  //   if (hostname.startsWith("app.")) {
  //     url.pathname = `/app${url.pathname}`;
  //     return NextResponse.rewrite(url);
  //   }

  if (hostname.startsWith("admin.")) {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
