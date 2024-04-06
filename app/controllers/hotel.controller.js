const Hotel = require("../models/hotels.model");
const {
  getAllItems,
  getSingleItem,
  createNewItem,
  updateItem,
  deleteItem,
} = require("./generic.controller");

const getAllHotels = async (req, res) => {
  await getAllItems(req, res, Hotel);
};

const getSingleHotel = async (req, res) => {
  const { params } = req;
  await getSingleItem(req, res, Hotel, params.id);
};

const createHotel = async (req, res) => {
  await createNewItem(req, res, Hotel);
};

module.exports = {
  getAllHotels,
  getSingleHotel,
  createHotel,
};
