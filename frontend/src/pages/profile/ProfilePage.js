import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getProfile = async () => {
      const response = await axiosReq.get(
        `/api/profiles/${currentUser.profile_id}`
      );
      setProfile(response.data);
    };
    getProfile();
  }, []);

  return (
    <Container>
      <h1>My profile</h1>
      <p>{profile?.full_name}</p>
    </Container>
  );
};

export default ProfilePage;
