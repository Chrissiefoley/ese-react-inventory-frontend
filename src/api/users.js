import { apiClient } from "./client";

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me/");
  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await apiClient.patch("/auth/me/", data);
  return response.data;
};
