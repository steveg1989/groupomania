const db = require("../config/db").getDB();
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// user info
module.exports.userInfo = (req, res, next) => {
  const userId = req.userId;
  const sqlRequest = `SELECT userId, firstname, imageurl, lastname, email FROM users WHERE userId = ${userId};`;

  db.query(sqlRequest, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    // response data
    const user = {
      email: result[0].email,
      userId: result[0].userId,
      firstname: result[0].firstname,
      lastname: result[0].lastname,
      img_profile: result[0].imageurl,
    };
    res.status(200).json(user);
  });
};

// update img
module.exports.updateImgProfile = async (req, res) => {
  console.log(req.userId);
  console.log("after upload image", req.file);
  try {
    const sqlRequest = `UPDATE users SET imageurl = "${
      "/uploads/" + req.file.filename
    }" WHERE userId = ${req.userId}`;
    db.query(sqlRequest, (err, result) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
