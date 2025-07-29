export type CookieOptions = {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  expiresInMinutes?: number;
};

const isBrowser = typeof window !== "undefined";

// Funções utilitárias para cookies

export const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};

export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
};

export const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const getCookiesByPrefix = (prefix: string): Record<string, string> => {
  if (!isBrowser) return {};

  const cookies = document.cookie.split("; ");
  const result: Record<string, string> = {};
  cookies.forEach((row) => {
    if (row.startsWith(prefix)) {
      const [name, value] = row.split("=");
      result[name] = decodeURIComponent(value || "");
    }
  });
  return result;
};
