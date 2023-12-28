"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controller/book.controller");
const router = express_1.default.Router();
router.post("/create", book_controller_1.createBooks);
router.put("/update-book/:id", book_controller_1.updateBook);
router.delete("/delete-book/:id", book_controller_1.deleteBook);
exports.default = router;
