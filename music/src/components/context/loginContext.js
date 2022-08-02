import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { createContext } from "react";
import { auth } from "../../config/config";

export const LoginStoreContext = createContext();

export const LoginStoreContextProvider = (props) => {
  //  This value is use to check if the user is singned in in the protected route
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();

  // Register new user
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsUserLoggedIn(userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code ;", errorCode);
      console.log("Error Message ;", errorMessage);
    }
  };

  // Written asyn await (Gives same error)
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsUserLoggedIn(userCredential.user);
    } catch (error) {
      setIsUserLoggedIn(null);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code :", errorCode);
      console.log("Error Message :", errorMessage);
    }
  };

  return (
    <LoginStoreContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        register,
        login,
      }}
    >
      {props.children}
    </LoginStoreContext.Provider>
  );
};
