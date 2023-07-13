const express = require("express");
const fs = require("fs");
const app = express();

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
    data: {
      tours,
    },
  });
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
