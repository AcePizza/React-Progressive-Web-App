import React, { useEffect, useState } from "react";
import MainNavbar from "./components/MainNavbar";
import MainPageFilter from "./components/MainPageFilter";
import DisplayCard from "./components/DisplayCard";
import LoadingPleaseWait from "./components/LoadingPleaseWait";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Col from "react-bootstrap/esm/Col";

const API_KEY = process.env.REACT_APP_API_KEY;

function GetData({ searchInput }) {
  const [albumData, setAlbumData] = useState();
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(page);
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [forth, setForth] = useState();
  const [fifth, setFift] = useState();

  const fetchAlbumData = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?page=${page}&per_page=20${API_KEY}`
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
  }, [page]);

  console.log(albumData);

  // albumData &&
  //   albumData.results.filter((element) => {
  //     let name = element.title.toUpperCase();
  //     console.log("Something", name);
  //     console.log("Something", filter.toUpperCase());
  //   });

  let results = [];

  albumData &&
    albumData.results.map((element) => {
      let name = element.title.toUpperCase();
      name.includes(searchInput, 0)
        ? results.push(element)
        : console.log("no match");
    });
  console.log("results", results);

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
