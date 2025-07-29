// import type { paths } from "./generated/models";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export interface ResponseConfig<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ResponseErrorConfig<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
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

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  ) {
    this.baseURL = baseURL;
  }

  private async request<T>(config: RequestConfig): Promise<T> {
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
    const response = await fetch(urlObj.toString(), {
      method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

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
    return localStorage.getItem("access_token");
  }

  // Generic methods for each HTTP verb
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>({ method: "GET", url, params });
  }

  async post<T>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<T> {
    return this.request<T>({ method: "POST", url, data, params });
  }

  async put<T>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<T> {
    return this.request<T>({ method: "PUT", url, data, params });
  }

  async patch<T>(
    url: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<T> {
    return this.request<T>({ method: "PATCH", url, data, params });
  }

  async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>({ method: "DELETE", url, params });
  }
}

// Create and export the client instance
export const client = new ApiClient();

// Export default for generated code
export default client;
