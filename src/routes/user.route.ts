import express, { Request, Response } from "express";
import {
  createUser,
  handleLogOut,
  loginUser,
} from "../controller/user.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Running");
});

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.get("/log-out", handleLogOut);

export default router;
