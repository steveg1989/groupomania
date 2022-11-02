import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = () => {
	const [signUpModal, setSignUpModal] = useState(false);
	const [signInModal, setSignInModal] = useState(true);

	const handleModals = (e) => {
		if (e.target.id === "register") {
			setSignInModal(false);
			setSignUpModal(true);
		} else if (e.target.id === "login") {
			setSignUpModal(false);
			setSignInModal(true);
		}
	};

	return (
		
		<div className="connection-form">
			<div className="form-container">
				<ul>
					<li 
						onClick={handleModals} 
						id="login" 
						className={signUpModal ? "active" : null}>
						Log in
					</li>
					<li 
						onClick={handleModals} 
						id="register" 
						className={signInModal ? "active" : null}>
            Register
					</li>
				</ul>
				{signUpModal && <SignUpForm />}
				{signInModal && <SignInForm />}
			</div>
		</div>
	);
};

export default Log;