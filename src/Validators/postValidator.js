import { z } from "zod";

export const createPostSchema = z.object({
    text: z.string({ required_error: "Text is required" }).trim().min(1, "Text cannot be empty"),
    imagesUrls: z.array(z.string().url("Each image must be a valid URL")).optional().default([]),
    // no `author` here — it comes from req.user.id, never trust the body for this
});

export const modifyPostSchema = z.object({
    text: z.string().trim().min(1, "Text cannot be empty").optional(),
    imagesUrls: z.array(z.string().url("Each image must be a valid URL")).optional(),
}).refine((data) => Object.keys(data).length > 0, { message: "No update data provided", });