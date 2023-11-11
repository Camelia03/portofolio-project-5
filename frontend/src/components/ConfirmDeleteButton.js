import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmDeleteButton = ({ onConfirm, modalHeader, modalBody }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    handleClose();

    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDeleteButton;
