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

function GetData() {
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

  const pagNum = () => {
    let generatedNumbers = Array.from(Array(5), (_, index) => index + page);
    setFirst(generatedNumbers[0]);
    setSecond(generatedNumbers[1]);
    setThird(generatedNumbers[2]);
    setForth(generatedNumbers[3]);
    setFift(generatedNumbers[4]);
  };

  useEffect(() => {
    fetchAlbumData();
    pagNum();
  }, [page]);

  // console.log("albumData", albumData);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Pagination>
              <Pagination.First
                onClick={() => {
                  setPage(1);
                }}
              />
              <Pagination.Prev
                onClick={() => {
                  if (page <= 1) {
                    return null;
                  } else {
                    setPage(page - 1);
                  }
                }}
              />

              <Pagination.Item active={page === first ? true : false}>
                {first}
              </Pagination.Item>
              <Pagination.Item active={page === second ? true : false}>
                {second}
              </Pagination.Item>
              <Pagination.Item active={page === third ? true : false}>
                {third}
              </Pagination.Item>
              <Pagination.Item active={page === forth ? true : false}>
                {forth}
              </Pagination.Item>
              <Pagination.Item active={page === fifth ? true : false}>
                {fifth}
              </Pagination.Item>

              <Pagination.Next
                onClick={() => {
                  setPage(page + 1);
                }}
              />
              <Pagination.Last
                onClick={() => {
                  setPage(albumData.pagination.pages);
                }}
              />
            </Pagination>
          </Col>
        </Row>
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
