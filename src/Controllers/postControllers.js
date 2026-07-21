import mongoose from "mongoose";
import Post from "../Models/Post.js";
import User from "../Models/User.js";
import { ObjectId } from "mongodb";


const createPost = async (req, res) => {
    try {
        const { text, imagesUrls, author } = req.body;

        if (!mongoose.Types.ObjectId.isValid(author)) {
            const error = new Error("Id is not valid");
            error.statusCode = 400;
            throw error;
        }

        const userExists = await User.exists({ _id: author });
        if (!userExists) {
            const error = new Error("User is not found");
            error.statusCode = 404;
            throw error;
        }

        const post = new Post({ text, imagesUrls, author });
        await post.save();

        return res.status(201).json({ message: "Post is added successfully" });
    } catch (error) {
        return res.status(error.statusCode ?? 400).json({ message: error.message ?? "Post is not added successfully" });
    }
};


const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("author");
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Posts are not fetched successfully" });
    }
}


const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("author");
        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Post is not fetched successfully" });
    }
}


const modifyPost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        const updatedPost = await Post.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: 'after' });

        return res.status(200).json({ message: "Post is updated successfully", updatedPost });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Post is not updated successfully" });
    }
}


const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findOneAndDelete({ _id: new ObjectId(id) });
        return res.status(200).json({ message: "Post is deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message ?? "Post is not deleted successfully" });
    }
}

export { createPost, getAllPosts, getPostById, modifyPost, deletePost}