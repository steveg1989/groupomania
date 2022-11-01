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

  const userId = useContext(UserContext).dataProfile.userId;

  if (!userId) {
    navigate("/");
  }

  // delete post
  const deletPost = async () => {
    await axios({
      method: "delete",
      baseURL: `http://localhost:3001/api/post/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) window.location = "/profile";
      })
      .catch((err) => console.log(err));
  };

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
                  <>
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
                        <div className="mt-2">
                          {postDetails.imageurl ? (
                            <img
                              src={`http://localhost:3001${postDetails.imageurl}`}
                              className="w-50 h-50"
                              alt="post"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="d-flex justify-content-end align-items-center p2 mt-3">
                          {userId === postDetails.userId ? (
                            <div
                              style={{ cursor: "pointer" }}
                              className="text-primary text-decoration-underline">
                              {" "}
                              Edit
                            </div>
                          ) : (
                            ""
                          )}
                          {userId === postDetails.userId ? (
                            <div
                              onClick={deletPost}
                              style={{ cursor: "pointer" }}
                              className="text-danger ms-2 text-decoration-underline">
                              {" "}
                              Delete
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="post-comment-block">
                      <div>
                        <textarea className="w-100 p-4 rounded-3"></textarea>
                        <div className="d-flex justify-content-end">
                          <button className="px-3 py-2 float-en rounded-3 bg-primary text-white">
                            Add comment
                          </button>
                        </div>
                      </div>
                      <div>Comments will display her!</div>
                    </div>
                  </>
                );
              })}
            </>
          </div>
        </div>
      </div>
    </>
  );
}
