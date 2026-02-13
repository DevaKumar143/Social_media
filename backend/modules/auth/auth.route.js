const express = require("express");
const {body} = require("express-validator");
const authController = require("./auth.controller");
const router = express.Router();

router.post("/register",[
    body("username").isLength({min:3}),
    body("email").isEmail(),
    body("password").isLength({min:6})
],
authController.register
);


router.post("/login",[
    body("username").notEmpty(),
    body("password").exists(),
],
authController.login
)

module.exports = router;