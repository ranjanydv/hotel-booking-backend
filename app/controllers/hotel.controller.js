const Hotel = require("../models/hotels.model");
const Room = require("../models/rooms.model");
const User = require("../models/user.model");


const {
  getAllItems,
  getSingleItem,
  createNewItem,
  updateItem,
  deleteItem,
  getItemWithAssociations,
} = require("./generic.controller");

const getAllHotels = async (req, res) => {
  await getAllItems(req, res, Hotel);
};

const getSingleHotel = async (req, res) => {
  const { params } = req;
  await getItemWithAssociations(req, res, Hotel, params.id,Room);
};

const createHotel = async (req, res) => {
  await createNewItem(req, res, Hotel);
};

module.exports = {
  getAllHotels,
  getSingleHotel,
  createHotel,
};
