import { useState, useEffect, useCallback } from "react";
import { BASE_URL } from "../constants/api";
import { getItemFromLocalStorage } from "../utility/localstorage";

const useUsers = () => {
  const [users, setUsers] = useState([]);

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
      console.log("Fetched Users:", data);
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const filterUser = useCallback(
    (searchTerm = "") => {
      console.log({ searchTerm });
      console.log({ users });
      return users.filter(
        (user) =>
          (user.firstName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (user.lastName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [users]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, fetchUsers, filterUser };
};

export default useUsers;
