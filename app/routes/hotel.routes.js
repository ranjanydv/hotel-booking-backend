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
// router.get(
//   "/",
//   authenticateUser,
//   authorizePermissions("admin"),
//   controller.getAllUsers
// );
// // .get(authenticateUser, getUser)
// router.get("/showMe", authenticateUser, controller.showCurrentUser);
// router.put("/updateUser", authenticateUser, controller.updateUser);
// router.patch(
//   "/updatePassword",
//   authenticateUser,
//   controller.updateUserPassword
// );
// router.patch("/joinMerchant", authenticateUser, controller.upgradeToMerchant);

// router.get("/:id", authenticateUser, controller.getSingleUser);
// router.delete("/delete/:id", authenticateUser, controller.deleteUser);

module.exports = router;
