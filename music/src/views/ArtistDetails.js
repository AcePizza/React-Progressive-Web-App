import LoadingPleaseWait from "../components/LoadingPleaseWait";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import useFetchArtist from "../components/utils/useFetchArtist";
import { useParams } from "react-router-dom";
import AlbumDisplay from "./AlbumDisplay";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { LoginStoreContext } from "../components/context/loginContext";
import { LikeContext } from "../components/context/likeContext";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function ArtistDetails() {
  const [releases, setReleases] = useState();
  const [artistDetailData, setArtistDetailData] = useState(null);
  const fetchedArtistData = useFetchArtist();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginStoreContext);
  const { getFavorites, buttonInput, setButtonInput, setFavorites } =
    useContext(LikeContext);

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

  const handleButtonChange = () => {
    setFavorites(artistId);
  };

  // So that fetchReleases only runs one time
  useEffect(() => {
    fetchReleases();
  }, []);

  // When the data from the fetch hook is changed then the artist detail data is updated with the fetched results
  useEffect(() => {
    setArtistDetailData(fetchedArtistData);
  }, [fetchedArtistData]);

  useEffect(() => {
    getFavorites(artistId);
  }, []);

  return (
    <Container>
      <h4>
        {!fetchArtistResource ? (
          <LoadingPleaseWait />
        ) : (
          fetchArtistResource.name
        )}
      </h4>
      <img
        height={"100%"}
        width={"100%"}
        src={
          !fetchArtistResource ? (
            <LoadingPleaseWait />
          ) : (
            fetchArtistResource.images[0].uri
          )
        }
        alt={
          !fetchArtistResource ? "Nothing to display" : fetchArtistResource.name
        }
        style={{ borderRadius: "5px" }}
      ></img>{" "}
      <Row>
        <Col>
          Profile:{" "}
          {!fetchArtistResource ? (
            <p>No info availible</p>
          ) : (
            fetchArtistResource.profile
          )}
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <ToggleButtonGroup
            type="checkbox"
            value={buttonInput}
            onChange={handleButtonChange}
          >
            <ToggleButton id="tbg-btn-1" value={1}>
              Like
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <br></br>
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
