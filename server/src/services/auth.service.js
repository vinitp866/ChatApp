"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (username, email, password) => {
    const existingUser = await prisma_1.default.user.findFirst({
        where: {
            OR: [
                { email },
                { username }
            ]
        }
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });
    return user;
};
exports.createUser = createUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        token,
        user,
    };
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map