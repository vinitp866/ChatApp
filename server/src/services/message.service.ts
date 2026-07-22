import prisma from "../utils/prisma.js";

export const createMessage = async (
  senderId: string,
  receiverId: string,
  content: string
) => {
  return await prisma.message.create({
    data: {
      senderId,
      receiverId,
      content,
    },
  });
};
export const getConversation = async (
  user1: string,
  user2: string
) => {
  return await prisma.message.findMany({
    where: {
      OR: [
        {
          senderId: user1,
          receiverId: user2,
        },
        {
          senderId: user2,
          receiverId: user1,
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};