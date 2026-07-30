import { signToken } from "../config/jwt.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = signToken(user._id);
    return res.status(200).json({ message: "User is Logined successfully", token });
};