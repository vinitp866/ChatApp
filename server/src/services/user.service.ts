import prisma from "../utils/prisma.js";
import { onlineUsers } from "../sockets/socket.js";

export const getAllUsers = async (currentUserId: string) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: currentUserId,
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return users.map((user) => ({
    ...user,
    online: onlineUsers.has(user.id),
  }));
};