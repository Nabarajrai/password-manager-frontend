import { api, APIS_PAYLOAD } from "../../config/api.config";

export const useCategories = () => {
  const fetchCategories = async () => {
    try {
      const response = await api(APIS_PAYLOAD.CATEGORIES);
      return response?.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  return { fetchCategories };
};
