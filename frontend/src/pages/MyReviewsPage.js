import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import useReq from "../hooks/useReq";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";
import ReviewListItem from "../components/ReviewListItem";
import { axiosReq } from "../api/axiosDefaults";
import { NavLink } from "react-router-dom";

const MyReviewsPage = () => {
  const currentUser = useCurrentUser();

  const {
    error,
    loading,
    data: reviews,
    refresh,
  } = useReq(`/api/users/${currentUser.pk}/reviews`);

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
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading reviews.</p>
      </Container>
    );
  }
  return (
    <Container>
      <h1>My reviews</h1>

      {reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <div>
            <span>Book: </span>
            <span>
              <NavLink to={`/books/${review.book_id}`}>
                {review.book_title}
              </NavLink>
            </span>
          </div>
          <ReviewListItem handleDelete={handleDelete} review={review} />
        </div>
      ))}
    </Container>
  );
};

export default MyReviewsPage;
