import express, { Request, Response } from "express";
import { createUser, loginUser } from "../controller/user.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Running");
});

router.post("/create-user", createUser);
router.post("/login", loginUser);

export default router;
