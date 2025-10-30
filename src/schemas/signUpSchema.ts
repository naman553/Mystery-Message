import { z } from "zod";
export const userValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username can contain max 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/ , "Username must not contain special charaters")

    export const signUpSchema = z.object({
        username: userValidation,
        email: z.string().email({message: "Invalid email address"}),
        password: z.string().min(6, {message: "Password should be atleast 6 character"})
    })