const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) return res.status(401).json(err);
    try {
      const token = authHeader.split(' ')[1];
      if (!token) return res.status(401).json({ msg: "No auth token, access denied" });
      
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.status(401).json({ msg: "Token verification failed, authorization denied" });

      req.userId = verified.userId;
      next();
      } catch(err){
        return res.status(500).json(err);
      }
  };
  
module.exports = auth;