import React from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import useReq from "../../hooks/useReq";
import BooksList from "./BooksList";

const GenreDetailPage = () => {
  // Get genre name from the url
  const { name } = useParams();

  // Fetch genre by name
  const { loading, data: genre, error } = useReq(`/api/genres/${name}`, [name]);

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
        <Alert variant="danger">Error loading genre.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-4">
        {genre.name[0].toUpperCase() + genre.name.slice(1)} Genre
      </h1>

      {genre.description && <p>{genre.description}</p>}

      <BooksList genre={name} />
    </Container>
  );
};

export default GenreDetailPage;
