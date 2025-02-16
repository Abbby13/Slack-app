import { useState, useEffect, forwardRef } from "react";
import useUsers from "../hooks/useUsers";

const AddUserToChannelModal = forwardRef(({ channelId, addUser }, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const { filterUser } = useUsers();

  useEffect(() => {
    const _filteredUsers = filterUser(searchTerm || "");
    setFilteredUsers(_filteredUsers);
  }, [searchTerm, filterUser]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!selectedUser || !selectedUser.id) {
      console.log("Invalid user selected:", selectedUser);
      return;
    }

    addUser(selectedUser);

    setSelectedUser(null);
    ref.current?.close();
  };

  return (
    <dialog id="add-user-modal" className="modal" ref={ref}>
      <form onSubmit={handleSubmit} className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => ref.current?.close()}
          type="button"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Add User to Channel</h3>

        {/* Search Input */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            className="w-full p-2 text-white bg-gray-700 border-none rounded-lg focus:outline-none"
          />

          {showDropdown && searchTerm && (
            <ul className="mt-2 bg-gray-700 rounded-lg">
              {filteredUsers.length === 0 ? (
                <li className="p-2 text-gray-400">No users found</li>
              ) : (
                filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="p-2 cursor-pointer hover:bg-gray-600"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDropdown(false);
                      setSearchTerm("");
                    }}
                  >
                    {user?.name || user?.email}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Selected User */}
        {selectedUser && (
          <p className="mt-2 text-gray-400">Selected: {selectedUser.name}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-secondary mr-3">
            Add
          </button>
          <button
            className="btn btn-active btn-neutral"
            type="button"
            onClick={() => ref.current?.close()}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default AddUserToChannelModal;
