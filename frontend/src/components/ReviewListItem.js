import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import ConfirmDeleteButton from "./ConfirmDeleteButton";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import CommentsList from "./CommentsList";
import styles from "../styles/ReviewListItem.module.css";
import AppButton from "./AppButton";
import UserBadge from "./UserBadge";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ReviewListItem = ({
  review: origReview,
  handleDelete,
  showLikeBtn = true,
}) => {
  const currentUser = useCurrentUser();

  const [review, setReview] = useState(origReview);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleCommentClick = () => {
    setIsCommentsOpen((prevValue) => !prevValue);
  };

  const handleLike = async () => {
    // Create a like for a review
    try {
      const { data } = await axiosReq.post("/api/likes", {
        review: review.id,
      });

      // Update the count of likes on the review
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
    // Remove like from a review
    try {
      await axiosReq.delete(`/api/likes/${likeId}`);

      // Update count of likes on review
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
    <Row>
      <Col md="3">
        <UserBadge showProfileLink={!!currentUser} user={review.user} />
      </Col>
      <Col>
        <div className="d-flex justify-content-between align-items-center">
          <ReactStars
            count={5}
            edit={false}
            value={review.stars}
            size={24}
            activeColor="#ffd700"
          />

          <div className={styles.CreatedAt}>{review.created_at}</div>
        </div>

        <div className="mb-2">{review.content}</div>

        <div className={`${styles.Likes} mb-2`}>{review.likes_count} likes</div>

        <div className="d-flex">
          {showLikeBtn &&
            currentUser &&
            (review.like_id ? (
              <AppButton
                className="me-2"
                title="Dislike"
                variant="clear"
                onClick={() => handleDislike(review.like_id)}
              >
                <i className="fa-solid fa-xl fa-thumbs-up"></i>
              </AppButton>
            ) : (
              <AppButton
                className="me-2"
                title="Like"
                variant="clear"
                onClick={handleLike}
              >
                <i className="fa-regular fa-xl fa-thumbs-up"></i>
              </AppButton>
            ))}

          <AppButton
            title="Comment"
            className="me-2"
            variant="clear"
            onClick={handleCommentClick}
          >
            {isCommentsOpen ? (
              <i className="fa-solid fa-xl fa-comment" />
            ) : (
              <i className="fa-regular fa-xl fa-comment" />
            )}
          </AppButton>

          {review.is_owner && (
            <>
              <AppButton
                title="Edit"
                variant="clear"
                className="me-2"
                as={NavLink}
                to={`/reviews/${review.id}`}
              >
                <i className="fa-solid fa-xl fa-pen-to-square"></i>
              </AppButton>

              <ConfirmDeleteButton
                modalHeader="Delete review"
                modalBody="Are you sure you want to delete this review?"
                onConfirm={() => handleDelete(review.id)}
              >
                {(handleShow) => (
                  <AppButton
                    title="Delete"
                    onClick={handleShow}
                    variant="clear"
                  >
                    <i className="fa-solid fa-xl fa-trash"></i>
                  </AppButton>
                )}
              </ConfirmDeleteButton>
            </>
          )}
        </div>

        {isCommentsOpen && (
          <>
            <hr />

            <CommentsList reviewId={review.id} />
          </>
        )}

        <hr />
      </Col>
    </Row>
  );
};

export default ReviewListItem;
