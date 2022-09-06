import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
	const [mail, setmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		const error = document.querySelector(".error");

		if (mail.length < 24 && (mail.length > 6) & /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail)) {
			error.innerHTML = "";

			axios({
				method: "post",
				URL: `${process.env.REACT_APP_API_URL}api/user/login`,
				withCredentials: true,
				data: {
					mail,
					password,
				},
			})
				.then((res) => {
					if (res.data.error) {
						error.innerHTML = res.data.message;
					} else {
						window.location = "/";
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
				<label htmlFor="mail">email</label>
				<br />
				<input type="text" name="mail" id="mail" value={mail} onChange={(e) => setmail(e.target.value)} />
				<br />
				<br />
				<br />
				<label htmlFor="password">Password</label>
				<br />
				<input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<div className="error"></div>
				<br />
				<input type="submit" value="To log in" />
			</form>
		</div>
	);
};

export default SignInForm;