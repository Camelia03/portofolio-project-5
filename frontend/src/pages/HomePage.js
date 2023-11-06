import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../api/axiosDefaults";

const HomePage = () => {
  const [books, setBooks] = useState();

  useEffect(() => {
    const getBooks = async () => {
      const response = await axiosReq.get(`/api/books`);
      setBooks(response.data);
    };
    getBooks();
  }, []);

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
