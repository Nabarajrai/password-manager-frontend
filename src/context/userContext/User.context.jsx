import { createContext, useState } from "react";
//helpers
// import { getLocalStorage } from "../../helpers/LocalStroage.helper.js";

export const UserContext = createContext({
  // user: null,
  // setUser: () => {},
});
export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(getLocalStorage("user")); // Replace null with actual user state management logic
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
