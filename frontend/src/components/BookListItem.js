import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import Rating from "react-rating-stars-component";

const BookListItem = ({ book }) => {
  const {
    id,
    title,
    summary,
    ISBN,
    authors,
    genres,
    image_url,
    goodreads_average_rating,
  } = book;

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
            <Card.Text>{summary}</Card.Text>
            <Card.Text>
              <strong>ISBN:</strong> {ISBN}
            </Card.Text>
            <Card.Text>
              <strong>Authors: </strong>
              {authors.map((author) => author.full_name).join(", ")}
            </Card.Text>
            <Card.Text>
              <strong>Genres: </strong>
              {genres.map((genre, idx) => (
                <span key={idx}>
                  <NavLink to={`/genres/${genre.name}`}>{genre.name}</NavLink>

                  {idx + 1 != genres.length && <span className="me-1">,</span>}
                </span>
              ))}
            </Card.Text>
            <Card.Text>
              <strong>Rating:</strong>
              <Rating
                value={goodreads_average_rating}
                count={5}
                size={24}
                edit={false}
              />
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BookListItem;
