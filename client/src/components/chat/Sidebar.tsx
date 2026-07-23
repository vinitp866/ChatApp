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
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        w-80
        bg-slate-900/95
        backdrop-blur-xl
        border-r border-slate-800
        shadow-2xl

        transform transition-all duration-300 ease-out

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        md:static
        md:translate-x-0
      `}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b border-slate-800 p-6">
  <div className="flex items-center gap-4">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 shadow-xl shadow-fuchsia-500/30">
      💜
    </div>

    <div>
      <h1 className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
        Vayoza
      </h1>

      <p className="text-sm text-slate-400">
        Connect. Chat. Stay close.
      </p>
    </div>
  </div>
        </div>

        {/* Users */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
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

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 font-bold text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold text-slate-100">
                {user?.username}
              </p>

              <p className="text-sm text-slate-400">
                Online
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-fuchsia-500/30 active:scale-95"
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