import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import ListForm from "../components/ListForm";
import Loader from "../components/Loader";

const CreateListPage = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (list) => {
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

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <ListForm onSubmit={onSubmit} />
    </Container>
  );
};

export default CreateListPage;
