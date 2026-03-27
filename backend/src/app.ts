import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import { AppError } from "./utils/AppError";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

// 404 handler (Express 5 requires named wildcard)
app.all("/{*path}", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't Find ${req.originalUrl} on this Search!`, 404));
});

app.use(globalErrorHandler);

export default app;
