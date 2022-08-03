import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import re4Merchant from "../assets/85-854627_got-somethin-that-might-interest-ya-merchant.png";

function LandingPage() {
  return (
    <Container>
      <Row>
        <Col>
          <h4>Welcome stranger!</h4>
          <img
            src={re4Merchant}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "5px",
            }}
          ></img>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
