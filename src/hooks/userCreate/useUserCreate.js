import { useCallback } from "react";
import { api, APIS_PAYLOAD } from "../../config/api.config.js";

export const useUserCreate = () => {
  const createUser = useCallback(async (userInfo) => {
    console.log("user info in hook", userInfo);
    const response = await api(APIS_PAYLOAD.CREATE_USER, "POST", userInfo);
    return response;
  }, []);
  const fetchUsers = useCallback(async () => {
    const response = await api(APIS_PAYLOAD.FETCH_USERS, "GET");
    return response;
  }, []);
  return { createUser, fetchUsers };
};
