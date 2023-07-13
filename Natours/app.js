const { log } = require("console");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
// app.get("/", (req, res) => {
//   res.status(404).json({
//     message: "Hey from The server",
//     app: "Natours",
//   });
// });

// app.post("/", (req, res) => {
//   res.send("You Cant post to this rout");
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    toursLength: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: "failed",
      message: "invalid",
    });
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    res.status(404).json({
      status: "Failed",
      message: "invalid",
    });
  }
  res.status(200).json({
    message: `<p> Updated</p>`,
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    res.status(404).json({
      status: "Failed",
      message: "invalid",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "success",
    data: null,
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`listening from porst ${port}`);
});
