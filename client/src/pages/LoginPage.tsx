import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative flex w-full max-w-md flex-col items-center">
        {/* Title */}
        <h1 className="bg-gradient-to-r from-violet-300 via-fuchsia-400 to-pink-400 bg-clip-text pb-2 text-center text-7xl font-black leading-normal text-transparent drop-shadow-[0_0_25px_rgba(217,70,239,0.35)] md:text-8xl">
          Vayoza
        </h1>

        {/* Subtitle */}
        <p className="mb-10 mt-2 text-center text-lg text-slate-400">
          Connect. Chat. Stay close.
        </p>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;