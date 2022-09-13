import React from "react";
import axios from "axios";

const Logout = () => {
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
