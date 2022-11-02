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

router.put("/:id", checkUser,uploadPost.single("image_post"), postController.updatePost);

router.get("/", checkUser, postController.getAllPosts);
router.get("/:id", checkUser, postController.getSinglePost);
router.delete("/:id", checkUser, postController.deletePost);

// 
router.post("/makeasread/:id", checkUser, postController.makePostAsRead);

module.exports = router;
