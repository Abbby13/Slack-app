import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/api";
import { getItemFromLocalStorage } from "../utility/localstorage";

const useMessages = (channelId) => {
  const [messages, setMessages] = useState([]);

  // Fetch messages when channelId changes
  useEffect(() => {
    if (channelId) {
      fetchMessages(channelId);
    }
  }, [channelId]);

  // Store messages in localStorage when messages update
  useEffect(() => {
    if (channelId && messages.length > 0) {
      localStorage.setItem(`messages_${channelId}`, JSON.stringify(messages));
    }
  }, [messages, channelId]);

  // Fetch messages from API
  const fetchMessages = async (channelId) => {
    if (!channelId) {
      console.error("❌ Channel ID is missing!");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/messages?receiver_id=${channelId}&receiver_class=Channel`,
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

      console.log("✅ Fetched Messages:", data);
      setMessages(data);
    } catch (error) {
      console.error("❌ Error fetching messages:", error.message);
    }
  };

  const sendMessage = async (channelId, message) => {
    if (!channelId || !message) {
      console.error("❌ Channel ID or message is missing!");
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
          receiver_id: channelId,
          receiver_class: "Channel",
          body: message,
        }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.errors?.[0] || "Failed to send message");

      console.log("✅ Message Sent:", data);
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("❌ Error sending message:", error.message);
    }
  };

  return { messages, sendMessage };
};

export default useMessages;
