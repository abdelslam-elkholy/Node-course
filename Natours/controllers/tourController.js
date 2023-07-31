const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getMonthlyPlane = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const tours = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        names: { $push: "$name" },
        numTours: { $sum: 1 },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    toursLength: tours.length,
    data: {
      tours,
    },
  });
});

exports.getStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        numTours: { $sum: 1 },
        maxPrice: { $max: "$price" },
        minPrice: { $min: "$price" },
      },
    },
    {
      $sort: { avgPrice: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    toursLength: stats.length,
    data: {
      stats,
    },
  });
});

exports.getCheapest = async (req, res, next) => {
  req.query.sort = "price, -ratingsAverage";
  req.query.limit = 5;
  req.query.fields = `name , price , ratingsAverage , summary`;

  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sorting()
    .feildsSelect()
    .pageination();

  const tours = await features.query;

  res.status(200).json({
    status: "success",
    toursLength: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError("Ther Is no tour with this id", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!tour) {
    return next(new AppError("Ther Is no tour with this id", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError("Ther Is no tour with this id", 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      deletedTour: tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    message: "success",
    data: {
      tour: newTour,
    },
  });
});

/*

exports.getAllTours = async (req, res) => {
  try {
    //Filtring The Query
    // const queryObj = { ...req.query };
    // const excludedQueries = ["sort", "page", "limit", "fields"];
    // excludedQueries.map((el) => delete queryObj[el]);

    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    // let query = Tour.find(JSON.parse(queryStr));

    //sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort("-ratingsAverage");
    // }

    // Filter Fields
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    //Pagenation
    // const limit = req.query.limit * 1 || 100;
    // const page = req.query.page * 1 || 1;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // console.log(skip);
    // if (req.query.page) {
    //   const count = await Tour.countDocuments();
    //   if (skip >= count) throw new Error("Error");
    // }

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sorting()
      .feildsSelect()
      .pageination();

    const tours = await features.query;

    res.status(200).json({
      status: "success",
      toursLength: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

*/
