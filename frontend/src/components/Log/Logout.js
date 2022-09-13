import React, { useContext } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../AppContext";

const Logout = () => {
  const navigate = useNavigate();
  const dataUserContext = useContext(UserContext);

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location = "/connection";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <li onClick={logout} className="logout-btn">
      <p>Sign out</p>
    </li>
  );
};

export default Logout;
