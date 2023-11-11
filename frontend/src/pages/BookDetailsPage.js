import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/Loader";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import ReviewsList from "../components/ReviewsList";
import { NavLink } from "react-router-dom";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axiosReq.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    getBooks();
  }, []);

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
      </div>

      <ReviewsList bookId={id} />
    </Container>
  );
};

export default BookDetailsPage;
