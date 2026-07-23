const EmptyChat = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-slate-950 px-6">
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/20 to-fuchsia-500/20 ring-1 ring-violet-500/20">
          <span className="text-5xl">💬</span>
        </div>

        {/* Heading */}
        <h2 className="mt-8 bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
          Welcome to Vayoza
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400">
          Select a conversation from the sidebar and start chatting
          instantly with your friends.
        </p>

        {/* Decorative dots */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-500"></div>
          <div className="h-2 w-2 rounded-full bg-fuchsia-500"></div>
          <div className="h-2 w-2 rounded-full bg-pink-500"></div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;