import { api, APIS_PAYLOAD } from "../../config/api.config";

export const useCategories = () => {
  const fetchCategories = async () => {
    const response = await api(APIS_PAYLOAD.CATEGORIES);
    return response;
  };

  return { fetchCategories };
};
