import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/AppContext";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Connection from "../pages/Connection";
import NavBar from "../components/NavBar";
import axios from "axios";

function AllRoutes() {
  const dataUserContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie;
    console.log(token);

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
            };
            dataUserContext.updateUserdata(dataProfile);
            navigate("/profile");
          } else {
            navigate("/connection");
          }
        })
        .catch((err) => console.log(err));
    };
    fetchToken();
  }, []);

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/connection" exact element={<Connection />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
