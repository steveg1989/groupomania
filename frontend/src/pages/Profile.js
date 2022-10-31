import { useContext } from "react";
import { UserContext } from "../components/AppContext";
import UpdateProfile from "../components/Profile/UpdateProfile";
import AddPost from "../components/Profile/AddPost";
import DisplayPosts from "../components/Post/DisplayPosts";

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
      <div className="post-home-container">
      <div>
        <AddPost />
      </div>
      <div>
        <DisplayPosts />
      </div>
      </div>
    </div>
  );
};

export default Profile;
