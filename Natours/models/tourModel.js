const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must Have Name"],
      unuiqe: true,
      trim: true,
      minLength: [5, " length must be greater than 4"],
      maxLength: [40, " length must be less than 40"],
    },
    duration: {
      type: Number,
      required: [true, "Tour Must Have a duration"],
    },
    maxGroupSize: {
      type: String,
      required: [true, "Tour must Have max Group Size"],
    },
    difficulty: {
      type: String,
      required: [true, "Tour Must Have Diffculty"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Tour Must Have A Price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      required: [true, "Tour Must Have Summary"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Tour Must Have Descreiption"],
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "Tour Must Have Image Cover"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("virtualWeeks").get(function () {
  return this.duration / 7;
});
const Tour = new mongoose.model("tour", tourSchema);

module.exports = Tour;
