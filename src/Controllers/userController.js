import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
import User from "../Models/User.js";
import { signToken } from "../config/jwt.js";
import AppError from "../utils/AppError.js";

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = signToken(user._id);
    return res.status(201).json({ message: "User is added successfully", token });
};


const getAllUsers = async (req, res) => {
    const users = await User.find({});
    return res.status(200).json(users);
};


const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        throw new AppError(`User not found with id: ${id}`, 404);
    }

    return res.status(200).json(user);
};


const modifyUser = async (req, res) => {
    const { id } = req.params;

    if (!req.body || Object.keys(req.body).length === 0) {
        throw new AppError("No update data provided", 400);
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: new ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: "after" }
    );

    if (!updatedUser) {
        throw new AppError(`User not found with id: ${id}`, 404);
    }

    return res.status(200).json({ message: "User is updated successfully", updatedUser });
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedUser) {
        throw new AppError(`User not found with id: ${id}`, 404);
    }

    return res.status(200).json({ message: "User is deleted successfully" });
};

export { createUser, getAllUsers, getUserById, modifyUser, deleteUser };