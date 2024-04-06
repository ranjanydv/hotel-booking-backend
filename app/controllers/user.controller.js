const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const createTokenUser = require("../utils/createTokenUser");
const { getAllItems, updateItem, deleteItem } = require("./generic.controller");

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchTerm = "" } = req.query;
    const searchQuery = {};

    if (searchTerm) {
      const keywords = searchTerm
        .split("%")
        .map((keyword) => new RegExp(keyword, "i"));
      searchQuery.name = { $all: keywords };
    }

    const totalUsers = await User.countDocuments({
      role: { $in: ["user", "owner"] },
      ...searchQuery,
    });

    const users = await User.find({
      role: { $in: ["user", "owner"] },
      ...searchQuery,
    })
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(StatusCodes.OK).json({
      currentPage: parseInt(page),
      totalPages,
      totalUsers,
      users,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const { params } = req;
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

const updateUser = async (req, res) => {
  await updateItem(req, res, User, req.authData.id);
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
    const userExists = await User.findOne({ _id: req.authData.id });
    if (!userExists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ status: 404, message: "User not found" });
    }
    const role = "owner";
    const updatedUser = await User.findOneAndUpdate(
      { id: req.authData.id },
      { role },
      { new: true }
    ).select("-password");
    const tokenUser = createTokenUser(updatedUser);

    res.status(StatusCodes.OK).send({
      updatedUser,
      accessToken: tokenUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: 500, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { params } = req;
  console.log(params);
  await deleteItem(req, res, User, params.id);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  upgradeToMerchant,
  deleteUser,
};
