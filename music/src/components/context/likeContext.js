import React, { createContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { auth } from "../../config/config";
import { db } from "../../config/config.js";

export const LikeContext = createContext();

export const LikeContextProvider = (props) => {
  const [favoriteArtist, setFavoriteArtist] = useState(() => {
    return "";
  });
  const [buttonInput, setButtonInput] = useState();

  const getFavorites = async (artistID) => {
    console.log("getFavorites runs...");
    console.log("artistID", artistID.artist);

    const docRef = doc(db, "favorites", artistID.artist);
    const docSnap = await getDoc(docRef);

    docSnap.exists
      ? console.log("document data : ", docSnap.data())
      : console.log("Nothing");
  };

  const setFavorites = async () => {};

  return (
    <>
      <LikeContext.Provider
        value={{
          favoriteArtist,
          setFavoriteArtist,
          getFavorites,
          buttonInput,
          setButtonInput,
          setFavorites,
        }}
      >
        {props.children}
      </LikeContext.Provider>
    </>
  );
};
