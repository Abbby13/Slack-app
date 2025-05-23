import { useState } from "react";
import useMessages from "../hooks/useMessages";
import useDirectMessages from "../hooks/useDirectMessage";
import { getItemFromLocalStorage } from "../utility/localstorage";

const MESSAGE_STYLE = {
  ownMessage: "justify-end",
  otherMessage: "justify-start",
};

const currentUser = JSON.parse(getItemFromLocalStorage("user"));

const Chatbox = ({ receiverId, receiverClass }) => {
  // Determine which hook to use based on receiverClass
  const isChannel = receiverClass === "Channel";
  const { messages, sendMessage } = isChannel
    ? useMessages(receiverId)
    : useDirectMessages(receiverId);

  const [newMessage, setNewMessage] = useState("");

  if (!receiverId) return <div>No conversation selected</div>;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col bg-gray-800 h-full">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.length > 0 ? (
          messages.map((msg, index) => {
            const additionalStyle =
              msg.sender.id == currentUser?.data?.id
                ? MESSAGE_STYLE.ownMessage
                : MESSAGE_STYLE.otherMessage;

            return (
              <div key={msg.id || index} className={`flex ${additionalStyle}`}>
                <div className="p-2 rounded-lg bg-gray-800">
                  {/* Sender + Message on one line */}
                  <p className="text-sm">
                    <strong>
                      @{" "}
                      {msg.sender?.name ||
                        msg.sender?.email ||
                        `User-${msg.sender?.id}`}
                    </strong>
                    : {msg.body}
                  </p>
                  {/* Timestamp on the next line */}
                  <p className="mt-1 text-xs text-gray-400 text-left">
                    {new Date(msg.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}
      </div>

      {/* Input Box */}
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
