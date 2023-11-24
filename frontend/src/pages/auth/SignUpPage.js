import axios from "axios";
import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import welcome from "../../assets/welcome.avif";
import AppButton from "../../components/AppButton";
import useNotification from "../../hooks/useNotification";

function SignUpPage() {
  const showNotification = useNotification();

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
      showNotification({
        message: "Account created succesfully!",
        header: "Welcome to BookWorms!",
      });
      history.push("/signin");
    } catch (error) {}
  };

  return (
    <Container>
      <Row
        style={{ height: "calc(100vh - 61px)" }}
        className="justify-content-center align-items-center"
      >
        <Col className="h-100">
          <Image className="h-100" src={welcome} alt="Sign up welcome image" />
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
