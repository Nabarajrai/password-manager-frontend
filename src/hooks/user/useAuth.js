import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; //api
import { api, APIS_PAYLOAD } from "../../config/api.config.js";
//helpers
// import { clearLocalStorage } from "../../helpers/LocalStroage.helper.js";
//hooks
import { useUser } from "../user/useUser.jsx";
import { useToast } from "../toast/useToast.js";
export const useAuth = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showSuccessToast } = useToast();

  const login = useCallback(
    async (credentials) => {
      setLoading(true);
      setAuthError("");
      try {
        const response = await api(APIS_PAYLOAD.LOGIN, "POST", credentials);
        if (response?.status === "success") {
          showSuccessToast(response?.message);
          navigate("/", { replace: true });
        } else {
          setAuthError(response?.message);
        }
      } catch (error) {
        // if (error?.message === "expired") {
        //   navigate("/update-credential", { replace: true });
        //   showSuccessToast(
        //     "Session expired. Please update your credentials.",
        //     "error"
        //   );
        // } else {
        //   setAuthError(error?.message);
        // }
        setAuthError(error?.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate, showSuccessToast]
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
      return response.data;
    } catch (error) {
      return error?.message;
    }
  }, []);

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

  const updateCredentials = useCallback(async (payload) => {
    try {
      const response = await api(
        APIS_PAYLOAD.UPDATE_CREDENTIALS,
        "PATCH",
        payload
      );
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
    updateCredentials,
  };
};
