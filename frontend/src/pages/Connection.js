import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";
import axios from "axios";

const Connection = () => {
  const navigate = useNavigate();
  const dataUserContext = useContext(UserContext);

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
            dataUserContext.updateUserdata(dataProfile);
            navigate("/profile");
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
        <ul></ul>
      </nav>
      <Log />;
    </>
  );
};

export default Connection;