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
module.exports.getAllPosts = async (req, res, next) => {
  const sqlRequest = "SELECT * FROM posts ORDER BY id DESC";
  await db.query(sqlRequest, async (err, result) => {
    if (err) res.status(404).json({ err });

    let posts = result;
    var postsViewed;

    const sqlPostViewedRequest = `SELECT * FROM postsviewed`;

    await db.query(sqlPostViewedRequest, (err, result) => {
      if (err) {
        res.status(404).json({ err });
      }
      postsViewed = result;
      res.status(200).json({ posts: posts, postsViewed: postsViewed });
    });
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

// make post as read
module.exports.makePostAsRead = (req, res, next) => {
  const sqlPostsViewed = `SELECT * FROM postsviewed`;

  db.query(sqlPostsViewed, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }

    const postWasView = result?.find((postViewed) => {
      return (
        postViewed.userId === req.userId &&
        postViewed.postId === parseInt(req.params.id)
      )
    });

    if (postWasView) {
      return res.status(200).json(result);
    }

    const sqlRequest = `INSERT INTO postsviewed (userId, postId ) VALUES ("${req.userId}", "${req.params.id}")`;

    db.query(sqlRequest, (err, result) => {
      if (err) {
        res.status(404).json({ err });
      }
      res.status(200).json(result);
    });
  });
};