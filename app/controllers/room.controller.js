const Room = require("../models/rooms.model");

const {
  getAllItems,
  getSingleItem,
  createNewItem,
  updateItem,
  deleteItem,
} = require("./generic.controller");

const getAllRooms = async (req, res) => {
  await getAllItems(req, res, Room);
};

const getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;
  await getAllItems(req, res, Room, "hotel", hotelId);
};


const getSingleRoom = async (req, res) => {
  const { params } = req;
  await getSingleItem(req, res, Room, params.id);
};

const createRoom = async (req, res) => {
  await createNewItem(req, res, Room);
};

module.exports = {
  getAllRooms,
  getRoomsByHotel,
  getSingleRoom,
  createRoom,
};
