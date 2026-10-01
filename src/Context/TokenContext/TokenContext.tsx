import { createContext, useEffect, useState, type ReactNode } from "react";

export const tokenContext = createContext();

const TokenContextProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isAuthnticated, setIsAuthnticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setUserToken(localStorage.getItem("token"));
      setIsAuthnticated(true);
    }
  }, []);

  function saveUserToken(token: string) {
    setUserToken(token);
    setIsAuthnticated(true);
    localStorage.setItem("token", token);
  }

  function logOutContext() {
    setUserToken(null);
    localStorage.removeItem("token");
    setIsAuthnticated(false);
  }

  console.log(userToken, "context");

  return (
    <tokenContext.Provider value={{ saveUserToken, userToken, isAuthnticated,logOutContext }}>
      {children}
    </tokenContext.Provider>
  );
};

export default TokenContextProvider;
