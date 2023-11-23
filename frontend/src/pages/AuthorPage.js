import React from "react";
import { useParams } from "react-router-dom";
import useReq from "../hooks/useReq";
import Loader from "../components/Loader";
import { Alert, Container } from "react-bootstrap";
import CompactBooksList from "../components/CompactBooksList";

const AuthorPage = () => {
  const { id } = useParams();

  const { data: author, loading, error } = useReq(`/api/authors/${id}`);

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
        <p className="text-danger">Error loading author.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>{author.full_name}</h2>
      <p>{author.description}</p>

      <h3>Author's books:</h3>
      <AuthorBooksList author_id={author.id} />
    </Container>
  );
};

export default AuthorPage;

const AuthorBooksList = ({ author_id }) => {
  const {
    data: books,
    loading,
    error,
  } = useReq(`/api/authors/${author_id}/books?page_size=15`);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert variant="danger">Error displaying books</Alert>;
  }

  return <CompactBooksList books={books.results} />;
};
