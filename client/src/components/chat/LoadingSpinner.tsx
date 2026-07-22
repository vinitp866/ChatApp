const LoadingSpinner = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;