import React, { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/Spinner";
import { LoginStoreContext } from "./context/loginContext";

function LoadingPleaseWait({ page }) {
  return (
    <>
      <Container key={page}>
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
