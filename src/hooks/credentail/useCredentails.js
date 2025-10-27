//config
import { useCallback, useContext } from "react";
import { api, APIS_PAYLOAD } from "../../config/api.config";
//context
import { SessionContext } from "../../context/sessionContext/Session.context";
export const useCrendentails = () => {
  const { setSession } = useContext(SessionContext);
  const createPasswordEntry = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.CREATE_PASSWORD,
          "POST",
          payload
        );
        return response;
      } catch (e) {
        if (e?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error creating password entry:", e);
        throw e?.message;
      }
    },
    [setSession]
  );

  const getAllPasswords = useCallback(
    async ({ queryKey }) => {
      const [, userId, limit, search, category] = queryKey;
      try {
        const response = await api(
          `${APIS_PAYLOAD.GET_ALL_PASSWORDS}?id=${Number(
            userId
          )}&limit=${limit}&search=${search}&category=${category}`
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error fetching all passwords:", error);
        throw error?.message;
      }
    },
    [setSession]
  );

  const shareWithPassword = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.SHARE_PASSWORD,
          "POST",
          payload
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error sharing password:", error);
        throw error;
      }
    },
    [setSession]
  );

  const updatePassword = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.UPDATE_PASSWORD,
          "PUT",
          payload
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error updating password:", error);
        throw error?.message;
      }
    },
    [setSession]
  );
  const removeSharedPassword = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.REMOVE_SHARED_PASSWORD,
          "DELETE",
          payload
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error removing shared password:", error);
        throw error?.message;
      }
    },
    [setSession]
  );

  const deletePassword = useCallback(
    async (payload) => {
      try {
        const response = await api(
          APIS_PAYLOAD.REMOVE_PASSWORD,
          "DELETE",
          payload
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error deleting password:", error);
        throw error?.message;
      }
    },
    [setSession]
  );

  const passwordEntry = useCallback(
    async (payload) => {
      try {
        const response = await api(
          `${APIS_PAYLOAD.GET_PASSWORD_BY_ID}?passwordId=${payload.passwordId}&userId=${payload.userId}`,
          "GET"
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error fetching password entry:", error);
        throw error?.message;
      }
    },
    [setSession]
  );

  const getSecurityScore = useCallback(
    async ({ queryKey }) => {
      const [, userId] = queryKey;
      try {
        const response = await api(
          `${APIS_PAYLOAD.GET_SECURITY_SCORE}?userId=${userId}`,
          "GET"
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error fetching security score:", error);
        throw error;
      }
    },
    [setSession]
  );

  const getAllPasswordsScore = useCallback(
    async (userId) => {
      try {
        const response = await api(
          `${APIS_PAYLOAD.GET_ALL_PASSWORDS_SCORE}?userId=${userId}`,
          "GET"
        );
        return response;
      } catch (error) {
        if (error?.message === "Invalid or expired token") {
          setSession(true);
        }
        console.error("Error fetching all passwords score:", error);
        throw error;
      }
    },
    [setSession]
  );

  return {
    createPasswordEntry,
    getAllPasswords,
    shareWithPassword,
    updatePassword,
    removeSharedPassword,
    deletePassword,
    passwordEntry,
    getSecurityScore,
    getAllPasswordsScore,
  };
};
