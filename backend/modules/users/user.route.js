const express = require("express");
const authMiddleware = require("../../middlewares/auth.middleware");
const userController = require("./user.controller");
const router = express.Router();


router.get("/me", authMiddleware, userController.getMe);

// Get user by id
router.get("/:id", authMiddleware, userController.getUserById);

// Update user
router.put("/:id", authMiddleware, userController.updateUser);

// Delete user
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;