import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/auth")) {
    const tokens = request.cookies.get("tokens")?.value;

    if (tokens) {
      try {
        const tokensData = JSON.parse(tokens);
        if (tokensData.access) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch {}
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
