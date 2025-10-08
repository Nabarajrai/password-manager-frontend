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
import { useToast } from "../toast/useToast.js";
export const useAuth = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const { showSuccessToast } = useToast();

  const login = useCallback(
    async (credentials) => {
      setLoading(true);
      setAuthError("");
      try {
        const response = await api(APIS_PAYLOAD.LOGIN, "POST", credentials);
        if (response?.status === "success") {
          setLocalStorage("user", response?.data);
          setUser(response?.data);
          showSuccessToast(response?.message);
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
    [navigate, setUser, showSuccessToast]
  );

  const signup = useCallback(
    async (userInfo) => {
      setLoading(true);
      setAuthError("");
      try {
        const response = await api(APIS_PAYLOAD.SIGNUP, "POST", userInfo);
        if (response?.status === "success") {
          showSuccessToast(response?.message);
          navigate("/login", { replace: true });
        } else {
          setAuthError(response?.message);
        }
      } catch (error) {
        setLoading(false);
        setAuthError(error?.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showSuccessToast, navigate]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setAuthError("");
    try {
      const response = await api(APIS_PAYLOAD.LOGOUT, "POST");
      if (response?.status === "success") {
        clearLocalStorage("user");
        setUser(null);
        showSuccessToast(response?.message);
        navigate("/login");
      }
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setAuthError(error?.message || "Logout failed. Please try again.");
      return null;
    }
  }, [navigate, setUser, showSuccessToast]);

  const pinService = useCallback(async (payload) => {
    try {
      const response = await api(APIS_PAYLOAD.PIN_SERVICE, "POST", payload);
      return response;
    } catch (error) {
      throw error?.message;
    }
  }, []);

  const verifyToken = useCallback(async () => {
    try {
      const response = await api(APIS_PAYLOAD.VERIFY_TOKEN);
      return response;
    } catch (error) {
      throw error?.message;
    }
  }, []);

  return {
    login,
    authError,
    loading,
    logout,
    signup,
    setAuthError,
    pinService,
    verifyToken,
  };
};
