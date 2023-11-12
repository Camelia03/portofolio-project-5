import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useReq from "../hooks/useReq";
import Loader from "../components/Loader";
import BookListItem from "../components/BookListItem";

const ListDetails = () => {
  const { id } = useParams();

  const { data: list, loading, error } = useReq(`/api/lists/${id}`);

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
        <p className="text-danger">Error loading book lists.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>{list.name}</h2>

      <div>
        {list.books.map((book) => (
          <div key={book.id}>
            <BookListItem book={book} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ListDetails;
