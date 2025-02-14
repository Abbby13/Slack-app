import { useState } from "react";
import useSearchUsers from "../hooks/useSearchUsers";

const SearchBar = ({ onUserSelect }) => {
  const { searchQuery, setSearchQuery, filteredUsers } = useSearchUsers();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full p-2 text-white bg-gray-700 border-none rounded-lg focus:outline-none"
      />

      {showDropdown && searchQuery && (
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
                  setSearchQuery("");
                }}
              >
                {user.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
