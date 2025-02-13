import { useState } from "react";
import { BASE_URL } from "../constants/api";
import {
  saveToLocalStorage,
  getItemFromLocalStorage,
} from "../utility/localstorage";

const useAuth = () => {
  const [user, setUser] = useState(getItemFromLocalStorage("user") || null);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid email or password");

      // Extract authentication headers from the response
      const accessToken = response.headers.get("access-token");
      const client = response.headers.get("client");
      const expiry = response.headers.get("expiry");
      const uid = response.headers.get("uid");

      if (!accessToken || !client || !expiry || !uid) {
        throw new Error("Missing authentication headers");
      }

      const userData = await response.json();

      // Save user and auth headers to localStorage
      saveToLocalStorage("user", userData);
      saveToLocalStorage("access-token", accessToken);
      saveToLocalStorage("client", client);
      saveToLocalStorage("expiry", expiry);
      saveToLocalStorage("uid", uid);

      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("expiry");
    localStorage.removeItem("uid");
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
