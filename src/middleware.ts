import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { localeOfPath, neutralPath } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = localeOfPath(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  if (locale === "th" && pathname !== "/th") {
    const url = request.nextUrl.clone();
    url.pathname = neutralPath(pathname);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.svg|robots.txt|sitemap.xml).*)",
  ],
};
