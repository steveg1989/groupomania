import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./AppContext";
import axios from "axios";

const NavBar = () => {
  const userId = useContext(UserContext).dataProfile.userId;
  const [userPic, setUserPic] = useState("");
  const [userFirstName, setUserFirstName] = useState();

  useEffect(() => {
    const getPicAndName = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
      })
        .then((res) => {
          setUserFirstName(res.data.user_first_name);
          setUserPic(res.data.user_picture);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPicAndName();
  }, []);

  return (
    <div className="nav-container">
      <ul></ul>
      <NavLink to="/">
        <img
          className="logo"
          src="./assets/logos/icon-left-font-monochrome-black.png"
          alt="logo"
        />
      </NavLink>
      {userId ? (
        <ul>
          <li></li>
          <li className="welcome">
            <NavLink to="/profile">
              {userPic ? (
                <img className="profile-pic" src={userPic} alt="profile-pic" />
              ) : (
                <img
                  className="profile-pic"
                  src="./assets/img/default-profile.jpeg"
                  alt="profile-pic"
                />
              )}
              <h5>{userFirstName}</h5>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul></ul>
      )}
    </div>
  );
};

export default NavBar;
