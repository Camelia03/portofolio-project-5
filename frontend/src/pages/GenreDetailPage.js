import React from "react";
import { Container } from "react-bootstrap";
import useReq from "../hooks/useReq";
import BookListItem from "../components/BookListItem";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const GenreDetailPage = () => {
  const { name } = useParams();
  const {
    data: books,
    error,
    loading,
  } = useReq(`/api/books?genres__name=${name}`, [name]);

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
        <p className="text-danger">Error loading data.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-4">{name[0].toUpperCase() + name.slice(1)} Genre</h1>

      {books.results?.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </Container>
  );
};

export default GenreDetailPage;
