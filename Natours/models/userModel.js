const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User Must Have a Name"],
    trim: true,
    minLength: 2,
    maxLength: 40,
  },
  email: {
    type: String,
    required: [true, "User Must have Email"],
    validate: [validator.isEmail, "Please Provide A valid Email"],
    unique: true,
    lowercase: true,
  },
  photo: String,

  password: {
    type: String,
    required: true,
    minLength: 8,
  },

  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
