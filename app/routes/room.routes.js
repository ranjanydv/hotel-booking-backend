const express = require("express");
const router = express.Router();
const controller = require("../controllers/room.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticateUser");

router.post(
  "/",
  authenticateUser,
  authorizePermissions("owner"),
  controller.createRoom
);
router.get("/", controller.getAllRooms);
router.get("/:hotelId", controller.getRoomsByHotel);

module.exports = router;
