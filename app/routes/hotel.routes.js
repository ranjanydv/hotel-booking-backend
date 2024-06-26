const express = require("express");
const router = express.Router();
const controller = require("../controllers/hotel.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticateUser");

router.post(
  "/",
  authenticateUser,
  authorizePermissions("owner"),
  controller.createHotel
);
router.get("/", controller.getAllHotels);
router.get("/:id", controller.getSingleHotel);

module.exports = router;
