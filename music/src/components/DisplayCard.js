import React, { useContext, useState } from "react";
import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { Link } from "react-router-dom";
import { LoginStoreContext } from "../components/context/loginContext";
import { LikeContext } from "./context/likeContext";

function DisplayCard({ artist, index }) {
  const artistName = artist;
  const { isUserLoggedIn } = useContext(LoginStoreContext);
  const { buttonInput, setButtonInput } = useContext(LikeContext);

  const handleButtonChange = () => {};

  return (
    <Col key={index}>
      <Card
        key={index}
        style={{
          width: "100%",
        }}
      >
        <Card.Img className="fluid" variant="top" src={artist.cover_image} />
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>
                <Link to={`details/${artistName.id}`}>{artistName.title}</Link>
              </Card.Title>
            </Col>
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
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DisplayCard;
