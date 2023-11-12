import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ListForm = ({
  list: initialList = {
    name: "",
  },
  onSubmit,
}) => {
  const [list, setList] = useState(initialList);

  const handleChange = (event) => {
    setList({
      ...list,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(list);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="list-name">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" onChange={handleChange} value={list.name} />
      </Form.Group>

      <Button type="submit">Create</Button>
    </Form>
  );
};

export default ListForm;
