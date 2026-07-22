import { Router } from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:userId", authMiddleware, getMessages);

router.post("/", authMiddleware, sendMessage);

export default router;