import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants/api";
import { getItemFromLocalStorage } from "../utility/localstorage";
import useUsers from "./useUsers";

const useChannels = () => {
  const [channels, setChannels] = useState([]);
  const { users } = useUsers();

  const fetchChannels = useCallback(async () => {
    try {
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

      let localMembership = {};
      try {
        const stored = window.localStorage.getItem("channelMembers");
        if (stored) {
          localMembership = JSON.parse(stored);
        }
      } catch (err) {
        console.error(
          "Error reading channel membership from localStorage:",
          err
        );
      }

      const channelsWithMembers = data.data.map((channel) => ({
        ...channel,
        members: localMembership[channel.id] || [],
      }));

      setChannels(channelsWithMembers);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const createChannel = useCallback(
    async (channelName, userIds = []) => {
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
        if (!response.ok) {
          throw new Error(responseData.error || "Failed to create channel");
        }
        const newChannel = {
          id: responseData.id,
          name: responseData.name || channelName,
          members: [],
        };
        setChannels((prev) => [...prev, newChannel]);
      } catch (error) {
        console.error("Error creating channel:", error.message);
      }
    },
    [fetchChannels]
  );

  const addMemberToChannel = async (channelId, userId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/channel/add_member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": getItemFromLocalStorage("access-token"),
          client: getItemFromLocalStorage("client"),
          expiry: getItemFromLocalStorage("expiry"),
          uid: getItemFromLocalStorage("uid"),
        },
        body: JSON.stringify({
          id: channelId,
          member_id: userId,
        }),
      });
      if (!response.ok) throw new Error("Failed to add user to channel");
      console.log(`User ${userId} added to channel ${channelId}`);
      const userToAdd = users.find((u) => u.id === userId);
      setChannels((prevChannels) => {
        const updatedChannels = prevChannels.map((channel) => {
          if (channel.id === channelId) {
            const currentMembers = channel.members || [];
            const alreadyExists = currentMembers.some((m) => m.id === userId);
            if (!alreadyExists && userToAdd) {
              return {
                ...channel,
                members: [...currentMembers, userToAdd],
              };
            }
          }
          return channel;
        });
        // Save updated membership info to localStorage
        const membershipMapping = updatedChannels.reduce((acc, channel) => {
          acc[channel.id] = channel.members || [];
          return acc;
        }, {});
        window.localStorage.setItem(
          "channelMembers",
          JSON.stringify(membershipMapping)
        );
        return updatedChannels;
      });
    } catch (error) {
      console.error("Error adding user to channel:", error.message);
    }
  };

  return {
    channels,
    createChannel,
    addMemberToChannel,
  };
};

export default useChannels;
