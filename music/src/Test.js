import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import LoadingPleaseWait from "./components/LoadingPleaseWait";

function Test({ albumData }) {
  console.log("albumData", albumData);

  return (
    <>
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
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Test;
