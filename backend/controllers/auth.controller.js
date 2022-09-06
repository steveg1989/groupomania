const bcrypt = require("bcrypt");
const db = require("../config/db").getDB();
const jwt = require("jsonwebtoken");
const Errors = require("../utils/errors.utils");

// signup
module.exports.signUp = async (req, res) => {
	try {
		const userPassword = req.body.password;
		// salt pwd
		const salt = await bcrypt.genSalt(9);
		const hash = await bcrypt.hash(userPassword, salt);

		const user = {
			...req.body,
			password: hash,
		};
    console.log(user);
		const sqlRequest = `INSERT INTO users (firstname, lastname, email, password) VALUES ('${user.firstname}', '${user.lastname}', '${user.mail}', '${user.password}')`;
		db.query(sqlRequest, (err, result) => {
			if (err) {
				const errors = Errors(err);
				res.status(200).json({ errors });
				return;
			} else {
				res.status(201).json({ message: "user created, welcome " + user.firstname });
			}
		});
	} catch (err) {
		res.status(200).json({ message: "register failed", err });
	}
};

// signin
module.exports.signIn = async (req, res) => {
	const userMail = req.body.email;
	console.log(userMail);
	const sqlRequest = `SELECT firstname, lastname, password, id FROM users WHERE email='${userMail}'`;

	db.query(sqlRequest, async (err, result) => {
		console.log(result);
		
		if (err) return res.status(404).json({ err });
		
		
				try {
					const userPassword = req.body.password;
					const hashedPassword = result[0].user.password;
					const auth = await bcrypt.compare(userPassword, hashedPassword);
					if (auth) {
						// email found & password ✔️

						const maxAge = 1 * (24 * 60 * 60 * 1000);
						const userId = result[0].user_id;
						const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
							expiresIn: maxAge,
						});
						delete result[0].user_password;
						res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
						res.status(200).json({ message: "logged", token: token });
					} else {
						res.status(200).json({
							error: true,
							message: "Invalid email or password.",
						});
					}
				} catch (err) {
					console.log(err);
					return res.status(400).json({ err });
				}
			
	});
};

// logout
module.exports.logout = (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json("logout");
};

// delete account
module.exports.deleteAccount = (req, res, next) => {
	const sqlRequest = `UPDATE user SET isDeleted = 1 WHERE user_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(200).json({ err });
		} else {
			res.clearCookie("jwt");
			res.status(201).json({ message: "user deactived" });
		}
	});
};