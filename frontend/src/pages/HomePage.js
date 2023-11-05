import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Container from "react-bootstrap/Container";

const HomePage = () => {
  const user = useCurrentUser();
  console.log(user);
  return (
    <Container>
      <h1>Home Page</h1>
    </Container>
  );
};

export default HomePage;
