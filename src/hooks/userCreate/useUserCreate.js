import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
//config
import { api, APIS_PAYLOAD } from "../../config/api.config.js";

export const useUserCreate = () => {
  const navigate = useNavigate();
  const createUser = useCallback(async (userInfo) => {
    try {
      const response = await api(APIS_PAYLOAD.CREATE_USER, "POST", userInfo);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }, []);
  const fetchUsers = useCallback(async () => {
    try {
      const response = await api(APIS_PAYLOAD.FETCH_USERS, "GET");
      return response || [];
    } catch (e) {
      console.log("Error fetching users", e);
      throw e;
    }
  }, []);

  const fetchTempUsers = useCallback(async () => {
    try {
      const response = await api(APIS_PAYLOAD.TEMP_USER_ALL, "GET");
      return response?.users || [];
    } catch (e) {
      console.error("Error fetching temp users:", e);
      throw e;
    }
  }, []);

  const updateUserCredentials = useCallback(
    async (payload) => {
      console.log("Payload for updating credentials", payload);
      try {
        const response = await api(
          APIS_PAYLOAD.UPDATE_USER_CREDENTIALS,
          "POST",
          payload
        );
        if (response.status === "success") {
          navigate("/login");
        }
        return response;
      } catch (error) {
        console.error("Error updating user credentials:", error);
        throw error;
      }
    },
    [navigate]
  );

  const deleteUser = useCallback(async (userId) => {
    try {
      const response = await api(
        `${APIS_PAYLOAD.DELETE_USER}?id=${userId}`,
        "DELETE"
      );
      return response;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }, []);

  const deleteTempUser = useCallback(async (userId) => {
    try {
      const response = await api(
        `${APIS_PAYLOAD.DELETE_TEMP_USER}?id=${userId}`,
        "DELETE"
      );
      return response;
    } catch (error) {
      console.error("Error deleting temp user:", error);
      throw error;
    }
  }, []);

  const passwordResetLink = useCallback(async (payload) => {
    try {
      const response = await api(
        APIS_PAYLOAD.SEND_RESET_PASSWORD_LINK,
        "POST",
        payload
      );
      return response;
    } catch (error) {
      console.error("Error sending password reset link:", error);
      throw error;
    }
  }, []);

  const updatePassword = useCallback(async (payload) => {
    try {
      const response = await api(APIS_PAYLOAD.RESET_PASSWORD, "PATCH", payload);
      return response;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }, []);

  const sendResetPinLink = useCallback(async (payload) => {
    try {
      const response = await api(
        APIS_PAYLOAD.SEND_RESET_PIN_LINK,
        "POST",
        payload
      );
      return response;
    } catch (error) {
      console.error("Error sending reset pin link:", error);
      throw error;
    }
  }, []);

  const resetPin = useCallback(async (payload) => {
    try {
      const response = await api(APIS_PAYLOAD.RESET_PIN, "PATCH", payload);
      return response;
    } catch (error) {
      console.error("Error resetting pin:", error);
      throw error;
    }
  }, []);

  const countUsers = useCallback(async () => {
    try {
      const response = await api(APIS_PAYLOAD.USER_COUNTS, "GET");
      return response;
    } catch (error) {
      console.error("Error counting users:", error);
      throw error;
    }
  }, []);

  return {
    createUser,
    fetchUsers,
    fetchTempUsers,
    updateUserCredentials,
    deleteUser,
    deleteTempUser,
    passwordResetLink,
    updatePassword,
    sendResetPinLink,
    resetPin,
    countUsers,
  };
};
