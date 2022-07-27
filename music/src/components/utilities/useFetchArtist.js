import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function useFetchArtist() {
  const [albumData, setAlbumData] = useState();

  const fetchAlbumData = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?page=1&per_page=20${API_KEY}`
      );
      const results = await response.json();
      setAlbumData(results);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return fetchAlbumData;
}

export default useFetchArtist;
