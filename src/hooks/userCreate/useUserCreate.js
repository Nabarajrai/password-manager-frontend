import { useCallback } from "react";
import { api, APIS_PAYLOAD } from "../../config/api.config.js";

export const useUserCreate = () => {
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
      console.error("Error fetching users:", e);
      throw new Error(e);
    }
  }, []);

  const fetchTempUsers = useCallback(async () => {
    try {
      const response = await api(APIS_PAYLOAD.TEMP_USER_ALL, "GET");
      return response?.users || [];
    } catch (e) {
      console.error("Error fetching temp users:", e);
      throw new Error(e);
    }
  }, []);

  return { createUser, fetchUsers, fetchTempUsers };
};
