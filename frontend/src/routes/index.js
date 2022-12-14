import { Route, Routes } from "react-router-dom";

import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Connection from "../pages/Connection";
import PostDetail from "../pages/PostDetail";

function AllRoutes() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" exact element={<Connection />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/postdetail" exact element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;