import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateProfile from "../components/Profile/UpdateProfile";
import { UserContext } from "../components/AppContext";

export default function DisplayPosts() {
  const [posts, setPosts] = useState([]);
  // get post detail
  useEffect(() => {
    const getPosts = async () => {
      await axios({
        method: "get",
        url: `http://localhost:3001/api/post`,
        withCredentials: true,
      })
        .then((res) => {
          // get user data
          setPosts(res.data);
        })
        .catch((err) => console.log("Error man : ", err));
    };

    getPosts();
  }, []);

  return (
    <>
      <div>
        <div className="profile-page">
          <UpdateProfile />
        </div>
        <div className="post-home-container">
          <Link to={`/profile`}>{"< GO BACK"}</Link>
          <div className=""></div>
        </div>
      </div>
    </>
  );
}
