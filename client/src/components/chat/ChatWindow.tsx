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
  requestAnimationFrame(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
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

    const socket = getSocket();

    socket?.emit("send-message", {
      receiverId: selectedUser.id,
      content,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-slate-950">
      <TopBar
        selectedUser={selectedUser}
        setSidebarOpen={setSidebarOpen}
      />

      {!selectedUser ? (
        <EmptyChat />
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}

            <div ref={messagesEndRef} />
          </div>

          <MessageInput onSend={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default ChatWindow;