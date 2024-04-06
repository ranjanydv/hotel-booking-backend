const mongoose = require("mongoose");
// const HotelSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: [true, "Hotel name must be provided"],
//       maxlength: [100, "Hotel name cannot be more than 100 characters"],
//     },
//     description: {
//       type: Text,
//       trim: true,
//       required: [true, "Hotel description must be provided"],
//       maxlength: [
//         1000,
//         "Hotel description cannot be more than 1000 characters",
//       ],
//     },
//     images: [{ type: String, default: "/uploads/Airbnb.png" }],
//     category: {
//       type: String,
//       required: [true, "Hotel category must be provided"],
//       enum: ["traditional", "cultural", "others"],
//     },
//     featured: {
//       type: Boolean,
//       default: false,
//     },
//     freeShipping: {
//       type: Boolean,
//       default: false,
//     },
//     inventory: {
//       type: Number,
//       default: 0,
//     },
//     averageRating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5,
//     },
//     numOfReviews: {
//       type: Number,
//       default: 0,
//     },
//     numOfBids: {
//       type: Number,
//       default: 0,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     liveOn: {
//       type: Date,
//       default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );
// /* This links the review model to the hotel model
//  *	And can be used to retrieve list of review in the hotel description
//  */
// HotelSchema.virtual("reviews", {
//   ref: "Review",
//   localField: "_id",
//   foreignField: "hotel",
//   justOne: false,
//   // match: { rating: 1 },
// });

// // This deletes all the bids made on the hotel
// // HotelSchema.virtual("bids", {
// //   ref: "Bidding",
// //   localField: "_id",
// //   foreignField: "hotel",
// //   justOne: false,
// //   // match: { rating: 1 },
// // });

// HotelSchema.post("remove", async function (doc) {
//   if (doc) {
//     // this deletes all reviews
//     await mongoose.model("Review").deleteMany({ hotel: doc._id });
//     // this deletes all Bids
//     await mongoose.model("Bidding").deleteMany({ hotel: doc._id });
//   }
// });

// module.exports = mongoose.model("Hotel", HotelSchema);

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    photos: [{ type: String }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
