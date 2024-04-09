const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    photos: [{ type: String }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    numOfReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
