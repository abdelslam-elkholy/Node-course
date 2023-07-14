const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = dotenv.PORT || 3000;
app.listen(port, () => {
  console.log(`listening from porst ${port}`);
});
