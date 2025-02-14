import { useState, useEffect } from "react";
import useMessages from "../hooks/useMessages";

const Chatbox = ({ channelId }) => {
  const { messages, sendMessage } = useMessages(channelId);
  const [newMessage, setNewMessage] = useState("");

  if (!channelId) return <div>No channel selected</div>;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.length > 0 ? (
          messages.map((msg, index) => (
            <div key={msg.id || index} className="p-2 rounded-lg bg-gray-700">
              <strong>{msg.sender?.name || "User"}:</strong> {msg.body}
            </div>
          ))
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}
      </div>

      <div className="p-4 flex items-center bg-gray-800">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-700 rounded-md focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-green-600 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
