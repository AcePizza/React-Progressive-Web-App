import React, { useEffect, useState } from "react";
import DisplayCard from "./components/DisplayCard";
import LoadingPleaseWait from "./components/LoadingPleaseWait";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useFetchArtist from "./components/utils/useFetchArtist.js";
import PaginationComponenet from "./components/PaginationComponent.js";

function GetData({ searchInput }) {
  const [page, setPage] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [artistData, setArtistData] = useState(null);
  const url = `https://api.discogs.com/database/search?page=${
    !page ? 1 : page
  }&per_page=20${API_KEY}`;
  const fetchedData = useFetchArtist(url, page);
  let results = []; // used for the filterArtistData function

  const filterArtistData = (artistFilter) => {
    console.log("Inside filterArtistData");

    artistFilter &&
      artistFilter.results.map((element) => {
        let name = element.title.toUpperCase();
        name.includes(searchInput, 0)
          ? results.push(element)
          : console.log("no match");
      });
  };

  console.log("Navbar - searchInput : ", searchInput);

  useEffect(() => {
    setArtistData(fetchedData);
  }, [fetchedData]);

  // console.log("results", results);
  // Search is working just need to replace albumData in the JSX below

  return (
    <Container>
      <PaginationComponenet page={page} setPage={setPage} />
      <Row xs={1} md={2} className="g-4">
        {!artistData ? (
          <LoadingPleaseWait page={page} />
        ) : (
          artistData.results.map((artist, index) => {
            return <DisplayCard artist={artist} index={index} />;
          })
        )}
      </Row>
    </Container>
  );
}

export default GetData;
