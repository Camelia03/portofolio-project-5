import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import AppButton from "./AppButton";

/**
 * Form for creating or editing a review
 */
const ReviewForm = ({
  review: initialReview = {
    content: "",
    stars: 1,
  },
  errors = {},
  setErrors = () => {},
  onCancel = () => {},
  onSubmit,
  submitBtnText,
}) => {
  const [review, setReview] = useState(initialReview);

  const handleContentChange = (event) => {
    setReview({
      ...review,
      [event.target.name]: event.target.value,
    });

    setErrors((prevErrors) => {
      if (!prevErrors[event.target.name]) return prevErrors;

      const errors = { ...prevErrors };
      delete errors[event.target.name];
      return errors;
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
          isInvalid={!!errors.content}
        />

        {errors.content?.map((message, idx) => (
          <Form.Control.Feedback key={idx} type="invalid">
            {message}
          </Form.Control.Feedback>
        ))}
      </Form.Group>

      <div className="mt-3">
        <AppButton
          type="button"
          className="me-3"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </AppButton>

        <AppButton variant="primary" type="submit">
          {submitBtnText}
        </AppButton>
      </div>

      {errors.non_field_errors?.map((message, idx) => (
        <Alert key={idx} variant="warning" className="mt-3">
          {message}
        </Alert>
      ))}
    </Form>
  );
};

export default ReviewForm;
