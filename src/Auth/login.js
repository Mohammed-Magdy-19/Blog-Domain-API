import { signToken } from "../config/jwt";
import User from "../Models/User";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const passwordMatch = bcrypt.compare(password, user.password);

        if (!user || !passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = signToken(user._id);
        return res.status(200).json({ message: "User is Logined successfully", token });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "User is not Logined successfully" });
    }
}