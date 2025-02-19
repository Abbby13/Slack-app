import { useState, useEffect } from "react";
import useUsers from "../hooks/useUsers";

const SearchBar = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { filterUser } = useUsers();

  useEffect(() => {
    const _filteredUsers = filterUser(searchTerm || "");
    setFilteredUsers(_filteredUsers);
  }, [searchTerm, filterUser]);

  return (
    <div className="relative bg-gray-800 rounded-lg">
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

      {/* Dropdown */}
      {showDropdown && searchTerm && (
        <ul
          className="absolute left-0 top-full mt-1 w-full max-h-48 bg-gray-700 rounded-lg overflow-y-auto shadow-lg z-10"
          // ^ you can adjust max-h-48 to whatever height you prefer
        >
          {filteredUsers.length === 0 ? (
            <li className="p-2 text-gray-400">No users found</li>
          ) : (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                className="p-2 cursor-pointer hover:bg-gray-600 
                           overflow-hidden text-ellipsis whitespace-nowrap"
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
