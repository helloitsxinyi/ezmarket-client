import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ItemDataService from "../services/ItemDataService";
import { useParams, Link } from "react-router-dom";

function Edit(props) {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    ItemDataService.retrieve(`http://localhost:8000/items/${id}`)
      .then((data) => {
        setItem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center">
        <Col>
          <Card
            style={{
              width: "35rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                Editing {item.itemName} from {item.shopName}
              </Card.Title>
              {/* TODO: align text to left */}
              <Card.Text className="align-left">
                <Form.Group as={Row} className="mb-3" controlId="shopName">
                  <Form.Label column sm={3}>
                    Shop name:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Shop name"
                      defaultValue={item.shopName}
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
                      placeholder="Item name"
                      defaultValue={item.itemName}
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
                      placeholder="Price"
                      defaultValue={item.price}
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
                      onChange={(e) => {
                        console.log(e.target.value);
                        console.log(item.available);
                      }}
                    >
                      {/* TODO: render first option as Avail/Unavail according to item.available */}
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Row>
                  <Col>
                    {/* TODO: fix button position */}
                    {/* TODO: implement functionality to update info (PUT) upon
                    clicking submit */}
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="danger" type="">
                      Delete
                    </Button>
                  </Col>
                  <Col>
                    <Link to={"/"} className="btn-custom">
                      <Button variant="light" type="">
                        Back
                      </Button>
                    </Link>{" "}
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Edit;
