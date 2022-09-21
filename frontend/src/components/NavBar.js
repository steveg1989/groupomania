import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./AppContext";
import axios from "axios";

const NavBar = () => {
  const dataUser = useContext(UserContext);

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
      {dataUser.dataProfile.userId ? (
        <ul>
          <li></li>
          <li className="welcome">
            <NavLink to="/profile">
              {dataUser.dataProfile.img_profile  ? (
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
                  src="./assets/img/default.jpg"
                  alt="profile-pic"
                />
              )}
              <h5>{dataUser.dataProfile.firstname}</h5>
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