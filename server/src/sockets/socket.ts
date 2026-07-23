import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { createMessage } from "../services/message.service.js";

export const onlineUsers = new Map<string, Set<string>>();

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

      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error("Invalid Token"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(
      `✅ User ${socket.userId} connected (${socket.id})`
    );

    // Add this socket to the user's set
    let sockets = onlineUsers.get(socket.userId!);

    if (!sockets) {
      sockets = new Set<string>();
      onlineUsers.set(socket.userId!, sockets);
    }

    sockets.add(socket.id);

    // Broadcast updated online users
    io.emit("online-users", [...onlineUsers.keys()]);

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
        try {
          const message = await createMessage(
            socket.userId!,
            receiverId,
            content
          );

          const receiverSockets =
            onlineUsers.get(receiverId);

          if (receiverSockets) {
            for (const socketId of receiverSockets) {
              io.to(socketId).emit(
                "receive-message",
                message
              );
            }
          }

          socket.emit("message-sent", message);
        } catch (err) {
          console.error("Send message error:", err);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log(
        `❌ User ${socket.userId} disconnected (${socket.id})`
      );

      const sockets = onlineUsers.get(socket.userId!);

      if (sockets) {
        sockets.delete(socket.id);

        if (sockets.size === 0) {
          onlineUsers.delete(socket.userId!);
        }
      }

      io.emit("online-users", [...onlineUsers.keys()]);

      console.log("Online Users:");
      console.log(onlineUsers);
    });
  });
};