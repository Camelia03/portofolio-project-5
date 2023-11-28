import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AppButton from "./AppButton";

/**
 * Component that shows a modal for confirming delete
 */
const ConfirmDeleteButton = ({
  children,
  onConfirm,
  modalHeader,
  modalBody,
}) => {
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
      {children(handleShow)}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <AppButton variant="secondary" onClick={handleClose}>
            Close
          </AppButton>
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDeleteButton;
