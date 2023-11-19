import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Rating from "react-rating-stars-component";
import { NavLink, useParams } from "react-router-dom";
import AddToListModal from "../components/AddToListModal";
import BookReviewsList from "../components/BookReviewsList";
import Loader from "../components/Loader";
import useReq from "../hooks/useReq";

const BookDetailsPage = () => {
  const { id } = useParams();

  const { data: book, loading, error } = useReq(`/api/books/${id}`);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading book data.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col xs={12} md={4}>
          <Image src={book.image_url} fluid alt={book.title} />
        </Col>
        <Col xs={12} md={8}>
          <h2>{book.title}</h2>
          <p>
            <strong>Original Title:</strong> {book.original_title}
          </p>
          <Card.Text>
            <strong>Authors: </strong>
            {book.authors.map((author) => author.full_name).join(", ")}
          </Card.Text>
          <Card.Text>
            <strong>Genres: </strong>
            {book.genres.map((genre, idx) => (
              <span key={idx}>
                <NavLink to={`/genres/${genre.name}`}>{genre.name}</NavLink>
                {idx + 1 !== book.genres.length && (
                  <span className="me-1">,</span>
                )}
              </span>
            ))}
          </Card.Text>
          <p>
            <strong>ISBN:</strong> {book.ISBN}
          </p>
          <p>
            <strong>Publish date:</strong> {book.publish_date}
          </p>
          <div className="d-flex align-items-center mb-3">
            <strong className="me-2">Rating:</strong>
            <Rating
              value={Math.round(book.goodreads_average_rating)}
              count={5}
              size={24}
              edit={false}
            />
            <span>
              ({book.goodreads_average_rating}) ({book.goodreads_ratings_count}{" "}
              ratings)
            </span>
          </div>
          <p>
            <strong>Description:</strong> {book.description}
          </p>
          <p>
            <strong>Number of pages:</strong> {book.number_of_pages}
          </p>
          <p>
            <strong>Language code:</strong> {book.language_code}
          </p>
        </Col>
      </Row>

      <h2>Reviews</h2>

      <Button variant="primary" as={NavLink} to={`/books/${id}/review`}>
        Leave review
      </Button>

      <AddToListModal book={book} />

      <BookReviewsList bookId={id} />
    </Container>
  );
};

export default BookDetailsPage;
