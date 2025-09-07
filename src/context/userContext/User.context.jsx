import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Replace null with actual user state management logic
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
