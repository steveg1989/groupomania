import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../AppContext";
import UploadImg from "./UploadImg";
import UserInfos from "./UserInfos";

// container for profile
const UpdateProfile = () => {
    const dataUser = useContext(UserContext);
    // get user infos
    useEffect(() => {
      const fetchToken = async () => {
        await axios({
          method: "get",
          url: `http://localhost:3001/api/user/get-info`,
          withCredentials: true,
        })
          .then((res) => {
            if (res.status === 200) {
              // get user data
              const data = res.data;
              const dataProfile = {
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                message: data.message,
                userId: data.userId,
                imageurl: data.imageurl,
              };
              dataUser.updateUserdata(dataProfile);
            } else {
            }
          })
          .catch((err) => console.log(err));
      };

      fetchToken();
    }, []);

  return (
    <>
      <nav className="nav-container">
        <ul></ul>
        <img
          className="logo"
          src="./assets/logos/icon-left-font-monochrome-black.png"
          alt="logo"
        />
          <div>
            <div className="d-flex align-items-center flex ">
              {dataUser.dataProfile.imageurl ? (
                <img
                  className="profile-pic"
                  src={"http://localhost:3001" + dataUser.dataProfile.imageurl}
                  alt="profile-pic"
                />
              ) : (
                <img
                  className="profile-pic"
                  src="./assets/img/default-profile.jpg"
                  alt="profile-pic"
                />
              )}
              <h5>{dataUser.dataProfile.firstname}</h5>
            </div>
          </div>
        <ul></ul>
      </nav>

      <div className="profile-container">
        <UploadImg />
        <UserInfos />
      </div>
    </>
  );
};

export default UpdateProfile;
