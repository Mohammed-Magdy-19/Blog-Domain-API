import express from "express"
import { createTask, deleteTask, getAllTasks, getTaskById, modifyTask } from "../Controllers/taskController.js";
import { protect } from "../Middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";
import { validate } from "../Middleware/validator.js";
import { createTaskSchema, modifyTaskSchema } from "../Validators/taskValidator.js";

const taskRouter = express.Router()

taskRouter.get("/", asyncHandler(protect), asyncHandler(getAllTasks));
taskRouter.get("/:id", asyncHandler(protect), asyncHandler(getTaskById));
taskRouter.post("/", asyncHandler(protect), validate(createTaskSchema), asyncHandler(createTask));
taskRouter.delete("/:id", asyncHandler(protect), asyncHandler(deleteTask));
taskRouter.put("/:id", asyncHandler(protect), validate(modifyTaskSchema), asyncHandler(modifyTask));

export default taskRouter;