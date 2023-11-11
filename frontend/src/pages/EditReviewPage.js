import React, { useState } from "react";
import ReviewForm from "../components/ReviewForm";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory, useParams } from "react-router-dom";
import useReq from "../hooks/useReq";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";

const EditReviewPage = () => {
  const { id: reviewId } = useParams();
  const history = useHistory();
  const { data: review, loading, error } = useReq(`/api/reviews/${reviewId}`);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (review) => {
    try {
      await axiosReq.put(`/api/reviews/${reviewId}`, review);
      history.push(`/books/${review.book_id}`);
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
      <h1>Edit review for book: {review.book_title}</h1>

      <ReviewForm
        review={review}
        submitBtnText="Update"
        errors={errors}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditReviewPage;
