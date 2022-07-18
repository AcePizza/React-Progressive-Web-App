import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

function Test({ albumData }) {
  console.log("albumData", albumData);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card style={{ borderWidth: "2px" }}>
              <Card.Body>
                {!albumData ? "some error" : albumData.name}
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Image className="rounded" src="holder.js/100px180"></Image>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Test;
