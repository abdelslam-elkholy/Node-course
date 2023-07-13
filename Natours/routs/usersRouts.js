const express = require("express");
const userCountroller = require("./../controllers/userController");
const router = express.Router();

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
