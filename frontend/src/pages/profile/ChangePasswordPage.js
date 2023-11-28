import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import useNotification from "../../hooks/useNotification";
import AppButton from "../../components/AppButton";

const ChangePasswordPage = () => {
  const history = useHistory();

  const showNotification = useNotification();

  const [changePasswordData, setChangePasswordData] = useState({
    new_password1: "",
    new_password2: "",
    old_password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setChangePasswordData({
      ...changePasswordData,
      [event.target.name]: event.target.value,
    });

    setErrors((prevErrors) => {
      if (!prevErrors[event.target.name]) return prevErrors;

      const errors = { ...prevErrors };
      delete errors[event.target.name];
      return errors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Change password of user
    try {
      await axiosReq.post("/dj-rest-auth/password/change/", changePasswordData);

      showNotification({
        message: "Password changed successfully!",
        header: `Password`,
      });

      history.goBack();
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const { new_password1, new_password2, old_password } = changePasswordData;

  return (
    <Container>
      <h2>Change password</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password1">
          <Form.Label>New Password</Form.Label>

          <Form.Control
            type="password"
            onChange={handleChange}
            value={new_password1}
            name="new_password1"
            isInvalid={!!errors.new_password1}
          />

          {errors.new_password1?.map((message, idx) => (
            <Form.Control.Feedback key={idx} type="invalid">
              {message}
            </Form.Control.Feedback>
          ))}
        </Form.Group>

        <Form.Group controlId="password2">
          <Form.Label>Repeat Password</Form.Label>

          <Form.Control
            type="password"
            onChange={handleChange}
            value={new_password2}
            name="new_password2"
            isInvalid={!!errors.new_password2}
          />

          {errors.new_password2?.map((message, idx) => (
            <Form.Control.Feedback key={idx} type="invalid">
              {message}
            </Form.Control.Feedback>
          ))}
        </Form.Group>

        <Form.Group controlId="old-password">
          <Form.Label>Current Password</Form.Label>

          <Form.Control
            type="password"
            onChange={handleChange}
            value={old_password}
            name="old_password"
            isInvalid={!!errors.old_password}
          />

          {errors.old_password?.map((message, idx) => (
            <Form.Control.Feedback key={idx} type="invalid">
              {message}
            </Form.Control.Feedback>
          ))}
        </Form.Group>

        <div className="mt-3">
          <AppButton
            className="me-3"
            onClick={handleCancel}
            variant="secondary"
            type="button"
          >
            Cancel
          </AppButton>

          <AppButton variant="primary" type="submit">
            Submit
          </AppButton>
        </div>

        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">
            {message}
          </Alert>
        ))}
      </Form>
    </Container>
  );
};

export default ChangePasswordPage;
