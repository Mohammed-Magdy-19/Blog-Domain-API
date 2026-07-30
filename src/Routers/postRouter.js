import express from "express"
import { createPost, deletePost, getAllPosts, getPostById, modifyPost } from "../Controllers/postControllers.js";
import asyncHandler from "express-async-handler";
import { protect } from "../Middleware/authMiddleware.js";
import { validate } from "../Middleware/validator.js";
import { createPostSchema, modifyPostSchema } from "../Validators/postValidator.js";

const postRouter = express.Router()

postRouter.get("/", asyncHandler(protect), asyncHandler(getAllPosts));
postRouter.get("/:id", asyncHandler(protect), asyncHandler(getPostById));
postRouter.post("/", asyncHandler(protect), validate(createPostSchema), asyncHandler(createPost));
postRouter.delete("/:id", asyncHandler(protect), asyncHandler(deletePost));
postRouter.put("/:id", asyncHandler(protect), validate(modifyPostSchema), asyncHandler(modifyPost));

export default postRouter;