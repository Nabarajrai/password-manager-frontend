import { useState, useCallback } from "react";
import { api, APIS_PAYLOAD } from "../../config/api.config.js";

export const useAuth = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await api(APIS_PAYLOAD.LOGIN, "POST", credentials);
      console.log("Login response:", response);
      return response;
    } catch (error) {
      console.log("Login error:", error);
      setAuthError(error?.message || "Login failed. Please try again.");
      return error;
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userInfo) => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await api.post(APIS_PAYLOAD.SIGNUP, userInfo);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setAuthError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      return null;
    }
  }, []);
  return { login, error: authError, loading };
};
