const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "unauthorized HTTP, Token not Provided" });
  }
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token fron auth middleware", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
    
  } catch (error) {
    return res.status(401).json({ msg: "unauthorized, invalid token" });
  }
};

module.exports = authMiddleware;
