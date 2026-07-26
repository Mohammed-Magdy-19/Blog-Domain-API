import { ObjectId } from "mongodb";
import User from "../Models/User.js";
import { signToken } from "../config/jwt.js";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password});
        await user.save();
        const token = signToken(user._id);
        return res.status(201).json({ message: "User is added successfully", token });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "User is not added successfully" });
    }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Users are not fetched successfully" });
    }
}


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "User is not fetched successfully" });
    }
}


const modifyUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        const updatedUser = await User.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: 'after' });

        return res.status(200).json({ message: "User is updated successfully", updatedUser });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "User is not updated successfully" });
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findOneAndDelete({ _id: new ObjectId(id) });
        return res.status(200).json({ message: "User is deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "User is not deleted successfully" });
    }
}

export { createUser, getAllUsers, getUserById, modifyUser, deleteUser }