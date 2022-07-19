import React, { useEffect, useState } from "react";
import MainNavbar from "./components/MainNavbar";
import MainPageFilter from "./components/MainPageFilter";
import Test from "./Test";
import DisplayCard from "./components/DisplayCard";
import LoadingPleaseWait from "./components/LoadingPleaseWait";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.discogs.com/database/search?${API_KEY}`;

function GetData() {
  const [albumData, setAlbumData] = useState();

  const fetchAlbumData = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?${API_KEY}`
      );
      const results = await response.json();
      setAlbumData(results);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchAlbumData();
  }, []);

  return (
    <div>
      <MainNavbar />
      <MainPageFilter />
      {!albumData ? <LoadingPleaseWait /> : <p>Didnt happen</p>}
    </div>
  );
}

export default GetData;
