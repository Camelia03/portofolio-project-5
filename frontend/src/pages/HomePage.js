import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Loader from "../components/Loader";
import useReq from "../hooks/useReq";
import BookListItem from "../components/BookListItem";
import styles from "../styles/HomePage.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import useQuery from "../hooks/useQuery";
import OrderingSelect from "../components/OrderingSelect";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const urlQuery = useQuery();
  const searchQuery = urlQuery.get("q") || "";

  const [ordering, setOrdering] = useState("");
  const handleOrderChange = (value) => {
    setOrdering(value);
  };

  const booksReq = useReq(
    `/api/books?title__icontains=${searchQuery}&ordering=${ordering}`,
    [searchQuery, ordering]
  );
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
      <Row>
        <Col md="10">
          <div className="d-flex justify-content-between mb-2">
            <h1>Home Page ({books.count} books)</h1>

            <OrderingSelect value={ordering} onChange={handleOrderChange} />
          </div>

          <div className="d-flex">
            <div className="flex-fill">
              {books.results.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </div>
          </div>
        </Col>

        <Col md="2" className={styles.Sidebar}>
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
