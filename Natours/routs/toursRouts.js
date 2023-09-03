const express = require("express");
const tourCountroller = require("./../controllers/tourController");
const { protect, resterictTo } = require("./../controllers/authController");
const router = express.Router();

router
  .route("/get-cheapest")
  .get(tourCountroller.getCheapest, tourCountroller.getAllTours);

router
  .route("/stats")
  .get(protect, resterictTo("admin"), tourCountroller.getStats);

router.route("/monthly-plan/:year").get(tourCountroller.getMonthlyPlane);

router
  .route("/")
  .get(tourCountroller.getAllTours)
  .post(tourCountroller.createTour);
router
  .route("/:id")
  .get(tourCountroller.getTour)
  .patch(tourCountroller.updateTour)
  .delete(tourCountroller.deleteTour);

module.exports = router;
