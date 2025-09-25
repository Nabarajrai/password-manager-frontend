import { api, APIS_PAYLOAD } from "../../config/api.config";
//context
import { useContext } from "react";
import { SessionContext } from "../../context/sessionContext/Session.context.jsx";

export const useCategories = () => {
  const { setSession } = useContext(SessionContext);
  const fetchCategories = async () => {
    try {
      const response = await api(APIS_PAYLOAD.CATEGORIES);
      return response?.data || [];
    } catch (error) {
      if (error?.message === "Invalid or expired token") {
        setSession(true);
      }
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  return { fetchCategories };
};
