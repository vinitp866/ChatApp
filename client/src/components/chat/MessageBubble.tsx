import { useAuth } from "../../context/AuthContext";
import type { Message } from "../../types/message";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({
  message,
}: MessageBubbleProps) => {
  const { user } = useAuth();

  const isMine = message.senderId === user?.id;

  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-sm rounded-2xl px-4 py-2 shadow ${
          isMine
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        <p>{message.content}</p>

        <p
          className={`mt-1 text-right text-xs ${
            isMine
              ? "text-blue-100"
              : "text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;