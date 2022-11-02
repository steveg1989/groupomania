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
		window.location = "/";
	  	}
		})
		.catch((err) => console.log(err));
  };

	return (
		<div onClick={logout}>
      <input className="submit-btn" type="submit" value="Sign out" />
    </div>
	);
};

export default Logout;