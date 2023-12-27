import express from "express";
import { createBooks } from "../controller/book.controller";

const router = express.Router();

router.post("/create", createBooks);

export default router;
