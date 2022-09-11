import { UserContext , } from "./components/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

import AllRoutes from "./routes";

function App() {
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
          <AllRoutes />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;