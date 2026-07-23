import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative flex w-full max-w-md flex-col items-center">
        <h1 className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-center text-7xl font-black tracking-tight text-transparent md:text-8xl">
          Vayoza
        </h1>

        <p className="mb-10 mt-3 text-center text-lg text-slate-400">
          Connect. Chat. Stay close.
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;