const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const dbConnect = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

dbConnect();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening from porst ${port}`);
});
