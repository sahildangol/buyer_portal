import api from "./axios";
import { validateResponse } from "../lib/validate-response";
import {
  apiSuccessSchema,
  favouritesResponseSchema,
  healthSchema,
  loginResponseSchema,
  propertiesResponseSchema,
  registerResponseSchema,
  toggleFavouriteResponseSchema,
} from "../schemas/api.schema";
import type { LoginInput, RegisterInput } from "../types/api.types";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const apiClient = {
  healthCheck: async () => {
    const response = await api.get("/health");
    return validateResponse(healthSchema, response.data, "health");
  },
  register: async (payload: RegisterInput) => {
    const response = await api.post("/api/auth/register", {
      ...payload,
      email: normalizeEmail(payload.email),
    });
    const validated = validateResponse(
      apiSuccessSchema(registerResponseSchema),
      response.data,
      "register",
    );

    return validated.data.user;
  },
  login: async (payload: LoginInput) => {
    const response = await api.post("/api/auth/login", {
      ...payload,
      email: normalizeEmail(payload.email),
    });
    const validated = validateResponse(
      apiSuccessSchema(loginResponseSchema),
      response.data,
      "login",
    );

    return validated.data;
  },
  getProperties: async () => {
    const response = await api.get("/api/properties");
    const validated = validateResponse(
      apiSuccessSchema(propertiesResponseSchema),
      response.data,
      "properties",
    );

    return validated.data.properties;
  },
  getFavourites: async () => {
    const response = await api.get("/api/properties/my-favourites");
    const validated = validateResponse(
      apiSuccessSchema(favouritesResponseSchema),
      response.data,
      "favourites",
    );

    return validated.data.favourites;
  },
  toggleFavourite: async (propertyId: string) => {
    const response = await api.post("/api/properties/toggle-favourite", {
      propertyId,
    });
    const validated = validateResponse(
      apiSuccessSchema(toggleFavouriteResponseSchema),
      response.data,
      "toggle favourite",
    );

    return validated.data;
  },
};

export default apiClient;
