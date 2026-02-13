const {validationResult} = require("express-validator");
const authService = require("./auth.service");


const register = async(req, res, next) =>{
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = await authService.registerUser(req.body);
    res.json({authToken: token});
     } catch (error) {
    if (error.message === "USERNAME_EXISTS") {
      return res.status(409).send("Username already exists");
    }
    next(error);
  }
}


const login = async(req, res, next) =>{
    try {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   

    const token = await authService.loginUser(req.body);
    res.json({authToken: token});
  
    } catch (error) {
        if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).send("Invalid credentials");
    }
    next(error);
    }
}

module.exports = {
    register,
    login
};