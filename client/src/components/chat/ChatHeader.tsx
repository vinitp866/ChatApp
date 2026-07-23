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
    <div className="mx-4 mt-4 flex items-center rounded-3xl border border-slate-800/80 bg-slate-900/80 px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      {/* Mobile Menu */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="mr-3 rounded-xl p-2 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white lg:hidden"
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

      {/* Avatar */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-lg font-bold text-white shadow-lg">
        {user.username[0].toUpperCase()}
      </div>

      {/* User Info */}
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-semibold tracking-wide text-white">
          {user.username}
        </h2>

        <div className="mt-1 flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              user.online
                ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                : "bg-slate-500"
            }`}
          />

          <span className="text-sm text-slate-400">
            {user.online ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="hidden items-center gap-2 sm:flex">
        <button className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white">
          📞
        </button>

        <button className="rounded-xl p-2 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white">
          ⋮
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;