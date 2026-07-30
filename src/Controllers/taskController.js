import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import Task from "../Models/Task.js";
import User from "../Models/User.js";
import AppError from "../utils/AppError.js";

// NOTE: `protect` middleware must run before these routes so `req.user` is set
const createTask = async (req, res) => {
    const { title, completed, dueDate } = req.body;
    const owner = req.user.id; // trust the token, not the request body

    const task = new Task({ title, completed, owner, dueDate });
    await task.save();

    return res.status(201).json({ message: "Task is added successfully" });
};


const getAllTasks = async (req, res) => {
    const tasks = await Task.find({}).populate("owner");
    return res.status(200).json(tasks);
};


const getTaskById = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate("owner");

    if (!task) {
        throw new AppError(`Task not found with id: ${id}`, 404);
    }

    return res.status(200).json(task);
};


const modifyTask = async (req, res) => {
    const { id } = req.params;
    const { owner, ...updateData } = req.body; // defensive strip, in case validate() isn't wired in for this route

    const updatedTask = await Task.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...updateData } },
        { returnDocument: "after" }
    );

    if (!updatedTask) {
        throw new AppError(`Task not found with id: ${id}`, 404);
    }

    return res.status(200).json({ message: "Task is updated successfully", updatedTask });
};


const deleteTask = async (req, res) => {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedTask) {
        throw new AppError(`Task not found with id: ${id}`, 404);
    }

    return res.status(200).json({ message: "Task is deleted successfully" });
};


export { createTask, getAllTasks, getTaskById, modifyTask, deleteTask };