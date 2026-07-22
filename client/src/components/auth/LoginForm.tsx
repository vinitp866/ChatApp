import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      login(data.token, data.user);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex w-96 flex-col gap-4 rounded-xl border bg-white p-8 shadow-lg"
    >
      <h1 className="text-center text-3xl font-bold">
        Log In
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg border p-3 focus:border-blue-600 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-lg border p-3 focus:border-blue-600 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;