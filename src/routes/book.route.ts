import express from "express";
import { createBooks, updateBook } from "../controller/book.controller";

const router = express.Router();

router.post("/create", createBooks);
router.put("/update-book/:id", updateBook);

export default router;
