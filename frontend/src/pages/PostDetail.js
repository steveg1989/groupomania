import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import UpdateProfile from "../components/Profile/UpdateProfile";
import { UserContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";

export default function DisplayPostDetails() {
  const [postDetails, setPostDetails] = useState([]);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const dataUserContext = useContext(UserContext);
  const userId = useContext(UserContext).dataProfile.userId;

    if (!userId) {
      window.location = "/";
    }

  // get postDetails detail
  useEffect(() => {
    const getPostDetails = async () => {
      await axios({
        method: "get",
        url: `http://localhost:3001/api/post/${id}`,
        withCredentials: true,
      })
        .then((res) => {
          // get user data
          setPostDetails(res.data);
        })
        .catch((err) => console.log("Error man : ", err));
    };

    getPostDetails();
  }, [id]);

  return (
    <>
      <div>
        <div className="profile-page">
          <UpdateProfile />
        </div>
        <div className="post-home-container">
          <Link to={`/profile`}>{"< GO BACK"}</Link>
          <div className="">
            <>
              {postDetails.length > 0 ? (
                ""
              ) : (
                <div className="my-3">"Nothing Found"</div>
              )}

              {postDetails.map((postDetails) => {
                return (
                  <div
                    className="media shadow-lg p-3 rounded my-3 mx-auto position-relative bg-white"
                    key={postDetails.id}>
                    <div>
                      <div className="d-flex justify-content-start align-items-center">
                        <p className="fs-6 fw-bold px-2 pt-3 text-primary">
                          {postDetails.username}
                        </p>
                      </div>
                      <div className="d-flex">
                        <div className="media-body">
                          <p className="fs-6 fw-bold">{postDetails.title}</p>
                          <p className="text-dark">{postDetails.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
