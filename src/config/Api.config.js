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
  FETCH_USERS: "api/allUsers",
  CATEGORIES: "api/get-all-categories",
  ROLES: "api/roles",
  TEMP_USER_ALL: "api/all-temp-users",
  UPDATE_USER_CREDENTIALS: "api/update-password-pin",
  DELETE_USER: "api/delete-user",
  DELETE_TEMP_USER: "api/delete-temp-user",
  SEND_RESET_PASSWORD_LINK: "api/send-reset-password-link",
  RESET_PASSWORD: "api/reset-password",
  SEND_RESET_PIN_LINK: "api/send-reset-pin-link",
  RESET_PIN: "api/reset-pin",
  USER_COUNTS: "api/user-counts",
  CREATE_PASSWORD: "api/create-password",
  GET_ALL_PASSWORDS: "api/get-all-passwords",
  SHARE_PASSWORD: "api/share-password",
  UPDATE_PASSWORD: "api/update-password",
  REMOVE_SHARED_PASSWORD: "api/remove-shared-password",
  REMOVE_PASSWORD: "api/remove-password",
};
