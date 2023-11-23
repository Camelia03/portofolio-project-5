import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import AppButton from "./AppButton";

const ReviewForm = ({
  review: initialReview = {
    content: "",
    stars: 0,
  },
  errors,
  onSubmit,
  submitBtnText,
}) => {
  const [review, setReview] = useState(initialReview);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(review);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="stars" className="mb-2 d-flex align-items-center">
        <div>Stars: </div>
        <ReactStars
          count={5}
          value={review.stars}
          onChange={handleRatingChange}
          size={24}
          activeColor="#ffd700"
        />
      </Form.Group>

      <Form.Group controlId="content" className="mb-2">
        <Form.Label>Content:</Form.Label>
        <Form.Control
          value={review.content}
          name="content"
          as="textarea"
          rows={3}
          onChange={handleContentChange}
        />
      </Form.Group>

      <AppButton variant="primary" type="submit">
        {submitBtnText}
      </AppButton>

      {errors.non_field_errors?.map((message, idx) => (
        <Alert key={idx} variant="warning" className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  );
};

export default ReviewForm;
