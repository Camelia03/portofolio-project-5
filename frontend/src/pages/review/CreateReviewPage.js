import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Loader from "../../components/Loader";
import ReviewForm from "../../components/ReviewForm";
import useReq from "../../hooks/useReq";
import useNotification from "../../hooks/useNotification";

const CreateReviewPage = () => {
  const showNotification = useNotification();

  const { id } = useParams();
  const history = useHistory();

  // Get book details
  const { data: book, loading, error } = useReq(`/api/books/${id}`);
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    history.goBack();
  };

  const handleSubmit = async (review) => {
    // Create a new review
    try {
      await axiosReq.post(`/api/books/${id}/reviews`, review);

      showNotification({
        header: "Review",
        message: "Review added successfully",
      });

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

      <div className="my-4">
        <h2 className="mb-3">Write a Review</h2>

        <ReviewForm
          submitBtnText="Post Review"
          errors={errors}
          setErrors={setErrors}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
};

export default CreateReviewPage;
