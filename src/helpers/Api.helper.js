import axios from "axios";

export const apiGenerator = ({ baseURL }) => {
  return async function api({ url, method = "GET", data, ...rest }) {
    try {
      const configOptions = {
        baseURL,
        url,
        method,
        headers: {
          "Content-Type": "application/json",
        },
        data,
        ...rest,
      };
      const response = await axios(configOptions);
      return response.data;
    } catch (error) {
      console.log("error", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An error occurred while making the API request.";
      throw new Error(errorMessage);
    }
  };
};
