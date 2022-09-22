const db = require("../config/db").getDB();

// get all comments
module.exports.getAllComments = async (req, res, next) => {
	const sqlRequest = `SELECT * FROM comment WHERE comment_postId = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
			console.log(err);
			throw err;
		}
		res.status(200).json(result);
	});
};

// create a post
module.exports.commentPost = (req, res, next) => {
	const 
		{postId, UserId, content} = req.body;
	
	const sqlRequest = `INSERT INTO comments (id, postId, userId, content) VALUES (${id}, ${postId}, ${UserId}, "${content}")`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
			console.log(err);
			throw err;
		}
		res.status(200).json(result);
	});
};

// delete a comment
module.exports.deleteCommentPost = async (req, res, next) => {
	const sqlRequest = `DELETE FROM comment WHERE comment_id = ${req.params.id}`;
	db.query(sqlRequest, (err, result) => {
		if (err) {
			res.status(404).json({ err });
		}
		res.status(200).json(result);
	});
};