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
  throw new Error("Database URL is not defined in environment variables");
}

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET Missing . Falling Back to Fall Back Secret");
}

if (!process.env.JWT_EXPIRES_IN) {
  console.warn(
    "JWT_EXPIRES_IN Missing . Falling Back to Fall Back Expiry Time",
  );
}
