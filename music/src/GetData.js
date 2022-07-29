import React, { useEffect, useState } from "react";
import DisplayCard from "./components/DisplayCard";
import LoadingPleaseWait from "./components/LoadingPleaseWait";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useFetchArtist from "./components/utils/useFetchArtist.js";
import PaginationComponenet from "./components/PaginationComponent.js";

function GetData({ searchInput }) {
  // const page = 1;
  const [page, setPage] = useState(1);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [artistData, setArtistData] = useState(null);
  const fetchedData = useFetchArtist(page);
  let results = []; // used for the filterArtistData function

  const currentPage = () => {};

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

  useEffect(() => {
    setArtistData(fetchedData);
  }, [fetchedData]);

  console.log("GetData / ArtistData : ", artistData);

  // console.log("results", results);
  // Search is working just need to replace albumData in the JSX below

  return (
    <Container>
      <PaginationComponenet page={page} setPage={setPage} />
      <Row xs={1} md={2} className="g-4">
        {!artistData ? (
          <LoadingPleaseWait page />
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
