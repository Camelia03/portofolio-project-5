import React from "react";
import useReq from "../hooks/useReq";
import Loader from "./Loader";
import { axiosReq } from "../api/axiosDefaults";
import ReviewListItem from "./ReviewListItem";

const BookReviewsList = ({ bookId }) => {
  const {
    data: reviews,
    error,
    loading,
    refresh,
  } = useReq(`/api/books/${bookId}/reviews`);

  const handleDelete = async (id) => {
    try {
      await axiosReq.delete(`/api/reviews/${id}`);

      refresh();
    } catch (error) {
      // TODO: handle error case
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-4">
        <p className="text-danger">Error loading reviews.</p>
      </div>
    );
  }

  return (
    <div>
      {reviews.results.map((review) => (
        <div key={review.id} className="mb-4">
          <ReviewListItem handleDelete={handleDelete} review={review} />
        </div>
      ))}
    </div>
  );
};

export default BookReviewsList;
