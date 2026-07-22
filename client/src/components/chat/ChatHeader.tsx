import type { User } from "../../types/user";

interface ChatHeaderProps {
  user: User;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ChatHeader = ({
  user,
  setSidebarOpen,
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center border-b bg-white p-4">
      {/* Hamburger button (mobile only) */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="mr-3 text-2xl bg-red-500 text-white p-2 rounded"
      >
        ☰
      </button>

      {/* Avatar */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
        {user.username[0].toUpperCase()}
      </div>

      {/* User info */}
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold">
          {user.username}
        </h2>

        <p
          className={`text-sm ${
            user.online
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {user.online ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;