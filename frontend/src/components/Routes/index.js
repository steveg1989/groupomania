import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import NotFound from "../../pages/NotFound";
import Connection from "../../pages/Connection";
import NavBar from "../NavBar";

const index = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/connection" exact element={<Connection />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
