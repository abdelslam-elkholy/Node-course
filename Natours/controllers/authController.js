const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const { pronisify, promisify } = require("util");

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
  console.log(req.body);

  if (!email || !password) {
    return next(new AppError("You mUst Provide Email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || (await user.validatePassword(password))) {
    console.log(user, await user.validatePassword(password));
    return next(new AppError("Invalid Email Or Password", 401));
  }

  const token = createToken(user._id);
  res.status(200).json({
    message: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError("you are not logged in", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_STRING);
  const existUser = await User.findById(decoded.id);

  if (!existUser) {
    return next(new AppError("the user isnt exist anymore", 401));
  }

  if (existUser.checkChangedPasswordTime(decoded.iat)) {
    return next(new AppError("session ended pleas login again ", 401));
  }

  req.user = existUser;

  next();
});

exports.resterictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      console.log("working from forbidden");
      return next(new AppError("Forbidden access", 403));
    }

    next();
  };
};
