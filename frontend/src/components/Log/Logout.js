import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
	const removeCookie = (key) => {
		if (window !== "undefined") {
			cookie.remove(key);
		}
	};

	const logout = async () => {
		await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/user/logout`,
			withCredentials: true,
		})
			.then(() => removeCookie("jwt"))
			.catch((err) => console.log(err));
		window.location = "/connection";
	};

	return (
		<li onClick={logout} className= "logout-btn">
      <p>Sign out</p>
			
		</li>
	);
};

export default Logout;