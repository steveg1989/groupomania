import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import UpdateProfile from "../components/Profile/UpdateProfile";

const Profile = () => {
  const data = useContext(UserContext);
  const userId = data.dataProfile.userId;
  return (
    <div>
      <div className="profile-page">
        <UpdateProfile />
      </div>
    </div>
  );
};

export default Profile;
