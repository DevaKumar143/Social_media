import express from "express";
import {
  addComment,
  getComments,
  getReplies,
  removeComment,
} from "./comment.controller.js";
const verifyJWT = require("../../middlewares/auth.middleware.js")

const router = express.Router();

router.post("/:postId", verifyJWT, addComment);
router.get("/:postId", getComments);

router.get("/replies/:commentId", getReplies);

router.delete("/:commentId", verifyJWT, removeComment);

export default router;
