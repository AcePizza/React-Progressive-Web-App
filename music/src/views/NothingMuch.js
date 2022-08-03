import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import mapImage from "../assets/image-asset.jpeg";

function NothingMuch() {
  return (
    <Container>
      <h4>Here there be dragons</h4>
      <Row>
        <Col>
          {" "}
          <img
            src={mapImage}
            style={{
              height: "200px",
              width: "250px",
              borderRadius: "5px",
            }}
          ></img>
        </Col>{" "}
        <a href="/home">Click here to return to home</a>
      </Row>
    </Container>
  );
}

export default NothingMuch;
