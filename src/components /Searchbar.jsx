import { useState, useEffect } from "react";
import useUsers from "../hooks/useUsers";

const SearchBar = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { filterUser } = useUsers();

  useEffect(() => {
    const _filteredUsers = filterUser(searchTerm || "");
    setFilteredUsers(_filteredUsers);
  }, [searchTerm, filterUser]);

  return (
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
                  onUserSelect(user);
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
  );
};

export default SearchBar;
