import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ItemDataService from "../services/ItemDataService";
import Item from "./Item";
import Spinner from "react-bootstrap/Spinner";

export default function All() {
  const [items, setItems] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    ItemDataService.retrieve(`${process.env.REACT_APP_API_URL}/items/`)
      .then((data) => {
        setItems(data);
        setShowSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    // how to make error render slower/carousel run faster? hm
    // TODO: refactor and style so that div can be removed
    <div style={{ marginTop: 50 }}>
      {/* spinner does not have HIDE prop. find a less verbose way to show */}
      {/* spinner works, but delay is on carousel side */}
      {/* TODO: find how to improve carousel loading time */}
      {showSpinner ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        ""
      )}

      <Container>
        <Row>
          {items.length !== 0 ? (
            <Carousel fade>
              {items.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src="/images/grey_bg.png"
                    height={500}
                    width={400}
                    alt="slide"
                  />
                  <Carousel.Caption>
                    <Item item={item} key={index} />
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div>
              <h1>No items for sale now!</h1>
              <p> Check back at another time ;-) </p>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}
