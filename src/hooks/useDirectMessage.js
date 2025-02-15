import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants/api";
import { getItemFromLocalStorage } from "../utility/localstorage";

const useDirectMessages = (receiverId) => {
  const [messages, setMessages] = useState([]);

  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    if (!receiverId) {
      console.error("❌ Receiver ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/messages?receiver_id=${receiverId}&receiver_class=User`,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": getItemFromLocalStorage("access-token"),
            client: getItemFromLocalStorage("client"),
            expiry: getItemFromLocalStorage("expiry"),
            uid: getItemFromLocalStorage("uid"),
          },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.errors?.[0] || "Failed to fetch messages");

      console.log("✅ Fetched DM Messages:", data);
      setMessages(data.data);
    } catch (error) {
      console.error("❌ Error fetching messages:", error.message);
    }
  }, [receiverId]);

  // Fetch messages when receiverId changes
  useEffect(() => {
    if (receiverId) {
      fetchMessages();
    }
  }, [receiverId, fetchMessages]);

  // Send message
  const sendMessage = useCallback(
    async (message) => {
      if (!receiverId || !message) {
        console.error("❌ Receiver ID or message is missing!");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/v1/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": getItemFromLocalStorage("access-token"),
            client: getItemFromLocalStorage("client"),
            expiry: getItemFromLocalStorage("expiry"),
            uid: getItemFromLocalStorage("uid"),
          },
          body: JSON.stringify({
            receiver_id: receiverId,
            receiver_class: "User",
            body: message,
          }),
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.errors?.[0] || "Failed to send message");

        console.log("✅ DM Sent:", data);
        await fetchMessages(); // Refresh messages after sending
      } catch (error) {
        console.error("❌ Error sending message:", error.message);
      }
    },
    [receiverId, fetchMessages]
  );

  return { messages, sendMessage };
};

export default useDirectMessages;
