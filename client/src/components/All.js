import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ItemDataService from "../services/ItemDataService";
import Item from "./Item";

export default function All() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    ItemDataService.retrieve("http://localhost:8000/items")
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ marginTop: 50 }}>
      <Container>
        <Carousel fade>
          {items.map((item, index) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/400/150"
                alt="slide"
              />
              <Carousel.Caption>
                <Item item={item} key={index} />
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
