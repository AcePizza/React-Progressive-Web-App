import React, { useEffect, useState } from "react";

function useFetchArtist(page) {
  const [fetchedData, setFetchedData] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?page=${
          !page && 1
        }&per_page=20${API_KEY}`
      );
      const results = await response.json();
      console.log("useFetchArtist / fetchdata() / results : ", results);
      setFetchedData(results);
    } catch (error) {
      console.log("useFetchArtist / fetchdata() / error :  ", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // fetchData();

  // console.log("useFetchArtist / fetchedData : ", fetchedData);
  return fetchedData;
}

export default useFetchArtist;
