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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [whoIsUser, setWhoIsUser] = useState(null);

  // Register new user
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsUserLoggedIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code ;", errorCode);
      console.log("Error Message ;", errorMessage);
    }
  };

  // Signin user with email
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setIsUserLoggedIn(true);
    } catch (error) {
      setIsUserLoggedIn(null);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code :", errorCode);
      console.log("Error Message :", errorMessage);
    }
  };

  // Check if user is signed in

  const signedInUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.email;
        console.log("The user is logged in Firebase");
        setWhoIsUser(uid);
        setIsUserLoggedIn(true);
      } else {
        console.log("The user is NOT logged into Firebase");
      }
    });
  };

  return (
    <LoginStoreContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        register,
        login,
        signedInUser,
        whoIsUser,
      }}
    >
      {props.children}
    </LoginStoreContext.Provider>
  );
};
