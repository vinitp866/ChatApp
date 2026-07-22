const EmptyChat = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 text-center">
      <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-5xl">
        💬
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome to Vinit's Chatting App
      </h2>

      <p className="mt-2 max-w-sm text-gray-500">
        Select a conversation from the sidebar to start chatting in
        real time.
      </p>
    </div>
  );
};

export default EmptyChat;