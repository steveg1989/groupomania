import axios from "axios";
import { useState } from "react";

const EditPost = ({postId, posTitle, postContent, PostImage}) => {
  const [title, setTitle] = useState(posTitle);
  const [content, setContent] = useState(postContent);
  const [image, setImage] = useState(PostImage);

  const handlePost = async () => {
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("image_post", image);

    axios({
      method: "put",
      url: `http://localhost:3001/api/post/${postId}`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          // get data
          //console.log(res.data);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button
        className="text-primary bg-transparent text-decoration-underline"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo">
        Edit
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    id="recipient-name"
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Content:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Image:
                  </label>
                  <input
                    type="file"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePost}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
