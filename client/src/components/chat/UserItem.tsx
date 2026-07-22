import type { User } from "../../types/user";

interface UserItemProps {
  user: User;
  selected: boolean;
  onClick: () => void;
}

const UserItem = ({
  user,
  selected,
  onClick,
}: UserItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl p-3 transition-all duration-200 ${
        selected
          ? "bg-blue-100"
          : "hover:bg-gray-100"
      }`}
    >
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
          {user.username[0].toUpperCase()}
        </div>

        <span
          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
            user.online
              ? "bg-green-500"
              : "bg-gray-400"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col items-start overflow-hidden">
        <p className="truncate font-semibold">
          {user.username}
        </p>

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
    </button>
  );
};

export default UserItem;