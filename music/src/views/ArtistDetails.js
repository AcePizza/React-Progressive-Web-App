import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";

import { useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import { LoginStoreContextProvider } from "../components/context/loginContext";
const API_KEY = process.env.REACT_APP_API_KEY;

function ArtistDetails() {
  const [releases, setReleases] = useState();

  let { artistName } = useParams();

  const fetchReleases = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/artists/${artistName}/releases?${API_KEY}`
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

  // console.log("releases", releases);

  return (
    <Container>
      <p>Artist details for {artistName}</p>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Album art</th>
              <th>Artist</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={releases && releases.releases[0].thumb}></img>
              </td>
              <td>{releases && releases.releases[0].artist}</td>
              <td>{releases && releases.releases[0].title}</td>
            </tr>
            <tr>
              <td>
                <img src={releases && releases.releases[1].thumb}></img>
              </td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default ArtistDetails;
