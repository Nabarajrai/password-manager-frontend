import { api, APIS_PAYLOAD } from "../../config/api.config.js";

export const useRole = async () => {
  const fetchRoles = async () => {
    const response = await api(APIS_PAYLOAD.ROLES);
    return response?.data;
  };
  return { fetchRoles };
};
