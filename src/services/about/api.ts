import { getRequest, putRequest } from "../api-client";
import type { AboutData } from "./type";

export const getAboutApi = async (): Promise<AboutData> => {
  return getRequest<AboutData>("/api/v1/about");
};

export const updateAboutApi = async (data: Partial<AboutData>): Promise<AboutData> => {
  return putRequest<AboutData>("/api/v1/about", data);
};
