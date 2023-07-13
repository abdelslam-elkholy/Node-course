const express = require("express");

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

const tourRouter = express.Router();
const userRouter = express.Router();

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`listening from porst ${port}`);
});
