import React, { useState } from "react";
import { Col, Container, ListGroup, Offcanvas, Row } from "react-bootstrap";
import CompactBooksList from "../components/CompactBooksList";
import useReq from "../hooks/useReq";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import header_logo from "../assets/header_logo.png";
import AppButton from "../components/AppButton";

const HomePage = () => {
  // Fetch genres
  const genresReq = useReq("/api/genres");

  // State for the offcanvas genres list
  const [showGenres, setShowGenres] = useState(false);
  const handleClose = () => setShowGenres(false);
  const handleShow = () => setShowGenres(true);

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

  // URL of home page book lists
  const bookLists = {
    topRated: "/api/books?ordering=-goodreads_average_rating&page_size=15",
    newestReleases: "/api/books?ordering=-publish_date&page_size=15",
  };

  return (
    <Container className={`mb-5 ${styles.Container}`}>
      <Row>
        <Col md="9">
          <h1>
            Welcome to
            <img src={header_logo} alt="Logo" width="230px" />
          </h1>

          <p>
            Dive into a world of literary treasures, where stories come alive
            and reading opens doors to endless adventures. Discover new
            favorites, explore timeless classics, and join a community
            passionate about the written word. Happy reading!
          </p>

          <div className="d-flex justify-content-between align-item-center">
            <h2 className="mb-3">Top rated books</h2>

            <div className="d-block d-md-none">
              <AppButton onClick={handleShow}>Genres</AppButton>
            </div>
          </div>

          <p>
            Embark on a journey through our meticulously curated selection of
            timeless classics and contemporary masterpieces. Discover stories
            that have captured hearts and minds, earning their place among the
            most revered reads.
          </p>

          <BooksList url={bookLists.topRated} />
          <hr />
          <h2 className="mb-3">Newest releases</h2>
          <p>
            Immerse yourself in the pulse of the literary world with our latest
            creations penned by visionary authors. From fresh narratives to
            groundbreaking ideas, explore the newest additions to our
            collection.
          </p>
          <BooksList url={bookLists.newestReleases} />
        </Col>

        <Col md="3" className={styles.SideBar}>
          <Offcanvas show={showGenres} onHide={handleClose} responsive="md">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <h6 className="ps-2">GENRES</h6>
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <ListGroup variant="flush">
                <div className="d-none d-md-flex align-items-center justify-content-between">
                  <h6 className="ps-2">GENRES</h6>
                </div>

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
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

const BooksList = ({ url }) => {
  // Fetch list of books
  const { data: books, loading, error } = useReq(url);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Could not load books</p>;
  }

  return <CompactBooksList books={books.results} />;
};
