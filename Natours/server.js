const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

async function dbConnect() {
  try {
    await mongoose.connect(DB);
    console.log("Connected to the database!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
dbConnect();

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Have Name"],
    unique: true,
  },
  price: { type: Number, required: true },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = new mongoose.model("tour", tourSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening from porst ${port}`);
});
