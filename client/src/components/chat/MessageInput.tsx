import { useState } from "react";

interface MessageInputProps {
  onSend: (content: string) => void;
}

const MessageInput = ({
  onSend,
}: MessageInputProps) => {
  const [content, setContent] = useState("");

  const handleSend = () => {
    const text = content.trim();

    if (!text) return;

    onSend(text);
    setContent("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-full border px-5 py-3 outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleSend}
          disabled={!content.trim()}
          className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageInput;