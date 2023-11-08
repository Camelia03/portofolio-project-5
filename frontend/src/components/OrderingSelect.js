import React from "react";
import { Form } from "react-bootstrap";

const OrderingSelect = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Form.Group className="d-flex align-items-center" controlId="order-by">
      <Form.Label className="text-nowrap me-2">Order by: </Form.Label>
      <Form.Select aria-label="Order books by" onChange={handleChange}>
        <option value="title" selected={value == "title"}>
          Title (Ascending)
        </option>
        <option value="-title" selected={value == "-title"}>
          Title (Descending)
        </option>
        <option value="publish_date" selected={value == "publish_date"}>
          Publish Date (Ascending)
        </option>
        <option value="-publish_date" selected={value == "-publish_date"}>
          Publish Date (Descending)
        </option>
      </Form.Select>
    </Form.Group>
  );
};

export default OrderingSelect;
