import express from "express";
import {
  createBooks,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controller/book.controller";

const router = express.Router();

router.get("/all", getAllBooks);
router.get("/all/:id", getSingleBook);
router.post("/create", createBooks);
router.put("/update-book/:id", updateBook);
router.delete("/delete-book/:id", deleteBook);

export default router;
