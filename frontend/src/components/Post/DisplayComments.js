import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../AppContext";

export default function DisplayComments({ postId }) {
  const [comments, setComments] = useState([]);
  const userId = useContext(UserContext).dataProfile.userId;

  // get all comments for specific post
  useEffect(() => {
    const getcomments = async () => {
      await axios({
        method: "get",
        baseURL: `http://localhost:3001/api/comment/${postId}`,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            setComments(res.data);
          }
        })
        .catch((err) => console.log(err));
    };
    getcomments();
  }, []);

  return (
    <>
      <div>
        <div className="comment">
          <div className=""> 
            <>
              {comments.length > 0 ? (
                ""
              ) : (
                <div className="my-3">"No comments Found"</div>
              )}

              {comments.map((comments) => {
                return (
                  <>
                    <div
                      className="media shadow-lg p-3 rounded my-3 mx-auto position-relative bg-white"
                      key={comments.id}>
                      <div>
                        <div className="d-flex justify-content-start align-items-center">
                          {comments.userId === userId ? (
                            <p className="fs-6 fw-bold text-primary">You</p>
                          ) : (
                            <p className="fs-6 fw-bold text-primary">
                              {comments.username}
                            </p>
                          )}
                        </div>
                        <div className="d-flex">
                          <div className="media-body">
                            <p className="text-dark">{comments.comment}</p>
                          </div>
                        </div>
                      </div>
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