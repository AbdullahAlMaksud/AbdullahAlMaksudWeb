import { deleteRequest, getRequest, postRequest, putRequest } from "../api-client";
import type { DesignMutationInput, DesignQueryParams, GraphicDesign } from "./type";

export const getDesignsApi = async (params?: DesignQueryParams): Promise<GraphicDesign[]> => {
  return getRequest<GraphicDesign[]>("/api/v1/designs", { params });
};

export const getDesignByIdApi = async (id: string): Promise<GraphicDesign> => {
  return getRequest<GraphicDesign>(`/api/v1/designs/${id}`);
};

export const createDesignApi = async (
  data: DesignMutationInput
): Promise<{ success: boolean; data: GraphicDesign }> => {
  return postRequest<{ success: boolean; data: GraphicDesign }>("/api/v1/designs", data);
};

export const updateDesignApi = async (
  id: string,
  data: Partial<DesignMutationInput>
): Promise<{ success: boolean; data: GraphicDesign }> => {
  return putRequest<{ success: boolean; data: GraphicDesign }>(`/api/v1/designs/${id}`, data);
};

export const deleteDesignApi = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return deleteRequest<{ success: boolean; message: string }>(`/api/v1/designs/${id}`);
};
