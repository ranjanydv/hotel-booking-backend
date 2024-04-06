const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["single", "double", "deluxe"],
        message: "{VALUE} is not supported",
      },
    },
    description: { type: String, required: true },
    photos: [{ type: String }],
    price: { type: Number, required: true },
    amenities: [{ type: String }],
    availability: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Availability" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
