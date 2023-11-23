import React from "react";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const UserBadge = ({ user }) => {
  return (
    <div className="text-center">
      <Image width="80" src={user.profile_image} />
      <div>
        <NavLink to={`/profile/${user.profile_id}`}>{user.username}</NavLink>
      </div>
    </div>
  );
};

export default UserBadge;
