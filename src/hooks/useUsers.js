import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/api";
import { getItemFromLocalStorage } from "../utility/localstorage";

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return { users, fetchUsers };
};

export default useUsers;
