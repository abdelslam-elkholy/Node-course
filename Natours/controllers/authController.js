const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  res.status(201).json({
    message: "Done",
    data: {
      user,
    },
  });
});
