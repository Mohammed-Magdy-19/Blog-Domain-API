import {z} from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['User', 'Admin']).default('User')
});

export const updateUserSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    role: z.enum(['User', 'Admin']).default('User').optional()
}).refine((data) => Object.keys(data).length > 0, { message: "No update data provided", });