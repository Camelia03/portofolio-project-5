import React, { useState } from "react";
import useReq from "../hooks/useReq";
import Loader from "./Loader";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";

const CommentsList = ({ reviewId }) => {
  const {
    data: comments,
    loading,
    error,
    refresh,
  } = useReq(`/api/reviews/${reviewId}/comments`);

  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
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
      console.log(error);
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
          <div key={comment.id}>
            <div>
              {comment.username} wrote {comment.text}
            </div>

            {comment.is_owner && (
              <div>
                <Button onClick={() => handleDelete(comment.id)}>Delete</Button>
                <EditCommentModal
                  comment={comment}
                  onSubmit={(text) => handleEdit(comment.id, text)}
                />
              </div>
            )}
          </div>
        ))}
      <Form onSubmit={handleSubmit} className="mt-3">
        <InputGroup>
          <Form.Control onChange={handleChange} value={comment} name="text" />
          <Button type="submit" variant="outline-secondary">
            Add comment
          </Button>
        </InputGroup>
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
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
