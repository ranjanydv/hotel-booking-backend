const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    date: { type: Date, required: true },
    available: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);