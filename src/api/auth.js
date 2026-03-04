import axios from "axios";

export const register = async () => {
  const response = await apiClient.post("/register");
  return response.data; 
};

export const login = async () => {
  const response = await apiClient.post("/token");
  return response.data; 
};

export const postBook = async (newBook) => {
  // Axios sends the object as JSON automatically
  const response = await apiClient.post("/new_book", newBook);
  return response.data;
};