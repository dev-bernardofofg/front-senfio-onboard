import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface Session {
  user: {
    id: number;
    email: string;
    team: string;
    works_since: string;
    is_active: boolean;
    is_staff: boolean;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

/**
 * Obtém a sessão do usuário a partir dos cookies
 * Se não houver sessão válida, retorna null
 */
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();

    const authUser = cookieStore.get("auth_user")?.value;
    const tokens = cookieStore.get("tokens")?.value;

    if (!authUser || !tokens) {
      return null;
    }

    const user = JSON.parse(authUser);
    const tokensData = JSON.parse(tokens);

    // Verifica se os dados são válidos
    if (!user || !tokensData.access) {
      return null;
    }

    return {
      user,
      tokens: tokensData,
    };
  } catch (error) {
    console.error("Erro ao obter sessão:", error);
    return null;
  }
}

/**
 * Verifica se o usuário está autenticado
 * Se não estiver, redireciona para /auth
 */
export async function requireAuth(): Promise<Session> {
  const session = await getSession();

  if (!session) {
    redirect("/auth");
  }

  return session;
}

/**
 * Verifica se o usuário é staff
 * Se não for, redireciona para /dashboard
 */
export async function requireStaff(): Promise<Session> {
  const session = await requireAuth();

  if (!session.user.is_staff) {
    redirect("/dashboard");
  }

  return session;
}

/**
 * Verifica se o usuário NÃO é staff
 * Se for staff, redireciona para /dashboard
 */
export async function requireNonStaff(): Promise<Session> {
  const session = await requireAuth();

  if (session.user.is_staff) {
    redirect("/dashboard");
  }

  return session;
}
