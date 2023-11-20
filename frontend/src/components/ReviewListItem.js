import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import ConfirmDeleteButton from "./ConfirmDeleteButton";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";

const ReviewListItem = ({ review: origReview, handleDelete }) => {
  const [review, setReview] = useState(origReview);

  const handleLike = async () => {
    try {
      const { data } = await axiosReq.post("/api/likes/", {
        review: review.id,
      });
      setReview((oldReview) => {
        return {
          ...oldReview,
          like_id: data.id,
          likes_count: oldReview.likes_count + 1,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (likeId) => {
    try {
      await axiosReq.delete(`/api/likes/${likeId}`);
      setReview((oldReview) => {
        return {
          ...oldReview,
          like_id: null,
          likes_count: oldReview.likes_count - 1,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

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

      {review.like_id ? (
        <div>
          <Button onClick={() => handleDislike(review.like_id)}>DisLike</Button>
        </div>
      ) : (
        <div>
          <Button onClick={handleLike}>Like</Button>
        </div>
      )}

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

      <div>Likes: {review.likes_count}</div>
    </div>
  );
};

export default ReviewListItem;
