const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    reviewDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

reviewSchema.index({ hotel: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);