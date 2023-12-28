import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import bookRouter from "./routes/book.route";

const app: Application = express();

app.use(cors({ 
  origin: 'http://localhost:5173', // Replace with the actual origin of your client
  credentials: true, // Allow cookies to be sent with the request
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", userRouter);
app.use("/api/books", bookRouter);

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
