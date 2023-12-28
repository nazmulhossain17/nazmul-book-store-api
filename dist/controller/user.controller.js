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
exports.handleLogOut = exports.loginUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const authhelper_1 = require("../helper/authhelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name && !email && !password) {
            return res.send({
                message: "name email password address is must required",
            });
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(500)
                .json({ message: "User Already Exists please login" });
        }
        // register user
        const hashedPassword = yield (0, authhelper_1.hashPassword)(password);
        const user = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
        }).save();
        return res.status(201).json({ message: "User created Successfully" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }
        const passwordMatch = yield (0, authhelper_1.comparePassword)(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwtKey);
        // const token = jwt.sign({ user }, config.jwtKey!);
        res
            .status(200)
            .cookie("access_token", token, { httpOnly: true })
            .json({ success: true, message: "Login successful" });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.loginUser = loginUser;
const handleLogOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access_token");
        return res.status(200).json({ message: "Log out successful" });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.handleLogOut = handleLogOut;
