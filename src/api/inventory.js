import { apiClient } from "./client";

export const inventory = {
  getItems: async () => {
    const response = await apiClient.get("/inventory");
    return response.data;
  },
  updateStock: async () => {
    const response = await apiClient.patch("/inventory/${id}/", {
      stock: newStock,
    });
    return response.data;
  },
};
