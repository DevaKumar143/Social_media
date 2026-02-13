const Follow = require("./follow.model");
const ApiError = require("../../utils/ApiError");
const User = require("../users/user.model")
const mongoose = require("mongoose");


const followUser = async (followerId, followingId) => {
  if (!mongoose.Types.ObjectId.isValid(followingId)) {
    throw new Error("INVALID_USER_ID");
  }

  if (followerId === followingId) {
    throw new Error("CANNOT_FOLLOW_SELF");
  }


  const follow = await Follow.create({
    follower: followerId,
    following: followingId
  });


  await User.findByIdAndUpdate(followerId, {
    $addToSet: { following: followingId }
  });

  await User.findByIdAndUpdate(followingId, {
    $addToSet: { followers: followerId }
  });

  return follow;
};

const unfollowUser = async (followerId, followingId) => {
  await Follow.findOneAndDelete({
    follower: followerId,
    following: followingId
  });

  await User.findByIdAndUpdate(followerId, {
    $pull: { following: followingId }
  });

  await User.findByIdAndUpdate(followingId, {
    $pull: { followers: followerId }
  });
};

const getFollowers = async (userId) => {
  return Follow.find({ following: userId })
    .populate("follower", "username email");
};

const getFollowing = async (userId) => {
  return Follow.find({ follower: userId })
    .populate("following", "username email");
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};


