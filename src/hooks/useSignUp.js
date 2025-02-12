import { useState } from "react";
import { BASE_URL } from "../constants/api";

const DEFAULT_ERROR_VALUE = {
  email: null,
  password: null,
  password_confirmation: null,
};

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR_VALUE);
  const [isSuccess, setIsSuccess] = useState(false);

  // Frontend Form validation
  const validateForm = (userData) => {
    const errors = {};

    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Invalid email format";
    }

    if (!userData.password) {
      errors.password = "Password is required";
    } else if (userData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (userData.password_confirmation !== userData.password) {
      errors.password_confirmation = `Password confirmation doesn't match `;
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setIsLoading(true);
      setError(DEFAULT_ERROR_VALUE);
      setIsSuccess(false);

      // Validate form data
      const validationErrors = validateForm(userData);
      if (validationErrors) {
        setError(validationErrors);
        return;
      }

      // Make API call
      const response = await fetch(`${BASE_URL}/api/v1/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        setError({
          email: data?.errors?.email
            ? data?.errors?.email[0]
            : DEFAULT_ERROR_VALUE.email,
          password: data?.errors?.password
            ? data?.errors?.password[0]
            : DEFAULT_ERROR_VALUE.password,
          password_confirmation: data?.errors?.password_confirmation
            ? data?.errors?.password_confirmation[0]
            : DEFAULT_ERROR_VALUE.password_confirmation,
        });
        return;
      }

      setIsSuccess(true);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
    isSuccess,
  };
};

export default useSignup;
