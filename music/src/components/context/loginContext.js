import React from "react";
import { createContext } from "react";

export const LoginStoreContext = createContext();

export const LoginStoreContextProvider = (props) => {
  console.log("props", props);
  // State variables goes here
  const someVariable = ["Super important stuff", "one", "two"];
  console.log("someVariable", someVariable);

  return (
    <LoginStoreContext.Provider value={{ someVariable }}>
      {props.children}
    </LoginStoreContext.Provider>
  );
};
