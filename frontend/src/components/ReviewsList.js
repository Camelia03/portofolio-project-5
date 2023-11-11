import React from "react";
import useReq from "../hooks/useReq";
import Loader from "./Loader";
import ReactStars from "react-rating-stars-component";
import ConfirmDeleteButton from "./ConfirmDeleteButton";
import { axiosReq } from "../api/axiosDefaults";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ReviewsList = ({ bookId }) => {
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

          {review.is_owner && (
            <div>
              <Button
                as={NavLink}
                variant="secondary"
                to={`/reviews/${review.id}`}
              >
                Edit
              </Button>

              <ConfirmDeleteButton
                modalHeader="Delete review"
                modalBody="Are you sure you want to delete this review?"
                onConfirm={() => handleDelete(review.id)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
