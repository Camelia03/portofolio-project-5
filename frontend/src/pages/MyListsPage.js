import React, { useState } from "react";
import useReq from "../hooks/useReq";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Nav,
  Row,
  Table,
} from "react-bootstrap";
import Loader from "../components/Loader";
import AppButton from "../components/AppButton";
import { NavLink } from "react-router-dom";
import ConfirmDeleteButton from "../components/ConfirmDeleteButton";
import { axiosReq } from "../api/axiosDefaults";
import AuthorsList from "../components/AuthorsList";
import styles from "../styles/MyListsPage.module.css";

const MyListsPage = () => {
  const { data: lists, loading, error, refresh } = useReq("/api/lists");
  const [activeListIndex, setActiveListIndex] = useState(0);

  const onDelete = async (listId) => {
    try {
      await axiosReq.delete(`/api/lists/${listId}`);
      refresh();
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  };

  const handleListClick = (index) => {
    setActiveListIndex(index);
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
      <div className="d-flex justify-content-between mb-3">
        <h2>My book lists</h2>

        <div>
          <AppButton as={NavLink} to="/my-lists/create">
            Create new list
          </AppButton>
        </div>
      </div>

      <Row>
        <Col xs="auto">
          <ListGroup as="ul">
            {lists.map((list, idx) => (
              <ListGroup.Item
                onClick={() => handleListClick(idx)}
                key={list.id}
                as="li"
                className={`${styles.ListItem} ${
                  idx === activeListIndex ? styles.Active : ""
                }`}
              >
                <span>
                  {list.name} ({list.books.length})
                </span>

                <AppButton
                  variant="clear"
                  as={NavLink}
                  to={`/my-lists/${list.id}/edit`}
                  className="ms-2"
                >
                  <i class="fa-solid fa-xs fa-pen-to-square"></i>
                </AppButton>

                <ConfirmDeleteButton
                  modalHeader="Delete list"
                  modalBody={
                    <span>
                      Are you sure you want to delete list:
                      <strong>{list.name}</strong>
                    </span>
                  }
                  onConfirm={() => onDelete(list.id)}
                >
                  {(handleShow) => (
                    <AppButton variant="clear" onClick={handleShow}>
                      <i class="fa-solid fa-xs fa-trash"></i>
                    </AppButton>
                  )}
                </ConfirmDeleteButton>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <BooksTable listId={lists[activeListIndex].id} />
        </Col>
      </Row>
    </Container>
  );
};

export default MyListsPage;

const BooksTable = ({ listId }) => {
  const {
    data: list,
    loading,
    error,
    refresh,
  } = useReq(`/api/lists/${listId}`);

  const onRemove = async (bookId) => {
    try {
      await axiosReq.delete(`/api/lists/${listId}/books/${bookId}`);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Alert variant="warning">Error loading books</Alert>;
  }

  const { books } = list;

  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Authors</th>
          <th>Publication date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, idx) => (
          <tr key={book.id}>
            <td>{idx + 1}</td>
            <td>
              <Image width="30" src={book.image_url} />
            </td>
            <td>
              <NavLink to={`/books/${book.id}`}>
                {book.original_title || book.title}
              </NavLink>
            </td>
            <td>
              <AuthorsList authors={book.authors} />
            </td>
            <td>{book.publish_date}</td>
            <td>
              <ConfirmDeleteButton
                modalHeader="Remove from list"
                modalBody={
                  <span>
                    Remove <strong>{book.title}</strong> from
                    <strong>{list.name}</strong> list?
                  </span>
                }
                onConfirm={() => onRemove(book.id)}
              >
                {(handleShow) => (
                  <AppButton
                    onClick={handleShow}
                    variant="clear"
                    title="Remove from list"
                  >
                    <i class="fa-solid fa-lg fa-square-minus"></i>
                  </AppButton>
                )}
              </ConfirmDeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
