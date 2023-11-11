import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useParams, useHistory } from "react-router-dom";
import useReq from "../hooks/useReq";
import Loader from "../components/Loader";
import { axiosReq } from "../api/axiosDefaults";
import ReviewForm from "../components/ReviewForm";

const CreateReviewPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: book, loading, error } = useReq(`/api/books/${id}`);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (review) => {
    try {
      await axiosReq.post(`/api/books/${id}/reviews`, review);
      history.push(`/books/${id}`);
    } catch (error) {
      setErrors(error.response?.data);
    }
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

      <ReviewForm
        submitBtnText="Post review"
        errors={errors}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateReviewPage;
