import { useState } from "react";
import useChannels from "../hooks/useChannels";

function Channels() {
  const { channels, createChannel } = useChannels();
  const [newChannelName, setNewChannelName] = useState("");

  // Function to handle channel creation
  const handleCreateChannel = async () => {
    if (newChannelName.trim() === "") return;
    await createChannel(newChannelName);
    setNewChannelName("");
    document.getElementById("create-channel-modal").close(); // Close modal
  };

  return (
    <div className="p-4">
      {/* Button to open modal */}
      <button
        className="btn btn-primary w-full"
        onClick={() =>
          document.getElementById("create-channel-modal").showModal()
        }
      >
        + Create Channel
      </button>

      {/* Modal for Creating Channel */}
      <dialog id="create-channel-modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create a New Channel</h3>
          <input
            type="text"
            placeholder="Enter channel name"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            className="input input-bordered w-full mt-3"
          />
          <div className="modal-action">
            <button onClick={handleCreateChannel} className="btn btn-success">
              Create
            </button>
            <button
              onClick={() =>
                document.getElementById("create-channel-modal").close()
              }
              className="btn btn-error"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* List of Channels */}
      <ul className="mt-4 space-y-2">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className="p-2 bg-gray-700 rounded-lg cursor-pointer"
          >
            # {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Channels;
