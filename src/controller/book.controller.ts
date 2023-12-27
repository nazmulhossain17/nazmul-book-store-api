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

export { createBooks };
