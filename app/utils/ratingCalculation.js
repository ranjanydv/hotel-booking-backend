const Review = require("../models/reviews.model");
const Hotel = require("../models/hotels.model");

async function calculateAverageRating(hotelId) {
  try {
    const result = await Review.aggregate([
      { $match: { hotel: hotelId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          numOfReviews: { $sum: 1 },
        },
      },
    ]);

    const { averageRating, numOfReviews } = result[0] || {
      averageRating: 0,
      numOfReviews: 0,
    };

    await Hotel.findByIdAndUpdate(hotelId, {
      averageRating: Math.ceil(averageRating),
      numOfReviews,
    });
  } catch (error) {
    throw new Error(`Error calculating average rating: ${error.message}`);
  }
}

module.exports = calculateAverageRating;
