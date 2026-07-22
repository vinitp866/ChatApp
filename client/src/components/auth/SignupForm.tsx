import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../services/auth.service";

const SignupForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await signup(username, email, password);

      alert("Account created successfully!");

      navigate("/login");
    } catch (err: any) {
  console.error(err);

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Response:", err.response.data);
    alert(JSON.stringify(err.response.data));
  } else if (err.request) {
    console.log("Request:", err.request);
    alert("No response received from the server.");
  } else {
    alert(err.message);
  }
} finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex w-96 flex-col gap-4 rounded-xl border bg-white p-8 shadow-lg"
    >
      <h1 className="text-center text-3xl font-bold">
        Sign Up
      </h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-lg border p-3 focus:border-green-600 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-green-600 p-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-green-600 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;