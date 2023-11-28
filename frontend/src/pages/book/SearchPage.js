import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Loader from "../../components/Loader";
import useReq from "../../hooks/useReq";
import styles from "../styles/HomePage.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import useQuery from "../../hooks/useQuery";
import OrderingSelect from "../../components/OrderingSelect";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import BooksList from "./BooksList";

const SearchPage = () => {
  const urlQuery = useQuery();
  const searchQuery = urlQuery.get("q") || "";

  const [ordering, setOrdering] = useState("");
  const handleOrderChange = (value) => {
    setOrdering(value);
  };

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
        <p className="text-danger">Error loading data.</p>
      </Container>
    );
  }

  const genres = genresReq.data;

  return (
    <Container>
      <Row>
        <Col md="10">
          <div className="d-flex justify-content-between mb-2">
            <h1>All books</h1>

            <OrderingSelect value={ordering} onChange={handleOrderChange} />
          </div>

          <div className="d-flex">
            <div className="flex-fill">
              <BooksList ordering={ordering} searchQuery={searchQuery} />
            </div>
          </div>
        </Col>

        <Col md="2" className={styles.Sidebar}>
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="ps-2">GENRES</h6>
          </div>
          <ListGroup variant="flush">
            {genres.map((genre) => (
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

export default SearchPage;
