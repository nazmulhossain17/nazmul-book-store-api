"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent with the request
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", user_route_1.default);
app.use("/api/books", book_route_1.default);
app.get("/", (req, res) => {
    res.send("Working");
});
// Define a helper function for sending error responses
const errorResponse = (res, error) => {
    return res.status(error.status).json({ error: error.message });
};
// Middleware for handling errors
app.use((err, req, res, next) => {
    return errorResponse(res, {
        status: err.status,
        message: err.message,
    });
});
exports.default = app;
