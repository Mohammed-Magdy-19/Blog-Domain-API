import mongoose from "mongoose";
import User from "../Models/User.js";
import Task from "../Models/Task.js";
import { ObjectId } from "mongodb";

const createTask = async (req, res) => {
    try {
        const { title, completed, dueDate } = req.body;
        const owner = req.user.id;

        const task = new Task({ title, completed, owner, dueDate });
        await task.save();

        return res.status(201).json({ message: "Task is added successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Task is not added successfully" });
    }
};


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate("owner");
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Tasks are not fetched successfully" });
    }
}


const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id).populate("owner");
        return res.status(200).json(task);
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Task is not fetched successfully" });
    }
}


const modifyTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        const updatedTask = await Task.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: 'after' });

        return res.status(200).json({ message: "Task is updated successfully", updatedTask });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Task is not updated successfully" });
    }
}


const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findOneAndDelete({ _id: new ObjectId(id) });
        return res.status(200).json({ message: "Task is deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Task is not deleted successfully" });
    }
}


export { createTask, getAllTasks, getTaskById, modifyTask, deleteTask }