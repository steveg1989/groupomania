import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import UpdateProfile from "../components/Profile/UpdateProfile";
import { UserContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";
import EditPost from "../components/Post/EditPost";
import AddComment from "../components/Post/AddComment";
import DisplayComments from "../components/Post/DisplayComments";

export default function DisplayPostDetails() {
  const [postDetails, setPostDetails] = useState([]);
  const navigate = useNavigate();

  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");

  const userId = useContext(UserContext).dataProfile.userId;

  // delete post
  const deletPost = async () => {
    await axios({
      method: "delete",
      baseURL: `http://localhost:3001/api/post/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) navigate("/profile");
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
        .catch((err) => console.log(err));
    };
    getPostDetails();
  }, []);

  // make post as read
  useEffect(() => {
    const makePostAsReact = async () => {
      await axios({
        method: "post",
        url: `http://localhost:3001/api/post/makeasread/${id}`,
        withCredentials: true,
      })
        .then((res) => {
          // 
        })
        .catch((err) => console.log(err));
    };
    makePostAsReact();
  }, []);

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
                          {postDetails.userId === userId ? (
                            <p className="fs-6 fw-bold text-primary">You</p>
                          ) : (
                            <p className="fs-6 fw-bold text-primary">
                              {postDetails.username}
                            </p>
                          )}
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
                              <EditPost
                                posTitle={postDetails.title}
                                postContent={postDetails.content}
                                PostImage={postDetails.imageurl}
                                postId={postDetails.id}
                              /> 
                            </div>
                          ) : (
                            ""
                          )}
                          {userId === postDetails.userId ? (
                            <div
                              onClick={deletPost}
                              style={{ cursor: "pointer" }}
                              className="text-danger ms-2 text-decoration-underline">
                              Delete
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="post-comment-block">
                      <AddComment postId={postDetails.id} />
                    </div>
                  </>
                );
              })}
              <div className="comments-block">
                <DisplayComments postId={id} />
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
