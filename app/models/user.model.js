const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please provide a name"],
//     maxlength: [50, "Name cannot be more than 50 characters"],
//     minlength: [3, "Name cannot be less than 3 characters"],
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: [true, "Please provide an email"],
//     validate: {
//       validator: validator.isEmail,
//       message: "Invalid Email",
//     },
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//     minlength: [6, "Password cannot be less than 6 characters"],
//   },
//   role: {
//     type: String,
//     enum: ["admin", "user", "owner"],
//     default: "user",
//   },
//   phone: {
//     type: String,
//   },
//   streetAddress: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
// });

// // * Encrypt password using bcrypt
// UserSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // * compare user password with hashed password
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("User", UserSchema);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password cannot be less than 6 characters"],
    },
    profilePicture: { type: String, default: "/uploads/Airbnb.png" },
    role: {
      type: String,
      enum: ["admin", "user", "owner"],
      default: "user",
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

// * Encrypt password using bcrypt
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = bcrypt.hash(this.password, salt);
});

// * compare user password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
