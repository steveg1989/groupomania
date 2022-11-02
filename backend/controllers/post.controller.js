const db = require("../config/db").getDB();

// create post
module.exports.createPost = async (req, res, next) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
    userId: req.userId,
    imageurl: req.file ? "/uploads/posts/" + req.file.filename : "",
  };
  console.log("postsss:", req.body);

  try {
    const sqlRequest = `INSERT INTO posts (title, content, username, userId, imageurl ) VALUES ("${newPost.title}","${newPost.content}", "${newPost.username}", "${newPost.userId}", "${newPost.imageurl}")`;
    db.query(sqlRequest, (err, result) => {
      if (err) {
        res.status(400).json({ err });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// get all posts
module.exports.getAllPosts = (req, res, next) => {
  const sqlRequest = "SELECT * FROM posts ORDER BY id DESC";
  console.log("get all man !");
  db.query(sqlRequest, (err, result) => {
    if (err) res.status(404).json({ err });
    res.status(200).json(result);
  });
};
// get single post
module.exports.getSinglePost = (req, res, next) => {
  const sqlRequest = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sqlRequest, (err, result) => {
    if (err) res.status(404).json({ err });
    res.status(200).json(result);
  });
};

// update post
module.exports.updatePost = (req, res, next) => {
  let sqlRequest = "";

  if (req.file) {
    sqlRequest = `UPDATE posts SET title = "${req.body.title}", content = "${req.body.content}", imageurl="/uploads/posts/${req.file.filename}" WHERE id = ${req.params.id}`;
  } else {
    sqlRequest = `UPDATE posts SET title = "${req.body.title}", content = "${req.body.content}", imageurl="${req.body.image_post}" WHERE id = ${req.params.id}`;
  }

  db.query(sqlRequest, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    res.status(200).json(result);
  });
};

// delete post and all the comments
module.exports.deletePost = (req, res, next) => {
  const sqlRequest = `DELETE FROM posts WHERE id = ${req.params.id}`;

  db.query(sqlRequest, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    res.status(200).json(result);
  });
};

// like post
module.exports.makeAsRead = (req, res, next) => {};
