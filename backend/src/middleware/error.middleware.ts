import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { config } from "../config/env";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      stack: config.nodeEnvironment === "development" ? err.stack : undefined,
    },
  });
};
