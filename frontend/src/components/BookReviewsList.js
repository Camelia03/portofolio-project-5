import React from "react";
import useReq from "../hooks/useReq";
import Loader from "./Loader";
import { axiosReq } from "../api/axiosDefaults";
import ReviewListItem from "./ReviewListItem";
import useNotification from "../hooks/useNotification";

const BookReviewsList = ({ bookId }) => {
  const {
    data: reviews,
    error,
    loading,
    refresh,
  } = useReq(`/api/books/${bookId}/reviews`);

  const showNotification = useNotification();

  const handleDelete = async (id) => {
    try {
      await axiosReq.delete(`/api/reviews/${id}`);

      showNotification({
        header: "Review",
        message: "Review deleted successfully",
      });

      refresh();
    } catch (error) {
      showNotification({
        header: "Review",
        message: "Review could not be deleted",
        type: "danger",
      });
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

  if (reviews.length === 0) {
    return (
      <div className="">
        <p>No reviews yet!</p>
      </div>
    );
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <ReviewListItem handleDelete={handleDelete} review={review} />
        </div>
      ))}
    </div>
  );
};

export default BookReviewsList;
