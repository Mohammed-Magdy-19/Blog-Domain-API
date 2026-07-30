import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import Post from "../Models/Post.js";
import AppError from "../utils/AppError.js";

const createPost = async (req, res) => {
    const { text, imagesUrls } = req.body;
    const author = req.user.id; // trust the token, not the request body

    const post = new Post({ text, imagesUrls, author });
    await post.save();

    return res.status(201).json({ message: "Post is added successfully" });
};


const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).populate("author");
    return res.status(200).json(posts);
};


const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author");

    if (!post) {
        throw new AppError(`Post not found with id: ${id}`, 404);
    }

    return res.status(200).json(post);
};


const modifyPost = async (req, res) => {
    const { id } = req.params;
    const { author, ...updateData } = req.body; // defensive strip, in case validate() isn't wired in for this route

    const updatedPost = await Post.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...updateData } },
        { returnDocument: "after" }
    );

    if (!updatedPost) {
        throw new AppError(`Post not found with id: ${id}`, 404);
    }

    return res.status(200).json({ message: "Post is updated successfully", updatedPost });
};


const deletePost = async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.findOneAndDelete({ _id: new ObjectId(id) });

    if (!deletedPost) {
        throw new AppError(`Post not found with id: ${id}`, 404);
    }

    return res.status(200).json({ message: "Post is deleted successfully" });
};

export { createPost, getAllPosts, getPostById, modifyPost, deletePost };