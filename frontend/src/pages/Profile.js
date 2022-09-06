import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";
import UpdateProfile from "../components/Profile/UpdateProfile";

const Profile = () => {
	const userId = useContext(UserContext);
	return (
		<div>
			{!userId ? (
				<>
					<Log />
				</>
			) : (
				<div className="profile-page">
					<UpdateProfile />
				</div>
			)}
		</div>
	);
};

export default Profile;