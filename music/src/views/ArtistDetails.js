import LoadingPleaseWait from "../components/LoadingPleaseWait";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { LoginStoreContext } from "../components/context/loginContext";
import useFetchArtist from "../components/utils/useFetchArtist";
import { useParams } from "react-router-dom";
import AlbumDisplay from "./AlbumDisplay";

function ArtistDetails() {
  const [releases, setReleases] = useState();
  const [artistDetailData, setArtistDetailData] = useState(null);
  const fetchedArtistData = useFetchArtist();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginStoreContext);
  const API_KEY = process.env.REACT_APP_API_KEY;

  /* the ID being sent from GetData in URL. It is defined in the route in app.js (Have a look you crook) */
  let artistId = useParams();
  const url = `https://api.discogs.com/artists/${artistId.artist}?${API_KEY}`;
  const fetchArtistResource = useFetchArtist(url);

  // The fetch for the albums
  const fetchReleases = async () => {
    try {
      const response = await fetch(
        `https://api.discogs.com/artists/${artistId.artist}/releases?${API_KEY}`
      );
      const results = await response.json();
      setReleases(results);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // So that fetchReleases only runs one time
  useEffect(() => {
    fetchReleases();
  }, []);

  // When the data from the fetch hook is changed then the artist detail data is updated with the fetched results
  useEffect(() => {
    setArtistDetailData(fetchedArtistData);
  }, [fetchedArtistData]);

  return (
    <Container>
      <p>{!fetchArtistResource ? "placeholder" : fetchArtistResource.name}</p>
      <img
        scr={
          !fetchArtistResource ? (
            <p>Whats going on here</p>
          ) : (
            fetchArtistResource.images[0].uri
          )
        }
      ></img>
      <p>
        Profile:{" "}
        {!fetchArtistResource ? "placeholder" : fetchArtistResource.profile}
      </p>
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
