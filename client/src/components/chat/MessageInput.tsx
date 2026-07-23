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
    <div className="border-t border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-lg">
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-slate-500 outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!content.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 -rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12L19 5l-4 14-3-6-7-1z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;