import express from "express"
import { createPost, deletePost, getAllPosts, getPostById, modifyPost } from "../Controllers/postControllers.js";



const postRouter = express.Router()

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", createPost);
postRouter.delete("/:id", deletePost);
postRouter.put("/:id", modifyPost);

export default postRouter;