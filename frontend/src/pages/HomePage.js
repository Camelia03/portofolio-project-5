import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/Loader";

const HomePage = () => {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axiosReq.get(`/api/books`);
        setBooks(response.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    getBooks();
  }, []);

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
        <p className="text-danger">Error loading profile data.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Home Page</h1>

      {books?.results.map((book) => (
        <div>
          <p key={book.id}>{book.title}</p>
          <p>{book.number_of_pages}</p>
        </div>
      ))}
    </Container>
  );
};

export default HomePage;
