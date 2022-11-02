const db = require("../config/db").getDB();

// get all comments for specific post
module.exports.getAllComments = async (req, res, next) => {

  console.log("Welcome to get comments broooooooooo!");
  const sqlRequest = `SELECT * FROM comments WHERE postId = ${req.params.id} ORDER BY id DESC`;
  db.query(sqlRequest, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
    }
    console.log("commentsssss:", result);
    res.status(200).json(result);
  });
};

// create a post
module.exports.commentPost = async (req, res, next) => {
  try {
    const sqlRequest = `INSERT INTO comments (username, comment, userId, postId ) VALUES ("${req.body.username}","${req.body.comment}", "${req.userId}", "${req.params.id}")`;

    db.query(sqlRequest, (err, result) => {
      if (err) {
        res.status(400).json({ err });
        console.log(err);
      }
      res.status(200).json(result);
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// delete a comment
module.exports.deleteCommentPost = async (req, res, next) => {
  const sqlRequest = `DELETE FROM comment WHERE id = ${req.params.id}`;
  db.query(sqlRequest, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    res.status(200).json(result);
  });
};
