import { verifyToken } from "../Config/jwt.js";
import User from "../Models/User.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

export const protect = async (req, res, next) => {
    const header = req.headers.authorization || "";
    const token = header.split(" ")[1];

    if (!token) {
        throw new AppError("No token provided", 401);
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new AppError("User no longer exists", 401);
    }

    if (user.logoutTime && user.logoutTime < new Date()) {
        throw new AppError("Token has been invalidated due to logout", 401);
    }

    next();
};