import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authUser = request.cookies.get("auth_user")?.value;
  const tokens = request.cookies.get("tokens")?.value;

  // Se estiver na página de auth e já tem tokens válidos, redireciona para dashboard
  if (pathname.startsWith("/auth")) {
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
    return NextResponse.next();
  }

  // Se não tem tokens e não está na página de auth, redireciona para auth
  if (!tokens) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Verifica se o token é válido
  try {
    const tokensData = JSON.parse(tokens);
    if (!tokensData.access) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Lógica de autorização por roles
  const user = JSON.parse(authUser || "{}");

  const pageStaff = [
    "/dashboard",
    "/profile",
    "/coupons",
    "/my-coupons",
    "/users",
  ];

  const pageNonStaff = ["/my-coupons", "/coupons", "/dashboard"];

  if (user.is_staff && tokens) {
    if (!pageStaff.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!user.is_staff && tokens) {
    if (!pageNonStaff.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp)).*)",
  ],
};
