import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative flex w-full max-w-md flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 text-5xl font-black text-white shadow-2xl shadow-fuchsia-500/30">
          V
        </div>

        {/* Title */}
        <h1 className="bg-gradient-to-r from-violet-400 via-pink-400 to-fuchsia-400 bg-clip-text text-center text-6xl font-black text-transparent">
          Vayoza
        </h1>

        <p className="mt-3 mb-10 text-center text-slate-400">
          Connect. Chat. Stay close.
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;