import { useEffect, useState } from "react";
import { UserContext } from "./components/AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Connection from "./pages/Connection";
import NavBar from "./components/NavBar";

function App() {
  useEffect(() => {
    const token = document.cookie.split("=")[1];
    const fetchToken = async () => {};
    fetchToken();
  }, []);

  let dataProfile = {
    email: "",
    firstname: "",
    lastname: "",
    message: "",
    token: "",
    userId: "",
  };

  const updateUserdata = (data) => {
    dataProfile.email = data.email;
    dataProfile.firstname = data.firstname;
    dataProfile.lastname = data.lastname;
    dataProfile.message = data.message;
    dataProfile.token = data.token;
    dataProfile.userId = data.userId;
  };

  return (
    <div className="app">
      <UserContext.Provider value={{ dataProfile, updateUserdata }}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/connection" exact element={<Connection />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>{" "}
      </UserContext.Provider>
    </div>
  );
}

export default App;
