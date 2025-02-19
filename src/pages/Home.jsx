import { useState, useRef } from "react";
import Sidebar from "../components /Sidebar";
import useChannels from "../hooks/useChannels";
import Chatbox from "../components /Chatbox";
import CreateChannelModal from "../components /CreateChannelModal";
import AddUserToChannelModal from "../components /AddUserToChannelModal";

const Home = () => {
  const { createChannel, addMemberToChannel } = useChannels();

  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [recentDMs, setRecentDMs] = useState([]);

  // Modals
  const createChannelModalRef = useRef(null);
  const addUserToChannelModalRef = useRef(null);

  // ---- Channel Creation ----
  const handleCreateChannel = () => {
    createChannelModalRef.current?.showModal();
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

  // ---- Adding Users to Channel ----
  const handleOpenAddUserModal = () => {
    addUserToChannelModalRef.current?.showModal();
  };

  const handleAddUserToChannel = async (user) => {
    if (!selectedChannel || !user) {
      console.log("No channel or user selected");
      return;
    }
    console.log(`Adding user ${user.id} to channel ${selectedChannel.id}`);
    try {
      await addMemberToChannel(selectedChannel.id, user.id);
      console.log("User added successfully!");
      addUserToChannelModalRef.current.close();
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  // ---- Handling User Selection for DMs ----
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedChannel(null);
    // Add user to recent DMs if not already added
    setRecentDMs((prev) => {
      if (prev.some((dm) => dm.id === user.id)) return prev;
      return [...prev, user];
    });
  };

  return (
    <div className="flex h-screen  bg-gray-900 text-white">
      {/* Modals */}
      <CreateChannelModal
        ref={createChannelModalRef}
        submitAction={handleCreateChannelApiCall}
      />
      <AddUserToChannelModal
        ref={addUserToChannelModalRef}
        channelId={selectedChannel?.id}
        addUser={handleAddUserToChannel}
      />

      {/* Sidebar (now handles channel listing & searching) */}
      <Sidebar
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleCreateChannel={handleCreateChannel}
        handleOpenAddUserModal={handleOpenAddUserModal}
        handleSelectUser={handleSelectUser}
        recentDMs={recentDMs}
      />

      {/* Main Chat Section */}
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
