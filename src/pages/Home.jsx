import { useState } from "react";
import { Sidebar } from "lucide-react";
import useChannels from "../hooks/useChannels";
import Chatbox from "../components /Chatbox";
import SearchBar from "../components /Searchbar";

const Home = () => {
  const { channels, createChannel } = useChannels();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreateChannel = () => {
    const channelName = prompt("Enter Channel Name");
    if (!channelName) return;
    createChannel(channelName, []);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />

      {/* Sidebar Section */}
      <div className="w-1/4 bg-gray-800 p-4 flex flex-col space-y-4">
        <SearchBar onUserSelect={(user) => setSelectedUser(user)} />

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Channels</h2>
            <button
              className="p-2 bg-green-600 rounded-lg hover:bg-green-700"
              onClick={handleCreateChannel}
            >
              +
            </button>
          </div>
          <ul>
            {channels?.map((channel, index) => (
              <li
                key={channel.id || `channel-${index}`}
                className={`p-2 rounded-lg cursor-pointer ${
                  selectedChannel?.id === channel.id
                    ? "bg-gray-600"
                    : "bg-gray-700"
                }`}
                onClick={() => setSelectedChannel(channel)}
              >
                # {channel.name || "Unnamed Channel"}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <Chatbox userId={selectedUser.id} />
        ) : selectedChannel ? (
          <Chatbox channelId={selectedChannel.id} />
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-400">
            Select a channel or user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
