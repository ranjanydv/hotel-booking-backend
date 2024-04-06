const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.set("strictQuery", true);
  // return mongoose.connect(url)
  await mongoose.connect(url, {}).then(() => console.log("💻 MongoDB Connected"));
};

module.exports = connectDB;
