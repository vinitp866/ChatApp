import { Request, Response } from "express";
import { getConversation } from "../services/message.service.js";
import { createMessage } from "../services/message.service.js";
interface AuthRequest extends Request {
  userId?: string;
}

export const getMessages = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const currentUser = req.userId!;
    const otherUser = req.params.userId as string;

    const messages = await getConversation(
      currentUser,
      otherUser
    );

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};



export const sendMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const senderId = req.userId!;
    const { receiverId, content } = req.body;

    const message = await createMessage(
      senderId,
      receiverId,
      content
    );

    res.status(201).json(message);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};