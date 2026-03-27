import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "fallback_secret",
};

if (!config.databaseUrl) {
  throw new Error("Database URL is not defined in environment variables");
}

if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET Missing . Falling Back to Fall Back Secret");
}
