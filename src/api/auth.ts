import { apiClient } from "./client";
import { LoginCredentials, RegisterData, User } from "../types";

export const register = async (userData: RegisterData): Promise<{ user: User }> => {
  const response = await apiClient.post("/auth/register/", userData);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<{ user: User }> => {
  const response = await apiClient.post("/auth/login/", credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await apiClient.post("/auth/logout/");
  return response.data;
};
