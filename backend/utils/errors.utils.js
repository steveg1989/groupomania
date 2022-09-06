// signup errors
module.exports = (err) => {
	let errors = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	};
	if (err.sqlMessage.includes("firstname")) errors.firstname = "First name incorrect";
	if (err.sqlMessage.includes("lastname")) errors.lastname = "Last name incorrect";
	if (err.sqlMessage.includes("email")) errors.email = "Email incorrect";
	if (err.sqlMessage.includes("password")) errors.password = "incorrect password";
	if (err.errno == 1062) errors.email = "This email is already taken";
	return errors;
};