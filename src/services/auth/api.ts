import { getRequest, postRequest } from "../api-client";
import type { AuthSession, CurrentUserResponse, SignInInput, SignUpInput } from "./type";

/**
 * Get current authenticated user details and role
 */
export async function getCurrentUserApi(): Promise<CurrentUserResponse> {
  return getRequest<CurrentUserResponse>("/api/me");
}

/**
 * Get current Better Auth active session
 */
export async function getSessionApi(): Promise<AuthSession | null> {
  return getRequest<AuthSession | null>("/api/auth/get-session");
}

/**
 * Sign in with email and password
 */
export async function signInApi(data: SignInInput): Promise<{ success: boolean; user?: unknown }> {
  return postRequest<{ success: boolean; user?: unknown }>("/api/auth/sign-in/email", data);
}

/**
 * Sign up a new user with email and password
 */
export async function signUpApi(data: SignUpInput): Promise<{ success: boolean; user?: unknown }> {
  return postRequest<{ success: boolean; user?: unknown }>("/api/auth/sign-up/email", data);
}

/**
 * Sign out current session
 */
export async function signOutApi(): Promise<{ success: boolean }> {
  return postRequest<{ success: boolean }>("/api/auth/sign-out", {});
}
