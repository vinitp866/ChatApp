"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const express_1 = require("express");
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
});
const signup = async (req, res) => {
    try {
        const data = signupSchema.parse(req.body);
        const existingUser = await prisma_1.default.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { username: data.username },
                ],
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
            },
        });
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
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                errors: err.issues,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.signup = signup;
//# sourceMappingURL=auth.controller.js.map