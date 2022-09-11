import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";
		
const Connection = () => {
	const userId = useContext(UserContext).dataProfile.userId;
	return <div>{!userId ? <Log /> : <h1>Already Connected</h1>}</div>;
};

export default Connection;