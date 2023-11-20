import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import Rating from "react-rating-stars-component";

const BookListItem = ({ book, showImage = true }) => {
  const {
    id,
    title,
    summary,
    ISBN,
    authors,
    genres,
    image_url,
    goodreads_average_rating,
    goodreads_ratings_count,
  } = book;

  return (
    <Card>
      <Row className="g-0">
        {showImage && (
          <Col xs="auto">
            <Image src={image_url} fluid rounded="start" alt="book image" />
          </Col>
        )}
        <Col>
          <Card.Body className="card-body">
            <Card.Title>
              <NavLink to={`/books/${id}`}>{title}</NavLink>
            </Card.Title>
            <Card.Text>{summary}</Card.Text>
            <Card.Text>
              <strong>ISBN:</strong> {ISBN}
            </Card.Text>
            <Card.Text>
              <strong>Authors: </strong>
              {authors.map((author, idx) => (
                <span key={author.id}>
                  <NavLink to={`/authors/${author.id}`}>
                    {author.full_name}
                  </NavLink>

                  {idx + 1 != authors.length && <span className="me-1">,</span>}
                </span>
              ))}
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
            <Card.Text as="div" className="d-flex align-items-center">
              <strong className="me-2">Rating:</strong>
              <Rating
                value={Math.round(goodreads_average_rating)}
                count={5}
                size={24}
                edit={false}
              />
              <span>
                ({goodreads_average_rating}) ({goodreads_ratings_count} ratings)
              </span>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BookListItem;
