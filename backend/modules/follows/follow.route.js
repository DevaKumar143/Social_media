const express = require("express");
const router = express.Router();
const followController = require("./follow.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.use(authMiddleware);

router.post("/follow", followController.followUser);
router.post("/unfollow", followController.unfollowUser);


router.get("/followers/:userId", followController.getFollowers);
router.get("/following/:userId", followController.getFollowing);

module.exports = router;