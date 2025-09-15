import { useCallback } from "react";
import { api, APIS_PAYLOAD } from "../../config/api.config.js";

export const useRole = () => {
  const fetchRoles = useCallback(async () => {
    const response = await api(APIS_PAYLOAD.ROLES);
    return response;
  }, []);
  return { fetchRoles };
};
