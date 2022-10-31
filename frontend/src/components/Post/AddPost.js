import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../AppContext";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const dataUser = useContext(UserContext);

  const usename =
    dataUser.dataProfile.firstname +" "+ dataUser.dataProfile.lastname;

  const handlePost = async () => {
    const datas = new FormData();
    datas.append("title", title);
    datas.append("content", content);
    datas.append("image_post", image);
    datas.append("username", usename);

    axios({
      method: "post",
      url: `http://localhost:3001/api/post`,
      withCredentials: true,
      data: datas,
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
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo">
        Add New Post
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
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
