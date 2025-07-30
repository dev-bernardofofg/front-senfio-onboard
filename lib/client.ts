import { deleteCookie, getCookie, setCookie } from "./cookies";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig<T = any> {
  method: HttpMethod;
  url: string;
  params?: Record<string, any>;
  data?: T;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface ResponseConfig<T> {
  data: T;
}

export interface ResponseErrorConfig<T> {
  data: T;
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data: any
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

class ApiClient {
  private baseURL: string;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  ) {
    this.baseURL = baseURL;
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    this.failedQueue = [];
  }

  private async refreshToken(): Promise<string | null> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;

    try {
      const tokensStr = getCookie("tokens");
      if (!tokensStr) {
        throw new Error("No refresh token available");
      }

      const tokens = JSON.parse(tokensStr);
      if (!tokens.refresh) {
        throw new Error("No refresh token available");
      }
      const response = await fetch(
        `${this.baseURL}/api/v1/authentication/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: tokens.refresh }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const newTokens = await response.json();

      setCookie("tokens", JSON.stringify(newTokens));

      this.processQueue(null, newTokens.access);
      this.isRefreshing = false;

      return newTokens.access;
    } catch (error) {
      this.processQueue(error, null);
      this.isRefreshing = false;

      // Se refresh falhar, limpa tokens e redireciona para login
      if (typeof window !== "undefined") {
        deleteCookie("tokens");
        deleteCookie("auth_user");
        window.location.href = "/auth";
      }

      throw error;
    }
  }

  private async makeRequest<T>(config: RequestConfig): Promise<T> {
    const { method, url, params, data, headers = {} } = config;

    // Build URL with query parameters
    const urlObj = new URL(url, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Add authorization header if token exists
    const token = this.getToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    // Make request
    const response = await globalThis.fetch(urlObj.toString(), {
      method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

    // Handle 401 errors and try to refresh token
    if (response.status === 401 && token) {
      try {
        const newToken = await this.refreshToken();
        if (newToken) {
          // Retry the original request with new token
          requestHeaders.Authorization = `Bearer ${newToken}`;
          const retryResponse = await globalThis.fetch(urlObj.toString(), {
            method,
            headers: requestHeaders,
            body: data ? JSON.stringify(data) : undefined,
          });

          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => ({}));
            throw new ApiError(
              retryResponse.status,
              retryResponse.statusText,
              errorData
            );
          }

          if (retryResponse.status === 204) {
            return {} as T;
          }

          return retryResponse.json();
        }
      } catch (refreshError) {
        // If refresh fails, throw the original 401 error
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, response.statusText, errorData);
      }
    }

    // Handle response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }

    // Handle empty responses
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;

    const tokensStr = getCookie("tokens");
    if (tokensStr) {
      try {
        const tokens = JSON.parse(tokensStr);
        return tokens.access || null;
      } catch {
        return getCookie("access_token");
      }
    }

    return getCookie("access_token");
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>({ method: "GET", url, params });
  }

  async post<T>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<T> {
    return this.makeRequest<T>({ method: "POST", url, data, params });
  }

  async put<T>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<T> {
    return this.makeRequest<T>({ method: "PUT", url, data, params });
  }

  async patch<T>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<T> {
    return this.makeRequest<T>({ method: "PATCH", url, data, params });
  }

  async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.makeRequest<T>({ method: "DELETE", url, params });
  }

  async request<T, E = any, D = any>(
    config: RequestConfig<D>
  ): Promise<ResponseConfig<T>> {
    const { method, url, params, data, headers = {} } = config;

    const urlObj = new URL(url, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    const token = this.getToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await globalThis.fetch(urlObj.toString(), {
      method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

    // Handle 401 errors and try to refresh token
    if (response.status === 401 && token) {
      try {
        const newToken = await this.refreshToken();
        if (newToken) {
          // Retry the original request with new token
          requestHeaders.Authorization = `Bearer ${newToken}`;
          const retryResponse = await globalThis.fetch(urlObj.toString(), {
            method,
            headers: requestHeaders,
            body: data ? JSON.stringify(data) : undefined,
          });

          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => ({}));
            throw new ApiError(
              retryResponse.status,
              retryResponse.statusText,
              errorData
            );
          }

          if (retryResponse.status === 204) {
            return {
              data: {} as T,
            };
          }

          const result = await retryResponse.json();
          return {
            data: result,
          };
        }
      } catch (refreshError) {
        // If refresh fails, throw the original 401 error
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, response.statusText, errorData);
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorData);
    }

    if (response.status === 204) {
      return {
        data: {} as T,
      };
    }

    const result = await response.json();
    return {
      data: result,
    };
  }
}

// Create and export the client instance
export const client = new ApiClient();

// Create a function-based client for generated code
async function apiFetch<T, E = any, D = any>(
  config: RequestConfig<D>
): Promise<ResponseConfig<T>> {
  return client.request<T, E, D>(config);
}

// Export default for generated code
export default apiFetch;
