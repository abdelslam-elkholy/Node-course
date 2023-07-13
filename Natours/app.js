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

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    toursLength: tours.length,
    data: {
      tours,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
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
});

app.patch("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  if (id > tours[length - 1]) {
    res.status(404).json({
      messag: "invalid",
      status: "Failed",
    });
  }
});

app.post("/api/v1/tours", (req, res) => {
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
});
const port = 3000;
app.listen(port, () => {
  console.log(`listening from porst ${port}`);
});
