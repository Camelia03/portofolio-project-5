import React from "react";
import useReq from "../hooks/useReq";
import Loader from "./Loader";

const ReviewsList = ({ bookId }) => {
  const {
    data: reviews,
    error,
    loading,
  } = useReq(`/api/books/${bookId}/reviews`);

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
        <div key={review.id}>
          <div>{review.content}</div>
          <div>
            on {review.created_at} by {review.username}
          </div>
          <div>{review.stars}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
