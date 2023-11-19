import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import CompactBooksList from "../components/CompactBooksList";
import useReq from "../hooks/useReq";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const genresReq = useReq("/api/genres");

  if (genresReq.loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </Container>
    );
  }

  if (genresReq.error) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading books.</p>
      </Container>
    );
  }

  const genres = genresReq.data;

  const bookLists = {
    topRated: "/api/books?ordering=-goodreads_average_rating&page_size=15",
    newestReleases: "/api/books?ordering=-publish_date&page_size=15",
  };

  return (
    <Container className={`mb-5 ${styles.Container}`}>
      <Row>
        <Col xs="9">
          <h1>Home</h1>
          <h2 className="mb-3">Top rated books</h2>
          <BooksList url={bookLists.topRated} />
          <hr />
          <h2 className="mb-3">Newest releases</h2>
          <BooksList url={bookLists.newestReleases} />
        </Col>

        <Col xs="3" className={styles.SideBar}>
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="ps-2">GENRES</h6>
          </div>

          <ListGroup variant="flush">
            {genres.map((genre) => (
              <ListGroup.Item action key={genre.id}>
                <div className="ms-2 me-auto">
                  <NavLink className="fw-bold" to={`/genres/${genre.name}`}>
                    {genre.name}
                  </NavLink>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

const BooksList = ({ url }) => {
  const { data: books, loading, error } = useReq(url);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Could not load books</p>;
  }

  return <CompactBooksList books={books.results} />;
};
