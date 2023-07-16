const Tour = require("./../models/tourModel");

exports.getCheapest = async (req, res, next) => {
  req.query.sort = "price, -ratingAverage";
  req.query.limit = 5;
  req.query.fields = `name , price , ratingAverage , summary`;

  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedQueries = ["sort", "page", "limit", "fields"];
    excludedQueries.map((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-ratingsAverage");
    }

    return this;
  }

  feildsSelect() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  pageination() {
    const limit = this.queryString.limit * 1 || 100;
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

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

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {
        deletedTour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "not found",
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      message: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "invalid data",
    });
  }
};
