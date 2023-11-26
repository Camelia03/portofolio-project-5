import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import useNotification from "../hooks/useNotification";
import useReq from "../hooks/useReq";
import AppButton from "./AppButton";

const AddToListModal = ({ children, book }) => {
  const showNotification = useNotification();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { data: lists } = useReq(`/api/lists`);
  const { data: filteredLists, update: setFilteredLists } = useReq(
    `/api/lists?books__id=${book.id}`
  );

  const handleRemove = async (list) => {
    try {
      await axiosRes.delete(`/api/lists/${list.id}/books/${book.id}`);

      showNotification({
        header: "Lists",
        message: "Book removed to list successfully",
      });

      setFilteredLists((prevLists) => {
        const newLists = [...prevLists];

        return newLists.filter(({ id }) => id !== list.id);
      });
    } catch (error) {
      showNotification({
        type: "danger",
        header: "Lists",
        message: "Book could not be removed from list",
      });
    }
  };

  const handleAdd = async (list) => {
    try {
      await axiosReq.post(`/api/lists/${list.id}/books/${book.id}`);

      showNotification({
        header: "Lists",
        message: "Book added to list successfully",
      });

      setFilteredLists((prevLists) => {
        return [...prevLists, list];
      });
    } catch (error) {
      showNotification({
        type: "danger",
        header: "Lists",
        message: "Book could not be added to list",
      });
    }
  };

  return (
    <>
      {children(handleShow)}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Add book <strong>{book.title}</strong> to list
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListGroup>
            {lists?.map((list) => (
              <ListGroup.Item key={list.id}>
                <div className="d-flex justify-content-between">
                  <div>{list.name}</div>

                  <div>
                    {filteredLists?.some(({ id }) => list.id === id) ? (
                      <AppButton
                        variant="secondary"
                        onClick={() => handleRemove(list)}
                      >
                        <i className="fa-solid fa-xs fa-minus"></i>
                      </AppButton>
                    ) : (
                      <AppButton
                        variant="primary"
                        onClick={() => handleAdd(list)}
                      >
                        <i className="fa-solid fa-xs fa-plus"></i>
                      </AppButton>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddToListModal;
