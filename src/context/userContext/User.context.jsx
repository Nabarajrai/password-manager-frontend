import { createContext, useState } from "react";
//helpers
import { getLocalStorage } from "../../helpers/LocalStroage.helper.js";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});
export const UserProvider = ({ children }) => {
  console.log("context user", getLocalStorage("user"));
  const [user, setUser] = useState(getLocalStorage("user")); // Replace null with actual user state management logic
  console.log("UserProvider user:", user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
