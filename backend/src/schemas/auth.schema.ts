import { UserSchema } from "../generated/zod";
import { z } from "zod";

export const registerSchema = z.object({
  body: UserSchema.pick({
    email: true,
    name: true,
    password: true,
  }).extend({
    password: z.string().min(6, "Password Must be atleast 6 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(1, "Password is Required"),
  }),
});
