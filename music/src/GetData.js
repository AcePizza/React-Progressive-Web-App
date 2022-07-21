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
      console.log("page in fetch", page);
      setAlbumData(results);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const pagNum = () => {
    for (let i = 0; i <= 5; i++) {
      if (page === 1) {
        setFirst(1);
        setSecond(2);
        setThird(3);
        setForth(4);
        setFift(5);
      } else if (page === 2) {
        setFirst(2);
        setSecond(3);
        setThird(4);
        setForth(5);
        setFift(6);
      } else if (page === 3) {
        setFirst(3);
        setSecond(4);
        setThird(5);
        setForth(6);
        setFift(7);
      } else {
        setFirst(page - 2);
        setSecond(page - 1);
        setThird(page);
        setForth(page + 1);
        setFift(page + 2);
      }
    }
  };

  useEffect(() => {
    fetchAlbumData();
    pagNum();
  }, [page]);

  console.log("albumData", albumData);

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

              <Pagination.Item>{first}</Pagination.Item>
              <Pagination.Item>{second}</Pagination.Item>
              <Pagination.Item>{third}</Pagination.Item>
              <Pagination.Item>{forth}</Pagination.Item>
              <Pagination.Item>{fifth}</Pagination.Item>

              <Pagination.Next
                onClick={() => {
                  setPage(page + 1);
                }}
              />
              <Pagination.Last />
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
