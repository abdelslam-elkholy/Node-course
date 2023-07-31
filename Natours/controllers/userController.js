const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const createError = require("./../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    usersLength: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};
