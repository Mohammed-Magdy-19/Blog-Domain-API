import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({ required_error: "Title is required" }).trim().min(1, "Title cannot be empty"),
    completed: z.boolean().optional().default(false),
    dueDate: z.coerce.date().optional(),
    // no `owner` here — it comes from req.user.id, never trust the body for this
});

export const modifyTaskSchema = z
    .object({
        title: z.string().trim().min(1, "Title cannot be empty").optional(),
        completed: z.boolean().optional(),
        dueDate: z.coerce.date().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "No update data provided",
    });