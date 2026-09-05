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
 * Standard Axios instance configured for API services
 */
export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.warn(
        `[Services API] Request failed with status ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      console.warn("[Services API] Server unreachable:", error.message);
    } else {
      console.warn("[Services API] Request error:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Safe GET wrapper with error fallback
 */
export async function safeGet<T>(url: string, config?: AxiosRequestConfig): Promise<T | null> {
  try {
    const res = await axiosClient.get<T>(url, config);
    return res.data;
  } catch {
    return null;
  }
}
