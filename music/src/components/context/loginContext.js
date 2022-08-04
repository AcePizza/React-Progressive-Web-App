import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../../config/config";

export const LoginStoreContext = createContext();

export const LoginStoreContextProvider = (props) => {
  //  This value is use to check if the user is singned in in the protected route
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  // This value is set by the check if user is logged in function and is used when a new message is added to the DB
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
      setIsUserLoggedIn(false);
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

  const logout = async () => {
    try {
      const singout = await signOut(auth);
      setIsUserLoggedIn(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  useEffect(() => {
    signedInUser();
  }, []);

  return (
    <LoginStoreContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        register,
        login,
        logout,
        signedInUser,
        whoIsUser,
      }}
    >
      {props.children}
    </LoginStoreContext.Provider>
  );
};
