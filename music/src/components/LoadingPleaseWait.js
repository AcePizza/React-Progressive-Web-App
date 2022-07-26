import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/Spinner";

function LoadingPleaseWait() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Spinner animation="grow" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoadingPleaseWait;
