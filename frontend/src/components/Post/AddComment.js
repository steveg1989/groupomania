import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../AppContext";

const AddComent = ({ postId }) => {
  const [comment, setComment] = useState("");
  const dataUser = useContext(UserContext);
  const usename =
    dataUser.dataProfile.firstname + " " + dataUser.dataProfile.lastname;

  const handleAddComment = async () => {
  
    const data = {
      comment: comment,
      username: usename,
    }; 

    axios({
      method: "post",
      url: `http://localhost:3001/api/comment/${postId}`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <textarea
          onChange={(event) => {
            setComment(event.target.value);
          }}
          className="w-100 p-4 rounded-3"></textarea>
        <div className="d-flex justify-content-end">
          <button
            onClick={handleAddComment}
            className="px-3 py-2 float-en rounded-3 bg-primary text-white">
            Add comment
          </button>
        </div>
      </div>
    </>
  );
};

export default AddComent;
