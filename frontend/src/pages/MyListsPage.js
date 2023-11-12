import React from "react";
import useReq from "../hooks/useReq";
import { Button, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";
import ConfirmDeleteButton from "../components/ConfirmDeleteButton";
import { axiosReq } from "../api/axiosDefaults";

const MyListsPage = () => {
  const { data: lists, loading, error, refresh } = useReq("/api/lists");

  const onDelete = async (listId) => {
    try {
      await axiosReq.delete(`/api/lists/${listId}`);
      refresh();
    } catch (error) {
      console.log(error);
      // TODO: handle error
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
      <h2>My book lists</h2>

      <div>
        <Button as={NavLink} to="/my-lists/create">
          Create new list
        </Button>
      </div>

      <div>
        {lists.length > 0 ? (
          lists.map((list) => (
            <div className="mb-4" key={list.id}>
              <NavLink to={`/my-lists/${list.id}`}>
                {list.name} {list.created_at} {list.books.length} books
              </NavLink>

              <div>
                <ConfirmDeleteButton
                  modalHeader="Delete list"
                  modalBody={
                    <span>
                      Are you sure you want to delete list:{" "}
                      <strong>{list.name}</strong>
                    </span>
                  }
                  onConfirm={() => onDelete(list.id)}
                />

                <Button as={NavLink} to={`/my-lists/${list.id}/edit`}>
                  Edit
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>No lists created</div>
        )}
      </div>
    </Container>
  );
};

export default MyListsPage;
