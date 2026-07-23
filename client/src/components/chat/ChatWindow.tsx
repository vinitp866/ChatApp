import { useEffect, useRef, useState } from "react";
import type { User } from "../../types/user";
import type { Message } from "../../types/message";
import { getMessages } from "../../services/message.service";
import { getSocket } from "../../socket/socket";

import TopBar from "./TopBar";
import EmptyChat from "./EmptyChat";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import LoadingSpinner from "./LoadingSpinner";

interface ChatWindowProps {
  selectedUser: User | null;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ChatWindow = ({
  selectedUser,
  setSidebarOpen,
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getMessages(selectedUser.id);
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handleReceiveMessage = (message: Message) => {
      if (
        selectedUser &&
        (message.senderId === selectedUser.id ||
          message.receiverId === selectedUser.id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    const handleMessageSent = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive-message", handleReceiveMessage);
    socket.on("message-sent", handleMessageSent);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("message-sent", handleMessageSent);
    };
  }, [selectedUser]);

  const handleSendMessage = (content: string) => {
    if (!selectedUser) return;

    getSocket()?.emit("send-message", {
      receiverId: selectedUser.id,
      content,
    });
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-slate-950">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-[140px]" />
      </div>

      <TopBar
        selectedUser={selectedUser}
        setSidebarOpen={setSidebarOpen}
      />

      {!selectedUser ? (
        <EmptyChat />
      ) : loading ? (
        <div className="relative flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="relative flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-8 py-8">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                />
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="relative border-t border-slate-800/70 bg-slate-900/70 px-8 py-5 backdrop-blur-xl">
            <div className="mx-auto w-full max-w-5xl">
              <MessageInput
                onSend={handleSendMessage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;