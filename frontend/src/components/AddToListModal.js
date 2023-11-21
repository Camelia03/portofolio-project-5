import { Children, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useReq from "../hooks/useReq";
import { Alert, Container, Form } from "react-bootstrap";
import Loader from "./Loader";
import { axiosReq } from "../api/axiosDefaults";

const AddToListModal = ({ children, book }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setHasAdded(false);
  };
  const handleShow = () => setShow(true);

  const { data: lists } = useReq(`/api/lists`);

  const [selectedList, setSelectedList] = useState();
  const handleChange = (event) => {
    setSelectedList(event.target.value);
  };

  const [loading, setLoading] = useState(false);
  const [hasAdded, setHasAdded] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      await axiosReq.post(`/api/lists/${selectedList}/books/${book.id}`);
      setHasAdded(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
          {!hasAdded ? (
            <Form onSubmit={handleSubmit}>
              <Form.Select name="list" onChange={handleChange}>
                <option selected>Select a list</option>
                {lists?.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </Form.Select>

              {!loading ? <Button type="submit">Add</Button> : <Loader />}
            </Form>
          ) : (
            <Alert variant="success">Added</Alert>
          )}
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
