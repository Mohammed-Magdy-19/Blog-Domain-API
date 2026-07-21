import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, message: "Text is required" },
        completed: { type: Boolean, default: false },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        dueDate: {type: Date}
    },
    { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;