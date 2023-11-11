import React from "react";
import useReq from "../hooks/useReq";
import Loader from "./Loader";
import ReactStars from "react-rating-stars-component";

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
          <div>
            <ReactStars
              count={5}
              edit={false}
              value={review.stars}
              size={24}
              activeColor="#ffd700"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
