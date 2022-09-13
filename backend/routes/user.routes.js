const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const { checkUser } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/muter-upload");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.patch("/delete-account/:id", checkUser, authController.deleteAccount);
// user
router.get("/get-info", checkUser, userController.userInfo);
router.post(
  "/upload",
  checkUser,
  upload.single("profile_image"),
  userController.updateImgProfile
);

module.exports = router;
