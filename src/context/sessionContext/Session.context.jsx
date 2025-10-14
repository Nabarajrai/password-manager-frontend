/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const SessionContext = createContext({
  session: false,
  setSession: () => {},
});

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(false); // default false

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
