import React from "react";
import Container from "react-bootstrap/Container";
import Loader from "../components/Loader";
import useReq from "../hooks/useReq";
import BookListItem from "../components/BookListItem";
import styles from "../styles/HomePage.module.css";

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

        <div>
          <h3 className={styles.GenresListHeader}>Genres</h3>
          <ul className={styles.GenresList}>
            {genres.results.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
