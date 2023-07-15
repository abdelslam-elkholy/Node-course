const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const dbConnect = async () => {
  try {
    await mongoose.connect(DB);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("DAtA HAs Been Imported");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data Has Been Deleted");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "-delete") {
  deleteData();
} else if (process.argv[2] === "-import") {
  importData();
}
