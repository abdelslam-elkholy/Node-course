const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

dbConnect().catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(DB);
}

const port = dotenv.PORT || 3000;
app.listen(port, () => {
  console.log(`listening from porst ${port}`);
});
