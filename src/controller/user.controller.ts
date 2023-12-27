import { Request, RequestHandler, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../helper/authhelper";
import jwt from "jsonwebtoken";
import config from "../config";

const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.send({
        message: "name email password address is must required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(500)
        .json({ message: "User Already Exists please login" });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    return res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ id: user._id }, config.jwtKey!);
    // const token = jwt.sign({ user }, config.jwtKey!);

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

const handleLogOut: RequestHandler = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ message: "Log out successful" });
  } catch (error) {
    return res.status(500).send((error as Error).message);
  }
};

export { createUser, loginUser, handleLogOut };
