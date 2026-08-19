export interface DatabaseHealth {
  name?: string;
  state?: string;
  connected?: boolean;
}

export interface HealthData {
  status: "ok" | "degraded" | "error" | string;
  uptime?: number;
  database?: DatabaseHealth;
  timestamp?: string;
}

export interface HealthResponse {
  success: boolean;
  data: HealthData;
}

export interface RootStatusResponse {
  success: boolean;
  message: string;
  authBasePath?: string;
  healthPath?: string;
  frontendOrigin?: string;
}
