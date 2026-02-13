const User = require("../users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRETE = "SURAJ@1223rnbgf";

const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("USERNAME_EXISTS");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    password: hashedPassword,
    email,
  });

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, JWT_SECRETE);
  return token;
};

const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, JWT_SECRETE);
  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
