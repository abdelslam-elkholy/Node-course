const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT || 3000;

const DB = process.env.DB || "mongodb://localhost:27017/test";
mongoose
  .connect(DB)
  .then(() => {
    console.log(`Connected Succesufily`);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App IS working on ${PORT} :)))`);
});
