import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import styles from "../styles/SearchForm.module.css";
import AppButton from "./AppButton";

/**
 * Form for searching books
 */
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

    // Redirect to search page with the term as query param
    history.push(`/search?q=${queryValue}`);
  };

  return (
    <Form className={styles["search-form"]} onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search"
          className={styles["search-input"]}
          value={queryValue}
          onChange={handleChange}
        />
        <AppButton
          variant="secondary"
          className={styles["search-button"]}
          type="submit"
        >
          <i className="fa-solid fa-magnifying-glass fa-xs"></i>
        </AppButton>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;
