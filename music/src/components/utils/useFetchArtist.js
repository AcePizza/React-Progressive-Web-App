import React, { useEffect, useState } from "react";

function useFetchArtist(url, page) {
  const [fetchedData, setFetchedData] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;
  // console.log("useFetchArtist - page : ", page);
  const currentPage = page;
  // const useURL = `${url}page=${currentPage}&per_page=20${API_KEY}`;
  const useURL = `${url}`;

  const fetchData = async (a, b) => {
    console.log("useURL", useURL);

    try {
      const response = await fetch(useURL);
      const results = await response.json();
      setFetchedData(results);
    } catch (error) {
      console.log("useFetchArtist / fetchdata() / error :  ", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return fetchedData;
}

export default useFetchArtist;
