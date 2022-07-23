import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

import { useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
const API_KEY = process.env.REACT_APP_API_KEY;

function ArtistDetails() {
  const [releases, setReleases] = useState();

  const fetchReleases = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/artists/1/releases?${API_KEY}`
      );
      const results = await response.json();
      setReleases(results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  console.log("releases", releases);

  let { artistName } = useParams();
  console.log("useParams()", useParams());

  return (
    <div>
      <p>Artist details for {artistName}</p>
      <Container>
        <Row>
          <ListGroup>
            <ListGroupItem>
              Something <img src={releases.releases[3].thumb}></img>
            </ListGroupItem>
          </ListGroup>
        </Row>
      </Container>
    </div>
  );
}

export default ArtistDetails;
