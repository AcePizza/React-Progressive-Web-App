import React, { useState } from "react";
import { createContext } from "react";

export const LoginStoreContext = createContext();

export const LoginStoreContextProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <LoginStoreContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {props.children}
    </LoginStoreContext.Provider>
  );
};
