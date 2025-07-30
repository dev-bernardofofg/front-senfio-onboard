import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Se estiver na página de auth e já tem tokens válidos, redireciona para dashboard
  if (pathname.startsWith("/auth")) {
    const tokens = request.cookies.get("tokens")?.value;

    if (tokens) {
      try {
        const tokensData = JSON.parse(tokens);
        if (tokensData.access) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch {
        // Se o token for inválido, remove o cookie
        const response = NextResponse.next();
        response.cookies.delete("tokens");
        response.cookies.delete("auth_user");
        return response;
      }
    }
  }

  // Se estiver em uma rota privada e não tem tokens, redireciona para auth
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/coupons") ||
    pathname.startsWith("/my-coupons")
  ) {
    const tokens = request.cookies.get("tokens")?.value;

    if (!tokens) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    try {
      const tokensData = JSON.parse(tokens);
      if (!tokensData.access) {
        return NextResponse.redirect(new URL("/auth", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
