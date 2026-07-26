import express from "express"
import { createTask, deleteTask, getAllTasks, getTaskById, modifyTask } from "../Controllers/taskController.js";
import { protect } from "../Middleware/authMiddleware.js";



const taskRouter = express.Router()

taskRouter.get("/", protect, getAllTasks);
taskRouter.get("/:id", protect, getTaskById);
taskRouter.post("/", protect, createTask);
taskRouter.delete("/:id", protect, deleteTask);
taskRouter.put("/:id", protect, modifyTask);

export default taskRouter;