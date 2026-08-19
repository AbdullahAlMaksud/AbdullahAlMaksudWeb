import { getRequest } from "../api-client";
import type { HealthResponse, RootStatusResponse } from "./type";

/**
 * Check backend database and server uptime health status
 */
export async function getHealthApi(): Promise<HealthResponse> {
  return getRequest<HealthResponse>("/health");
}

/**
 * Check root status of the backend API
 */
export async function getRootStatusApi(): Promise<RootStatusResponse> {
  return getRequest<RootStatusResponse>("/");
}
