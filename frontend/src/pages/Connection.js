import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const Connection = () => {
  const navigate = useNavigate();
  const userId = useContext(UserContext).dataProfile.userId;
  
  if (!userId) {
    return <Log />;
  } else {
    navigate("/profile");
  }
};

export default Connection;
