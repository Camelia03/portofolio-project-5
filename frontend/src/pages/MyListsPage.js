import React, { useEffect, useState } from "react";
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
import useNotification from "../hooks/useNotification";

const MyListsPage = () => {
  const { data: initialLists, loading, error, refresh } = useReq("/api/lists");
  const [activeListId, setActiveListId] = useState();

  const [lists, setLists] = useState([]);

  const showNotification = useNotification();

  useEffect(() => {
    if (!initialLists) return;

    setLists([...initialLists]);
    setActiveListId(initialLists[0].id);
  }, [initialLists]);

  const removeList = (listId) => {
    setLists((prevLists) => {
      const lists = prevLists.filter((list) => list.id !== listId);

      if (listId === activeListId && lists.length > 0) {
        setActiveListId(lists[0].id);
      }

      return lists;
    });
  };

  const onDelete = async (listId) => {
    try {
      await axiosReq.delete(`/api/lists/${listId}`);

      showNotification({
        header: "List",
        message: "List deleted successfully",
      });

      removeList(listId);
    } catch (error) {
      showNotification({
        header: "List",
        message: "List could not be deleted",
        type: "danger",
      });
    }
  };

  const handleListClick = (id) => {
    setActiveListId(id);
  };

  const handleBookRemove = (listId) => {
    setLists((prevLists) => {
      const lists = [];

      for (let i = 0; i < prevLists.length; i++) {
        const list = prevLists[i];

        let books_count = list.books_count;
        if (list.id === listId) {
          books_count--;
        }

        lists.push({ ...list, books_count });
      }

      return lists;
    });
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
        <Col md="auto">
          <ListGroup as="ul">
            {lists.map((list) => (
              <ListGroup.Item
                onClick={() => handleListClick(list.id)}
                key={list.id}
                as="li"
                className={`${styles.ListItem} ${
                  list.id === activeListId ? styles.Active : ""
                }`}
              >
                <span>
                  {list.name} ({list.books_count})
                </span>

                <AppButton
                  variant="clear"
                  as={NavLink}
                  to={`/my-lists/${list.id}/edit`}
                  className="ms-2"
                >
                  <i className="fa-solid fa-xs fa-pen-to-square"></i>
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
                      <i className="fa-solid fa-xs fa-trash"></i>
                    </AppButton>
                  )}
                </ConfirmDeleteButton>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md="auto">
          <BooksTable onRemove={handleBookRemove} listId={activeListId} />
        </Col>
      </Row>
    </Container>
  );
};

export default MyListsPage;

const BooksTable = ({ listId, onRemove }) => {
  const showNotification = useNotification();

  const {
    data: list,
    loading,
    error,
    refresh,
  } = useReq(`/api/lists/${listId}`);

  const handleRemove = async (bookId) => {
    try {
      await axiosReq.delete(`/api/lists/${listId}/books/${bookId}`);

      showNotification({
        header: "Lists",
        message: "Book removed from list successfully",
      });

      refresh();

      onRemove(listId);
    } catch (error) {
      showNotification({
        header: "Lists",
        message: "Book could not be removed",
        type: "danger",
      });
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
    <Table hover className="d-block d-md-table overflow-x-auto">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Authors</th>
          <th className="text-nowrap">Publication date</th>
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
                    <strong> {list.name}</strong> list?
                  </span>
                }
                onConfirm={() => handleRemove(book.id)}
              >
                {(handleShow) => (
                  <AppButton
                    onClick={handleShow}
                    variant="clear"
                    title="Remove from list"
                  >
                    <i className="fa-solid fa-lg fa-square-minus"></i>
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
