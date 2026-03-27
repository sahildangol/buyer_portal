import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "fallback_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  nodeEnvironment: process.env.NODE_ENV || "development",
};

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

if (!process.env.JWT_SECRET) {
  if (config.nodeEnvironment === "production") {
    throw new Error("JWT_SECRET must be set in production");
  }

  console.warn("JWT_SECRET is not set. Falling back to development default.");
}

if (!process.env.JWT_EXPIRES_IN) {
  console.warn(
    "JWT_EXPIRES_IN is not set. Falling back to default value of 1h.",
  );
}
