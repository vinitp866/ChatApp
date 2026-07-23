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
    <div className="mx-4 flex h-16 shrink-0 items-center rounded-2xl border border-slate-800 bg-slate-900/80 px-4 shadow-xl backdrop-blur-xl">   {/* Mobile Menu */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="mr-4 rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {selectedUser ? (
        <>
          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-lg font-bold text-white shadow-lg">
            {selectedUser.username[0].toUpperCase()}
          </div>

          {/* User Info */}
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-semibold text-white">
              {selectedUser.username}
            </h2>

            <div className="mt-1 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  selectedUser.online
                    ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                    : "bg-slate-500"
                }`}
              />

              <span className="text-sm text-slate-400">
                {selectedUser.online
                  ? "Online"
                  : "Offline"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
              
            </button>

            <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
              
            </button>
          </div>
        </>
      ) : (
        <h2 className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-xl font-bold text-transparent">
          Vayoza
        </h2>
      )}
    </div>
  );
};

export default TopBar;