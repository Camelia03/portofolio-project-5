import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import Alert from "react-bootstrap/Alert";
import { Col, Image, Row } from "react-bootstrap";
import AppButton from "../../components/AppButton";

function SignInPage() {
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { username, password } = signinData;
  const handleChange = (event) => {
    setSigninData({
      ...signinData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/dj-rest-auth/login/", signinData);
      setCurrentUser(response.data.user);
      setTokenTimestamp(response.data);
      history.push("/");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <Container>
      <Row
        style={{ minHeight: "calc(100vh - 61px)" }}
        className="justify-content-center align-items-center"
      >
        <Col className="h-100">
          <Image src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1382993429i/778267.jpg" />
        </Col>

        <Col>
          <h1>Sign In Page</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="User name"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <AppButton variant="primary" type="submit">
              Log in
            </AppButton>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
