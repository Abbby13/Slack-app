import { Link } from "react-router-dom";
import { Home as HomeIcon, MessageSquare, PlusCircle } from "lucide-react";
import useChannels from "../hooks/useChannels";
import SearchBar from "./Searchbar";

function Sidebar({
  selectedChannel,
  setSelectedChannel,
  selectedUser,
  setSelectedUser,
  handleCreateChannel,
  handleOpenAddUserModal,
  handleSelectUser,
  recentDMs,
}) {
  const { channels } = useChannels();

  return (
    <div className="flex flex-col w-56 h-screen bg-gray-800 text-white">
      {/* Top Section (Logo, etc.) */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div
            className="w-10 h-10 bg-gray-600 rounded-full"
            title="Company Logo"
          ></div>
          <span className="ml-2 font-bold text-xl">MyTeam</span>
        </div>
      </div>

      {/* Middle Section (scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Search Bar */}
        <div className=" pt-4">
          <SearchBar onUserSelect={handleSelectUser} />
        </div>

        {/* Channels Section */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold">Channels</span>
            <button
              className="hover:text-gray-300"
              title="Add Channel"
              onClick={handleCreateChannel}
            >
              <PlusCircle size={16} />
            </button>
          </div>
          <div className="max-h-40 overflow-y-auto">
            <ul className="space-y-1">
              {channels?.map((channel) => (
                <li
                  key={channel.id}
                  onClick={() => {
                    setSelectedChannel(channel);
                    setSelectedUser(null);
                  }}
                  className={`flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer ${
                    selectedChannel?.id === channel.id ? "bg-gray-700" : ""
                  }`}
                >
                  <span className="text-sm">
                    # {channel.name || "Unnamed Channel"}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">
                    ({channel.members?.length || 0})
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {selectedChannel && (
            <button
              className="mt-2 w-full text-left px-2 py-1 bg-blue-600 rounded hover:bg-blue-700"
              onClick={handleOpenAddUserModal}
            >
              Add User to #{selectedChannel.name}
            </button>
          )}
        </div>

        {/* Direct Messages Section */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold">Direct Messages</span>
          </div>
          <div className="max-h-40 overflow-y-auto">
            <ul className="space-y-1">
              {recentDMs.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    setSelectedChannel(null);
                  }}
                  className={`flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer ${
                    selectedUser?.id === user.id ? "bg-gray-700" : ""
                  }`}
                >
                  <span className="text-sm">
                    @ {user.name || user.email || `User-${user.id}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section (User Avatar) */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-500"
          />
          <span className="ml-2">Your Name</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
