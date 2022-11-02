import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../AppContext";

export default function DisplayPosts() {
  const [posts, setPosts] = useState([]);
  const userId = useContext(UserContext).dataProfile.userId;

  // get all posts
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
        .catch((err) => console.log(err));
    };

    getPosts();
  }, []);

  return (
    <>
      {posts?.posts?.length > 0 ? (
        ""
      ) : (
        <div className="my-3">"No Post Found"</div>
      )}

      {posts?.posts?.map((post) => {
        return (
          <>
            <div
              className="media shadow-lg p-3 rounded my-3 mx-auto position-relative"
              style={{
                backgroundColor: `${
                  post.userId === userId
                    ? "white"
                    : `${
                        posts?.postsViewed?.lenght <= 0
                          ? "#c1d9fc"
                          : `${
                              posts?.postsViewed?.find((postViewed) => {
                                return (
                                  postViewed.userId === userId &&
                                  postViewed.postId === post.id
                                ) 
                              })
                                ? "white"
                                : "#c1d9fc"
                            }`
                      }`
                }`,
              }}
              key={post.id}>
              <Link
                to={`/postdetail?id=${post.id}`}
                className="text-decoration-none">
                <div className="d-flex justify-content-start align-items-center">
                  Post by:
                  {post.userId === userId ? (
                    <p className="fs-6 fw-bold px-2 pt-3 text-primary">You</p>
                  ) : (
                    <p className="fs-6 fw-bold px-2 pt-3 text-primary">
                      {post.username}
                    </p>
                  )}
                </div>
                <div className="d-flex">
                  <div className="media-body">
                    <p className="fs-6 fw-bold">{post.title}</p>
                    <p className="text-dark">{post.content}</p>
                  </div>
                </div>
              </Link>
            </div>
          </>
        );
      })}
    </>
  );
}
