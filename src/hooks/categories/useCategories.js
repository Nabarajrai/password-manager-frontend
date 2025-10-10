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

  const updateCategory = async (payload) => {
    try {
      const response = await api(
        `${APIS_PAYLOAD.UPDATE_CATEGORY}/${Number(payload.categoryId)}`,
        "PUT",
        { name: payload.categoryName }
      );
      return response?.data;
    } catch (error) {
      if (error?.message === "Invalid or expired token") {
        setSession(true);
      }
      console.error("Error updating category:", error);
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await api(
        `${APIS_PAYLOAD.DELETE_CATEGORY}/${Number(categoryId)}`,
        "DELETE"
      );
      return response?.data;
    } catch (error) {
      if (error?.message === "Invalid or expired token") {
        setSession(true);
      }
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  const createCategory = async (payload) => {
    try {
      const response = await api(APIS_PAYLOAD.CREATE_CATEGORY, "POST", payload);
      return response?.data;
    } catch (error) {
      if (error?.message === "Invalid or expired token") {
        setSession(true);
      }
      console.error("Error creating category:", error);
      throw error;
    }
  };

  return { fetchCategories, updateCategory, deleteCategory, createCategory };
};
