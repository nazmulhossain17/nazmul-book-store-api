import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

interface ErrorResponse {
  status: number;
  message: string;
}

// Define a helper function for sending error responses
const errorResponse = (res: Response, error: ErrorResponse) => {
  return res.status(error.status).json({ error: error.message });
};

// Middleware for handling errors
app.use(
  (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res, {
      status: err.status,
      message: err.message,
    });
  }
);

export default app;
