import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; //api
import { api, APIS_PAYLOAD } from "../../config/api.config.js";
//helpers
import {
  setLocalStorage,
  clearLocalStorage,
} from "../../helpers/LocalStroage.helper.js";
//hooks
import { useUser } from "../user/useUser.jsx";
export const useAuth = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const login = useCallback(
    async (credentials) => {
      setLoading(true);
      setAuthError("");
      try {
        const response = await api(APIS_PAYLOAD.LOGIN, "POST", credentials);
        if (response?.status === "success") {
          try {
            setLocalStorage("user", response?.data);
          } catch (e) {
            console.error("Failed to save user:", e);
          }
          setUser(response?.data);
          navigate("/", { replace: true });
        } else {
          setAuthError(response?.message);
        }
      } catch (error) {
        setAuthError(error?.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser]
  );

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

  const logout = useCallback(async () => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await api(APIS_PAYLOAD.LOGOUT, "POST");
      if (response?.status === "success") {
        clearLocalStorage("user");
        setUser(null);
        navigate("/login");
      }
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setAuthError(error?.message || "Logout failed. Please try again.");
      return null;
    }
  }, [navigate, setUser]);

  return { login, error: authError, loading, logout, signup };
};
