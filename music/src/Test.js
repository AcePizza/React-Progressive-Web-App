import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import LoadingPleaseWait from "./LoadingPleaseWait";

function Test({ albumData }) {
  console.log("albumData", albumData);

  return (
    <div>
      <Container>
        <Card style={{ borderWidth: "2px" }}>
          <Card.Body>
            <Row>
              <Col>
                {!albumData ? (
                  <LoadingPleaseWait />
                ) : (
                  <Card style={{ borderWidth: "0px", width: "18rem" }}>
                    <Card.Img variant="top" src="./No_image_available.png" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                    </Card.Body>
                  </Card>
                )}
              </Col>
              <Col>
                {!albumData ? (
                  <LoadingPleaseWait />
                ) : (
                  <Card style={{ borderWidth: "0px", width: "18rem" }}>
                    <Card.Img variant="top" src="./No_image_available.png" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                    </Card.Body>
                  </Card>
                )}
              </Col>
              <Col>
                {!albumData ? (
                  <LoadingPleaseWait />
                ) : (
                  <Card style={{ borderWidth: "0px", width: "18rem" }}>
                    <Card.Img variant="top" src="./No_image_available.png" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Test;
