import { apiClient } from "./client";
import { User, UserProfileUpdate } from "../types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get("/auth/me/");
  return response.data;
};

export const updateUserProfile = async (data: UserProfileUpdate): Promise<User> => {
  const response = await apiClient.patch("/auth/me/", data);
  return response.data;
};
