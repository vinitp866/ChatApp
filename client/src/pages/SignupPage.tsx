import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="mb-2 text-center text-5xl font-extrabold text-green-600">
        Vinit's Chatting App
      </h1>

      <p className="mb-8 text-center text-gray-600">
        Create an account to start chatting.
      </p>

      <SignupForm />
    </div>
  );
};

export default SignupPage;