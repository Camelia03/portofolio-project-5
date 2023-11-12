import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";

const CreateListPage = () => {
  const history = useHistory();
  const [list, setList] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setList({
      ...list,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await axiosReq.post("/api/lists", list);
      history.push("/my-lists");
    } catch (error) {
      // TODO: show error
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="list-name">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" onChange={handleChange} value={list.name} />
        </Form.Group>

        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

export default CreateListPage;
