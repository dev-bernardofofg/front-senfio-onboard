import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🚀 Middleware executando para:", pathname);

  // Lista de rotas que precisam de autenticação
  const protectedRoutes = ["/dashboard", "/cupons"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    console.log("🔒 Rota protegida detectada:", pathname);

    // Verifica se existe token nos cookies
    const tokens = request.cookies.get("tokens")?.value;

    console.log("🍪 Cookies encontrados:", {
      hasTokens: !!tokens,
    });

    // Se não tem tokens, redireciona para auth
    if (!tokens) {
      console.log("❌ Sem tokens, redirecionando para /auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    try {
      // Valida se os tokens são válidos
      const tokensData = JSON.parse(tokens);
      if (!tokensData.access) {
        console.log("❌ Token inválido, redirecionando para /auth");
        return NextResponse.redirect(new URL("/auth", request.url));
      }
      console.log("✅ Token válido, permitindo acesso");
    } catch {
      // Se não consegue parsear os tokens, redireciona
      console.log("❌ Erro ao parsear tokens, redirecionando para /auth");
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  // Rotas públicas que não devem ser acessadas se já autenticado
  if (pathname.startsWith("/auth")) {
    const tokens = request.cookies.get("tokens")?.value;

    // Se já tem tokens válidos, redireciona para dashboard
    if (tokens) {
      try {
        const tokensData = JSON.parse(tokens);
        if (tokensData.access) {
          console.log(
            "🔄 Usuário já autenticado, redirecionando para /dashboard"
          );
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      } catch {
        // Se tokens inválidos, deixa acessar auth
      }
    }
  }

  console.log("✅ Permitindo acesso para:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
