import { z } from "zod";
import { createUser, loginUser } from "../services/auth.service.js";
const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});
export const signup = async (req, res) => {
    try {
        const data = signupSchema.parse(req.body);
        const user = await createUser(data.username, data.email, data.password);
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                errors: err.issues,
            });
        }
        if (err instanceof Error) {
            return res.status(400).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export const login = async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);
        const result = await loginUser(data.email, data.password);
        return res.json({
            message: "Login successful",
            token: result.token,
            user: {
                id: result.user.id,
                username: result.user.username,
                email: result.user.email,
            },
        });
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                errors: err.issues,
            });
        }
        if (err instanceof Error) {
            return res.status(400).json({
                message: err.message,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
