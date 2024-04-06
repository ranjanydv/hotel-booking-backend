const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const createTokenUser = require("../utils/createTokenUser");

const getAllUsers = async (req, res) => {
  console.log(req.authData);
  // const users = await User.find({ role: 'user' }).select('-password')
  const users = await User.find({ role: { $in: ["user", "owner"] } }).select(
    "-password"
  );
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { params } = req;
  console.log(
    "🚀 ~ file: user.controller.js:15 ~ getSingleUser ~ params:",
    params
  );
  const user = await User.findOne({ _id: params.id }).select("-password");
  if (!user) {
    res.status(404).send({
      status: 404,
      message: `No user with id ${params.id} found`,
    });
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.authData.id }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};

// update user details using user.save() method
const updateUser = async (req, res) => {
  try {
    const { name, phone, streetAddress, city } = req.body;
    const user = await User.findOne({ _id: req.authData.id });
    user.name = name;
    user.phone = phone || "";
    user.streetAddress = streetAddress || "";
    user.city = city || "";
    await user.save();
    const tokenUser = createTokenUser(user);
    res.status(StatusCodes.OK).send({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      streetAddress: user.streetAddress,
      city: user.city,
      accessToken: tokenUser,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 500, message: error.message });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .send({ status: 400, message: "Please provide both values" });
    }
    if (oldPassword === newPassword) {
      return res.status(400).send({
        status: 400,
        message: "Old password and new password cannot be same",
      });
    }
    const user = await User.findOne({ _id: req.authData.id });
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .send({ status: 401, message: "Invalid Credentials" });
    }
    user.password = newPassword;
    await user.save();
    const tokenUser = createTokenUser(user);
    res.status(StatusCodes.OK).send({
      accessToken: tokenUser,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 500, message: error.message });
  }
};

const upgradeToMerchant = async (req, res) => {
  console.log("Upgrade to merchant");
  try {
    const user = await User.findOne({ _id: req.authData.id });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ status: 404, message: "User not found" });
    }
    user.role = "owner";
    // saving with save method
    await user.save();
    const tokenUser = createTokenUser(user);
    res.status(StatusCodes.OK).send({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      streetAddress: user.streetAddress,
      city: user.city,
      accessToken: tokenUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 500, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  upgradeToMerchant,
};
