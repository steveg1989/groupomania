import { useContext, useEffect } from "react";
import { UserContext } from "../components/AppContext";
import UpdateProfile from "../components/Profile/UpdateProfile";
import AddPost from "../components/Post/AddPost";
import DisplayPosts from "../components/Post/DisplayPosts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const userId = useContext(UserContext).dataProfile.userId;
  const navigate = useNavigate();
  const dataUserContext = useContext(UserContext);

  if (!userId) {
    navigate("/");
  }

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `http://localhost:3001/api/user/get-info`,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            // get user data
            const data = res.data;

            const dataProfile = {
              email: data.email,
              firstname: data.firstname,
              lastname: data.lastname,
              message: data.message,
              userId: data.userId,
              imageurl: data.imageurl,
            };
            dataUserContext.updateUserdata(dataProfile);
            navigate("/profile");
          } else {
          }
        })
        .catch((err) => console.log(err));
    };
    fetchToken();
  }, []);

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
