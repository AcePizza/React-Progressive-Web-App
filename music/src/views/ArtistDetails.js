import LoadingPleaseWait from "../components/LoadingPleaseWait";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/esm/Row";
import { LoginStoreContextProvider } from "../components/context/loginContext";
import useFetchArtist from "../components/utils/useFetchArtist";
import { useParams } from "react-router-dom";
import AlbumDisplay from "./AlbumDisplay";

const API_KEY = process.env.REACT_APP_API_KEY;

function ArtistDetails() {
  const [releases, setReleases] = useState();
  const [artistDetailData, setArtistDetailData] = useState(null);
  const fetchedArtistData = useFetchArtist();

  let { artistId } = useParams();

  const fetchReleases = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/artists/${artistId}/releases?${API_KEY}`
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

  useEffect(() => {
    setArtistDetailData(fetchedArtistData);
  }, [fetchedArtistData]);

  console.log("artistDetailData", artistDetailData);

  return (
    <Container>
      <p>Artist details for</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Album art</th>
            <th>Album Title</th>
            <th>Year</th>
          </tr>
        </thead>
        {!releases ? (
          <LoadingPleaseWait />
        ) : (
          releases.releases.map((element, index) => {
            return <AlbumDisplay element={element} index={index} />;
          })
        )}
      </Table>
    </Container>
  );
}

export default ArtistDetails;
