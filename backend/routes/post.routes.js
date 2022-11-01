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
router.get("/:id", checkUser, postController.getSinglePost);
router.post("/:id", checkUser, postController.updatePost);
router.delete("/:id", checkUser, postController.deletePost);

// likes
router.post("/makeasread/:id", checkUser, postController.makeAsRead);

module.exports = router;
