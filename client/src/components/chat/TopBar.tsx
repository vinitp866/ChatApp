import type { User } from "../../types/user";

interface TopBarProps {
  selectedUser: User | null;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const TopBar = ({
  selectedUser,
  setSidebarOpen,
}: TopBarProps) => {
  return (
    <div className="flex h-16 items-center border-b bg-white px-4 shadow-sm">
      <button
        onClick={() => setSidebarOpen(true)}
        className="mr-4 text-2xl md:hidden"
      >
        ☰
      </button>

      {selectedUser ? (
        <>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            {selectedUser.username[0].toUpperCase()}
          </div>

          <div className="ml-3">
            <h2 className="font-semibold">
              {selectedUser.username}
            </h2>

            <p
              className={`text-sm ${
                selectedUser.online
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {selectedUser.online
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </>
      ) : (
        <h2 className="text-lg font-semibold">
          Vinit's Chatting App
        </h2>
      )}
    </div>
  );
};

export default TopBar;