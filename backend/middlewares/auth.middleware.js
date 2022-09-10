const jwt = require("jsonwebtoken");

// deliver jwt
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (token) {
      jwt.verify(token, "hi", async (err, decodedToken) => {
        if (err) {
          res.cookie("jwt", "", { maxAge: 1 });
          next();
        } else {
          res.status(200).json(decodedToken);
        }
      });
    } else {
      res.cookie("jwt", "", { maxAge: 1 });
      res.status(401);
    }
  } catch (err) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(401);
  }
};

// check jwt on every routes
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies);
  if (token) {
    jwt.verify(token, "hi", async (err, decodedToken) => {
      if (err) {
        res.status(401);
      } else {
        console.log(decodedToken);
        req.userId = decodedToken.userId;
        next();
      }
    });
  } else {
    res.status(401);
  }
};
