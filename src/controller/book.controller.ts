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

export { createBooks, updateBook };
