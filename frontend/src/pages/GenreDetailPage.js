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

  const genreReq = useReq(`/api/genres/${name}`, [name]);

  if (loading || genreReq.loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </Container>
    );
  }

  if (error || genreReq.error) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading data.</p>
      </Container>
    );
  }

  const genre = genreReq.data;

  return (
    <Container>
      <h1 className="mb-4">
        {genre.name[0].toUpperCase() + genre.name.slice(1)} Genre
      </h1>

      {genre.description && <p>{genre.description}</p>}

      {books.results?.map((book) => (
        <div key={book.id} className="mb-3">
          <BookListItem book={book} />
        </div>
      ))}
    </Container>
  );
};

export default GenreDetailPage;
