//config
import { useCallback } from "react";
import { api, APIS_PAYLOAD } from "../../config/api.config";
import ResetPin from "../../pages/resetPin/ResetPin";
export const useCrendentails = () => {
  const createPasswordEntry = useCallback(async (payload) => {
    try {
      const response = await api(APIS_PAYLOAD.CREATE_PASSWORD, "POST", payload);
      return response;
    } catch (e) {
      throw e?.message;
    }
  }, []);

  const getAllPasswords = useCallback(async ({ queryKey }) => {
    const [, userId, limit, search, category] = queryKey;
    try {
      const response = await api(
        `${APIS_PAYLOAD.GET_ALL_PASSWORDS}?id=${Number(
          userId
        )}&limit=${limit}&search=${search}&category=${category}`
      );
      return response;
    } catch (error) {
      throw error?.message;
    }
  }, []);

  const shareWithPassword = useCallback(async (payload) => {
    const response = await api(APIS_PAYLOAD.SHARE_PASSWORD, "POST", payload);
    return response;
  }, []);

  const updatePassword = useCallback(async (payload) => {
    try {
      const response = await api(APIS_PAYLOAD.UPDATE_PASSWORD, "PUT", payload);
      return response;
    } catch (error) {
      throw error?.message;
    }
  }, []);
  const removeSharedPassword = useCallback(async (payload) => {
    try {
      const response = await api(
        APIS_PAYLOAD.REMOVE_SHARED_PASSWORD,
        "DELETE",
        payload
      );
      return response;
    } catch (error) {
      throw error?.message;
    }
  }, []);

  const deletePassword = useCallback(async (payload) => {
    try {
      const response = await api(
        APIS_PAYLOAD.REMOVE_PASSWORD,
        "DELETE",
        payload
      );
      return response;
    } catch (error) {
      throw error?.message;
    }
  }, []);

  const passwordEntry = useCallback(async (payload) => {
    try {
      const response = await api(
        `${APIS_PAYLOAD.GET_PASSWORD_BY_ID}?passwordId=${payload.passwordId}&userId=${payload.userId}`,
        "GET"
      );
      return response;
    } catch (error) {
      throw error?.message;
    }
  }, []);
  return {
    createPasswordEntry,
    getAllPasswords,
    shareWithPassword,
    updatePassword,
    removeSharedPassword,
    deletePassword,
    passwordEntry,
  };
};
