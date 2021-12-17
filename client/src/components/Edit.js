import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ItemDataService from "../services/ItemDataService";
import { useParams, Link, useNavigate } from "react-router-dom";

function Edit() {
  const [item, setItem] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ItemDataService.retrieve(`http://localhost:8000/items/${id}`)
      .then((data) => {
        setItem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const submit = () => {
    ItemDataService.update(`http://localhost:8000/items/${id}`, item).then(
      (res) => {
        if (res.status === 200) {
          alert("Updated successfully!");
          // TODO: implement toast to show successful update, else error
          navigate("/");
        } else {
          alert("There was an error in your update. please try again!");
        }
      }
    );
  };

  return (
    // TODO: fix placement of card
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
                      defaultValue={item.shopName}
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
                      defaultValue={item.itemName}
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
                      defaultValue={item.price}
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
                    <Button variant="danger" type="">
                      Delete
                    </Button>
                  </Col>
                  <Col>
                    <Link to={"/"} className="btn-custom">
                      <Button variant="light" type="">
                        Back
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Header>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Edit;
