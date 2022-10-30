import { useContext } from "react";
import { UserContext } from "../components/AppContext";
import UpdateProfile from "../components/Profile/UpdateProfile";
import AddPost from "../components/Profile/AddPost";

const Profile = () => {
  const userId = useContext(UserContext).dataProfile.userId;
  if (!userId) {
    window.location = "/";
  }

  return (
    <div>
      <div className="profile-page">
        <UpdateProfile />
      </div>
      <div class="post-home-container">
        <AddPost />
      </div>
    </div>
  );
};

export default Profile;
