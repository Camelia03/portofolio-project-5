import React, { useState } from "react";
import useReq from "../hooks/useReq";
import Loader from "./Loader";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import AppButton from "./AppButton";
import { NavLink } from "react-router-dom";
import ConfirmDeleteButton from "./ConfirmDeleteButton";
import useNotification from "../hooks/useNotification";

const CommentsList = ({ reviewId }) => {
  const showNotification = useNotification();

  const {
    data: comments,
    loading,
    error,
    refresh,
  } = useReq(`/api/reviews/${reviewId}/comments`);

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setComment(event.target.value);

    setErrors((prevErrors) => {
      if (!prevErrors[event.target.name]) return prevErrors;

      const errors = { ...prevErrors };
      delete errors[event.target.name];
      return errors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosReq.post("/api/comments", {
        review: reviewId,
        text: comment,
      });

      refresh();
    } catch (error) {
      setErrors(error.response?.data);
    }

    setComment("");
  };

  const handleDelete = async (commentId) => {
    try {
      await axiosReq.delete(`/api/comments/${commentId}/`);

      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (commentId, commentText) => {
    try {
      await axiosReq.patch(`/api/comments/${commentId}/`, {
        text: commentText,
      });

      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Could not load comments</Alert>;
  }

  return (
    <div>
      {comments.length === 0 && <span>No comments</span>}
      {comments.length > 0 &&
        comments.map((comment) => (
          <Row key={comment.id} className="mb-3">
            <Col xs="auto">
              <Image src={comment.user.profile_image} width="30" />
            </Col>
            <Col>
              <div className="d-flex justify-content-between">
                <div>
                  <NavLink to={`/profile/${comment.user.profile_id}`}>
                    <strong>{comment.user.username}</strong>
                  </NavLink>
                  <span className="text-muted ms-2">{comment.created_at}</span>
                </div>

                <div>
                  {comment.is_owner && (
                    <div>
                      <ConfirmDeleteButton
                        modalHeader="Delete comment"
                        modalBody="Are you sure you want to delete this comment?"
                        onConfirm={() => handleDelete(comment.id)}
                      >
                        {(handleShow) => (
                          <AppButton
                            title="Delete"
                            onClick={handleShow}
                            variant="clear"
                          >
                            <i class="fa-solid fa-sm fa-trash"></i>
                          </AppButton>
                        )}
                      </ConfirmDeleteButton>

                      <EditCommentModal
                        comment={comment}
                        onSubmit={(text) => handleEdit(comment.id, text)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>{comment.text}</div>
            </Col>
          </Row>
        ))}
      <Form onSubmit={handleSubmit} className="mt-3">
        <FormGroup controlId="comment-text">
          <InputGroup>
            <Form.Control
              onChange={handleChange}
              value={comment}
              name="text"
              isInvalid={!!errors.text}
            />

            <AppButton type="submit" variant="secondary">
              Add comment
            </AppButton>

            {errors.text?.map((message, idx) => (
              <Form.Control.Feedback key={idx} type="invalid">
                {message}
              </Form.Control.Feedback>
            ))}
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommentsList;

const EditCommentModal = ({ comment, onSubmit }) => {
  const [commentText, setCommentText] = useState(comment.text);

  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setCommentText("");
    handleClose();
    onSubmit(commentText);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <AppButton variant="clear" onClick={handleShow}>
        <i class="fa-solid fa-sm fa-pen-to-square"></i>
      </AppButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit comment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              onChange={handleChange}
              value={commentText}
              name="text"
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <AppButton variant="secondary" onClick={handleClose}>
            Close
          </AppButton>

          <AppButton variant="primary" onClick={handleSubmit}>
            Save Changes
          </AppButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
