const express = require("express");
const userCountroller = require("./../controllers/userController");
const authCountroller = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", authCountroller.signUp);
router.post("/login", authCountroller.login);
router
  .route("/")
  .get(userCountroller.getAllUsers)
  .post(userCountroller.createUser);
router
  .route("/:id")
  .get(userCountroller.getUser)
  .patch(userCountroller.updateUser)
  .delete(userCountroller.deleteUser);

module.exports = router;
