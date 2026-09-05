import { apiClient } from "./client";
import axios from "axios";

export interface ContactInquiryPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInquiryResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: unknown;
  simulated?: boolean;
}

/**
 * Dispatches a consultation/contact inquiry directly to the backend API server (/api/v1/contact)
 */
export async function sendInquiry(payload: ContactInquiryPayload): Promise<ContactInquiryResponse> {
  try {
    const response = await apiClient.post<ContactInquiryResponse>("/api/v1/contact", payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const serverData = error.response.data as ContactInquiryResponse;
      throw new Error(
        serverData.error ||
          serverData.message ||
          `Server responded with error code ${error.response.status}`
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to dispatch email inquiry.");
  }
}
