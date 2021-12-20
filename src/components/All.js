import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ItemDataService from "../services/ItemDataService";
import Item from "./Item";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";

export default function All() {
  const [items, setItems] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    ItemDataService.retrieve(`${process.env.REACT_APP_API_URL}/items/`)
      .then((data) => {
        setItems(data);
        setShowSpinner(false);
      })
      .catch((err) => {
        setShowToast(true);
      });
  }, []);

  return (
    <div style={{ marginTop: 50 }}>
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
          ) : showSpinner === false ? (
            <div>
              <h1>No items for sale now!</h1>
              <p> Check back at another time ;-) </p>
            </div>
          ) : (
            ""
          )}
        </Row>
      </Container>

      {/* Toast */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        bg={"danger"}
        style={{ position: "absolute", right: "1rem", top: "1rem" }}
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body style={{ color: "white", textAlign: "left" }}>
          There was an error! Please check back later.
        </Toast.Body>
      </Toast>
    </div>
  );
}
