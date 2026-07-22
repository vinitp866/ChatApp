import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service.js";

interface AuthRequest extends Request {
  userId?: string;
}

export const getUsers = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const users = await getAllUsers(req.userId!);

    res.json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};