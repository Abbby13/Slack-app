import { useState } from "react";
import { BASE_URL } from "../constants/api";
import {
  saveToLocalStorage,
  getItemFromLocalStorage,
} from "../utility/localstorage";

const useAuth = () => {
  // Initialize user state with what’s stored in localStorage (if anything)
  const [user, setUser] = useState(() => {
    const storedUser = getItemFromLocalStorage("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.warn("Error parsing user from localStorage:", error);
      return storedUser; // or null
    }
  });

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid email or password");

      // Extract auth headers
      const accessToken = response.headers.get("access-token");
      const client = response.headers.get("client");
      const expiry = response.headers.get("expiry");
      const uid = response.headers.get("uid");

      if (!accessToken || !client || !expiry || !uid) {
        throw new Error("Missing authentication headers");
      }

      // Parse the response JSON
      const responseData = await response.json();
      // Extract the actual user data from the response
      const actualUser = responseData.data;

      // Save user and tokens to localStorage
      saveToLocalStorage("user", actualUser);
      saveToLocalStorage("access-token", accessToken);
      saveToLocalStorage("client", client);
      saveToLocalStorage("expiry", expiry);
      saveToLocalStorage("uid", uid);

      // Update state
      setUser(actualUser);
      return actualUser;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const logout = () => {
    try {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("access-token");
      window.localStorage.removeItem("client");
      window.localStorage.removeItem("expiry");
      window.localStorage.removeItem("uid");
    } catch (error) {
      console.error("Error removing auth data from localStorage:", error);
    }
    setUser(null);
  };

  return { user, login, logout };
};

export default useAuth;
