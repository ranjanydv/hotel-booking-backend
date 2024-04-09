const express = require("express");
const router = express.Router();
const controller = require("../controllers/review.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticateUser");

router.post(
  "/",
  authenticateUser,
  authorizePermissions("user"),
  controller.createReview
);
router.get("/:hotelId", controller.getReviewsByHotel);
router.delete(
  "/:id",
  authenticateUser,
  authorizePermissions("user", "admin"),
  controller.deleteReview
);

module.exports = router;
