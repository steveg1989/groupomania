import axios from "axios";
import React, { useContext } from "react";
import Logout from "../Log/Logout";
import { UserContext } from "../AppContext";

const UserInfos = () => {
  // logout and delete account
  const dataUserContext = useContext(UserContext);
  
  const deleteAccount = () => {
    axios({
      method: "patch",
      baseURL: `${process.env.REACT_APP_API_URL}api/user/delete-account/${dataUserContext.dataProfile.userId}`,
      withCredentials: true,
    })
      .then((res) => {
        if(res.status === 200) window.location = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="infos-container">
      <h1>
        Profile of <span>{dataUserContext.dataProfile.firstname}</span>
      </h1>
      <div className="info">
        <div>
          <p>
            First name :<span>{dataUserContext.dataProfile.firstname}</span>
          </p>
        </div>
        <div>
          <p>
            Last name :<span>{dataUserContext.dataProfile.lastname}</span>
          </p>
        </div>
        <div>
          <p>
            Email:
            <span>{dataUserContext.dataProfile.email}</span>
          </p>
        </div>
      </div>
      <Logout />
      <div
        id="deleteAccount"
        onClick={() => {
          if (window.confirm("Do you want to deactivate your account?")) {
            deleteAccount();
          }
        }}>
        Delete account
      </div>
    </div>
  );
};

export default UserInfos;
