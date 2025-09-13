import axios from "axios";

export const apiGenerator = ({ baseURL }) => {
  return async function api(url, method = "GET", data, config = {}) {
    try {
      const configOptions = {
        baseURL,
        url,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        data,
        withCredentials: true,
        ...config,
      };
      const response = await axios(configOptions);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      throw new Error(errorMessage);
    }
  };
};
