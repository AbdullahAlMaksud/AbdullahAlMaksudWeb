import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Standard API Base URL configuration.
 * - In the browser: defaults to same-origin relative path ("") so requests pass through
 *   Next.js rewrites proxy (completely bypassing CORS and cookie domain restrictions).
 * - On the server: resolves to the actual backend API URL.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL !== undefined && process.env.NEXT_PUBLIC_API_URL !== ""
    ? process.env.NEXT_PUBLIC_API_URL
    : typeof window === "undefined"
      ? process.env.BACKEND_API_URL || "https://api-abdullahalmaksud.vercel.app"
      : "";

/**
 * Standardized API Error structure for the frontend
 */
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Custom application API Error class
 */
export class AppApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(message: string, statusCode = 500, errors?: Record<string, string[]>) {
    super(message);
    this.name = "AppApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Central Axios Instance configured with secure credentials and headers
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for Better Auth HTTP-only cookies
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response Interceptor: Format and standardize error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const data = error.response.data;
      const message =
        data?.message ||
        `Request failed with status ${error.response.status}: ${error.response.statusText}`;
      const statusCode = error.response.status;
      return Promise.reject(new AppApiError(message, statusCode, data?.errors));
    }

    if (error.request) {
      return Promise.reject(
        new AppApiError(
          "Network error: Unable to connect to the backend server. Please check your internet or try again later.",
          0
        )
      );
    }

    return Promise.reject(new AppApiError(error.message || "An unexpected error occurred", 500));
  }
);

/**
 * Generic HTTP helper functions
 */
export async function getRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

export async function postRequest<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function putRequest<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function deleteRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}
