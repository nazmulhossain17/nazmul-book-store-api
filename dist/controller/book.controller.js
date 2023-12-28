"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBooks = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const createBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, image, author, genre, description } = req.body;
    try {
        const booksData = new book_model_1.default({
            title,
            image,
            author,
            genre,
            description,
        });
        const createdData = yield booksData.save();
        return res.status(201).json(createdData);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.createBooks = createBooks;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id; // Assuming you have the book ID in the request parameters
    const { title, image, author, genre, description } = req.body;
    try {
        // Find the book by ID and update its properties
        const updatedBook = yield book_model_1.default.findByIdAndUpdate(bookId, {
            title,
            image,
            author,
            genre,
            description,
        }, { new: true } // This option returns the updated document
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json(updatedBook);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id; // Get book ID from route parameters
    try {
        // Find and delete the book by ID
        const deletedBook = yield book_model_1.default.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.deleteBook = deleteBook;
