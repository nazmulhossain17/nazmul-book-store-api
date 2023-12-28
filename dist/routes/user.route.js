"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Running");
});
router.post("/create-user", user_controller_1.createUser);
router.post("/login", user_controller_1.loginUser);
router.get("/log-out", user_controller_1.handleLogOut);
exports.default = router;
