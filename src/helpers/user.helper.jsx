import { useContext } from "react";
import { UserContext } from "../context/userContext/User.context.jsx";

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};
