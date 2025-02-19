import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components /TextField";
import Modal from "../components /Modal";
import useSignUp from "../hooks/useSignUp";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { signup, isLoading, error, isSuccess } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      password_confirmation: confirmPassword,
    };
    signup(formData);
  };

  useEffect(() => {
    let redirectTimeout = null;
    if (isSuccess) {
      document.getElementById("modal").showModal();
      redirectTimeout = setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [isSuccess, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-gray-700 shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>

        {/* Error Message Block */}
        {error && error.email && (
          <div className="mb-4 text-red-500 text-center">
            Account is already taken
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <TextField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error?.email}
          />
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error?.password}
          />
          <TextField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error?.password_confirmation}
          />
          <button type="submit" className="btn btn-primary w-full">
            {isLoading ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <Modal
        title={"Success"}
        message={"Sign up success. Redirecting to login..."}
      />
    </div>
  );
}

export default Signup;
