import React, { useEffect, useState } from "react";
import MainNavbar from "./components/MainNavbar";
import MainPageFilter from "./components/MainPageFilter";
import Test from "./Test";

function GetData() {
  const [albumData, setAlbumData] = useState();

  const fetchAlbumData = async () => {
    try {
      const response = await fetch("https://api.discogs.com/artists/1?");
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
      <Test albumData={albumData} />
    </div>
  );
}

export default GetData;
