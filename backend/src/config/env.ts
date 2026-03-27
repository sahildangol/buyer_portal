import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z
  .object({
    PORT: z.coerce.number().int().positive().default(5000),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(1).optional(),
    JWT_EXPIRES_IN: z.string().min(1).default("1h"),
    NODE_ENV: z
      .enum(["development", "production"])
      .default("development"),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "production" && !env.JWT_SECRET) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "JWT_SECRET must be set in production",
        path: ["JWT_SECRET"],
      });
    }
  });

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid Environment Variables", _env.error.format());
  throw new Error("Invalid Environment Variables");
}

if (!_env.data.JWT_SECRET && _env.data.NODE_ENV !== "production") {
  console.warn("JWT_SECRET is not set. Falling back to development default.");
}

if (!process.env.JWT_EXPIRES_IN) {
  console.warn(
    "JWT_EXPIRES_IN is not set. Falling back to default value of 1h.",
  );
}

export const config = {
  port: _env.data.PORT,
  databaseUrl: _env.data.DATABASE_URL,
  jwtSecret: _env.data.JWT_SECRET ?? "fallback_secret",
  jwtExpiresIn: _env.data.JWT_EXPIRES_IN,
  nodeEnvironment: _env.data.NODE_ENV,
};
