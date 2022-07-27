import React, { useEffect, useState } from "react";
import DisplayCard from "./components/DisplayCard";
import LoadingPleaseWait from "./components/LoadingPleaseWait";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useFetchArtist } from "./components/utilities/useFetchArtist.js";

const API_KEY = process.env.REACT_APP_API_KEY;

function GetData({ searchInput }) {
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

  useEffect(() => {
    fetchAlbumData();
    // pagNum(); This was used by the pagination which is now moved to a different component
  }, []);

  console.log(albumData);

  let results = [];

  albumData &&
    albumData.results.map((element) => {
      let name = element.title.toUpperCase();
      name.includes(searchInput, 0)
        ? results.push(element)
        : console.log("no match");
    });

  console.log("results", results);
  // Search is working just need to replace albumData in the JSX below

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {!albumData ? (
          <LoadingPleaseWait />
        ) : (
          albumData.results.map((artist, index) => {
            return <DisplayCard artist={artist} index={index} />;
          })
        )}
      </Row>
    </Container>
  );
}

export default GetData;
