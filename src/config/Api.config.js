import { apiGenerator } from "./../helpers/Api.helper";

export const api = apiGenerator({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const APIS_PAYLOAD = {
  LOGIN: "api/auth/login",
  SIGNUP: "api/auth/register",
  LOGOUT: "api/auth/logout",
  FORGOT_PASSWORD: "api/auth/forgot-admin-password",
  CREATE_USER: "api/create-user-by-admin",
};
