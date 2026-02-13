
const express = require("express");
const router = express.Router();
const postController = require("./post.controller");
const auth = require("../../middlewares/auth.middleware");

router.use(auth);

router.post("/createpost", postController.createPost);
router.get("/allpost", postController.getMyPosts);
router.put("/updatepost/:id", postController.getPost);
router.delete("/deletepost/:id", postController.deletePost);

module.exports = router;