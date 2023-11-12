import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import BookReviewsList from "../components/BookReviewsList";
import { NavLink } from "react-router-dom";
import useReq from "../hooks/useReq";
import AddToListModal from "../components/AddToListModal";

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

  if (error) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading book data.</p>
      </Container>
    );
  }
  return (
    <Container>
      <h2>{book.title}</h2>

      <h2>Reviews</h2>

      <div>
        <Button variant="primary" as={NavLink} to={`/books/${id}/review`}>
          Leave review
        </Button>

        <AddToListModal book={book} />
      </div>

      <BookReviewsList bookId={id} />
    </Container>
  );
};

export default BookDetailsPage;
