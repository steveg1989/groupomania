import axios from "axios";
import React from "react";
import Logout from "../Log/Logout";
import cookie from "js-cookie";

const UserInfos = ({ userFirstName, userLastName, userMail, userId }) => {
	// logout and delete account

	const removeCookie = (key) => {
		if (window !== "undefined") {
			cookie.remove(key);
		}
	};
	const deleteAccount = () => {
		axios({
			method: "patch",
			baseURL: `${process.env.REACT_APP_API_URL}api/user/delete-account/${userId}`,
			withCredentials: true,
		})
			.then(() => removeCookie("jwt"))
			.catch((err) => console.log(err));
		window.location = "/connection";
	};

	return (
		<div className="infos-container">
			<h1>
			Profile of <span>{userFirstName}</span>
			</h1>
			<div className="info">
				<div>
					<p>
					First name :<span>{userFirstName}</span>
					</p>
				</div>
				<div>
					<p>
					Last name :<span>{userLastName}</span>
					</p>
				</div>
				<div>
					<p>
						Email:
						<span>{userMail}</span>
					</p>
				</div>
			</div>
			<Logout />
			<div
				id="deleteAccount"
				onClick={() => {
					if (window.confirm("Do you want to deactivate your account?")) {
						deleteAccount();
					}
				}}
			>
				Delete account
			</div>
		</div>
	);
};

export default UserInfos;