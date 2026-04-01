import { apiClient } from "./client";
import { InventoryItem, ItemUpdate } from "../types";

export const inventory = {
  getItems: async (): Promise<InventoryItem[]> => {
    const response = await apiClient.get("/items/");
    return response.data;
  },
  createItem: async (item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
    const response = await apiClient.post("/items/", item);
    return response.data;
  },
  updateItem: async (id: number, updates: ItemUpdate): Promise<InventoryItem> => {
    const response = await apiClient.patch(`/items/${id}/`, updates);
    return response.data;
  },
  deleteItem: async (id: number): Promise<void> => {
    const response = await apiClient.delete(`/items/${id}/`);
    return response.data;
  },
};
