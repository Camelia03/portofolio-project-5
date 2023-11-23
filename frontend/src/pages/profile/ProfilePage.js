import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { NavLink, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import AppButton from "../../components/AppButton";
import Loader from "../../components/Loader";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ProfilePage.module.css";

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const profileId = id || currentUser.profile_id;

    const getProfile = async () => {
      try {
        const response = await axiosReq.get(`/api/profiles/${profileId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getProfile();
  }, [id, currentUser]);

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
        <p className="text-danger">Error loading profile data.</p>
      </Container>
    );
  }

  return (
    <Container className={`text-center ${styles["profile-container"]} my-4`}>
      <Card bg="light" text="dark">
        <Card.Body>
          <Card.Title className="mt-4">{profile.owner}'s Profile</Card.Title>
          <div className="my-4">
            <img
              src={profile?.avatar}
              alt="Profile Avatar"
              className={styles["profile-avatar"]}
            />
          </div>
          <Card.Text className="mb-2">
            <strong>Full Name:</strong>{" "}
            {profile?.full_name || "Full Name Not Provided"}
          </Card.Text>
          <Card.Text className="mb-2">
            <strong>Description:</strong>{" "}
            {profile?.description || "No Description Available"}
          </Card.Text>
          <Card.Text className="mb-2">
            <strong>Joined in:</strong> {profile?.created_at}
          </Card.Text>
          <Card.Text className="mb-2">
            <strong>Updated At:</strong> {profile?.updated_at}
          </Card.Text>

          {profile.is_owner && (
            <AppButton as={NavLink} to="/profile/edit">
              Edit Profile
            </AppButton>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
