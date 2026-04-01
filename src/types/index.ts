/**
 * Type definitions for the application
 */

export interface UserInfo {
  employee_id: string;
  contact_info: string;
  avatar: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'staff' | 'admin';
  is_staff_verified: boolean;
  user_info: UserInfo;
}

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  category: string;
  count: number;
  price: string;
  image?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  employee_id: string;
  contact_info?: string;
  avatar?: string;
}

export interface UserProfileUpdate {
  avatar?: string;
  contact_info?: string;
}

export interface ItemUpdate {
  name?: string;
  description?: string;
  category?: string;
  count?: number;
  price?: string;
  image?: string;
}
