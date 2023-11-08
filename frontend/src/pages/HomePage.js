import React from "react";
import Container from "react-bootstrap/Container";
import Loader from "../components/Loader";
import useReq from "../hooks/useReq";
import BookListItem from "../components/BookListItem";
import styles from "../styles/HomePage.module.css";
import ListGroup from "react-bootstrap/ListGroup";

const HomePage = () => {
  const booksReq = useReq(`/api/books`);
  const genresReq = useReq("/api/genres");

  if (booksReq.loading || genresReq.loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </Container>
    );
  }

  if (booksReq.error || genresReq.error) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading data.</p>
      </Container>
    );
  }

  const books = booksReq.data;
  const genres = genresReq.data;

  return (
    <Container>
      <h1>Home Page</h1>
      <div className="d-flex">
        <div className="me-2 flex-fill">
          {books.results.map((book) => (
            <BookListItem key={book.id} book={book} />
          ))}
        </div>

        <div className={`sidebar ${styles.Sidebar}`}>
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="ps-2">GENRES</h6>
          </div>
          <ListGroup variant="flush">
            {genres.results.map((genre) => (
              <ListGroup.Item
                action
                key={genre.id}
                className={`${styles.SidebarListItem}`}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{genre.name}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
