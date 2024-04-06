const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authenticateUser");

router.get(
  "/",
  authenticateUser,
  authorizePermissions("admin"),
  controller.getAllUsers
);
// .get(authenticateUser, getUser)
router.get("/showMe", authenticateUser, controller.showCurrentUser);
router.put("/updateUser", authenticateUser, controller.updateUser);
router.patch(
  "/updatePassword",
  authenticateUser,
  controller.updateUserPassword
);
router.patch('/joinMerchant', authenticateUser, controller.upgradeToMerchant);

router.get("/:id", authenticateUser, controller.getSingleUser);

module.exports = router;
