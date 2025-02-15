import { useState, useRef } from "react";
import { Sidebar } from "lucide-react";
import useChannels from "../hooks/useChannels";
import Chatbox from "../components /Chatbox";
import SearchBar from "../components /Searchbar";
import CreateChannelModal from "../components /CreateChannelModal";

const Home = () => {
  const { channels, createChannel } = useChannels();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [recentDMs, setRecentDMs] = useState([]); // Track DM'ed users

  const createChannelModalRef = useRef(null);

  const handleCreateChannel = () => {
    if (createChannelModalRef.current) {
      createChannelModalRef.current.showModal();
    }
  };

  const handleCreateChannelApiCall = async (channelName) => {
    if (!channelName) return;
    try {
      await createChannel(channelName, []);
      createChannelModalRef.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedChannel(null); // Ensure only one chat type is selected at a time

    // Add user to recent DMs if not already added
    setRecentDMs((prev) => {
      if (prev.some((dm) => dm.id === user.id)) return prev;
      return [...prev, user];
    });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <CreateChannelModal
        ref={createChannelModalRef}
        submitAction={handleCreateChannelApiCall}
      />
      <Sidebar />

      {/* Sidebar Section */}
      <div className="w-1/4 bg-gray-800 p-4 flex flex-col space-y-4">
        {/* Search for Users */}
        <SearchBar onUserSelect={handleSelectUser} />

        {/* Channels List */}
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
                onClick={() => {
                  setSelectedChannel(channel);
                  setSelectedUser(null); // Ensure only one chat type is selected at a time
                }}
              >
                # {channel.name || "Unnamed Channel"}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent DMs List */}
        <div>
          <h2 className="text-lg font-bold mt-4">Recent DMs</h2>
          {recentDMs.length > 0 ? (
            <ul>
              {recentDMs.map((user) => (
                <li
                  key={user.id}
                  className={`p-2 rounded-lg cursor-pointer ${
                    selectedUser?.id === user.id ? "bg-gray-600" : "bg-gray-700"
                  }`}
                  onClick={() => handleSelectUser(user)}
                >
                  @ {user.name || user.email || `User-${user.id}`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No recent DMs</p>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <Chatbox receiverId={selectedUser.id} receiverClass="User" />
        ) : selectedChannel ? (
          <Chatbox receiverId={selectedChannel.id} receiverClass="Channel" />
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
