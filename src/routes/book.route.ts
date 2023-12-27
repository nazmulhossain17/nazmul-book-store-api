import express from "express";
import {
  createBooks,
  deleteBook,
  updateBook,
} from "../controller/book.controller";

const router = express.Router();

router.post("/create", createBooks);
router.put("/update-book/:id", updateBook);
router.delete("/delete-book/:id", deleteBook);

export default router;
