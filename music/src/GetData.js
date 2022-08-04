import React, { useContext, useEffect, useState } from "react";
import DisplayCard from "./components/DisplayCard";
import LoadingPleaseWait from "./components/LoadingPleaseWait";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useFetchArtist from "./components/utils/useFetchArtist.js";
import PaginationComponenet from "./components/PaginationComponent.js";
import { LoginStoreContext } from "./components/context/loginContext";

function GetData({ searchInput }) {
  const [page, setPage] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [artistData, setArtistData] = useState(null);
  const url = `https://api.discogs.com/database/search?page=${
    !page ? 1 : page
  }&per_page=20${API_KEY}`;
  const fetchedData = useFetchArtist(url, page);

  const [filterResults, setFilterResults] = useState();

  // access to the conditional store value to check if user is currently loggedin (can be removed at some point)
  const { isUserLoggedIn } = useContext(LoginStoreContext);

  // The search filter (Needs to be activated)
  const filterArtistData = (artistData) => {
    console.log("Inside filterArtistData", artistData);
    let results = [];
    artistData &&
      artistData.results.map((element) => {
        let name = element.title.toUpperCase();
        name.includes(searchInput, 0)
          ? results.push(element)
          : console.log("no match");
      });
    setFilterResults(results);
  };

  useEffect(() => {
    setArtistData(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    filterArtistData(fetchedData);
  }, [searchInput]);

  console.log("results", filterResults);

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
