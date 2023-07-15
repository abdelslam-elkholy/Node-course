const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Have Name"],
    unique: true,
  },
  price: { type: Number, required: [true, "Must Have a price"] },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = new mongoose.model("tour", tourSchema);

module.exports = Tour;
