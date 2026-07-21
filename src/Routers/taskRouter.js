import express from "express"
import { createTask, deleteTask, getAllTasks, getTaskById, modifyTask } from "../Controllers/taskController.js";



const taskRouter = express.Router()

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.post("/", createTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.put("/:id", modifyTask);

export default taskRouter;