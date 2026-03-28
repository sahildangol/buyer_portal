import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { config } from "../config/env.config";
import { forceLogout, getAuthToken } from "@/store/auth.store";
import type { ApiErrorResponse } from "../types/api.types";

type LegacyErrorResponse = {
  message?: string;
};

type ApiErrorPayload = ApiErrorResponse | LegacyErrorResponse;
const PUBLIC_AUTH_PATHS = ["/auth/login", "/auth/register"];

const api = axios.create({
  baseURL: config.VITE_API_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const token = getAuthToken();

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

const getErrorMessage = (error: AxiosError<ApiErrorPayload>) => {
  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (!error.response) {
    return "Unable to reach the server. Please check your connection.";
  }

  const payload = error.response?.data;

  if (payload && "error" in payload && payload.error?.message) {
    return payload.error.message;
  }

  if (payload && "message" in payload && payload.message) {
    return payload.message;
  }

  return "An unexpected error occurred";
};

const shouldForceLogout = (error: AxiosError<ApiErrorPayload>) => {
  if (error.response?.status !== 401) {
    return false;
  }

  if (!getAuthToken()) {
    return false;
  }

  const requestPath = (() => {
    if (!error.config?.url) {
      return "";
    }

    try {
      return new URL(error.config.url, config.VITE_API_URL).pathname.toLowerCase();
    } catch {
      return error.config.url.toLowerCase();
    }
  })();

  const isPublicAuthRequest = PUBLIC_AUTH_PATHS.some((path) =>
    requestPath.includes(path),
  );

  return !isPublicAuthRequest;
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    if (shouldForceLogout(error)) {
      forceLogout();
    }

    return Promise.reject(new Error(getErrorMessage(error)));
  },
);

export default api;
