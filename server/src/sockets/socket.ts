import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { createMessage } from "../services/message.service.js";
export const onlineUsers = new Map<string, string>();

interface JwtPayload {
  id: string;
}

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const setupSocket = (io: Server) => {
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;
      console.log("Authenticated user:", decoded.id);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error("Invalid Token"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
  console.log("Socket connected:", socket.id, "User:", socket.userId);
    onlineUsers.set(socket.userId!, socket.id);
    io.emit("online-users", [...onlineUsers.keys()]);
  console.log(` User ${socket.userId} connected (${socket.id})`);

  console.log("Online Users:");
  console.log(onlineUsers);
  socket.on(
  "send-message",
  async ({
    receiverId,
    content,
  }: {
    receiverId: string;
    content: string;
  }) => {
    const message = await createMessage(
      socket.userId!,
      receiverId,
      content
    );

    const receiverSocketId = onlineUsers.get(receiverId);
    console.log("Receiver socket:", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "receive-message",
        message
      );
    }

    socket.emit("message-sent", message);
  }
);
  socket.on("disconnect", () => {
    onlineUsers.delete(socket.userId!);
    io.emit("online-users", [...onlineUsers.keys()]);
    console.log(` User ${socket.userId} disconnected`);

    console.log("Online Users:");
    console.log(onlineUsers);
  });
});
}