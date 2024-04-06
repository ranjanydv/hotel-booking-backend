const jwt = require("jsonwebtoken");

const createTokenUser = (user) => {
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
  return tokenUser;
};
module.exports = createTokenUser;
