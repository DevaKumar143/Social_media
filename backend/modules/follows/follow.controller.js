const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const followService = require("./follow.service");

exports.followUser = asyncHandler(async (req, res) => {
  const follow = await followService.followUser(req.user.id, req.body.userId);
  res.status(201).json(new ApiResponse(201, follow, "User followed successfully"));
});

exports.unfollowUser = asyncHandler(async (req, res) => {
  await followService.unfollowUser(req.user.id, req.body.userId);
  res.status(200).json(new ApiResponse(200, null, "User unfollowed successfully"));
});

exports.getFollowers = asyncHandler(async (req, res) => {
  const followers = await followService.getFollowers(req.params.userId);
  res.status(200).json(new ApiResponse(200, followers));
});

exports.getFollowing = asyncHandler(async (req, res) => {
  const following = await followService.getFollowing(req.params.userId);
  res.status(200).json(new ApiResponse(200, following));
});
