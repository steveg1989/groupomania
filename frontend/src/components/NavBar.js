import { useContext, useEffect } from "react";
import { UserContext } from "./AppContext";
import axios from "axios";
 
const NavBar = () => {
  const dataUser = useContext(UserContext);
  // get user infos
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
            dataUser.updateUserdata(dataProfile);
          } else {
          }
        })
        .catch((err) => console.log(err));
    };

    fetchToken();
  }, []);

  return (
    <div className="nav-container">
      <img
        className="logo"
        src="./assets/logos/icon-left-font-monochrome-black.png"
        alt="logo"
      />
      {dataUser.dataProfile.imageurl ? (
        <div>
          <div className="d-flex align-items-center flex ">
            {dataUser.dataProfile.imageurl ? (
              <img
                className="profile-pic"
                src={"http://localhost:3001" + dataUser.dataProfile.imageurl}
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
        <div>lol</div>
      )}
    </div>
  );
};

export default NavBar;
