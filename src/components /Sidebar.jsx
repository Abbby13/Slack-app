import { Link } from "react-router-dom";
import { Home, MessageSquare } from "lucide-react";

function Sidebar() {
  return (
    <div className="flex flex-col items-center w-16 h-screen bg-gray-800 text-white py-4 space-y-6">
      {/* Company Logo Placeholder */}
      <div className="w-10 h-10 bg-gray-600 rounded-full"></div>

      {/* Home Icon */}
      <Link to="/home" className="p-2 rounded-lg hover:bg-gray-700">
        <Home size={24} />
      </Link>

      {/* DM Icon */}
      <button className="p-2 rounded-lg hover:bg-gray-700">
        <MessageSquare size={24} />
      </button>

      {/* User Avatar */}
      <div className="mt-auto p-2">
        <img
          src="https://via.placeholder.com/40" // Placeholder avatar
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-500"
        />
      </div>
    </div>
  );
}

export default Sidebar;
