import * as commentService from "./comment.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const addComment = async (req, res) => {
  const comment = await commentService.createComment({
    postId: req.params.postId,
    userId: req.user.id,
    text: req.body.text,
    parentId: req.body.parentId || null,
  });

  res.json(new ApiResponse(200, comment, "Comment added"));
};

export const getComments = async (req, res) => {
  const { page, limit } = req.query;

  const comments = await commentService.getPostComments(
    req.params.postId,
    page,
    limit
  );

  res.json(new ApiResponse(200, comments));
};

export const getReplies = async (req, res) => {
  const replies = await commentService.getReplies(req.params.commentId);

  res.json(new ApiResponse(200, replies));
};

export const removeComment = async (req, res) => {
  const comment = await commentService.deleteComment(
    req.params.commentId,
    req.user.id
  );

  res.json(new ApiResponse(200, comment, "Comment deleted"));
};
