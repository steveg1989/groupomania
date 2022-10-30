import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [mail, setmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const firstnameError = document.querySelector(".firstname.error");
    const lastnameError = document.querySelector(".lastname.error");
    const mailError = document.querySelector(".mail.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    // actualising error
    firstnameError.innerHTML = "";
    lastnameError.innerHTML = "";
    mailError.innerHTML = "";
    passwordError.innerHTML = "";
    passwordConfirmError.innerHTML = "";

    // regex
    function inputValidation() {
      // front errors
      if (firstname.length < 24 && firstname.length >= 3) {
        if (lastname.length < 24 && lastname.length >= 3) {
          if (
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail)
          ) {
            if (password.length < 24 && password.length >= 8) {
              return true;
            } else {
              passwordError.innerHTML = "Must be between 8 and 24 characters";
              return false;
            }
          } else {
            mailError.innerHTML = "Email incorrect";
            return false;
          }
        } else {
          lastnameError.innerHTML = "Incorrect name";
          return false;
        }
      } else {
        firstnameError.innerHTML = "Incorrect first name";
        return false;
      }
    }

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Passwords do not match";
    } else {
      if (inputValidation()) {
        await axios({
          method: "post",
          url: "http://localhost:3001/api/user/register",
          data: {
            firstname,
            lastname,
            mail,
            password,
          },
        })
          .then((res) => {
            if (res.data.errors) {
              // back errors
              firstnameError.innerHTML = res.data.errors.firstname;
              lastnameError.innerHTML = res.data.errors.lastname;
              mailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            } else {
              setFormSubmit(true);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <span></span>
          <h4 className="success">Registration successful, please login</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="firstname">First name</label>
          <br />
          <input 
          className="p-4"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Your first name"
            onChange={(e) => setfirstname(e.target.value)}
            value={firstname}
          />
          <div className="firstname error"></div>
          <br />

          <label htmlFor="lastname">Last name</label>
          <br />
          <input 
          className="p-4"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Your last name"
            onChange={(e) => setlastname(e.target.value)}
            value={lastname}
          />
          <div className="lastname error"></div>
          <br />

          <label htmlFor="mail">E-mail address</label>
          <br />
          <input 
          className="p-4"
            type="text"
            name="mail"
            placeholder="Your email address"
            id="mail"
            onChange={(e) => setmail(e.target.value)}
            value={mail}
          />
          <div className="mail error"></div>
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input 
          className="p-4"
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />

          <label htmlFor="password-conf">Confirm password</label>
          <br />
          <input 
          className="p-4"
            type="password"
            name="password"
            id="password-conf"
            placeholder="Confirm your Password"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <br />

          <input  type="submit" value="Validate registration"></input>
        </form>
      )}
    </>
  );
};

export default SignUpForm;
