import axios from "axios";
import React, { useContext, useEffect } from "react";
import Logout from "../Log/Logout";
import { UserContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

const UserInfos = () => {
  // logout and delete account
  const dataUserContext = useContext(UserContext);
  const navigate = useNavigate();
  const deleteAccount = () => {
    axios({
      method: "patch",
      baseURL: `${process.env.REACT_APP_API_URL}api/user/delete-account/${dataUserContext.dataProfile.userId}`,
      withCredentials: true,
    })
      .then(() => {
        window.location = "/";
      })
      .catch((err) => console.log(err));
  };


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
              img_profile: data.img_profile,
            };
            dataUserContext.updateUserdata(dataProfile);
          } else {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    };
    fetchToken();
  }, []);


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
