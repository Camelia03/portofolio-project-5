import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useParams, useHistory } from "react-router-dom";
import useReq from "../hooks/useReq";
import Loader from "../components/Loader";
import { axiosReq } from "../api/axiosDefaults";

const CreateReviewPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: book, loading, error } = useReq(`/api/books/${id}`);
  const [review, setReview] = useState({
    content: "",
    stars: 1,
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosReq.post(`/api/books/${id}/reviews`, review);
      history.push(`/books/${id}`);
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  const handleContentChange = (event) => {
    setReview({
      ...review,
      [event.target.name]: event.target.value,
    });
  };

  const handleRatingChange = (rating) => {
    setReview({
      ...review,
      stars: rating,
    });
  };

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
        <p className="text-danger">Error loading book data.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>New review for book: {book.title}</h1>

      <Form onSubmit={handleSubmit}>
        <ReactStars
          count={5}
          value={review.stars}
          onChange={handleRatingChange}
          size={24}
          activeColor="#ffd700"
        />

        <Form.Group controlId="content">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            name="content"
            as="textarea"
            rows={3}
            onChange={handleContentChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Post
        </Button>

        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">
            {message}
          </Alert>
        ))}
      </Form>
    </Container>
  );
};

export default CreateReviewPage;
