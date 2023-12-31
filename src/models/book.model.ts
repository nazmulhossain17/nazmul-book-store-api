import { Schema } from "mongoose";
import { BookModel, IBook } from "../interface/book.interface";
import { model } from "mongoose";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      message: "The book is already available!!",
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Books = model<IBook, BookModel>("Book", bookSchema);
export default Books;
