import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useReq from "../../hooks/useReq";
import ListForm from "../../components/ListForm";
import { axiosReq } from "../../api/axiosDefaults";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";

const EditListPage = () => {
  const history = useHistory();
  const { id: listId } = useParams();

  const { data: list, loading, error } = useReq(`/api/lists/${listId}`);

  const onSubmit = async (list) => {
    try {
      await axiosReq.put(`/api/lists/${listId}`, list);
      history.push("/my-lists");
    } catch (error) {
      // TODO: show error
      console.log(error);
    }
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

  if (error) {
    return (
      <Container className="text-center my-4">
        <p className="text-danger">Error loading list.</p>
      </Container>
    );
  }

  return (
    <Container>
      <ListForm onCancel={handleCancel} list={list} onSubmit={onSubmit} />
    </Container>
  );
};

export default EditListPage;
