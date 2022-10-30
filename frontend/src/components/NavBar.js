import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./AppContext";

const NavBar = () => {
  const dataUser = useContext(UserContext);

  return (
    <div className="nav-container">
      <ul></ul>
      <img
        className="logo"
        src="./assets/logos/icon-left-font-monochrome-black.png"
        alt="logo"
      />
      {dataUser.dataProfile.userId ? (
        <div>
          <div className="d-flex align-items-center flex-row ">
              {dataUser.dataProfile.img_profile ? (
                <img
                  className="profile-pic"
                  src={
                    "http://localhost:3001" + dataUser.dataProfile.img_profile
                  }
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NavBar;
