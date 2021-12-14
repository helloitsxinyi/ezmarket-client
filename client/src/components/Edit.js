import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ItemDataService from "../services/ItemDataService";
import { useParams } from "react-router-dom";

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
    <div>
      <Container className="d-flex vh-100">
        <Row className="m-auto align-self-center">
          <Col>
            <Card
              style={{
                width: "18rem",
              }}
            >
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Card.Title>
                  Editing {item.itemName} from {item.shopName}
                </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Edit;
