import { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  image: string;
  price: number;
  genre: string;
  description: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
