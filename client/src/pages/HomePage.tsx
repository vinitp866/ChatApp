import { useEffect, useState } from "react";
import type { User } from "../types/user";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

const HomePage = () => {
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        selectedUser={selectedUser}
        onSelectUser={(user) => {
          setSelectedUser(user);
          setSidebarOpen(false);
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1">
        <ChatWindow
          selectedUser={selectedUser}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
    </div>
  );
};

export default HomePage;