import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AppButton from "./AppButton";

/**
 * Form for creating a list
 */
const ListForm = ({
  list: initialList = {
    name: "",
  },
  onSubmit,
  errors = {},
  setErrors = () => {},
  onCancel = () => {},
}) => {
  const [list, setList] = useState(initialList);

  const handleChange = (event) => {
    setList({
      ...list,
      [event.target.name]: event.target.value,
    });

    setErrors((prevErrors) => {
      if (!prevErrors[event.target.name]) return prevErrors;

      const errors = { ...prevErrors };
      delete errors[event.target.name];
      return errors;
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

        <Form.Control
          isInvalid={!!errors.name}
          name="name"
          onChange={handleChange}
          value={list.name}
        />

        {errors.name?.map((message, idx) => (
          <Form.Control.Feedback key={idx} type="invalid">
            {message}
          </Form.Control.Feedback>
        ))}
      </Form.Group>

      <div className="mt-3">
        <AppButton
          type="button"
          onClick={onCancel}
          className="me-3"
          variant="secondary"
        >
          Cancel
        </AppButton>

        <AppButton type="submit">Create</AppButton>
      </div>
    </Form>
  );
};

export default ListForm;
