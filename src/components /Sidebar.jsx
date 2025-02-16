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
    <div className="group relative flex flex-col items-start w-16 hover:w-56 transition-all duration-300 h-screen bg-gray-800 text-white py-4 space-y-6 pb-20">
      {/* Top Section - Logo */}
      <div className="flex items-center justify-start w-full px-4">
        <div
          className="w-10 h-10 bg-gray-600 rounded-full"
          title="Company Logo"
        ></div>
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-xl">
          MyTeam
        </span>
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-start w-full space-y-2">
        <Link
          to="/home"
          className="flex items-center w-full px-4 py-2 rounded hover:bg-gray-700"
        >
          <HomeIcon size={24} />
          <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Home
          </span>
        </Link>
        <button className="flex items-center w-full px-4 py-2 rounded hover:bg-gray-700">
          <MessageSquare size={24} />
          <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Direct Messages
          </span>
        </button>
      </nav>

      {/* Divider */}
      <div className="w-full border-t border-gray-700"></div>

      {/* Search Bar */}
      <div className="w-full px-4">
        <SearchBar onUserSelect={handleSelectUser} />
      </div>

      {/* Channels Section */}
      <div className="w-full px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Channels
          </span>
          <button
            className="hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            title="Add Channel"
            onClick={handleCreateChannel}
          >
            <PlusCircle size={16} />
          </button>
        </div>
        {/* Scrollable list of channels */}
        <div className="overflow-y-auto max-h-[200px]">
          <ul className="space-y-1">
            {channels?.map((channel) => (
              <li
                key={channel.id}
                onClick={() => {
                  setSelectedChannel(channel);
                  setSelectedUser(null); // If you want to deselect user when channel is clicked
                }}
                className={`flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer ${
                  selectedChannel?.id === channel.id ? "bg-gray-700" : ""
                }`}
              >
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            className="mt-2 w-full text-left px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleOpenAddUserModal}
          >
            Add User to #{selectedChannel.name}
          </button>
        )}
      </div>

      {/* Direct Messages Section */}
      <div className="w-full px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Direct Messages
          </span>
          <button
            className="hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            title="Add DM"
          >
            <PlusCircle size={16} />
          </button>
        </div>
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
              <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                @ {user.name || user.email || `User-${user.id}`}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* User Avatar at the bottom */}
      <div className="absolute bottom-4 flex items-center w-full px-4">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-500"
        />
        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Your Name
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
