import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
//config
import { api, APIS_PAYLOAD } from "../../config/api.config.js";
//context
import { SessionContext } from "../../context/sessionContext/Session.context.jsx";

export const useUserCreate = () => {
  const navigate = useNavigate();
  const { setSession } = useContext(SessionContext);
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
      if (e?.message === "Invalid or expired token") {
        setSession(true);
      }
      console.error("Error fetching users", e);
      throw e;
    }
  }, [setSession]);

  const fetchTempUsers = useCallback(async () => {
    try {
      const response = await api(APIS_PAYLOAD.TEMP_USER_ALL, "GET");
      return response?.users || [];
    } catch (e) {
      if (e?.message === "Invalid or expired token") {
        setSession(true);
      }
      console.error("Error fetching temp users:", e);
      throw e;
    }
  }, [setSession]);

  const updateUserCredentials = useCallback(
    async (payload) => {
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
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error updating user credentials:", error);
        throw error;
      }
    },
    [setSession, navigate]
  );

  const deleteUser = useCallback(
    async (userId) => {
      try {
        const response = await api(
          `${APIS_PAYLOAD.DELETE_USER}?id=${userId}`,
          "DELETE"
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error deleting user:", error);
        throw error;
      }
    },
    [setSession]
  );

  const deleteTempUser = useCallback(
    async (userId) => {
      try {
        const response = await api(
          `${APIS_PAYLOAD.DELETE_TEMP_USER}?id=${userId}`,
          "DELETE"
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error deleting temp user:", error);
        throw error;
      }
    },
    [setSession]
  );

  const passwordResetLink = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.SEND_RESET_PASSWORD_LINK,
          "POST",
          payload
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error sending password reset link:", error);
        throw error;
      }
    },
    [setSession]
  );

  const updatePassword = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.RESET_PASSWORD,
          "PATCH",
          payload
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error updating password:", error);
        throw error;
      }
    },
    [setSession]
  );

  const sendResetPinLink = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.SEND_RESET_PIN_LINK,
          "POST",
          payload
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error sending reset pin link:", error);
        throw error;
      }
    },
    [setSession]
  );

  const resetPin = useCallback(
    async (payload) => {
      try {
        const response = await api(APIS_PAYLOAD.RESET_PIN, "PATCH", payload);
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error resetting pin:", error);
        throw error;
      }
    },
    [setSession]
  );

  const countUsers = useCallback(async () => {
    try {
      const response = await api(APIS_PAYLOAD.USER_COUNTS, "GET");
      return response;
    } catch (error) {
      if (error?.message === "Invalid or expired token") {
        setSession(true);
      }
      console.error("Error counting users:", error);
      throw error;
    }
  }, [setSession]);

  const updateUser = useCallback(
    async (payload) => {
      try {
        const response = await api(
          `${APIS_PAYLOAD.UPDATE_USER}/${payload.userId}`,
          "PATCH",
          {
            username: payload.username,
            email: payload.email,
          }
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error updating user:", error);
        throw error;
      }
    },
    [setSession]
  );

  const getUserById = useCallback(
    async ({ queryKey }) => {
      const [_, email] = queryKey;
      try {
        const response = await api(
          `${APIS_PAYLOAD.GET_BY_USER_ID}?email=${email}`,
          "GET"
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error fetching user by ID:", error);
        throw error;
      }
    },
    [setSession]
  );

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
    updateUser,
    getUserById,
  };
};
