const express = require("express");
const tourCountroller = require("./../controllers/tourController");
const router = express.Router();

router
  .route("/get-cheapest")
  .get(tourCountroller.getCheapest, tourCountroller.getAllTours);

router.route("/stats").get(tourCountroller.getStats);

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
