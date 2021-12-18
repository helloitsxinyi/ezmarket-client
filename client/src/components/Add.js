import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ItemDataService from "../services/ItemDataService";
import { useParams, Link } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

function Add() {
  const [item, setItem] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setItem({ ...item, shopName: "(Shop)", itemName: "(Item)" });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const submit = () => {
    ItemDataService.add(`http://localhost:8000/items/`, item).then((res) => {
      setShowToast(true);
      if (res.status === 200) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
  };

  return (
    // TOAST
    // TODO: stack toasts
    // see: https://react-bootstrap.github.io/components/toasts/#toast-props
    <Container>
      <Container className="d-flex">
        <Row className="m-auto align-self-center">
          <Col>
            <Card
              style={{
                width: "35rem",
                top: "5rem",
              }}
            >
              <Card.Body>
                <Card.Title>
                  Adding <b>{item.itemName}</b> from <b>{item.shopName}</b>
                </Card.Title>
                {/* TODO: align text to left */}
                <Card.Header className="align-left">
                  <Form.Group as={Row} className="mb-3" controlId="shopName">
                    <Form.Label column sm={3}>
                      Shop name:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        placeholder="Shop name"
                        name="shopName"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="itemName">
                    <Form.Label column sm={3}>
                      Item name:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        name="itemName"
                        placeholder="Item name"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="price">
                    <Form.Label column sm={3}>
                      Price:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="price"
                        placeholder="Price"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="available">
                    <Form.Label column sm={3}>
                      Availability:
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Select
                        aria-label="Select..."
                        name="available"
                        value={
                          item.available === true ? "available" : "unavailable"
                        }
                        onChange={(e) => {
                          setItem({
                            ...item,
                            available:
                              e.target.value === "available" ? true : false,
                          });
                        }}
                      >
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col>
                      {/* TODO: fix button position */}
                      <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Link to={"/"} className="btn-custom">
                        <Button variant="secondary">Back</Button>
                      </Link>
                    </Col>
                  </Row>
                </Card.Header>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            bg={success ? "success" : "danger"}
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <Toast.Header>
              <strong className="me-auto">
                {" "}
                {success ? "Success" : "Error"}
              </strong>
            </Toast.Header>
            <Toast.Body style={{ color: "white", textAlign: "left" }}>
              {success
                ? "Successfully added!"
                : "There was an error processing your request! Please try again."}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
}

export default Add;
