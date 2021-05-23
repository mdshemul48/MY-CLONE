const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Sign up failed, please try again later.",
    });
  }
  if (existingUser) {
    return res
      .status(409)
      .json({ successful: true, message: "user already added." });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Sign up in failed, please try again later.",
    });
  }

  const createdUser = new User({
    username,
    password: hashedPassword,
  });
  try {
    await createdUser.save();
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Sign up in failed, please try again later.",
    });
  }
  return res.status(201).json({ successful: true, userCreated: true });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Logging in failed, please try again later.",
    });
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ successful: false, message: "user not found." });
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Logging in failed, please try again later.",
    });
  }
  if (!isValidPassword) {
    return res.status(401).json({
      successful: false,
      message: "invalid credentials, please check and enter valid credentials",
    });
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
      },
      process.env.SECRET_KEY_FOR_JWT,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res.status(500).json({
      successful: false,
      message: "Logging in failed, please try again later.",
    });
  }
  res.status(201).json({ userId: existingUser.id, token });
};

exports.signup = signup;
exports.login = login;
