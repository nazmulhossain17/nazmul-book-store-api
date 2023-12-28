import { Request, RequestHandler, Response } from "express";
import Books from "../models/book.model";

const createBooks: RequestHandler = async (req: Request, res: Response) => {
  const { title, image, author, genre, description } = req.body;

  try {
    const booksData = new Books({
      title,
      image,
      author,
      genre,
      description,
    });
    const createdData = await booksData.save();
    return res.status(201).json(createdData);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

const updateBook: RequestHandler = async (req: Request, res: Response) => {
  const bookId = req.params.id; // Assuming you have the book ID in the request parameters
  const { title, image, author, genre, description } = req.body;

  try {
    // Find the book by ID and update its properties
    const updatedBook = await Books.findByIdAndUpdate(
      bookId,
      {
        title,
        image,
        author,
        genre,
        description,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

const deleteBook: RequestHandler = async (req, res) => {
  const bookId = req.params.id; // Get book ID from route parameters

  try {
    // Find and delete the book by ID
    const deletedBook = await Books.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

const getAllBooks: RequestHandler = async (req, res) => {
  try {
    const products = await Books.find();
    return res.status(200).send({ message: "product data fetched", products });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

const getSingleBook: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Books.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .send({ message: "Single book data fetched", result });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

export { createBooks, getAllBooks, getSingleBook, updateBook, deleteBook };
