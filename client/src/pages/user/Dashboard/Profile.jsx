import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return <div className="p-8">Profile {id}</div>;
};

export default Profile;
