import { Link } from "react-router-dom";
import Sidebar from "../components /Sidebar";
import Channels from "../components /Channels";
import useChannels from "../hooks/useChannels";

import React from "react";

const Home = () => {
  const { channels, createChannel } = useChannels();

  const handleCreateChannel = () => {
    const channelName = prompt("Enter Channel Name");
    if (!channelName) return;
    createChannel(channelName, []); // Empty user array for now
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="w-1/4 bg-gray-800 p-4 flex flex-col space-y-4">
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
            {channels.map((channel) => (
              <li
                key={channel.id}
                className="p-2 bg-gray-700 rounded-lg cursor-pointer"
              >
                # {channel.name || "Unnamed Channel"}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto"></div>
        <div className="p-4 bg-gray-800">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 bg-gray-700 rounded-md focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
