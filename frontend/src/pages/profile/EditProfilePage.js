import React, { useEffect, useRef, useState } from "react";
import { Alert, Container, Form, Image } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import AppButton from "../../components/AppButton";
import Loader from "../../components/Loader";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import useReq from "../../hooks/useReq";

const EditProfilePage = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    full_name: "",
    description: "",
    avatar: "",
  });

  const { full_name, description, avatar } = profileData;

  const [errors, setErrors] = useState({});

  const { profile_id } = currentUser || {};
  const {
    data: profile,
    loading,
    error,
  } = useReq(`/api/profiles/${profile_id}`);

  useEffect(() => {
    if (!profile) return;

    setProfileData({ ...profile });
  }, [profile]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("description", description);

    if (imageFile?.current?.files[0]) {
      formData.append("avatar", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosRes.put(
        `/api/profiles/${profile_id}`,
        formData
      );
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
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
        <p className="text-danger">Error loading profile.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Edit profile</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="full_name" className="mb-3">
          <Form.Label>Full name</Form.Label>

          <Form.Control
            value={full_name}
            onChange={handleChange}
            name="full_name"
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>

          <Form.Control
            value={description}
            rows="3"
            onChange={handleChange}
            as="textarea"
            name="description"
          />
        </Form.Group>

        <Form.Group controlId="avatar" className="mb-3">
          <Form.Label>Avatar</Form.Label>

          {avatar && (
            <figure>
              <Image src={avatar} fluid />
            </figure>
          )}

          {errors?.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Control
            type="file"
            ref={imageFile}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length) {
                setProfileData({
                  ...profileData,
                  image: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />
        </Form.Group>

        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <AppButton
          className="me-3"
          variant="secondary"
          as={NavLink}
          to="/profile"
        >
          Cancel
        </AppButton>

        <AppButton type="submit">Save changes</AppButton>
      </Form>
    </Container>
  );
};

export default EditProfilePage;
