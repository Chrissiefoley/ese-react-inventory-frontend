import { apiClient } from "./client";

export const inventory = {
  getItems: async () => {
    const response = await apiClient.get("/inventory");
    return response.data;
  },
  updateItem: async (id, newStock) => {
    const response = await apiClient.patch(`/inventory/${id}/`, {
      count: newStock,
    });
    return response.data;
  },
  deleteItem: async (id) => {
    const response = await apiClient.delete(`/inventory/${id}/`);
    return response.data;
  },
};
