import React, { useEffect, useState } from "react";

function useFetchArtist() {
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?page=1&per_page=20${API_KEY}`
      );
      const results = await response.json();
      console.log("results inside the hook >>>", results);
      setFetchedData(results);
      setLoading(false);
    } catch (error) {
      console.log("error: >> ", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // fetchData();

  console.log("artistData inside the hook >>>", fetchedData);
  return fetchedData;
}

export default useFetchArtist;
