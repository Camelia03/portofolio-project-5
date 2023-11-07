import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Loader from "../components/Loader";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import useReq from "../hooks/useReq";

const HomePage = () => {
  const { data: books, loading, error } = useReq(`/api/books`);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading profile data.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Home Page</h1>

      {books?.results.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </Container>
  );
};

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

export default HomePage;
