import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/api";
import { getItemFromLocalStorage } from "../utility/localstorage";
import useUsers from "./useUsers";

const useChannels = () => {
  const [channels, setChannels] = useState(() => {
    const savedChannels = localStorage.getItem("channels");
    return savedChannels ? JSON.parse(savedChannels) : [];
  });

  const { users } = useUsers(); // Get users from the custom hook

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    if (channels.length > 0) {
      localStorage.setItem("channels", JSON.stringify(channels));
    }
  }, [channels]);

  const fetchChannels = async () => {
    try {
      if (channels.length > 0) return;
      const response = await fetch(`${BASE_URL}/api/v1/channels`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": getItemFromLocalStorage("access-token"),
          client: getItemFromLocalStorage("client"),
          expiry: getItemFromLocalStorage("expiry"),
          uid: getItemFromLocalStorage("uid"),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch channels");

      const data = await response.json();
      console.log("Fetched Channels:", data);
      setChannels(data);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const createChannel = async (channelName, userIds) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/channels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": getItemFromLocalStorage("access-token"),
          client: getItemFromLocalStorage("client"),
          expiry: getItemFromLocalStorage("expiry"),
          uid: getItemFromLocalStorage("uid"),
        },
        body: JSON.stringify({ name: channelName, user_ids: userIds }),
      });

      const responseData = await response.json();
      console.log("Channel Created Response:", responseData);

      if (!response.ok)
        throw new Error(responseData.error || "Failed to create channel");

      // Get user details based on user IDs
      const channelUsers = userIds.map((id) =>
        users.find((user) => user.id === id)
      );

      const newChannel = {
        id: responseData.id || Date.now(),
        name: responseData.name || channelName,
        users: channelUsers.length > 0 ? channelUsers : userIds, // Ensure user data exists
      };

      setChannels((prev) => [...prev, newChannel]);

      await fetchChannels();
    } catch (error) {
      console.error("Error creating channel:", error.message);
    }
  };

  return { channels, createChannel };
};

export default useChannels;
