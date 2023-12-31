import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import bookRouter from "./routes/book.route";

const app: Application = express();

app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true, 
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


const errorResponse = (res: Response, error: ErrorResponse) => {
  return res.status(error.status).json({ error: error.message });
};


app.use(
  (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res, {
      status: err.status,
      message: err.message,
    });
  }
);

export default app;
