import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface User {
  isAdmin: boolean;
}

interface CustomRequest extends Request {
  user?: User;
}

const isLoggedIn = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token as string;
    if (!token) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Please Login",
      });
    }
    const decoded: any = jwt.verify(token, config.jwtKey!);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

const isLoggedOut = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token as string;
    if (token) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User is already logged in",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

// Define the errorResponse function separately
const errorResponse = (
  res: Response,
  { statusCode, message }: { statusCode: number; message: string }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export { isLoggedIn, isLoggedOut };
