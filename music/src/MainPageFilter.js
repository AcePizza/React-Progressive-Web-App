import React from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";

function MainPageFilter() {
  return (
    <Container>
      <Card style={{ borderWidth: "2px", padding: "10px" }}>
        <Row>
          <Col>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default MainPageFilter;
