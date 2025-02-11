import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-white p-6">
      {/* SVG Illustration */}
      <img
        src="/images/collab1.svg"
        alt="People collaborating"
        className="w-80 mb-6"
      />

      {/* Welcome Text */}
      <h1 className="text-5xl font-bold mb-6">Welcome to Slack App</h1>
      <p className="text-lg text-gray-300 mb-6">
        Collaborate and communicate with ease.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/signup" className="btn btn-secondary">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Landing;
