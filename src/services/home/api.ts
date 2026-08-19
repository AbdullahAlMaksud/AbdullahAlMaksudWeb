import { getRequest, putRequest } from "../api-client";
import type { HomeData } from "./type";

export const getHomeApi = async (): Promise<HomeData> => {
  return getRequest<HomeData>("/api/v1/home");
};

export const updateHomeApi = async (data: Partial<HomeData>): Promise<HomeData> => {
  return putRequest<HomeData>("/api/v1/home", data);
};
