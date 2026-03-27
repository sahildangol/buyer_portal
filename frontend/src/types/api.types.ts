export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    stack?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ToggleFavouriteResponse {
  action: "added" | "removed";
  propertyId: string;
}
