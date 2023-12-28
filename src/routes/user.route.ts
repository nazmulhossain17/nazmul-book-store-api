import express, { Request, Response } from "express";
import {
  createUser,
  handleLogOut,
  loginUser,
} from "../controller/user.controller";
// Some other file
import { isLoggedIn, isLoggedOut } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Running");
});

router.post("/create-user", isLoggedOut, createUser);
router.post("/login", isLoggedOut, loginUser);
router.get("/log-out", isLoggedIn, handleLogOut);

export default router;
