import { apiClient } from "./client";

export const inventory = {
  getItems: async () => {
    const response = await apiClient.get("/items/");
    return response.data;
  },
  createItem: async (item) => {
    const response = await apiClient.post("/items/", item);
    return response.data;
  },
  updateItem: async (id, updates) => {
    const response = await apiClient.patch(`/items/${id}/`, updates);
    return response.data;
  },
  deleteItem: async (id) => {
    const response = await apiClient.delete(`/items/${id}/`);
    return response.data;
  },
};
