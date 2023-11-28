import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import ListForm from "../../components/ListForm";
import Loader from "../../components/Loader";
import useNotification from "../../hooks/useNotification";

const CreateListPage = () => {
  const history = useHistory();
  const showNotification = useNotification();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onSubmit = async (list) => {
    try {
      setLoading(true);

      // Create new list
      await axiosReq.post("/api/lists", list);

      showNotification({ message: "List added successfully", header: "List" });

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
