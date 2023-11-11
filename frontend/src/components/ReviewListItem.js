import React from "react";
import ReactStars from "react-rating-stars-component";
import ConfirmDeleteButton from "./ConfirmDeleteButton";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ReviewListItem = ({ review, handleDelete }) => {
  return (
    <div>
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
          <Button as={NavLink} variant="secondary" to={`/reviews/${review.id}`}>
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
  );
};

export default ReviewListItem;
