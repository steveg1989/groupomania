const bcrypt = require("bcrypt");
const db = require("../config/db").getDB();
const jwt = require("jsonwebtoken");
const Errors = require("../utils/errors.utils");

// signup
module.exports.signUp = async (req, res) => {
  console.log("signup...");
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
		const sqlRequest = `INSERT INTO users (firstname, lastname, email, password) VALUES ('${user.firstname}', '${user.lastname}', '${user.email}', '${user.password}')`;
		db.query(sqlRequest, (err, result) => {
			if (err) {
				const errors = Errors(err);
				res.status(400).json({ errors });
				return;
			} else {
				res.status(201).json({ message: "user created, welcome " + user.firstname });
			}
		});
	} catch (err) {
		res.status(400).json({ message: "register failed", err });
	}
};

// signin
module.exports.signIn = async (req, res) => {
  const usermail = req.body.email.trim();
  const sqlRequest = `SELECT email, password, firstname, lastname, imageurl, userId FROM users WHERE email='${usermail}'`;

  db.query(sqlRequest, async (err, result) => {
    console.log(result);

    if (err) res.status(404).json({ err });

    try {
      const userPassword = req.body.password;
      const hashedPassword = result[0].password;
      const auth = await bcrypt.compare(userPassword, hashedPassword);
      if (auth) {
        // email found & password ✔️
        const maxAge = 1 * (24 * 60 * 60 * 1000);
        const userId = result[0].userId;
        const token = jwt.sign(
          { userId },
          "hi",

          {
            expiresIn: maxAge,
          });

          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
          res.status(200).json({
            message: "logged",
            token: token,
            email: result[0].email,
            userId: result[0].userId,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            img_profile: result[0].imageurl,
          });
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
  console.log("param ID", req.params.id);
	const sqlRequest = `DELETE FROM users WHERE userId = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(200).json({ err });
		} else {
			res.clearCookie("jwt");
			res.status(201).json({ message: "user deactived" });
		}
	});
};