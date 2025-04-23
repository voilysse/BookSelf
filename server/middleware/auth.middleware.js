require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ msg: "No auth token, access denied." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ msg: "Token verification failed, authorization denied." });
  }
};

module.exports = auth;