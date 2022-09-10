import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const NotFound = () => {
  //  const userId = useContext(UserContext).dataProfile.userId;

  return (
    <div className="not-found">
      <h1>Page not found</h1>
    </div>
  );
};

export default NotFound;
