const Comment = require("./comment.model");

export const createComment = async (data) => {
  const comment = await Comment.create(data);


  if (data.parentId) {
    await Comment.findByIdAndUpdate(data.parentId, {
      $inc: { repliesCount: 1 },
    });
  }

  return comment;
};

export const getPostComments = async (postId, page = 1, limit = 10) => {
  return await Comment.find({
    postId,
    parentId: null,
    isDeleted: false,
  })
    .populate("userId", "username profilePic")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getReplies = async (parentId) => {
  return await Comment.find({
    parentId,
    isDeleted: false,
  }).populate("userId", "username profilePic");
};

export const deleteComment = async (commentId, userId) => {
  return await Comment.findOneAndUpdate(
    { _id: commentId, userId },
    { isDeleted: true },
    { new: true }
  );
};
