import React, { useEffect, useState } from "react";
import MainNavbar from "./components/MainNavbar";
import MainPageFilter from "./components/MainPageFilter";
import DisplayCard from "./components/DisplayCard";
import LoadingPleaseWait from "./components/LoadingPleaseWait";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.discogs.com/database/search?${API_KEY}`;

function GetData() {
  const [albumData, setAlbumData] = useState();

  const fetchAlbumData = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?${API_KEY}`
      );
      const results = await response.json();
      setAlbumData(results);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchAlbumData();
  }, []);
  console.log("albumData", albumData);

  return (
    <div>
      <MainPageFilter />
      <Container>
        <Row>
          {!albumData ? (
            <LoadingPleaseWait />
          ) : (
            albumData.results.map((artist, index) => {
              return <DisplayCard artist={artist} index={index} />;
            })
          )}
        </Row>
      </Container>
    </div>
  );
}

export default GetData;
