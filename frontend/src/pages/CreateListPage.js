import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import ListForm from "../components/ListForm";
import Loader from "../components/Loader";

const CreateListPage = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = async (list) => {
    try {
      setLoading(true);
      await axiosReq.post("/api/lists", list);
      history.push("/my-lists");
    } catch (error) {
      setErrors(error.response?.data);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    history.goBack();
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
      <ListForm
        onCancel={handleCancel}
        onSubmit={onSubmit}
        errors={errors}
        setErrors={setErrors}
      />
    </Container>
  );
};

export default CreateListPage;
