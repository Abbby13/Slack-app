import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-base-100 text-white p-6">
      {/* Left Section: Image */}
      <div className="mb-6 md:mb-0 md:flex-1 flex justify-center">
        <img
          src="/images/collab1.svg"
          alt="People collaborating"
          className="w-80"
        />
      </div>

      {/* Right Section: Text & Buttons */}
      <div className="flex flex-col items-start justify-center space-y-6 md:space-y-4 md:flex-1">
        <h1 className="text-5xl font-bold">Welcome to Slack App</h1>
        <p className="text-lg">Collaborate and communicate with ease.</p>
        <div className="flex space-x-4">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
