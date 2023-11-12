import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useReq from "../hooks/useReq";
import Loader from "../components/Loader";
import BookListItem from "../components/BookListItem";
import ConfirmDeleteButton from "../components/ConfirmDeleteButton";
import { axiosReq } from "../api/axiosDefaults";

const ListDetails = () => {
  const { id } = useParams();

  const { data: list, loading, error, refresh } = useReq(`/api/lists/${id}`);

  const onRemove = async (bookId) => {
    try {
      await axiosReq.delete(`/api/lists/${id}/books/${bookId}`);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="mb-4" key={book.id}>
            <BookListItem book={book} />
            <ConfirmDeleteButton
              btnText="Remove"
              modalHeader="Remove from list"
              modalBody={
                <span>
                  Remove <strong>{book.title}</strong> from{" "}
                  <strong>{list.name}</strong> list?
                </span>
              }
              onConfirm={() => onRemove(book.id)}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ListDetails;
