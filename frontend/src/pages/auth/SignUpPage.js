import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import AppButton from "../../components/AppButton";

function SignUpPage() {
  const history = useHistory();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { username, email, password1, password2 } = signupData;
  const handleChange = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signupData);
      history.push("/signin");
    } catch (error) {}
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
          <h1>Sign Up Page</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="User name"
                name="username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                onChange={handleChange}
              />
            </Form.Group>

            <AppButton variant="primary" type="submit">
              Submit
            </AppButton>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
