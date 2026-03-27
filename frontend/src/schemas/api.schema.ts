import { z } from "zod";

export const apiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });

export const apiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
    stack: z.string().optional(),
  }),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export const propertySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  imageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const healthSchema = z.object({
  status: z.string(),
});

export const registerResponseSchema = z.object({
  user: userSchema,
});

export const loginResponseSchema = z.object({
  token: z.string().min(1),
  user: userSchema,
});

export const propertiesResponseSchema = z.object({
  properties: z.array(propertySchema),
});

export const favouritesResponseSchema = z.object({
  favourites: z.array(propertySchema),
});

export const toggleFavouriteResponseSchema = z.object({
  action: z.enum(["added", "removed"]),
  propertyId: z.string(),
});
