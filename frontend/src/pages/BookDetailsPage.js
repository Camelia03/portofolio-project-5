import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Rating from "react-rating-stars-component";
import { NavLink, useParams } from "react-router-dom";
import AddToListModal from "../components/AddToListModal";
import BookReviewsList from "../components/BookReviewsList";
import Loader from "../components/Loader";
import useReq from "../hooks/useReq";
import AppButton from "../components/AppButton";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const BookDetailsPage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();

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
        <Col xs={12} md={3}>
          <div className="mb-3">
            <Image src={book.image_url} fluid alt={book.title} />
          </div>

          {currentUser && (
            <AddToListModal book={book}>
              {(handleShow) => (
                <AppButton variant="primary" onClick={handleShow}>
                  Add to list
                </AppButton>
              )}
            </AddToListModal>
          )}
        </Col>
        <Col xs={12} md={9}>
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

      <div className="mb-3 d-flex justify-content-between">
        <h3 className="mb-0 me-3">
          <i className="fa-solid fa-worm fa-sm"></i> Bookworms Reviews
        </h3>

        {currentUser && (
          <AppButton variant="primary" as={NavLink} to={`/books/${id}/review`}>
            <i className="fa-solid fa-sm fa-plus"></i> add review
          </AppButton>
        )}
      </div>

      <BookReviewsList bookId={id} />
    </Container>
  );
};

export default BookDetailsPage;
