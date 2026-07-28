import {z} from "zod";

const createUserSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['User', 'Admin']).default('User')
});