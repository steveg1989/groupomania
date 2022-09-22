const db = require("../config/db").getDB();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// create post
module.exports.createPost = async (req, res, next) => {
	if (req.file !== null) {
		try {
			if (
				req.file.detectedMimeType != "image/jpg" && 
				req.file.detectedMimeType != "image/png" && 
				req.file.detectedMimeType != "image/jpeg" && 
				req.file.detectedMimeType != "image/gif"
				) 
				throw Error("invalid file");
			if (req.file.size > 2500000) throw Error("max size");
		} catch (err) {
			return res.status(201).json({ err });
		}

		if (req.file.detectedMimeType == "image/gif") {
			fileName = req.body.posterId + Date.now() + ".gif";
		} else {
			fileName = req.body.posterId + Date.now() + ".jpg";
		}

		const path = `${__dirname}/../../client/public/uploads/posts/${fileName}`;

		await pipeline(req.file.stream, fs.createWriteStream(path));
	}

	const newPost = {
		posterId: req.body.posterId,
		message: req.body.message,
		picture: req.file !== null ? "./uploads/posts/" + fileName : "",
		video: req.body.video,
		timestamps: req.body.timestamps,
	};

	try {
		const sqlRequest = `INSERT INTO posts (id, userId, content, imageURL) VALUES ("${Id}", "${userId}", "${content}", "${imageURL}")`;
		db.query(sqlRequest, (err, result) => {
			if (err) {
				res.status(500).json({ err });
			}
			res.status(200).json(result);
		});
	} catch (err) {
		return res.status(400).send(err);
	}
};

// get all posts
module.exports.getAllPosts = (req, res, next) => {
	const sqlRequest = "SELECT * FROM post ORDER BY postId";
	db.query(sqlRequest, (err, result) => {
		if (err) res.status(404).json({ err });
		res.status(200).json(result);
	});
};

// update post
module.exports.updatePost = (req, res, next) => {
	const sqlRequest = `UPDATE post SET post_message = "${req.body.textUpdate}" WHERE postId = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result);
	});
};

// delete post and all the comments
module.exports.deletePost = (req, res, next) => {
	const sqlRequest = `DELETE FROM post WHERE postId = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		const sqlRequest = `DELETE FROM comment WHERE comment_postId = ${req.params.id}`;
		db.query(sqlRequest, (err, result) => {
			if (err) {
				res.status(404).json({ err });
			}
			res.status(200).json(result);
		});
	});
};

//number of like(s)
module.exports.numberOfLike = (req, res, next) => {
	const sqlRequest = `SELECT * FROM heart WHERE postId = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result);
	});
};

//user already like
module.exports.alreadyLike = (req, res, next) => {
	const sqlRequest = `SELECT postId, userId FROM heart WHERE userId = ${req.body.userId} AND postId = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		if (result.length === 0) {
			res.status(200).json(false);
		} else {
			res.status(200).json(true);
		}
	});
};

// like post
module.exports.likeUnlike = (req, res, next) => {
	const sqlRequest = `SELECT postId, userId FROM heart WHERE userId = ${req.body.userId} AND postId = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		if (result.length === 0) {
			const sqlRequest = `INSERT INTO heart (userId, postId) VALUES (${req.body.userId}, ${req.params.id})`;
			db.query(sqlRequest, (err, result) => {
				if (err) {
					res.status(404).json({ err });
					throw err;
				}
				res.status(200).json(true);
			});
		} else {
			const sqlRequest = `DELETE FROM heart WHERE userId = ${req.body.userId} AND postId = ${req.params.id}`;
			db.query(sqlRequest, (err, result) => {
				if (err) {
					res.status(404).json(err);
					throw err;
				}
				res.status(200).json(false);
			});
		}
	});
};