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
        className={`max-w-[85%] break-words rounded-2xl px-4 py-3 shadow-md transition-all sm:max-w-[75%] ${
          isMine
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"
            : "border border-slate-700 bg-slate-800 text-white"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message.content}
        </p>

        <p
          className={`mt-2 text-right text-[11px] ${
            isMine
              ? "text-violet-100"
              : "text-slate-400"
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