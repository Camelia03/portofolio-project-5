import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import AppButton from "../../components/AppButton";
import Loader from "../../components/Loader";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ProfilePage.module.css";
import useReq from "../../hooks/useReq";
import ReviewListItem from "../../components/ReviewListItem";

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Load the profile of the user in the url or the logged in user
    const profileId = id || currentUser?.profile_id;

    // Don't allow anonymous users to see profiles
    if (!profileId) {
      history.push("/signin");
    }

    const getProfile = async () => {
      try {
        // Fetch user profile
        const response = await axiosReq.get(`/api/profiles/${profileId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getProfile();
  }, [id, currentUser, history]);

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
    <Container className={`${styles["profile-container"]} my-4`}>
      <Card bg="light" text="dark" className="text-center mb-3">
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
            <>
              <div className="mb-3">
                <AppButton as={NavLink} to="/profile/edit">
                  Edit Profile
                </AppButton>
              </div>
              <div>
                <AppButton as={NavLink} to="/profile/change-password">
                  Change password
                </AppButton>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {id && <UserReviewsList userId={profile.owner_id} />}
    </Container>
  );
};

export default ProfilePage;

const UserReviewsList = ({ userId }) => {
  // Fetch user reviews
  const {
    data: reviews,
    loading,
    error,
  } = useReq(`/api/reviews?owner=${userId}`);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-danger">Error loading user reviews</p>;
  }

  return (
    <div>
      <h2>User reviews</h2>

      <hr />

      {reviews.map((review) => (
        <div key={review.id} className="mb-3">
          <ReviewListItem review={review} />
        </div>
      ))}
    </div>
  );
};
