const multer = require("multer");

//save profile
const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("before upload image", file);
    cb(null, new Date().toISOString() + file.originalname.split(" ").join("-"));
  },
});

//save post image
const storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/posts");
  },
  filename: function (req, file, cb) {
    console.log("before upload image", file);
    cb(null, new Date().toISOString() + file.originalname.split(" ").join("-"));
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.uploadProfile = multer({
  storage: storageProfile,
  fileFilter: filefilter,
});
module.exports.uploadPost = multer({
  storage: storagePost,
  fileFilter: filefilter,
});
