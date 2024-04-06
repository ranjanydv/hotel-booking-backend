const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { createTokenUser } = require("../utils/createTokenUser");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists)
    return res.status(StatusCodes.CONFLICT).send({
      status: 409,
      accessToken: null,
      message: "Email already exists",
    });

  // * make the first user Admin by default
  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";
  const data = {
    name,
    email,
    password,
    role,
    phone: "",
    streetAddress: "",
    city: "",
  };
  const user = await User.create(data);
  res.status(StatusCodes.CREATED).json({ user: user });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: StatusCodes.BAD_REQUEST,
        message: "Enter Email and Password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        status: 401,
        accessToken: null,
        message: "Invalid Credentials",
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        status: 401,
        accessToken: null,
        message: "Invalid Credentials",
      });
    }
    const tokenUser = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        streetAddress: user.streetAddress,
        city: user.city,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(StatusCodes.OK).send({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      streetAddress: user.streetAddress,
      city: user.city,
      accessToken: tokenUser,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: 500, message: error.message });
  }
};

const registerMerchant = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email Already Exists.");
  }
  const role = "owner";
  const user = await User.create({ email, name, password, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// const validateTokenForMobile = async (req, res) => {
// 	res.status(StatusCodes.OK).json({ msg: 'Token Verified' })
// }

module.exports = {
  register,
  login,
  // logout,
  // validateTokenForMobile,
  registerMerchant,
};
