import React, { useContext } from "react";
import { UserContext } from "../AppContext";
import AddPost from "./AddPost";
import UploadImg from "./UploadImg";
import UserInfos from "./UserInfos";

// container for profile
const UpdateProfile = () => {
  const dataUser = useContext(UserContext);
  return (
    <>
      <div className="profile-container">
        <UploadImg
          img={dataUser.dataProfile?.img}
          userId={dataUser.dataProfile.userId}
          userFirstName={dataUser.dataProfile.firstname}
        />
        <UserInfos
          userFirstName={dataUser.dataProfile.firstname}
          userLastName={dataUser.dataProfile.lastname}
          userMail={dataUser.dataProfile.email}
          userId={dataUser.dataProfile.userId}
        />
      </div>
      <AddPost />
    </>
  );
};

export default UpdateProfile;
