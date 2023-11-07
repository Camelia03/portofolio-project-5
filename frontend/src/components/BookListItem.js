import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";

const BookListItem = ({ book }) => {
  const { id, title, number_of_pages, description, image_url } = book;

  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col xs="auto">
          <Image src={image_url} fluid rounded="start" alt="book image" />
        </Col>
        <Col>
          <Card.Body className="card-body">
            <Card.Title>
              <NavLink to={`books/${id}`}>{title}</NavLink>
            </Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BookListItem;
