import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 text-white p-6">
      <h1 className="text-4xl font-bold text-primary">Welcome to Slack</h1>
      <p className="text-secondary mt-2">
        Collaborate and chat with your team!
      </p>

      <div className="mt-6 space-x-4">
        <Link to="/send-message">
          <button className="btn btn-primary">Send a Message</button>
        </Link>
        <Link to="/create-channel">
          <button className="btn btn-secondary">Create a Channel</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
