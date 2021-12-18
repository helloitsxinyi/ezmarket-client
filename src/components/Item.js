import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const currFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "SGD",
});

function Item({ item }) {
  return (
    <div>
      <Container>
        <Row>
          <h1>
            {item.itemName}{" "}
            <Link to={"/items/" + item.id} className="btn-edit">
              <Button variant="light" size="sm">
                Edit
              </Button>
            </Link>{" "}
          </h1>
          <h3>{item.shopName}</h3>
          <p> {currFormatter.format(item.price)}</p>
          {item.available ? (
            <Button variant="primary">Available</Button>
          ) : (
            <Button variant="danger">Sold out!</Button>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Item;
