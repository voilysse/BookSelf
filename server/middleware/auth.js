const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ msg: "No auth token, access denied" });

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.status(401).json({ msg: "Token verification failed, authorization denied" });

  jwt.verify(token, process.env.JWT_SECRET, user => {
    req.user = user;
    next();
  });
  };
  
module.exports = auth;