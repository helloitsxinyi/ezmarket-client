import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ItemDataService from "../services/ItemDataService";
import Item from "./Item";

export default function All() {
  const [items, setItems] = useState([{}]);

  useEffect(() => {
    ItemDataService.retrieve("http://localhost:8000/items/")
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // how to make error render slower/carousel run faster? hm
    // TODO: refactor and style so that div can be removed
    <div style={{ marginTop: 50 }}>
      <Container>
        <Row>
          <Carousel fade>
            {items.length !== 0 ? (
              items.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src="https://picsum.photos/400/150"
                    alt="slide"
                  />
                  <Carousel.Caption>
                    <Item item={item} key={index} />
                  </Carousel.Caption>
                </Carousel.Item>
              ))
            ) : (
              <div>
                <h1>No items for sale now!</h1>
                <p> Check back at another time ;-) </p>
              </div>
            )}
          </Carousel>
        </Row>
      </Container>
    </div>
  );
}
