import { Request, RequestHandler, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../helper/authhelper";

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

export { createUser };
