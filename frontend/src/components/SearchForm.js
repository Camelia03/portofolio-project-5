import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useQuery from "../hooks/useQuery";

const SearchForm = () => {
  const urlQuery = useQuery();
  const searchQuery = urlQuery.get("q");
  const [queryValue, setQueryValue] = useState(searchQuery);
  const history = useHistory();

  const handleChange = (event) => {
    setQueryValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push(`/?q=${queryValue}`);
  };

  return (
    <Form inline className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Search"
        className=" mr-sm-2"
        value={queryValue}
        onChange={handleChange}
      />

      <Button variant="primary" type="submit">
        <i class="fa-solid fa-magnifying-glass fa-xs"></i>
      </Button>
    </Form>
  );
};

export default SearchForm;
