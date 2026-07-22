import api from "../api/axios";
import type { Message } from "../types/message";

export const getMessages = async (
  userId: string
): Promise<Message[]> => {
  const response = await api.get(`/messages/${userId}`);
  return response.data;
};

export const sendMessage = async (
  receiverId: string,
  content: string
): Promise<Message> => {
  const response = await api.post("/messages", {
    receiverId,
    content,
  });

  return response.data;
};