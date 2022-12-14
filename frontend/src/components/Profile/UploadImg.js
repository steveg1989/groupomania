import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../AppContext";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dataUserContext = useContext(UserContext);

  // change pic
  const handlePicture = (e) => {
    const formData = new FormData();
    formData.append("profile_image", file);

    axios({
      method: "post",
      baseURL: `${process.env.REACT_APP_API_URL}api/user/upload`,
      withCredentials: true,
      data: formData,
    })
      .then((res) => {
        if (res.err) {
          console.log(res.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile-picture">
      <div className="profile-img">
        {dataUserContext.dataProfile.imageurl ? (
          <img
            className="profile-pic"
            src={"http://localhost:3001" + dataUserContext.dataProfile.imageurl}
            alt="profile-pic"
          />
        ) : (
          <img
            className="profile-pic"
            src="./assets/img/default.jpg"
            alt="profile-pic"
          />
        )}
      </div>
      <div></div>

      <form action="" onSubmit={handlePicture} className="upload-pic">
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <input
          className="submit-btn"
          type="submit"
          value="Change profile picture"
        />
      </form>
    </div>
  );
};

export default UploadImg;