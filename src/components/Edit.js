import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ItemDataService from "../services/ItemDataService";
import { useParams, Link, useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

function Edit() {
  const [item, setItem] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    ItemDataService.retrieve(`${process.env.REACT_APP_API_URL}/items/${id}`)
      .then((data) => {
        setItem(data);
        setShowSpinner(false);
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
    ItemDataService.update(
      `${process.env.REACT_APP_API_URL}/items/${id}`,
      item
    ).then((res) => {
      setShowToast(true);
      if (res.status === 200) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    });
  };

  const deleteItem = () => {
    ItemDataService.delete(`${process.env.REACT_APP_API_URL}/items/${id}`)
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        setSuccess(false);
        handleClose();
        setShowToast(true);
      });
  };

  return (
    <div style={{ marginTop: 50 }}>
      {showSpinner ? (
        <div>
          <h1>Loading...</h1>
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
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
                    Editing <b>{item.itemName}</b> from <b>{item.shopName}</b>
                  </Card.Title>
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
                            item.available === true
                              ? "available"
                              : "unavailable"
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
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={submit}
                        >
                          Submit
                        </Button>
                      </Col>
                      <Col>
                        <Button variant="danger" onClick={handleShow}>
                          Delete
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
      )}

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg={success ? "success" : "danger"}
        style={{ position: "absolute", right: "1rem", top: "1rem" }}
      >
        <Toast.Header>
          <strong className="me-auto"> {success ? "Success" : "Error"}</strong>
        </Toast.Header>
        <Toast.Body style={{ color: "white", textAlign: "left" }}>
          {success
            ? "Successfully updated!"
            : "There was an error processing your request! Please try again."}
        </Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{item.itemName} </b>from{" "}
          <b>{item.shopName}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Edit;
