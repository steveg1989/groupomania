const db = require("../config/db").getDB();

// create post
module.exports.createPost = async (req, res, next) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
    userId:req.userId,
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
    console.log(result)
    res.status(200).json(result);
  });
};
// get single post
module.exports.getSiglePost = (req, res, next) => {
  const sqlRequest = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sqlRequest, (err, result) => {
    if (err) res.status(404).json({ err });
    console.log(result)
    res.status(200).json(result);
  });
};

// update post
module.exports.updatePost = (req, res, next) => {
  const sqlRequest = `UPDATE post SET post_message = "${req.body.textUpdate}" WHERE post_id = ${req.params.id}`;
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
  }


//number of like(s)
module.exports.numberOfLike = (req, res, next) => {
  const sqlRequest = `SELECT * FROM heart WHERE post_id = ${req.params.id}`;
  db.query(sqlRequest, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    res.status(200).json(result);
  });
};

// does user already like
module.exports.alreadyLike = (req, res, next) => {
  const sqlRequest = `SELECT post_id, user_id FROM heart WHERE user_id = ${req.body.userId} AND post_id = ${req.params.id}`;
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
  const sqlRequest = `SELECT post_id, user_id FROM heart WHERE user_id = ${req.body.userId} AND post_id = ${req.params.id}`;
  db.query(sqlRequest, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    if (result.length === 0) {
      const sqlRequest = `INSERT INTO heart (user_id, post_id) VALUES (${req.body.userId}, ${req.params.id})`;
      db.query(sqlRequest, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(true);
      });
    } else {
      const sqlRequest = `DELETE FROM heart WHERE user_id = ${req.body.userId} AND post_id = ${req.params.id}`;
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
