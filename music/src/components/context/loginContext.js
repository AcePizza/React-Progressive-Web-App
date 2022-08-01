import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { createContext } from "react";
import { auth } from "../../config/config";

export const LoginStoreContext = createContext();

export const LoginStoreContextProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code ;", errorCode);
      console.log("Error Message ;", errorMessage);
    }
  };

  return (
    <LoginStoreContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn, register }}
    >
      {props.children}
    </LoginStoreContext.Provider>
  );
};
