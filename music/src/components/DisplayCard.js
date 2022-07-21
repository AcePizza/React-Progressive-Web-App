import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function DisplayCard({ artist, index }) {
  return (
    <Col key={index}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={artist.cover_image} />
        <Card.Body>
          <Card.Title>
            <Link to="details">{artist.title}</Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DisplayCard;
