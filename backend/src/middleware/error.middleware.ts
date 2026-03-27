import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { config } from "../config/env";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : "Internal Server Error";
  const stack = err instanceof Error ? err.stack : undefined;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      stack: config.nodeEnvironment === "development" ? stack : undefined,
    },
  });
};
