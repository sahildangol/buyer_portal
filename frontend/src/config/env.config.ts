import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:5000"),
  VITE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error("Invalid Environment Variables", _env.error.format());
  throw new Error("Invalid Environment Variables");
}

export const config = _env.data;
