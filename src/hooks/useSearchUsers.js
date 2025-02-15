import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants/api";
import { getItemFromLocalStorage } from "../utility/localstorage";

const useSearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/users`, {
        headers: {
          "Content-Type": "application/json",
          "access-token": getItemFromLocalStorage("access-token"),
          client: getItemFromLocalStorage("client"),
          expiry: getItemFromLocalStorage("expiry"),
          uid: getItemFromLocalStorage("uid"),
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      console.log("Fetched users:", data); // ✅ Debugging
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, users]);

  return { searchQuery, setSearchQuery, filteredUsers };
};

export default useSearchUsers;
