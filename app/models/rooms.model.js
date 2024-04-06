const mongoose = require("mongoose");
// const HotelSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       required: [true, "Product name must be provided"],
//       maxlength: [100, "Product name cannot be more than 100 characters"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Product price must be provided"],
//     },
//     offer_price: {
//       type: Number,
//       default: "",
//     },
//     description: {
//       type: String,
//       trim: true,
//       required: [true, "Product description must be provided"],
//       maxlength: [
//         1000,
//         "Product description cannot be more than 1000 characters",
//       ],
//     },
//     image: {
//       type: String,
//       default: "/uploads/example.jpg",
//     },
//     category: {
//       type: String,
//       required: [true, "Product category must be provided"],
//       enum: ["traditional", "cultural", "others"],
//     },
//     company: {
//       type: String,
//       enum: {
//         values: ["ikea", "liddy", "marcos"],
//         message: "{VALUE} is not supported",
//       },
//     },
//     colors: {
//       type: [String],
//       default: ["#000", "#fff"],
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
// /* This links the review model to the product model
//  *	And can be used to retrieve list of review in the product description
//  */
// HotelSchema.virtual("reviews", {
//   ref: "Review",
//   localField: "_id",
//   foreignField: "product",
//   justOne: false,
//   // match: { rating: 1 },
// });

// // This deletes all the bids made on the product
// // HotelSchema.virtual("bids", {
// //   ref: "Bidding",
// //   localField: "_id",
// //   foreignField: "product",
// //   justOne: false,
// //   // match: { rating: 1 },
// // });

// HotelSchema.post("remove", async function (doc) {
//   if (doc) {
//     // this deletes all reviews
//     await mongoose.model("Review").deleteMany({ product: doc._id });
//     // this deletes all Bids
//     await mongoose.model("Bidding").deleteMany({ product: doc._id });
//   }
// });

// module.exports = mongoose.model("Hotel", HotelSchema);

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
