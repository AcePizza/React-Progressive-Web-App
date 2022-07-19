import React from "react";
import Card from "react-bootstrap/Card";

function DisplayCard() {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>
            <a href="#details">Card Title</a>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DisplayCard;
