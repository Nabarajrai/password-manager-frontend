import { useCallback } from "react";
import { api, APIS_PAYLOAD } from "../../config/api.config.js";

export const useUserCreate = () => {
  const createUser = useCallback(async (userInfo) => {
    const response = await api(APIS_PAYLOAD.CREATE_USER, "POST", userInfo);
    return response;
  }, []);
  return { createUser };
};
