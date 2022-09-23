const router = require("express").Router();
const postController = require("../controllers/post.controller");
const { checkUser } = require("../middlewares/auth.middleware");
const { uploadPost } = require("../middlewares/muter-upload");

// posts
router.post(
  "/",
  checkUser,
  uploadPost.single("image_post"),
  postController.createPost
);
router.get("/", checkUser, postController.getAllPosts);
router.post("/:id", checkUser, postController.updatePost);
router.delete("/:id", checkUser, postController.deletePost);

// likes
router.get("/likes/:id", checkUser, postController.numberOfLike);
router.post("/likes/:id", checkUser, postController.alreadyLike);
router.post("/like-unlike/:id", checkUser, postController.likeUnlike);

module.exports = router;
