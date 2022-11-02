import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dataUserContext = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const error = document.querySelector(".error");
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      error.innerHTML = "";

      axios({
        method: "post",
        url: `http://localhost:3001/api/user/login`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.error) {
            error.innerHTML = res.data.message;
          } else {
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      error.innerHTML = "Invalid Email";
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          placeholder="Your email address"
          className="p-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          className="p-4"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="error"></div>
        <br />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default SignInForm;