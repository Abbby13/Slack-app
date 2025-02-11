import { useEffect, useState } from "react";
import TEMP_USERS from "../data/users";

const useUsers = () => {
  const [users, setUsers] = useState(() => {
    if (localStorage.getItem("users")) {
      return [...JSON.parse(localStorage.getItem("users"))];
    } else {
      return [...TEMP_USERS];
    }
  });

  const addUser = (user) => {
    let loadedUsers = localStorage.getItem("users")
      ? [...JSON.parse(localStorage.getItem("users"))]
      : [];

    let updatedUsers = [...loadedUsers, user];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const updateUser = (id, user) => {
    setUsers((prevUsers) =>
      prevUsers.map((mUser) =>
        mUser.id === id ? { ...mUser, ...user } : mUser
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]); // ✅ Now only updates when `users` changes

  return { users, updateUser, addUser };
};

export default useUsers;
