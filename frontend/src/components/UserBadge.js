import React from "react";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

/**
 * Badge that shows the profile image and username of a user
 */
const UserBadge = ({ user, showProfileLink = true }) => {
  return (
    <div className="text-center">
      <Image width="80" src={user.profile_image} />
      <div>
        {showProfileLink ? (
          <NavLink to={`/profile/${user.profile_id}`}>{user.username}</NavLink>
        ) : (
          <span>{user.username}</span>
        )}
      </div>
    </div>
  );
};

export default UserBadge;
