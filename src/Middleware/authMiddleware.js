import { verifyToken } from "../Config/jwt.js";
import User from "../Models/User.js";

export const protect = async (req, res, next) => {
    const header = req.headers.authorization || "";

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        const user = await User.findById(decoded.id);
        if (user.logoutTime && user.logoutTime < new Date()) {
            return res
                .status(401)
                .json({ message: "Token has been invalidated due to logout" });
        }
        next();
    } catch(error) {
        res.status(401).json({ message: error.message ?? "Invalid token" });
    }
};