const Review = require("../models/reviews.model");

const {
  getAllItems,
  getSingleItem,
  createNewItem,
  updateItem,
  deleteItem,
} = require("./generic.controller");

const getReviewsByHotel = async (req, res) => {
  const { hotelId } = req.params;
  await getAllItems(req, res, Review, "hotel", hotelId);
};

const getSingleReview = async (req, res) => {
  const { params } = req;
  await getSingleItem(req, res, Review, params.id);
};

const createReview = async (req, res) => {
  // This checks whether the user has already submitted a review
  const { hotel, user } = req.body;
  const alreadySubmitted = await Review.findOne({
    hotel,
    user,
  });
  if (alreadySubmitted) {
    return res
      .status(403)
      .send({ status: 403, message: "You have already submitted a review" });
  }
  await createNewItem(req, res, Review);
};

const deleteReview = async (req, res) => {
  const { params, authData } = req;
  const reviewExists = await Review.findOne({ _id: params.id });
  if (authData.role === "user") {
    if (!(reviewExists.user.toString() === authData.id.toString())) {
      return res.status(403).send({ status: 403, message: "Unauthorized" });
    }
  }
  await deleteItem(req, res, Review, params.id);
};

module.exports = {
  getReviewsByHotel,
  getSingleReview,
  createReview,
  deleteReview,
};
