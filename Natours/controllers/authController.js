const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_STRING, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = createToken(user._id);
  res.status(201).json({
    message: "Done",
    token,
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
});
