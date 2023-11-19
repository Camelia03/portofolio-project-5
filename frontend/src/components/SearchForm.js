import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import styles from "../styles/SearchForm.module.css";

const SearchForm = () => {
  const urlQuery = useQuery();
  const searchQuery = urlQuery.get("q") || "";
  const [queryValue, setQueryValue] = useState(searchQuery);
  const history = useHistory();

  const handleChange = (event) => {
    setQueryValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push(`/search?q=${queryValue}`);
  };

  return (
    <Form className={styles["search-form"]} onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Search"
        className={styles["search-input"]}
        value={queryValue}
        onChange={handleChange}
      />

      <Button className={styles["search-button"]} type="submit">
        <i className="fa-solid fa-magnifying-glass fa-xs"></i>
      </Button>
    </Form>
  );
};

export default SearchForm;
