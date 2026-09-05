import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedApiResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
  message?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Configured Axios instance for API communication
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can attach auth tokens or custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with an error status (4xx, 5xx)
      console.warn(
        `[API] Request failed with status ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      // Server did not respond (offline or network error)
      console.warn("[API] Server unreachable:", error.message);
    } else {
      console.warn("[API] Request configuration error:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Generic safe GET helper that catches errors gracefully
 */
export async function safeGet<T>(url: string, config?: AxiosRequestConfig): Promise<T | null> {
  try {
    const res = await apiClient.get<T>(url, config);
    return res.data;
  } catch {
    return null;
  }
}
