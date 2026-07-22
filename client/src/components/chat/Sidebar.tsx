import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUsers } from "../../services/user.service";
import { getSocket } from "../../socket/socket";
import type { User } from "../../types/user";
import UserItem from "./UserItem";

interface SidebarProps {
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Sidebar = ({
  selectedUser,
  onSelectUser,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handleOnlineUsers = (
      onlineIds: string[]
    ) => {
      setUsers((prev) =>
        prev.map((user) => ({
          ...user,
          online: onlineIds.includes(user.id),
        }))
      );
    };

    socket.on("online-users", handleOnlineUsers);

    return () => {
      socket.off(
        "online-users",
        handleOnlineUsers
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-80 border-r bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:static
          md:translate-x-0
          md:shadow-none
        `}
      >
        <div className="flex h-full flex-col">
          <div className="border-b p-5">
            <h2 className="text-2xl font-bold">
              Chats
            </h2>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {users.map((u) => (
              <UserItem
                key={u.id}
                user={u}
                selected={selectedUser?.id === u.id}
                onClick={() => {
                  onSelectUser(u);
                  setSidebarOpen(false);
                }}
              />
            ))}
          </div>

          <div className="border-t p-4">
            <p className="font-semibold">
              {user?.username}
            </p>

            <p className="mb-3 text-sm text-gray-500">
              Logged in
            </p>

            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;