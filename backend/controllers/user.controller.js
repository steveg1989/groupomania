const db = require("../config/db").getDB();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// user info
module.exports.userInfo = (req, res, next) => {
	const { id: userId } = req.params;
	const sqlRequest = `SELECT id, firstname, lastname, email, picture, isAdmin, isDeleted FROM user WHERE userid = ${userId};`;

	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result[0]);
	});
};

// update img
module.exports.updateImgProfile = async (req, res) => {
	try {
		if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") throw Error("invalid file");
		if (req.file.size > 500000) throw Error("max size");
	} catch (err) {
		res.status(201).json({ err });
	}

	const fileName = req.body.name + req.body.userId + ".jpg";
	const path = `${__dirname}/../../client/public/uploads/profile/${fileName}`;
	const clientPath = `./uploads/profile/${fileName}`;

	await pipeline(req.file.stream, fs.createWriteStream(path));

	try {
		const sqlRequest = `UPDATE user SET user_picture = "${clientPath}" WHERE user_id = ${req.body.userId}`;
		db.query(sqlRequest, (err, result) => {
			if (err) {
				res.status(500).json({ err });
			}
			res.status(200).json(clientPath);
		});
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};